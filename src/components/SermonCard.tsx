
import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SermonCardProps {
  id: string;
  title: string;
  preacher: string;
  imageUrl: string;
  featured?: boolean;
  category?: string;
  className?: string;
}

const SermonCard = ({ 
  id, 
  title, 
  preacher, 
  imageUrl, 
  featured = false,
  category,
  className 
}: SermonCardProps) => {
  return (
    <Link 
      to={`/sermon/${id}`} 
      className={cn(
        "group relative flex flex-col overflow-hidden glass-card rounded-xl",
        featured ? "aspect-[4/3]" : "aspect-square",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-compa-800/20 to-compa-900/90 z-10" />
      
      <img 
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      {category && (
        <span className="absolute top-3 left-3 z-20 px-2 py-1 bg-compa-500/90 text-white text-xs font-medium rounded-full">
          {category}
        </span>
      )}
      
      <button 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-compa-500/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={(e) => {
          e.preventDefault();
          // Play functionality will be added later
        }}
      >
        <Play size={20} className="text-white ml-1" />
      </button>
      
      <div className="mt-auto p-4 z-20">
        <h3 className="font-medium text-white line-clamp-2 group-hover:text-compa-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-300 mt-1">
          {preacher}
        </p>
      </div>
    </Link>
  );
};

export default SermonCard;
