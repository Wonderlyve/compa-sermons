
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
          // Removing the coverImage prop as it doesn't exist in RadioPlayerProps
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
