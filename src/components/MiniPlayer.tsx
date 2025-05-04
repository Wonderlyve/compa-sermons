
import React, { useEffect, useRef } from 'react';
import { useSermon } from '@/context/SermonContext';
import { Play, Pause } from 'lucide-react';

const MiniPlayer: React.FC = () => {
  const { currentSermon, isPlaying, togglePlay } = useSermon();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current || !currentSermon?.audioUrl) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(err => console.error("Error playing audio:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSermon]);

  if (!currentSermon) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 bg-compa-900/95 backdrop-blur-md border-t border-compa-700/50 p-3">
      <div className="flex items-center">
        {currentSermon.imageUrl && (
          <img
            src={currentSermon.imageUrl}
            alt={currentSermon.title}
            className="w-10 h-10 rounded-md object-cover mr-3"
          />
        )}
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-white truncate">{currentSermon.title}</h4>
          <p className="text-xs text-gray-400 truncate">{currentSermon.preacher}</p>
        </div>
        
        <button
          onClick={togglePlay}
          className="w-10 h-10 bg-compa-500 rounded-full flex items-center justify-center ml-3 flex-shrink-0"
        >
          {isPlaying ? (
            <Pause size={18} className="text-white" />
          ) : (
            <Play size={18} className="text-white ml-0.5" />
          )}
        </button>
      </div>
      <audio 
        ref={audioRef} 
        src={currentSermon.audioUrl} 
        onEnded={() => togglePlay()} 
      />
    </div>
  );
};

export default MiniPlayer;
