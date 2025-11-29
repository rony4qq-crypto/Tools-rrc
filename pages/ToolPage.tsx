import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getToolById } from '../services/toolsData';
import FileUploader from '../components/FileUploader';
import { processFiles } from '../services/pdfService';
import { ProcessedFile } from '../types';
import { Loader2, Download, CheckCircle, ArrowLeft, RefreshCw, Trash2, File as FileIcon, ArrowRight } from 'lucide-react';

type ProcessState = 'idle' | 'uploading' | 'processing' | 'completed' | 'error';

const ToolPage = () => {
  const { id } = useParams<{ id: string }>();
  const tool = getToolById(id);

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<ProcessState>('idle');
  const [result, setResult] = useState<ProcessedFile | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Reset state when tool changes
  useEffect(() => {
    setFiles([]);
    setStatus('idle');
    setResult(null);
    setErrorMsg('');
  }, [id]);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Tool not found</h1>
        <Link to="/all-tools" className="text-brand-600 hover:underline">Go back to tools</Link>
      </div>
    );
  }

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    // If it's a single file tool, automatically reset status to idle so user sees the file listed
    setStatus('idle'); 
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleProcess = async () => {
    if (files.length === 0) return;

    setStatus('processing');
    try {
      // For multi-file tools, we usually process all together. 
      // For single file tools, we process the first one.
      const resultData = await processFiles(tool.id, files, tool.actionType);
      setResult(resultData);
      setStatus('completed');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('An error occurred during processing. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Tool Header */}
      <div className="bg-white border-b border-slate-200 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block p-3 bg-brand-50 rounded-xl text-brand-600 mb-4">
            <tool.icon size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{tool.title}</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">{tool.description}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-10">
        
        {/* Workspace Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden min-h-[400px] flex flex-col items-center justify-center p-8 relative">
          
          {status === 'idle' && files.length === 0 && (
            <FileUploader 
              accept={tool.accept} 
              multiple={tool.multiple} 
              onFilesSelected={handleFilesSelected} 
            />
          )}

          {status === 'idle' && files.length > 0 && (
            <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mb-6 max-h-60 overflow-y-auto">
                 {files.map((file, idx) => (
                   <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-200 last:border-0">
                     <div className="flex items-center gap-3 overflow-hidden">
                       <FileIcon size={20} className="text-brand-500 flex-shrink-0"/>
                       <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
                       <span className="text-xs text-slate-400 flex-shrink-0">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                     </div>
                     <button onClick={() => removeFile(idx)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                       <Trash2 size={16} />
                     </button>
                   </div>
                 ))}
               </div>
               
               <div className="flex gap-4">
                 {tool.multiple && (
                    <label className="flex-1 cursor-pointer flex items-center justify-center px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors">
                      Add More
                      <input type="file" className="hidden" multiple accept={tool.accept} onChange={(e) => {
                          if (e.target.files) setFiles([...files, ...Array.from(e.target.files)])
                      }}/>
                    </label>
                 )}
                 <button 
                  onClick={handleProcess}
                  className="flex-[2] flex items-center justify-center gap-2 bg-brand-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-200/50"
                 >
                   {tool.title.split(' ')[0]} PDF <ArrowRight size={20} />
                 </button>
               </div>
            </div>
          )}

          {status === 'processing' && (
            <div className="text-center">
              <Loader2 size={60} className="text-brand-600 animate-spin mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Processing...</h3>
              <p className="text-slate-500">Please wait while we work on your file.</p>
              <div className="w-64 h-2 bg-slate-100 rounded-full mt-6 overflow-hidden mx-auto">
                <div className="h-full bg-brand-500 animate-pulse w-full rounded-full"></div>
              </div>
            </div>
          )}

          {status === 'completed' && result && (
            <div className="text-center animate-in zoom-in-50 duration-300">
               <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle size={40} />
               </div>
               <h3 className="text-2xl font-bold text-slate-800 mb-2">Ready to Download!</h3>
               <p className="text-slate-500 mb-8">{result.name}</p>
               
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <a 
                   href={result.url} 
                   download={result.name}
                   className="flex items-center justify-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all shadow-xl hover:shadow-brand-200/50"
                 >
                   <Download size={24} /> Download File
                 </a>
                 <button 
                   onClick={() => { setStatus('idle'); setFiles([]); setResult(null); }}
                   className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-brand-300 hover:text-brand-600 transition-all"
                 >
                   <RefreshCw size={20} /> Start Over
                 </button>
               </div>
            </div>
          )}

          {status === 'error' && (
             <div className="text-center">
               <div className="text-red-500 text-6xl mb-4">:(</div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h3>
               <p className="text-red-500 mb-6">{errorMsg}</p>
               <button 
                 onClick={() => setStatus('idle')}
                 className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900"
               >
                 Try Again
               </button>
             </div>
          )}

        </div>

        {/* Info Sections */}
        <div className="grid md:grid-cols-2 gap-12 mt-20">
           <div>
             <h2 className="text-2xl font-bold text-slate-900 mb-6">Features</h2>
             <ul className="space-y-4">
               {tool.features.map((feature, idx) => (
                 <li key={idx} className="flex items-start gap-3">
                   <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600">
                     <CheckCircle size={14} />
                   </div>
                   <span className="text-slate-600 font-medium">{feature}</span>
                 </li>
               ))}
             </ul>
           </div>
           
           <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {tool.faqs.length > 0 ? tool.faqs.map((faq, idx) => (
                  <div key={idx}>
                    <h4 className="font-bold text-slate-900 mb-2">{faq.question}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )) : (
                  <p className="text-slate-500">No specific FAQs for this tool.</p>
                )}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ToolPage;