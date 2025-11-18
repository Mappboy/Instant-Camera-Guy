import React from 'react';

const Header: React.FC = () => {
  const navItems = [
    { name: 'About', path: '#about', color: 'text-accent-green' },
    { name: 'Repairs', path: '#repairs', color: 'text-accent-red' },
    { name: 'Follow Us', path: '#instagram', color: 'text-accent-tan' },
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
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${item.color} hover:underline`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
