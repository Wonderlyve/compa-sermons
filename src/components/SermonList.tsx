
import React from 'react';
import { Sermon } from '@/data/sermons';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

interface SermonListProps {
  sermons: Sermon[];
}

const SermonList = ({ sermons }: SermonListProps) => {
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
            <div className="w-2/3 h-1.5 bg-compa-600 rounded-full mt-2"></div>
          </div>
          <div className="w-12 h-12 bg-compa-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Play size={20} className="text-white ml-1" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SermonList;
