
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
  title?: string;
  showBackButton?: boolean;
}

const Layout = ({ 
  children, 
  withPadding = true,
  withBottomNavPadding = true,
  withHeader = true,
  className = "",
  title,
  showBackButton = false
}: LayoutProps) => {
  const { currentSermon } = useSermon();
  
  return (
    <div className={`min-h-screen bg-compa-800 ${className}`}>
      {withHeader && (
        <div className={`${withPadding ? 'px-3' : ''}`}>
          <Header title={title} showBackButton={showBackButton} />
        </div>
      )}
      <main className={`${withPadding ? 'px-3 py-1' : ''} ${withBottomNavPadding ? 'pb-16' : ''}${currentSermon ? ' pb-32' : ''}`}>
        {children}
      </main>
      {currentSermon && <MiniPlayer />}
      <BottomNavigation />
    </div>
  );
};

export default Layout;
