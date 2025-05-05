
import React from 'react';
import Layout from '@/components/Layout';
import SermonList from '@/components/SermonList';
import { getSermonById } from '@/data/sermons';
import { useSermon } from '@/context/SermonContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Favorites = () => {
  const { favorites } = useSermon();
  
  // Get sermon objects for all favorite IDs
  const favoriteSermons = favorites
    .map(id => getSermonById(id))
    .filter(sermon => sermon !== undefined);
    
  return (
    <Layout withHeader={false}>
      {/* Custom Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-white">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Mes favoris</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-6 h-6 bg-compa-700 rounded-full flex items-center justify-center">
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </div>
          </div>
          <Link to="/profile">
            <Avatar className="h-8 w-8 border border-compa-600">
              <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&dpr=2&q=80" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
      
      <div>
        {favoriteSermons.length > 0 ? (
          <SermonList sermons={favoriteSermons} />
        ) : (
          <div className="glass-card rounded-xl p-8 text-center">
            <h3 className="text-xl font-medium text-white mb-2">Aucun favori</h3>
            <p className="text-gray-400">
              Vous n'avez pas encore de prédications dans vos favoris. 
              Ajoutez-en en cliquant sur l'icône de cœur.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
