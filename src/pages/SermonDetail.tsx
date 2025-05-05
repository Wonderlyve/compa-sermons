
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import AudioPlayer from '@/components/AudioPlayer';
import SermonCarousel from '@/components/SermonCarousel';
import { ArrowLeft, Share2, Download, Heart, Play } from 'lucide-react';
import { getAllSermons, getSermonById, getRelatedSermons } from '@/data/sermons';
import { useSermon } from '@/context/SermonContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

const SermonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const sermon = getSermonById(id || '');
  const relatedSermons = getRelatedSermons(id || '');
  const { setCurrentSermon, setIsPlaying, toggleFavorite, isFavorite } = useSermon();
  
  useEffect(() => {
    if (sermon) {
      // Update the current sermon but don't autoplay
      setCurrentSermon(sermon);
      setIsPlaying(false);
    }
  }, [id, sermon, setCurrentSermon, setIsPlaying]);
  
  const handleFavoriteClick = () => {
    if (sermon) {
      toggleFavorite(sermon.id);
    }
  };
  
  const handleDownload = () => {
    if (sermon?.audioUrl) {
      const link = document.createElement('a');
      link.href = sermon.audioUrl;
      link.download = `${sermon.title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  const handleShare = () => {
    if (navigator.share && sermon) {
      navigator.share({
        title: sermon.title,
        text: `Écoute "${sermon.title}" par ${sermon.preacher}`,
        url: window.location.href,
      }).catch(err => {
        console.log('Error sharing:', err);
      });
    }
  };
  
  if (!sermon) {
    return (
      <Layout>
        <div className="h-full flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold text-white mb-2">Sermon non trouvé</h2>
          <p className="text-gray-400">Le sermon que vous recherchez n'existe pas.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout withPadding={false}>
      {/* Custom Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-3">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-white">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-semibold text-white">Détail du sermon</h1>
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
      
      {/* Sermon Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={sermon.imageUrl}
          alt={sermon.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-t-3xl p-6">
          {/* Category Tag */}
          {sermon.category && (
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
              {sermon.category}
            </span>
          )}
          
          {/* Sermon Title & Preacher */}
          <h1 className="text-2xl font-bold text-gray-900 mt-3">{sermon.title}</h1>
          <p className="text-gray-700 mt-1">{sermon.preacher}</p>
          
          {/* Additional Info */}
          <div className="flex items-center gap-3 text-gray-500 text-sm mt-3">
            <span>15/04/2023</span>
            <span>•</span>
            <span>28:45</span>
            <span>•</span>
            <span>Jacques 5:16</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            {/* Listen Button */}
            <button 
              className="flex-1 bg-purple-600 text-white py-3 rounded-full flex items-center justify-center gap-2 font-medium"
              onClick={() => sermon && setIsPlaying(true)}
            >
              <Play size={20} className="ml-1" />
              <span>Écouter</span>
            </button>
            
            {/* Share Button */}
            <button 
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
              onClick={handleShare}
            >
              <Share2 size={18} className="text-gray-700" />
            </button>
            
            {/* Download Button */}
            <button 
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
              onClick={handleDownload}
            >
              <Download size={18} className="text-gray-700" />
            </button>
            
            {/* Favorite Button */}
            <button 
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
              onClick={handleFavoriteClick}
            >
              <Heart
                size={18}
                className={cn(
                  "transition-colors duration-200",
                  isFavorite(sermon.id) ? "fill-red-500 text-red-500" : "text-gray-700"
                )}
              />
            </button>
          </div>
          
          {/* Description */}
          {sermon.description && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700">{sermon.description}</p>
            </div>
          )}
          
          {/* Related Sermons */}
          {relatedSermons.length > 0 && (
            <div className="mt-10">
              <SermonCarousel 
                title="Prédications similaires" 
                sermons={relatedSermons} 
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SermonDetail;
