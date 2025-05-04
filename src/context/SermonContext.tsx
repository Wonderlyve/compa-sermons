
import React, { createContext, useContext, useState } from 'react';
import { Sermon } from '@/data/sermons';

type SermonContextType = {
  currentSermon: Sermon | null;
  isPlaying: boolean;
  setCurrentSermon: (sermon: Sermon | null) => void;
  togglePlay: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  favorites: string[];
  toggleFavorite: (sermonId: string) => void;
  isFavorite: (sermonId: string) => boolean;
};

const SermonContext = createContext<SermonContextType | undefined>(undefined);

export const useSermon = () => {
  const context = useContext(SermonContext);
  if (context === undefined) {
    throw new Error('useSermon must be used within a SermonProvider');
  }
  return context;
};

export const SermonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSermon, setCurrentSermon] = useState<Sermon | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem('compa_favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFavorite = (sermonId: string) => {
    const newFavorites = favorites.includes(sermonId)
      ? favorites.filter(id => id !== sermonId)
      : [...favorites, sermonId];
    
    setFavorites(newFavorites);
    localStorage.setItem('compa_favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (sermonId: string): boolean => {
    return favorites.includes(sermonId);
  };

  return (
    <SermonContext.Provider 
      value={{ 
        currentSermon, 
        setCurrentSermon, 
        isPlaying, 
        togglePlay, 
        setIsPlaying,
        favorites,
        toggleFavorite,
        isFavorite
      }}
    >
      {children}
    </SermonContext.Provider>
  );
};
