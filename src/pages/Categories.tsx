
import React from 'react';
import Layout from '@/components/Layout';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/data/categories';

const Categories = () => {
  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white">Catégories</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            imageUrl={category.imageUrl}
            count={category.count}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
