import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background/50 mt-16">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-primary/70">
        <div className="flex justify-center space-x-6 mb-4">
            <a href="https://www.instagram.com/theinstantcameraguy/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-tan">Instagram</a>
            <a href="(https://m.me/instantcameraguy" target="_blank" rel="noopener noreferrer" className="hover:text-accent-teal">Facebook</a>
            <a href="mailto:theinstantcameraguy@hotmail.com" className="hover:text-accent-red">Email</a>
        </div>
        <p className="text-sm"><a href="http://www.abr.business.gov.au/SearchByAbn.aspx?abn=93161449237" target="_blank" rel="noopener noreferrer" className="hover:text-accent-green">ABN: 93 161 449 237</a></p>
        <p className="text-xs mt-4">
          &copy; {new Date().getFullYear()} The Instant Camera Guy.
        </p>
      </div>
    </footer>
  );
};

export default Footer;