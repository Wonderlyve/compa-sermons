
import React from 'react';
import Layout from '@/components/Layout';
import RadioPlayer from '@/components/RadioPlayer';
import SermonCarousel from '@/components/SermonCarousel';
import { recentRadioSermons } from '@/data/sermons';

const Radio = () => {
  return (
    <Layout title="Radio en direct" showBackButton={true} withHeader={true}>
      <div className="mb-3">
        <RadioPlayer 
          streamUrl="https://stream.radio.co/s5c5da6a36/listen"
          title="Compa Radio"
          imageUrl="/placeholder.svg"
        />
      </div>
      
      <div className="mt-4">
        <SermonCarousel
          title="Récemment diffusé"
          sermons={recentRadioSermons}
        />
      </div>
    </Layout>
  );
};

export default Radio;
