
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface RadioPlayerProps {
  streamUrl: string;
  title: string;
  imageUrl: string;
}

const RadioPlayer = ({ streamUrl, title, imageUrl }: RadioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    
    if (!audio) return;
    
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
    
    // Set volume
    audio.volume = isMuted ? 0 : volume;
    
    return () => {
      audio.pause();
    };
  }, [isPlaying, isMuted, volume]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className="relative overflow-hidden glass-card rounded-xl p-6">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="mb-6 md:mb-0 md:mr-8 md:flex-shrink-0">
          <div className="relative w-full max-w-xs mx-auto md:mx-0 aspect-square rounded-lg overflow-hidden">
            <img 
              src={imageUrl}
              alt={title}
              className={`w-full h-full object-cover ${isPlaying ? 'animate-pulse' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-compa-900/80" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="w-16 h-16 bg-compa-500/90 rounded-full flex items-center justify-center z-10"
              >
                {isPlaying ? (
                  <Pause size={28} className="text-white" />
                ) : (
                  <Play size={28} className="text-white ml-1" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
            <p className="text-gray-300">
              Écoutez notre radio en direct
            </p>
          </div>
          
          <div className="flex items-center mb-6">
            <button
              onClick={toggleMute}
              className="text-gray-400 hover:text-white mr-3"
            >
              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #9B87F5 0%, #9B87F5 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
              }}
            />
          </div>
          
          <div>
            <p className={`text-sm ${isPlaying ? 'text-compa-400' : 'text-gray-400'} flex items-center`}>
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isPlaying ? 'bg-compa-400 animate-pulse' : 'bg-gray-400'}`}></span>
              {isPlaying ? 'En direct' : 'Hors ligne'}
            </p>
          </div>
        </div>
      </div>
      
      <audio ref={audioRef} src={streamUrl} />
    </div>
  );
};

export default RadioPlayer;
