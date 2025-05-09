
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Radio, Calendar, BookOpenText } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const BottomNavigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    {
      path: '/',
      label: 'Accueil',
      icon: Home,
    },
    {
      path: '/categories',
      label: 'Catégories',
      icon: LayoutGrid,
    },
    {
      path: '/daily-bread',
      label: 'Pain du jour',
      icon: BookOpenText,
    },
    {
      path: '/programme',
      label: 'Programme',
      icon: Calendar,
    },
    {
      path: '/radio',
      label: 'Radio',
      icon: Radio,
    },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-compa-900/90 backdrop-blur-lg border-t border-compa-700/50 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
              isActive(item.path)
                ? 'text-compa-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <item.icon size={18} className="mb-1" />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
