import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ToolData } from '../types';

interface ToolCardProps {
  tool: ToolData;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const Icon = tool.icon;
  
  return (
    <Link 
      to={`/tool/${tool.id}`}
      className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-brand-200 transition-all duration-200 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="bg-brand-50 p-3 rounded-lg text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <ArrowRight size={20} className="text-slate-300 group-hover:text-brand-500 transition-colors" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{tool.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow">{tool.description}</p>
    </Link>
  );
};

export default ToolCard;