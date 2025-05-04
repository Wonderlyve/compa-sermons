
import React from 'react';
import Layout from '@/components/Layout';
import RadioPlayer from '@/components/RadioPlayer';
import SermonCarousel from '@/components/SermonCarousel';
import { recentRadioSermons } from '@/data/sermons';

const Radio = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold text-white mb-6">Radio en direct</h1>
      
      <div className="mb-8">
        <RadioPlayer 
          streamUrl="https://stream.radio.co/s5c5da6a36/listen"
          title="Compa Radio"
          subtitle="Prédications et musique chrétienne"
          coverImage="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800"
        />
      </div>
      
      <div className="mt-10">
        <SermonCarousel
          title="Récemment diffusé"
          sermons={recentRadioSermons}
        />
      </div>
    </Layout>
  );
};

export default Radio;
