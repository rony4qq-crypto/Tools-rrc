import React from 'react';

const Terms = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Terms of Service</h1>
        <div className="prose prose-slate">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using Rony Tools, you accept and agree to be bound by the terms and provision of this agreement.</p>

          <h3>2. Use of Services</h3>
          <p>You agree to use Rony Tools only for lawful purposes. You are prohibited from violating or attempting to violate the security of the Site.</p>

          <h3>3. Limitation of Liability</h3>
          <p>Rony Tools provides these tools "as is". We are not liable for any damages resulting from the use or inability to use the site, or for any loss of data.</p>

          <h3>4. File Safety</h3>
          <p>While we take reasonable steps to ensure the security of your files, you acknowledge that you upload files at your own risk. We recommend keeping backups of your original documents.</p>

          <h3>5. Changes to Terms</h3>
          <p>We reserve the right to modify these terms at any time. Your continued use of the site constitutes agreement to such modifications.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;