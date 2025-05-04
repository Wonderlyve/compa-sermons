
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowLeft, ArrowRight, Share, Download, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSermon } from '@/context/SermonContext';
import { toast } from "@/components/ui/use-toast";

interface AudioPlayerProps {
  src: string;
  title: string;
  preacher: string;
  sermonId: string;
  imageUrl?: string;
  mini?: boolean;
  className?: string;
}

const AudioPlayer = ({ 
  src, 
  title, 
  preacher,
  sermonId,
  imageUrl, 
  mini = false,
  className 
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const { toggleFavorite, isFavorite } = useSermon();

  useEffect(() => {
    const audio = audioRef.current;
    
    if (!audio) return;
    
    const setAudioData = () => {
      setDuration(audio.duration);
    };
    
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };
    
    // Events
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    
    // Cleanup
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []);

  // Play/Pause toggle
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Format time to mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  // Handle progress bar click
  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current) return;
    
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  // Skip forward/backward
  const handleSkip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = audioRef.current.currentTime + seconds;
    }
  };

  // Share sermon
  const handleShare = async () => {
    const shareData = {
      title: `Compa - ${title}`,
      text: `Écoute "${title}" par ${preacher} sur Compa`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Lien copié",
          description: "Le lien a été copié dans le presse-papiers."
        });
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  // Download sermon
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${title} - ${preacher}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Téléchargement démarré",
      description: "Le sermon commence à se télécharger."
    });
  };

  if (mini) {
    return (
      <div className={cn("fixed bottom-16 left-0 right-0 z-40 bg-compa-900/95 backdrop-blur-md border-t border-compa-700/50 p-3", className)}>
        <div className="flex items-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-10 h-10 rounded-md object-cover mr-3"
            />
          )}
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-white truncate">{title}</h4>
            <p className="text-xs text-gray-400 truncate">{preacher}</p>
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
        <audio ref={audioRef} src={src} />
      </div>
    );
  }

  return (
    <div className={cn("glass-card rounded-xl p-4", className)}>
      <div className="flex items-center mb-4">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-16 h-16 rounded-lg object-cover mr-4"
          />
        )}
        
        <div className="flex-1">
          <h3 className="font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-300">{preacher}</p>
        </div>

        <button
          onClick={() => toggleFavorite(sermonId)}
          className="w-10 h-10 bg-compa-700/60 rounded-full flex items-center justify-center mr-2"
        >
          <Heart
            size={20}
            className={cn(
              "transition-colors duration-200",
              isFavorite(sermonId) ? "fill-red-500 text-red-500" : "text-white"
            )}
          />
        </button>
      </div>
      
      <div
        ref={progressBarRef}
        className="h-1 bg-gray-700 rounded-full mb-2 cursor-pointer"
        onClick={handleProgressChange}
      >
        <div
          className="h-full bg-compa-500 rounded-full"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-400 mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      
      <div className="flex items-center justify-center space-x-6">
        <button 
          onClick={() => handleSkip(-10)}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>
        
        <button
          onClick={togglePlay}
          className="w-12 h-12 bg-compa-500 rounded-full flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause size={22} className="text-white" />
          ) : (
            <Play size={22} className="text-white ml-0.5" />
          )}
        </button>
        
        <button 
          onClick={() => handleSkip(10)}
          className="text-gray-400 hover:text-white"
        >
          <ArrowRight size={20} />
        </button>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <button
            onClick={handleShare}
            className="text-gray-400 hover:text-white flex items-center"
          >
            <Share size={18} className="mr-1" />
            <span className="text-sm">Partager</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="text-gray-400 hover:text-white flex items-center"
          >
            <Download size={18} className="mr-1" />
            <span className="text-sm">Télécharger</span>
          </button>
        </div>
        
        <button
          onClick={toggleMute}
          className="text-gray-400 hover:text-white"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
      
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default AudioPlayer;
