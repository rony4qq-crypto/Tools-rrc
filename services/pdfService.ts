import { PDFDocument, degrees } from 'pdf-lib';
import { ProcessedFile, ToolActionType } from '../types';

// Helper to read file as ArrayBuffer
const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

// Helper to read file as Data URL
const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const processFiles = async (
  toolId: string, 
  files: File[], 
  actionType: ToolActionType
): Promise<ProcessedFile> => {
  
  // Real implementations for client-side capable tasks
  try {
    if (toolId === 'merge-pdf') {
      return await mergePdfs(files);
    }
    if (toolId === 'jpg-to-pdf' || toolId === 'png-to-pdf') {
      return await imagesToPdf(files);
    }
    if (toolId === 'pdf-rotate') {
      return await rotatePdf(files[0]);
    }
    if (toolId === 'split-pdf') {
       // For split, we'll just demonstrate splitting the first file into single pages
       // and returning a ZIP (simulated here by just returning the first page as a new PDF for demo simplicity)
       // Or usually, UI needs to ask "Which pages?". 
       // For this MVP, we will perform a simple "Extract first page" or split into individual files.
       // Let's implement extracting the first page as a demo of functionality.
       return await extractFirstPage(files[0]);
    }
  } catch (error) {
    console.error("PDF Processing Error", error);
    throw new Error("Failed to process PDF.");
  }

  // MOCK Implementations for server-side heavy tasks (PDF->Word, Word->PDF, Compress)
  // Since we don't have a backend, we simulate the experience.
  return new Promise((resolve) => {
    setTimeout(() => {
      let ext = 'pdf';
      let mime = 'application/pdf';
      
      if (toolId === 'pdf-to-word') { ext = 'docx'; mime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; }
      if (toolId === 'pdf-to-text') { ext = 'txt'; mime = 'text/plain'; }
      if (toolId === 'pdf-to-jpg') { ext = 'zip'; mime = 'application/zip'; }
      
      // Return the ORIGINAL file content as a blob just to allow the user to see a download happen,
      // but renamed with the target extension to simulate the flow.
      const blob = new Blob([files[0]], { type: mime });
      const url = URL.createObjectURL(blob);
      
      resolve({
        originalName: files[0].name,
        name: `converted_${files[0].name.split('.')[0]}.${ext}`,
        url,
        type: mime
      });
    }, 2000); // 2 second fake delay
  });
};

const mergePdfs = async (files: File[]): Promise<ProcessedFile> => {
  const mergedPdf = await PDFDocument.create();
  
  for (const file of files) {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  
  const pdfBytes = await mergedPdf.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  
  return {
    originalName: 'merged_files',
    name: `merged_document_${Date.now()}.pdf`,
    url,
    type: 'application/pdf'
  };
};

const imagesToPdf = async (files: File[]): Promise<ProcessedFile> => {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    let image;
    
    if (file.type === 'image/jpeg') {
      image = await pdfDoc.embedJpg(arrayBuffer);
    } else if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(arrayBuffer);
    }
    
    if (image) {
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  return {
    originalName: 'images',
    name: `images_converted_${Date.now()}.pdf`,
    url,
    type: 'application/pdf'
  };
};

const rotatePdf = async (file: File): Promise<ProcessedFile> => {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  
  // Rotate all pages 90 degrees clockwise
  pages.forEach(page => {
    const currentRotation = page.getRotation().angle;
    page.setRotation(degrees(currentRotation + 90));
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  return {
    originalName: file.name,
    name: `rotated_${file.name}`,
    url,
    type: 'application/pdf'
  };
};

const extractFirstPage = async (file: File): Promise<ProcessedFile> => {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const newPdf = await PDFDocument.create();
    
    const [firstPage] = await newPdf.copyPages(pdfDoc, [0]);
    newPdf.addPage(firstPage);

    const pdfBytes = await newPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    return {
        originalName: file.name,
        name: `split_page_1_${file.name}`,
        url,
        type: 'application/pdf'
    };
}
