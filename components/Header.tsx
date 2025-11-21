import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: 'About', path: '#about', color: 'text-accent-green' },
    { name: 'Repairs', path: '#repairs', color: 'text-accent-red' },
    { name: 'Follow Me', path: '#instagram', color: 'text-accent-orange' },
    { name: 'Videos', path: '#videos', color: 'text-accent-blue' },
    { name: 'Contact', path: '#contact', color: 'text-accent-teal' },
  ];

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/" className="text-3xl font-special text-primary">
              The Instant 📷 Guy
            </a>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-special font-medium transition-colors duration-200 ${item.color} hover:underline`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-teal"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${item.color} hover:underline`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
