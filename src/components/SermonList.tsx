
import React from 'react';
import { Sermon } from '@/data/sermons';
import { Link } from 'react-router-dom';
import { Play, Heart } from 'lucide-react';
import { useSermon } from '@/context/SermonContext';
import { cn } from '@/lib/utils';

interface SermonListProps {
  sermons: Sermon[];
}

const SermonList = ({ sermons }: SermonListProps) => {
  const { setCurrentSermon, setIsPlaying, toggleFavorite, isFavorite } = useSermon();
  
  const handlePlayClick = (e: React.MouseEvent, sermon: Sermon) => {
    e.preventDefault();
    setCurrentSermon(sermon);
    setIsPlaying(true);
  };

  const handleFavoriteClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    toggleFavorite(id);
  };

  return (
    <div className="space-y-4">
      {sermons.map((sermon) => (
        <Link
          key={sermon.id}
          to={`/sermon/${sermon.id}`}
          className="flex items-center gap-3 p-3 glass-card rounded-lg hover:bg-compa-700/60 transition-colors"
        >
          <div className="relative w-20 h-20 flex-shrink-0">
            <img
              src={sermon.imageUrl}
              alt={sermon.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-white line-clamp-1">{sermon.title}</h3>
            <p className="text-sm text-gray-400">{sermon.preacher}</p>
          </div>
          <button
            onClick={(e) => handleFavoriteClick(e, sermon.id)}
            className="w-8 h-8 bg-compa-700/60 rounded-full flex items-center justify-center mr-2"
          >
            <Heart
              size={16}
              className={cn(
                "transition-colors duration-200",
                isFavorite(sermon.id) ? "fill-red-500 text-red-500" : "text-white"
              )}
            />
          </button>
          <button
            className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0"
            onClick={(e) => handlePlayClick(e, sermon)}
          >
            <Play size={20} className="text-white ml-1" />
          </button>
        </Link>
      ))}
    </div>
  );
};

export default SermonList;
