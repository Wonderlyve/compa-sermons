
import React from 'react';
import Layout from '@/components/Layout';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/data/categories';

const Categories = () => {
  return (
    <Layout title="Catégories" showBackButton={true} withHeader={true}>
      <div className="grid grid-cols-2 gap-3 mt-1">
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
