
import React from 'react';
import Layout from '@/components/Layout';
import RadioPlayer from '@/components/RadioPlayer';
import SermonCarousel from '@/components/SermonCarousel';
import { recentRadioSermons } from '@/data/sermons';

const Radio = () => {
  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white">Radio</h1>
      </header>
      
      <RadioPlayer 
        streamUrl="https://example.com/radio-stream.mp3" 
        title="Compa Radio en direct"
        imageUrl="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800"
      />
      
      <div className="mt-10">
        <SermonCarousel 
          title="Récemment diffusés" 
          sermons={recentRadioSermons} 
        />
      </div>
    </Layout>
  );
};

export default Radio;
