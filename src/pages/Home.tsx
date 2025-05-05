
import React from 'react';
import Layout from '@/components/Layout';
import SermonCarousel from '@/components/SermonCarousel';
import { featuredSermons, recentSermons } from '@/data/sermons';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SermonList from '@/components/SermonList';
import { Button } from '@/components/ui/button';

const categories = [
  { name: "Amour", slug: "amour" },
  { name: "Sainteté", slug: "saintete" },
  { name: "Équilibre", slug: "equilibre" },
  { name: "Puissance", slug: "puissance" },
  { name: "Développement", slug: "developpement" },
  { name: "Changement de Mentalité", slug: "mentalite" },
];

const Home = () => {
  return (
    <Layout>
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          placeholder="Rechercher un sermon..." 
          className="pl-10 bg-gray-800 border-gray-700 text-gray-300 placeholder:text-gray-400 h-9 text-sm"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto mb-3 no-scrollbar scrollbar-hide pb-1">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/categories/${category.slug}`}
            className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap"
          >
            {category.name}
          </Link>
        ))}
      </div>

      <section className="mb-4">
        <h2 className="text-lg font-semibold text-white mb-2">À découvrir</h2>
        <SermonCarousel 
          sermons={featuredSermons}
          showPlayButton={true}
        />
      </section>

      <section className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-white">Sermons récents</h2>
          <Link to="/sermons">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white text-xs py-0.5 h-auto">
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
