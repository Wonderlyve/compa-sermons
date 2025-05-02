
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import AudioPlayer from '@/components/AudioPlayer';
import SermonCarousel from '@/components/SermonCarousel';
import { ArrowLeft } from 'lucide-react';
import { getAllSermons, getSermonById, getRelatedSermons } from '@/data/sermons';

const SermonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const sermon = getSermonById(id || '');
  const relatedSermons = getRelatedSermons(id || '');
  
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
    <Layout>
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-compa-400 mb-6"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Retour</span>
        </Link>
        
        <div className="relative h-56 mb-6 rounded-xl overflow-hidden">
          <img 
            src={sermon.imageUrl}
            alt={sermon.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-compa-900" />
          
          {sermon.category && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-compa-500/90 text-white text-xs font-medium rounded-full">
              {sermon.category}
            </span>
          )}
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2">{sermon.title}</h1>
        <p className="text-gray-300 mb-6">{sermon.preacher}</p>
        
        <AudioPlayer 
          src={sermon.audioUrl || ''}
          title={sermon.title}
          preacher={sermon.preacher}
          imageUrl={sermon.imageUrl}
        />
        
        {sermon.description && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-white mb-3">Description</h3>
            <p className="text-gray-300">{sermon.description}</p>
          </div>
        )}
        
        {relatedSermons.length > 0 && (
          <div className="mt-10">
            <SermonCarousel 
              title="Prédications similaires" 
              sermons={relatedSermons} 
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SermonDetail;
