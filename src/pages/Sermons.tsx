
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SermonList from '@/components/SermonList';
import { getAllSermons } from '@/data/sermons';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Sermons = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const allSermons = getAllSermons();
  
  const filteredSermons = allSermons.filter(sermon => 
    sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (sermon.description && sermon.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (sermon.category && sermon.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">Toutes les prédications</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input 
            placeholder="Rechercher..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-compa-700 border-compa-600 text-gray-300 placeholder:text-gray-400"
          />
        </div>
        
        {filteredSermons.length > 0 ? (
          <SermonList sermons={filteredSermons} />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">Aucun sermon ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Sermons;
