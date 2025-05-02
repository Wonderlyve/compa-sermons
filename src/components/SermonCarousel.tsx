
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SermonCard from './SermonCard';

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  imageUrl: string;
  category?: string;
}

interface SermonCarouselProps {
  title: string;
  sermons: Sermon[];
  featured?: boolean;
}

const SermonCarousel = ({ title, sermons, featured = false }: SermonCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    if (!carouselRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const currentRef = carouselRef.current;
    checkScrollability();
    
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScrollability);
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', checkScrollability);
      }
    };
  }, [sermons]);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const scrollAmount = 300;
    const scrollLeft = carouselRef.current.scrollLeft;
    
    carouselRef.current.scrollTo({
      left: direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="p-1.5 rounded-full bg-compa-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="p-1.5 rounded-full bg-compa-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
      
      <div 
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x"
      >
        {sermons.map((sermon) => (
          <div 
            key={sermon.id} 
            className={`flex-shrink-0 snap-start ${
              featured ? 'w-[85%] sm:w-[45%] md:w-[320px]' : 'w-[160px] sm:w-[180px]'
            }`}
          >
            <SermonCard
              id={sermon.id}
              title={sermon.title}
              preacher={sermon.preacher}
              imageUrl={sermon.imageUrl}
              featured={featured}
              category={sermon.category}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SermonCarousel;
