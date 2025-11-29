import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react';
import { getPopularTools, TOOLS } from '../services/toolsData';
import ToolCard from '../components/ToolCard';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const popularTools = getPopularTools();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/all-tools?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 pt-20 pb-24 md:pt-32 md:pb-40 px-4 text-center overflow-hidden relative">
        {/* Background blobs */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-100/50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/4 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            New Tools Added Weekly
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Rony Tools – <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-400">Free & Fast</span> PDF Tools
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Convert, Compress, Merge, Split and Edit PDF files instantly. 
            No signup needed, no software to install.
          </p>

          <form onSubmit={handleSearch} className="max-w-lg mx-auto relative mb-12">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search tools (e.g. PDF to Word)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-xl shadow-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow text-slate-900 placeholder-slate-400"
            />
          </form>

          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600">
             <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-green-500"/> Secure</span>
             <span className="flex items-center gap-1"><Zap size={16} className="text-yellow-500"/> Fast</span>
             <span className="flex items-center gap-1"><Heart size={16} className="text-red-500"/> Free Forever</span>
          </div>
        </div>
      </section>

      {/* Trending Tools */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Most Popular Tools</h2>
              <p className="text-slate-500">Our most used PDF conversion and modification tools.</p>
            </div>
            <Link to="/all-tools" className="hidden md:flex items-center gap-1 text-brand-600 font-semibold hover:text-brand-700">
              View All Tools <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <div className="mt-10 md:hidden text-center">
             <Link to="/all-tools" className="inline-flex items-center gap-1 text-brand-600 font-semibold hover:text-brand-700">
              View All Tools <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Stripe */}
      <section className="py-16 bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
               <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <ShieldCheck size={24} />
               </div>
               <h3 className="text-xl font-bold mb-2">100% Secure</h3>
               <p className="text-brand-100">Files are processed securely and deleted automatically after 1 hour.</p>
            </div>
             <div className="p-4">
               <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <Zap size={24} />
               </div>
               <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
               <p className="text-brand-100">Powered by advanced cloud and browser technologies for instant results.</p>
            </div>
             <div className="p-4">
               <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <Heart size={24} />
               </div>
               <h3 className="text-xl font-bold mb-2">Completely Free</h3>
               <p className="text-brand-100">No hidden costs, no premium plans. Just free tools for everyone.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;