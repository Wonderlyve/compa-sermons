
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import SermonCard from '@/components/SermonCard';
import { categories } from '@/data/categories';
import { getSermonsByCategory } from '@/data/sermons';

const CategoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const category = categories.find(cat => cat.id === id);
  const sermons = getSermonsByCategory(id || '');
  
  if (!category) {
    return (
      <Layout title="Catégorie" showBackButton={true}>
        <div className="h-full flex flex-col items-center justify-center py-8">
          <h2 className="text-lg font-semibold text-white mb-2">Catégorie non trouvée</h2>
          <p className="text-sm text-gray-400">La catégorie que vous recherchez n'existe pas.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title={category.name} showBackButton={true}>
      <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
        <img 
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-compa-900/90" />
        <div className="absolute bottom-0 left-0 p-3">
          <p className="text-sm text-gray-300">{category.count} sermons</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {sermons.map(sermon => (
          <SermonCard
            key={sermon.id}
            id={sermon.id}
            title={sermon.title}
            preacher={sermon.preacher}
            imageUrl={sermon.imageUrl}
          />
        ))}
      </div>
    </Layout>
  );
};

export default CategoryDetail;
