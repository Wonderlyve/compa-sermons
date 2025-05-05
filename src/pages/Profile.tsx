
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useSermon } from '@/context/SermonContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getSermonById } from '@/data/sermons';
import SermonCard from '@/components/SermonCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { favorites } = useSermon();
  
  // Get sermon objects for favorite IDs
  const favoriteSermons = favorites
    .map(id => getSermonById(id))
    .filter(sermon => sermon !== undefined)
    .slice(0, 4); // Limit to 4 for display
  
  return (
    <Layout>
      <div className="flex items-center gap-2 mb-6">
        <Link to="/" className="text-gray-400">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-white">Profil</h1>
      </div>
      
      <Card className="bg-compa-700/50 border-compa-600 mb-6">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-compa-500">
            <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&dpr=2&q=80" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-white text-xl">
              {isAuthenticated ? user?.email : 'Utilisateur'}
            </CardTitle>
            <p className="text-gray-300 mt-1">
              {isAuthenticated ? 'Compte administrateur' : 'Membre'}
            </p>
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          {isAuthenticated ? (
            <Button 
              variant="destructive" 
              className="mt-4" 
              onClick={logout}
            >
              Déconnexion
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="default" className="mt-4">
                Connexion
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
      
      <Tabs defaultValue="favorites" className="w-full">
        <TabsList className="w-full grid grid-cols-2 bg-compa-700">
          <TabsTrigger value="favorites">Favoris</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>
        <TabsContent value="favorites" className="mt-6">
          {favoriteSermons.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                {favoriteSermons.map(sermon => (
                  <SermonCard
                    key={sermon.id}
                    id={sermon.id}
                    title={sermon.title}
                    preacher={sermon.preacher}
                    imageUrl={sermon.imageUrl}
                  />
                ))}
              </div>
              <Link to="/favorites" className="block mt-4 text-center">
                <Button variant="outline" className="w-full">
                  Voir tous les favoris
                </Button>
              </Link>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">Vous n'avez pas encore de favoris</p>
              <Link to="/">
                <Button variant="outline" className="mt-4">
                  Découvrir des prédications
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <div className="text-center py-8">
            <p className="text-gray-400">Historique d'écoute à venir</p>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Profile;
