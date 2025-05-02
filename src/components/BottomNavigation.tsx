
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Radio, List } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    {
      name: "Accueil",
      path: "/",
      icon: Home,
    },
    {
      name: "Catégories",
      path: "/categories",
      icon: List,
    },
    {
      name: "Radio",
      path: "/radio",
      icon: Radio,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-compa-900/90 backdrop-blur-lg border-t border-compa-700/30">
      <div className="flex items-center justify-around p-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center py-1 px-5 transition-all duration-200",
              path === item.path 
                ? "text-compa-400"
                : "text-gray-400 hover:text-compa-400/70"
            )}
          >
            <item.icon size={22} className={cn(
              "mb-1 transition-all",
              path === item.path ? "text-compa-400" : "text-gray-400"
            )} />
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
