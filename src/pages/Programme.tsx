
import React from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock } from 'lucide-react';

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
};

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Veillée de prière',
    date: '25 Mai 2025',
    time: '19:00 - 22:00',
    location: 'Grande Salle',
    description: 'Rejoignez-nous pour une soirée de prière et d\'adoration collective.',
    imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4abd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'Séminaire Famille',
    date: '2 Juin 2025',
    time: '10:00 - 16:00',
    location: 'Salle de conférence',
    description: 'Un séminaire sur comment construire une famille équilibrée selon les principes bibliques.',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    title: 'Conférence Jeunesse',
    date: '15 Juin 2025',
    time: '14:00 - 18:00',
    location: 'Auditorium',
    description: 'Pour tous les jeunes de 15 à 25 ans, venez découvrir comment vivre pleinement votre foi.',
    imageUrl: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
];

const recentEvents: Event[] = [
  {
    id: '4',
    title: 'Rencontre des femmes',
    date: '10 Mai 2025',
    time: '16:00 - 18:00',
    location: 'Salle polyvalente',
    description: 'Un moment de partage et d\'encouragement entre femmes.',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    id: '5',
    title: 'Formation des leaders',
    date: '5 Mai 2025',
    time: '09:00 - 17:00',
    location: 'Centre de formation',
    description: 'Une journée dédiée au développement des compétences de leadership.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
];

const Programme = () => {
  return (
    <Layout title="Programme" showBackButton={true} withHeader={true}>
      <div className="mb-4">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
            <TabsTrigger value="past">Passés</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-3">
            <div className="overflow-hidden">
              <div className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar snap-x snap-mandatory">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="flex-shrink-0 w-[85%] snap-center"
                  >
                    <div className="glass-card rounded-xl overflow-hidden">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-full h-36 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-semibold text-white text-base">{event.title}</h3>
                        <div className="flex items-center text-gray-400 mt-2">
                          <Calendar size={14} className="mr-1" />
                          <span className="text-xs">{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-400 mt-1">
                          <Clock size={14} className="mr-1" />
                          <span className="text-xs">{event.time}</span>
                        </div>
                        <p className="mt-2 text-xs text-gray-300 line-clamp-2">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <h2 className="text-base font-semibold text-white mt-6 mb-2">Tous les événements</h2>
            
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.id}
                  className="glass-card rounded-lg p-2 flex gap-3"
                >
                  <div className="w-1/4">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="w-full h-16 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white text-sm">{event.title}</h3>
                    <div className="flex items-center text-gray-400 text-xs mt-1">
                      <Calendar size={12} className="mr-1" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-xs mt-1">
                      <Clock size={12} className="mr-1" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="space-y-3">
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div 
                  key={event.id}
                  className="glass-card rounded-lg p-2 flex gap-3"
                >
                  <div className="w-1/4">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="w-full h-16 object-cover rounded-md opacity-75"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white text-sm">{event.title}</h3>
                    <div className="flex items-center text-gray-400 text-xs mt-1">
                      <Calendar size={12} className="mr-1" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-xs mt-1">
                      <Clock size={12} className="mr-1" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Programme;
