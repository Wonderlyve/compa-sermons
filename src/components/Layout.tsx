
import React from 'react';
import BottomNavigation from './BottomNavigation';
import Header from './Header';
import MiniPlayer from './MiniPlayer';
import { useSermon } from '@/context/SermonContext';

interface LayoutProps {
  children: React.ReactNode;
  withPadding?: boolean;
  withBottomNavPadding?: boolean;
  withHeader?: boolean;
  className?: string;
}

const Layout = ({ 
  children, 
  withPadding = true,
  withBottomNavPadding = true,
  withHeader = true,
  className = ""
}: LayoutProps) => {
  const { currentSermon } = useSermon();
  
  return (
    <div className={`min-h-screen bg-compa-800 ${className}`}>
      {withHeader && (
        <div className={`${withPadding ? 'px-4' : ''}`}>
          <Header />
        </div>
      )}
      <main className={`${withPadding ? 'px-4 py-3' : ''} ${withBottomNavPadding ? 'pb-24' : ''}${currentSermon ? ' pb-40' : ''}`}>
        {children}
      </main>
      {currentSermon && <MiniPlayer />}
      <BottomNavigation />
    </div>
  );
};

export default Layout;
