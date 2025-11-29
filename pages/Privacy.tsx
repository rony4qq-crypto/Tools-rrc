import React from 'react';

const Privacy = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-slate">
          <p>Last updated: 2025</p>
          <h3>1. Introduction</h3>
          <p>Welcome to Rony Tools. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your data when you visit our website.</p>
          
          <h3>2. The Data We Collect</h3>
          <p>We do not collect personal identification information unless you voluntarily submit it to us through our contact forms. We may collect non-personal identification information about Users whenever they interact with our Site (e.g., browser name, type of computer).</p>

          <h3>3. How We Handle Your Files</h3>
          <p>Your security is our priority:</p>
          <ul>
            <li>Files uploaded are processed automatically.</li>
            <li>We do not manually review your files.</li>
            <li><strong>Files are automatically deleted</strong> from our servers within 1 hour after processing.</li>
            <li>We do not sell or share your files with third parties.</li>
          </ul>

          <h3>4. Cookies</h3>
          <p>Our site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. You may choose to set your web browser to refuse cookies.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;