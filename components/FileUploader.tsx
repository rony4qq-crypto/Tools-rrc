import React, { useCallback, useState } from 'react';
import { UploadCloud, File, X } from 'lucide-react';

interface FileUploaderProps {
  accept: string;
  multiple: boolean;
  onFilesSelected: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ accept, multiple, onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      onFilesSelected(filesArray);
    }
  }, [onFilesSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onFilesSelected(filesArray);
    }
  }, [onFilesSelected]);

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer
          ${isDragging 
            ? 'border-brand-500 bg-brand-50' 
            : 'border-slate-300 hover:border-brand-400 hover:bg-slate-50 bg-white'
          }
        `}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
        />
        
        <div className="flex flex-col items-center pointer-events-none">
          <div className={`p-4 rounded-full mb-4 ${isDragging ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-500'}`}>
            <UploadCloud size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            {isDragging ? 'Drop files here' : 'Drag & Drop files here'}
          </h3>
          <p className="text-slate-500 mb-6">or click to select files</p>
          
          <div className="inline-flex items-center px-6 py-3 bg-brand-600 text-white font-medium rounded-lg shadow-sm">
            Choose Files
          </div>
          <p className="mt-4 text-xs text-slate-400 uppercase tracking-wide">
            {multiple ? 'Multiple files allowed' : 'Single file allowed'} • {accept.replace(/\./g, ' ').toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;