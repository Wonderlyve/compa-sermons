
import React from 'react';
import Layout from '@/components/Layout';
import SermonCarousel from '@/components/SermonCarousel';
import { featuredSermons, recentSermons } from '@/data/sermons';

const Home = () => {
  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-gradient text-3xl font-bold">Compa</h1>
        <p className="text-gray-400 text-sm">Prédications audio chrétiennes</p>
      </header>

      <section className="mb-10">
        <SermonCarousel 
          title="Prédications à la une" 
          sermons={featuredSermons}
          featured={true}
        />
      </section>

      <section className="mb-10">
        <SermonCarousel 
          title="Ajoutés récemment" 
          sermons={recentSermons} 
        />
      </section>
    </Layout>
  );
};

export default Home;
