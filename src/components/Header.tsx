
import React from 'react';
import { Bell, UserRound, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/context/AuthContext';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="flex justify-between items-center pt-3 pb-3">
      <div>
        <h1 className="text-4xl font-bold text-white">Compa</h1>
      </div>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Bell className="text-white h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>
        <Link to="/profile">
          <Avatar className="h-9 w-9 border border-compa-600">
            <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&dpr=2&q=80" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </Link>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-4">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="space-y-4">
              <Link 
                to="/profile" 
                className="block py-2 px-3 hover:bg-compa-700 rounded-md transition-colors"
              >
                Mon Profil
              </Link>
              <Link 
                to="/favorites" 
                className="block py-2 px-3 hover:bg-compa-700 rounded-md transition-colors"
              >
                Mes Favoris
              </Link>
              <Link 
                to="/settings" 
                className="block py-2 px-3 hover:bg-compa-700 rounded-md transition-colors"
              >
                Réglages
              </Link>
              {user?.isAdmin && (
                <Link 
                  to="/dashboard" 
                  className="block py-2 px-3 hover:bg-compa-700 rounded-md transition-colors"
                >
                  Dashboard Admin
                </Link>
              )}
              {!isAuthenticated ? (
                <Link 
                  to="/login" 
                  className="block py-2 px-3 hover:bg-compa-700 rounded-md transition-colors"
                >
                  Connexion Admin
                </Link>
              ) : (
                <Button 
                  variant="ghost" 
                  onClick={logout} 
                  className="w-full justify-start px-3"
                >
                  Déconnexion
                </Button>
              )}
              <hr className="border-compa-700" />
              <Link 
                to="/categories" 
                className="block py-2 px-3 hover:bg-compa-700 rounded-md transition-colors"
              >
                Toutes les Catégories
              </Link>
              <Link 
                to="/programme" 
                className="block py-2 px-3 hover:bg-compa-700 rounded-md transition-colors"
              >
                Programme
              </Link>
              <Link 
                to="/radio" 
                className="block py-2 px-3 hover:bg-compa-700 rounded-md transition-colors"
              >
                Radio en direct
              </Link>
              <Link 
                to="/daily-bread" 
                className="block py-2 px-3 hover:bg-compa-700 rounded-md transition-colors"
              >
                Pain du Jour
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Header;
