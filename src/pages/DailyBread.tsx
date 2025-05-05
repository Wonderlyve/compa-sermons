
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Calendar, BookOpenText, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

// Sample daily readings
const dailyReadings = [
  {
    id: 1,
    date: "Aujourd'hui",
    title: "Jean 3:16-21",
    subtitle: "L'amour de Dieu pour le monde",
    completed: true,
  },
  {
    id: 2,
    date: "Demain",
    title: "Psaumes 23",
    subtitle: "L'Éternel est mon berger",
    completed: false,
  },
  {
    id: 3,
    date: "12 Mai",
    title: "Romains 8:28-39",
    subtitle: "Rien ne peut nous séparer de l'amour de Dieu",
    completed: false,
  },
  {
    id: 4,
    date: "13 Mai",
    title: "1 Corinthiens 13",
    subtitle: "L'amour ne périt jamais",
    completed: false,
  },
  {
    id: 5,
    date: "14 Mai",
    title: "Éphésiens 6:10-20",
    subtitle: "L'armure de Dieu",
    completed: false,
  },
];

// Sample featured verse
const featuredVerse = {
  text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
  reference: "Jean 3:16",
  imageUrl: "https://images.unsplash.com/photo-1581123923047-478a204a1boofa?q=80&w=1170&auto=format&fit=crop"
};

const DailyBread = () => {
  return (
    <Layout withHeader={false}>
      {/* Custom Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-white">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Pain du jour</h1>
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

      {/* Featured Verse Card */}
      <Card className="relative overflow-hidden mb-6 border-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-purple-900/90">
          <img 
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1170&auto=format&fit=crop" 
            alt="Bible background" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <CardContent className="relative z-10 p-6">
          <div className="text-white">
            <h3 className="text-sm font-medium mb-2">VERSET DU JOUR</h3>
            <p className="text-lg font-medium italic mb-3">
              "{featuredVerse.text}"
            </p>
            <p className="text-sm text-gray-200 font-semibold">
              {featuredVerse.reference}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reading Plan */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Plan de lecture</h2>
          <button className="text-purple-400 flex items-center text-sm">
            Voir tout <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="space-y-3">
          {dailyReadings.map((reading) => (
            <div 
              key={reading.id}
              className="flex items-center justify-between p-4 bg-compa-700/50 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  reading.completed ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'
                }`}>
                  {reading.completed ? '✓' : <BookOpenText size={18} />}
                </div>
                <div>
                  <p className="text-sm text-gray-400">{reading.date}</p>
                  <h4 className="text-white font-medium">{reading.title}</h4>
                  <p className="text-sm text-gray-400">{reading.subtitle}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Completion Stats */}
      <div className="bg-compa-700/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-medium">Progression</h3>
          <div className="flex items-center gap-1 text-sm text-purple-400">
            <Calendar size={16} />
            <span>Mai 2025</span>
          </div>
        </div>
        
        <div className="w-full bg-compa-600 rounded-full h-2 mb-2">
          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">1/5 jours</span>
          <span className="text-gray-400">20%</span>
        </div>
      </div>
    </Layout>
  );
};

export default DailyBread;
