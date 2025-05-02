
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-6">Page non trouvée</p>
        <p className="text-gray-400 mb-8">La page que vous recherchez n'existe pas.</p>
        <Link 
          to="/" 
          className="px-5 py-2.5 bg-compa-500 hover:bg-compa-600 text-white rounded-lg transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
