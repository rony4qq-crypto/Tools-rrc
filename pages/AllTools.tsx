import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TOOLS } from '../services/toolsData';
import ToolCard from '../components/ToolCard';
import { Search } from 'lucide-react';

const AllTools = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const filteredTools = TOOLS.filter(tool => 
    tool.title.toLowerCase().includes(query.toLowerCase()) ||
    tool.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">All PDF Tools</h1>
          <p className="text-lg text-slate-500 mb-8">Everything you need to manage your PDF files.</p>
          
          <div className="max-w-md mx-auto relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Find a tool..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 shadow-sm"
            />
          </div>
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No tools found matching "{query}".</p>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default AllTools;