
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SimpleHeader from './SimpleHeader'; // New import

interface LayoutProps {
  children: React.ReactNode;
  simpleHeader?: boolean; // New prop
}

const Layout: React.FC<LayoutProps> = ({ children, simpleHeader }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {simpleHeader ? <SimpleHeader /> : <Header />}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;