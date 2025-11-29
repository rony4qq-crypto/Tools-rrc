import React from 'react';
import { Shield, Zap, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">About Rony Tools</h1>
        
        <div className="prose prose-lg prose-slate mx-auto">
          <p className="lead text-xl text-slate-500 mb-10 text-center">
            Rony Tools was built with a simple mission: to make PDF and file management easy, fast, and free for everyone.
          </p>

          <p className="mb-6">
            In a digital world, we deal with documents every day. Whether you are a student submitting an assignment, 
            a professional preparing a report, or a business owner managing invoices, dealing with file formats shouldn't be a headache.
          </p>

          <p className="mb-12">
            That's why we created Rony Tools. We provide a suite of powerful tools that run directly in your browser. 
            There is no software to install, no rigorous sign-up process, and best of all, it's completely free.
          </p>

          <div className="grid md:grid-cols-3 gap-8 my-12 not-prose">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Secure</h3>
              <p className="text-sm text-slate-500">Files are processed automatically and deleted securely.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Fast</h3>
              <p className="text-sm text-slate-500">Optimized algorithms ensure your files are ready in seconds.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Accessible</h3>
              <p className="text-sm text-slate-500">Works on any device - Desktop, Tablet, or Mobile.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;