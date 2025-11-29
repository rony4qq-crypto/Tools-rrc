import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-brand-600 p-1.5 rounded-lg text-white">
                <FileText size={20} />
              </div>
              <span className="text-lg font-bold text-slate-900">Rony Tools</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Free, fast, and secure online PDF tools for everyone. Convert, merge, and edit documents in your browser.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-brand-600 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-brand-600 transition-colors"><Github size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-brand-600 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Tools</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="/tool/pdf-to-word" className="hover:text-brand-600">PDF to Word</Link></li>
              <li><Link to="/tool/word-to-pdf" className="hover:text-brand-600">Word to PDF</Link></li>
              <li><Link to="/tool/merge-pdf" className="hover:text-brand-600">Merge PDF</Link></li>
              <li><Link to="/tool/split-pdf" className="hover:text-brand-600">Split PDF</Link></li>
              <li><Link to="/tool/jpg-to-pdf" className="hover:text-brand-600">JPG to PDF</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="/about" className="hover:text-brand-600">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-600">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-600">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Support</h3>
            <p className="text-sm text-slate-600 mb-4">Need help? Check our FAQ or contact support.</p>
            <Link to="/contact" className="inline-block bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
              Contact Support
            </Link>
          </div>

        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2025 Rony Tools. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-brand-600">Privacy</Link>
            <Link to="/terms" className="hover:text-brand-600">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;