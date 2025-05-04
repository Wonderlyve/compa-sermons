
import React from 'react';
import BottomNavigation from './BottomNavigation';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  withPadding?: boolean;
  withBottomNavPadding?: boolean;
  className?: string;
}

const Layout = ({ 
  children, 
  withPadding = true,
  withBottomNavPadding = true,
  className = ""
}: LayoutProps) => {
  return (
    <div className={`min-h-screen bg-compa-800 ${className}`}>
      <div className={`${withPadding ? 'px-4' : ''}`}>
        <Header />
      </div>
      <main className={`${withPadding ? 'px-4 py-3' : ''} ${withBottomNavPadding ? 'pb-24' : ''}`}>
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
