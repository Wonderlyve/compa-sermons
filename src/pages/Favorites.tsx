
import React from 'react';
import Layout from '@/components/Layout';
import SermonList from '@/components/SermonList';
import { getSermonById } from '@/data/sermons';
import { useSermon } from '@/context/SermonContext';

const Favorites = () => {
  const { favorites } = useSermon();
  
  // Get sermon objects for all favorite IDs
  const favoriteSermons = favorites
    .map(id => getSermonById(id))
    .filter(sermon => sermon !== undefined);
    
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">Mes favoris</h1>
        
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
