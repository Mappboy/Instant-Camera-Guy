import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background/50 mt-16">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-primary/70">
        <div className="flex justify-center space-x-6 mb-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-teal">Facebook</a>
            <a href="mailto:theinstantcameraguy@hotmail.com" className="hover:text-accent-red">Email</a>
            <a href="https://www.gumtree.com.au/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-tan">Gumtree</a>
        </div>
        <p className="text-sm">ABN: 12 345 678 901</p>
        <p className="text-xs mt-4">
          &copy; {new Date().getFullYear()} The Instant Camera Guy.
        </p>
         <p className="text-xs text-primary/40 mt-1">
          Inspired by the original 2019 site by PyPoole.
        </p>
      </div>
    </footer>
  );
};

export default Footer;