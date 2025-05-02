
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  id: string;
  name: string;
  imageUrl: string;
  count: number;
  className?: string;
}

const CategoryCard = ({ id, name, imageUrl, count, className }: CategoryCardProps) => {
  return (
    <Link 
      to={`/categories/${id}`} 
      className={cn(
        "group relative flex flex-col overflow-hidden glass-card rounded-xl aspect-[3/2]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-compa-900/60 to-compa-900/90 z-10" />
      
      <img 
        src={imageUrl}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      <div className="flex flex-col justify-end p-4 z-20 h-full">
        <h3 className="font-semibold text-lg text-white group-hover:text-compa-400 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-gray-300 mt-1">
          {count} sermons
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
