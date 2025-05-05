
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Moon, Volume2, Globe } from 'lucide-react';

const Settings = () => {
  return (
    <Layout title="Réglages" showBackButton={true}>
      <div className="space-y-4">
        <Card className="bg-compa-700/50 border-compa-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell size={18} /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">Prédications</p>
                <p className="text-xs text-gray-400">Nouvelles prédications</p>
              </div>
              <Switch checked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">Radio</p>
                <p className="text-xs text-gray-400">Émissions spéciales</p>
              </div>
              <Switch checked={false} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">Pain du jour</p>
                <p className="text-xs text-gray-400">Rappels quotidiens</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-compa-700/50 border-compa-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Volume2 size={18} /> Audio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">Qualité audio</p>
                <p className="text-xs text-gray-400">Streaming et téléchargement</p>
              </div>
              <Select defaultValue="high">
                <SelectTrigger className="w-28 bg-compa-700 text-sm h-8">
                  <SelectValue placeholder="Qualité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Basse</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="high">Haute</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">Téléchargement auto</p>
                <p className="text-xs text-gray-400">Favoris uniquement</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-compa-700/50 border-compa-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Moon size={18} /> Apparence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">Mode sombre</p>
                <p className="text-xs text-gray-400">Activer le mode sombre</p>
              </div>
              <Switch checked={true} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-compa-700/50 border-compa-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe size={18} /> Langue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select defaultValue="fr">
              <SelectTrigger className="w-full bg-compa-700 text-sm h-8">
                <SelectValue placeholder="Langue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <div className="pt-2 pb-4">
          <Button variant="outline" className="w-full text-sm" size="sm">
            Supprimer mon compte
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
