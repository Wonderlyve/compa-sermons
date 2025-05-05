
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

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { favorites } = useSermon();
  
  // Get sermon objects for favorite IDs
  const favoriteSermons = favorites
    .map(id => getSermonById(id))
    .filter(sermon => sermon !== undefined)
    .slice(0, 4); // Limit to 4 for display
  
  return (
    <Layout title="Profil" showBackButton={true}>
      <Card className="bg-compa-700/50 border-compa-600 mb-4">
        <CardHeader className="flex flex-row items-center gap-4 py-3">
          <Avatar className="h-16 w-16 border-2 border-compa-500">
            <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&dpr=2&q=80" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-white text-base">
              {isAuthenticated ? user?.email : 'Utilisateur'}
            </CardTitle>
            <p className="text-xs text-gray-300 mt-1">
              {isAuthenticated ? 'Compte administrateur' : 'Membre'}
            </p>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          {isAuthenticated ? (
            <Button 
              variant="destructive" 
              className="mt-2" 
              size="sm"
              onClick={logout}
            >
              Déconnexion
            </Button>
          ) : (
            <Button variant="default" className="mt-2" size="sm">
              Connexion
            </Button>
          )}
        </CardContent>
      </Card>
      
      <Tabs defaultValue="favorites" className="w-full">
        <TabsList className="w-full grid grid-cols-2 bg-compa-700">
          <TabsTrigger value="favorites">Favoris</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>
        <TabsContent value="favorites" className="mt-4">
          {favoriteSermons.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3">
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
              <Button variant="outline" className="w-full mt-3" size="sm">
                Voir tous les favoris
              </Button>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-gray-400">Vous n'avez pas encore de favoris</p>
              <Button variant="outline" className="mt-3" size="sm">
                Découvrir des prédications
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <div className="text-center py-6">
            <p className="text-sm text-gray-400">Historique d'écoute à venir</p>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Profile;
