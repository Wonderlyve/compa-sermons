
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, User, Moon, Sun, Volume2, Languages, Lock, HelpCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <Layout withHeader={false}>
      {/* Custom Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-white">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Réglages</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bell className="text-white h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
          <Link to="/profile">
            <Avatar className="h-8 w-8 border border-compa-600">
              <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&dpr=2&q=80" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {/* Account Section */}
        <div className="bg-compa-700/50 rounded-xl p-4">
          <h3 className="text-white text-lg font-medium mb-4">Compte</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="text-gray-400" size={20} />
                <span className="text-white">Informations personnelles</span>
              </div>
              <ArrowLeft className="text-gray-400 rotate-180" size={18} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="text-gray-400" size={20} />
                <span className="text-white">Notifications</span>
              </div>
              <ArrowLeft className="text-gray-400 rotate-180" size={18} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="text-gray-400" size={20} />
                <span className="text-white">Sécurité</span>
              </div>
              <ArrowLeft className="text-gray-400 rotate-180" size={18} />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-compa-700/50 rounded-xl p-4">
          <h3 className="text-white text-lg font-medium mb-4">Préférences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="text-gray-400" size={20} />
                <span className="text-white">Mode sombre</span>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="text-gray-400" size={20} />
                <span className="text-white">Son</span>
              </div>
              <ArrowLeft className="text-gray-400 rotate-180" size={18} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Languages className="text-gray-400" size={20} />
                <span className="text-white">Langue</span>
              </div>
              <div className="text-gray-400">Français</div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-compa-700/50 rounded-xl p-4">
          <h3 className="text-white text-lg font-medium mb-4">Support</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="text-gray-400" size={20} />
                <span className="text-white">Aide</span>
              </div>
              <ArrowLeft className="text-gray-400 rotate-180" size={18} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">📝</span>
                <span className="text-white">Conditions d'utilisation</span>
              </div>
              <ArrowLeft className="text-gray-400 rotate-180" size={18} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">🔒</span>
                <span className="text-white">Politique de confidentialité</span>
              </div>
              <ArrowLeft className="text-gray-400 rotate-180" size={18} />
            </div>
          </div>
        </div>
        
        {/* App Info */}
        <div className="text-center text-gray-500 text-sm py-4">
          <p>Compa App v1.0.0</p>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
