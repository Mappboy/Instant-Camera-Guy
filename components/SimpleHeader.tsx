import React from 'react';

const SimpleHeader: React.FC = () => {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/" className="text-3xl font-special text-primary">
              The Instant 📷 Guy
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;