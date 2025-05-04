
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
  { name: "Changement de Mentalité", slug: "mentalite" },
  { name: "Développement", slug: "developpement" },
  // Add more categories as needed
];

const Home = () => {
  return (
    <Layout>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input 
          placeholder="Rechercher un sermon..." 
          className="pl-10 bg-compa-700 border-compa-600 text-gray-300 placeholder:text-gray-400"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto mb-6 no-scrollbar">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/categories/${category.slug}`}
            className="bg-compa-700 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap"
          >
            {category.name}
          </Link>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">À découvrir</h2>
        <SermonCarousel 
          sermons={featuredSermons}
        />
      </section>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-white">Sermons récents</h2>
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
