
import React from 'react';
import Layout from '@/components/Layout';
import SermonCarousel from '@/components/SermonCarousel';
import { featuredSermons, recentSermons } from '@/data/sermons';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SermonList from '@/components/SermonList';

const Home = () => {
  return (
    <Layout>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input 
          placeholder="Search" 
          className="pl-10 bg-compa-700 border-compa-600 text-gray-300 placeholder:text-gray-400"
        />
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Carousel</h2>
        <SermonCarousel 
          sermons={featuredSermons}
          featured={true}
        />
      </section>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-white">Prédications</h2>
          <Link to="/sermons">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              Voir tout
            </Button>
          </Link>
        </div>
        <SermonList sermons={recentSermons} />
      </section>
    </Layout>
  );
};

export default Home;
