
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar } from 'lucide-react';

// Mock data for daily bread studies
const dailyStudies = [
  {
    id: "study-1",
    title: "La foi qui déplace les montagnes",
    verse: "Matthieu 17:20",
    date: "5 mai 2025",
    description: "Découvrez comment la foi peut transformer votre vie quotidienne.",
    imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "study-2",
    title: "L'amour inconditionnel",
    verse: "1 Corinthiens 13:4-7",
    date: "4 mai 2025",
    description: "Une étude sur la nature de l'amour chrétien.",
    imageUrl: "https://images.unsplash.com/photo-1518826778770-a9a28dac0769?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "study-3",
    title: "La paix de Dieu",
    verse: "Philippiens 4:7",
    date: "3 mai 2025",
    description: "Comment trouver la paix divine dans un monde agité.",
    imageUrl: "https://images.unsplash.com/photo-1487713991773-ce0192f11ee9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "study-4",
    title: "L'espérance chrétienne",
    verse: "Romains 15:13",
    date: "2 mai 2025",
    description: "Cultiver l'espérance dans les temps difficiles.",
    imageUrl: "https://images.unsplash.com/photo-1485305045456-227b14d8f0bf?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "study-5",
    title: "La patience dans les épreuves",
    verse: "Jacques 1:2-4",
    date: "1 mai 2025",
    description: "Comment grandir spirituellement à travers les difficultés.",
    imageUrl: "https://images.unsplash.com/photo-1543799382-9a97df8de8dc?auto=format&fit=crop&q=80&w=800"
  }
];

const DailyBread = () => {
  const todayStudy = dailyStudies[0];
  
  return (
    <Layout title="Pain du jour" showBackButton={true}>
      <div className="mb-4">
        <Card className="glass-card overflow-hidden">
          <div className="relative h-36">
            <img 
              src={todayStudy.imageUrl} 
              alt={todayStudy.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between bg-gradient-to-b from-compa-900/80 to-transparent">
              <div className="flex items-center text-white gap-1">
                <Calendar size={14} />
                <span className="text-xs">{todayStudy.date}</span>
              </div>
              <div className="bg-compa-500/90 px-2 py-1 rounded-md text-xs text-white">
                Aujourd'hui
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-compa-900 to-transparent p-3">
              <Link to={`/daily-bread/${todayStudy.id}`} className="text-white">
                <h3 className="font-semibold text-sm">{todayStudy.title}</h3>
                <p className="text-xs text-compa-300">{todayStudy.verse}</p>
              </Link>
            </div>
          </div>
          <CardContent className="p-3">
            <p className="text-sm text-gray-300">{todayStudy.description}</p>
            <Link 
              to={`/daily-bread/${todayStudy.id}`} 
              className="mt-2 inline-flex items-center text-compa-400 text-xs"
            >
              <BookOpen size={14} className="mr-1" /> Lire maintenant
            </Link>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-white font-semibold text-sm mb-3">Études précédentes</h3>
      <div className="space-y-3">
        {dailyStudies.slice(1).map(study => (
          <Link key={study.id} to={`/daily-bread/${study.id}`}>
            <Card className="bg-compa-700/50 border-compa-600 overflow-hidden">
              <div className="flex items-center p-2">
                <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
                  <img 
                    src={study.imageUrl} 
                    alt={study.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">{study.date}</p>
                  </div>
                  <h4 className="text-sm font-medium text-white">{study.title}</h4>
                  <p className="text-xs text-compa-300">{study.verse}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default DailyBread;
