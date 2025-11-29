import { 
  FileText, 
  Image as ImageIcon, 
  Files, 
  Scissors, 
  Minimize2, 
  Lock, 
  Unlock, 
  RotateCw, 
  Type, 
  Table, 
  FileOutput,
  Briefcase
} from 'lucide-react';
import { ToolData, ToolActionType } from '../types';

export const TOOLS: ToolData[] = [
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Convert PDF files into fully editable Word documents.',
    icon: FileText,
    actionType: ToolActionType.CONVERT_FROM_PDF,
    accept: '.pdf',
    multiple: false,
    isPopular: true,
    features: ['Fast Conversion', 'Maintains Formatting', 'Secure Processing', 'No Signup Required'],
    faqs: [
      { question: 'Is it free?', answer: 'Yes, Rony Tools is completely free to use.' },
      { question: 'Do you keep my files?', answer: 'No, files are processed in your browser or deleted immediately after conversion.' }
    ]
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    description: 'Create high-quality PDFs from Word (DOC/DOCX) files.',
    icon: FileOutput,
    actionType: ToolActionType.CONVERT_TO_PDF,
    accept: '.doc,.docx',
    multiple: false,
    isPopular: true,
    features: ['High Quality Output', 'Preserves Layouts', 'Works on Mobile', 'Instant Download'],
    faqs: [
      { question: 'Can I convert DOCX?', answer: 'Yes, both DOC and DOCX formats are supported.' }
    ]
  },
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    description: 'Turn JPG/PNG images into clean PDF pages.',
    icon: ImageIcon,
    actionType: ToolActionType.CONVERT_TO_PDF,
    accept: 'image/jpeg,image/png',
    multiple: true,
    isPopular: true,
    features: ['Combine Multiple Images', 'Adjust Orientation', 'No Watermark', 'Drag & Drop'],
    faqs: [
      { question: 'Can I reorder images?', answer: 'Yes, the final PDF will follow the upload order.' }
    ]
  },
  {
    id: 'pdf-compress',
    title: 'PDF Compressor',
    description: 'Reduce PDF size without losing visible quality.',
    icon: Minimize2,
    actionType: ToolActionType.MODIFY_PDF,
    accept: '.pdf',
    multiple: false,
    isPopular: true,
    features: ['Significant Size Reduction', 'Web Optimized', 'Secure', 'Fast'],
    faqs: [
      { question: 'Will quality decrease?', answer: 'We optimize the file to maintain the best balance between size and quality.' }
    ]
  },
  {
    id: 'merge-pdf',
    title: 'Merge PDF',
    description: 'Easily combine multiple PDF files into one.',
    icon: Files,
    actionType: ToolActionType.MODIFY_PDF,
    accept: '.pdf',
    multiple: true,
    isPopular: true,
    features: ['Combine Unlimited Files', 'Secure Merging', 'Fast Processing', 'Order Control'],
    faqs: [
      { question: 'Is there a limit?', answer: 'Browser memory is the only limit, but typically up to 50 files is fine.' }
    ]
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    description: 'Extract selected pages or split into multiple PDFs.',
    icon: Scissors,
    actionType: ToolActionType.MODIFY_PDF,
    accept: '.pdf',
    multiple: false,
    isPopular: true,
    features: ['Select Page Ranges', 'Extract Single Pages', 'Instant Split', 'Preview Pages'],
    faqs: [
      { question: 'How do I split?', answer: 'Upload the PDF and our tool will generate separate files for the pages.' }
    ]
  },
  {
    id: 'pdf-rotate',
    title: 'PDF Rotator',
    description: 'Rotate PDF pages permanently.',
    icon: RotateCw,
    actionType: ToolActionType.MODIFY_PDF,
    accept: '.pdf',
    multiple: false,
    features: ['Rotate 90, 180, 270 degrees', 'Save Permanently', 'Easy to Use', 'Client-side Processing'],
    faqs: []
  },
  {
    id: 'pdf-unlock',
    title: 'PDF Unlock',
    description: 'Remove password security from PDFs.',
    icon: Unlock,
    actionType: ToolActionType.MODIFY_PDF,
    accept: '.pdf',
    multiple: false,
    features: ['Remove Owner Passwords', 'Fast Decryption', 'Secure', 'Free'],
    faqs: [
      { question: 'Do you need the password?', answer: 'If the file is encrypted, you will need to provide the correct password once to remove it permanently.' }
    ]
  },
  {
    id: 'pdf-protect',
    title: 'PDF Protect',
    description: 'Add password protection to your PDF files.',
    icon: Lock,
    actionType: ToolActionType.MODIFY_PDF,
    accept: '.pdf',
    multiple: false,
    features: ['Strong Encryption', 'User Password', 'Owner Password', 'Secure'],
    faqs: []
  },
  {
    id: 'pdf-to-text',
    title: 'PDF to Text',
    description: 'Extract raw text from PDF documents.',
    icon: Type,
    actionType: ToolActionType.EXTRACT,
    accept: '.pdf',
    multiple: false,
    features: ['Copy & Paste Ready', 'Extracts All Text', 'Simple TXT Output', 'No Installation'],
    faqs: []
  },
  {
    id: 'excel-to-pdf',
    title: 'Excel to PDF',
    description: 'Convert spreadsheets to PDF.',
    icon: Table,
    actionType: ToolActionType.CONVERT_TO_PDF,
    accept: '.xls,.xlsx',
    multiple: false,
    features: ['Preserves Tables', 'Formatting Kept', 'Easy Sharing', 'Secure'],
    faqs: []
  },
  {
    id: 'ppt-to-pdf',
    title: 'PPT to PDF',
    description: 'Convert PowerPoint presentations to PDF.',
    icon: Briefcase,
    actionType: ToolActionType.CONVERT_TO_PDF,
    accept: '.ppt,.pptx',
    multiple: false,
    features: ['Slides to Pages', 'High Resolution', 'Universal Format', 'Fast'],
    faqs: []
  }
];

export const getToolById = (id: string | undefined) => TOOLS.find(t => t.id === id);
export const getPopularTools = () => TOOLS.filter(t => t.isPopular);
