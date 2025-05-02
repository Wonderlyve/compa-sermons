
import React from 'react';
import BottomNavigation from './BottomNavigation';

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
      <main className={`${withPadding ? 'px-4 py-6' : ''} ${withBottomNavPadding ? 'pb-24' : ''}`}>
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
