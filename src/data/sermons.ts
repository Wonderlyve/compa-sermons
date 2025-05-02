
// Mock sermon data
export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  imageUrl: string;
  audioUrl?: string;
  description?: string;
  category?: string;
  categoryId?: string;
  date?: string;
}

export const allSermons: Sermon[] = [
  {
    id: "1",
    title: "L'Amour inconditionnel de Dieu",
    preacher: "Pasteur Thomas Dubois",
    imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://sample-videos.com/audio/mp3/crowd-cheering.mp3",
    description: "Une prédication profonde sur l'amour que Dieu nous porte sans condition.",
    category: "Amour",
    categoryId: "amour",
    date: "2023-09-15"
  },
  {
    id: "2",
    title: "Vivre dans la Sainteté",
    preacher: "Évangéliste Marie Laurent",
    imageUrl: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://sample-videos.com/audio/mp3/wave.mp3",
    description: "Comment vivre une vie de sainteté dans un monde qui nous pousse à faire le contraire.",
    category: "Sainteté",
    categoryId: "saintete",
    date: "2023-08-22"
  },
  {
    id: "3",
    title: "Équilibre spirituel et vie quotidienne",
    preacher: "Dr. Jean Martin",
    imageUrl: "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://sample-videos.com/audio/mp3/sample-file-1.mp3",
    description: "Trouver l'équilibre entre notre vie spirituelle et nos responsabilités quotidiennes.",
    category: "Équilibre",
    categoryId: "equilibre",
    date: "2023-10-01"
  },
  {
    id: "4",
    title: "La Puissance de la Prière",
    preacher: "Pasteur Paul Renaud",
    imageUrl: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://sample-videos.com/audio/mp3/sample-file-2.mp3",
    description: "Découvrez comment la prière peut transformer votre vie et votre relation avec Dieu.",
    category: "Puissance",
    categoryId: "puissance",
    date: "2023-09-05"
  },
  {
    id: "5",
    title: "Développer votre potentiel",
    preacher: "Pasteur Marc Fournier",
    imageUrl: "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://sample-videos.com/audio/mp3/sample-file-3.mp3",
    description: "Comment découvrir et développer les talents que Dieu vous a donnés.",
    category: "Développement",
    categoryId: "developpement",
    date: "2023-08-12"
  },
  {
    id: "6",
    title: "Changer sa mentalité",
    preacher: "Évangéliste Sophie Blanc",
    imageUrl: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://sample-videos.com/audio/mp3/sample-file-4.mp3",
    description: "Transformez votre vie en renouvelant votre façon de penser.",
    category: "Changement de Mentalité",
    categoryId: "mentalite",
    date: "2023-07-28"
  },
  {
    id: "7",
    title: "L'Amour familial",
    preacher: "Pasteur Thomas Dubois",
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://sample-videos.com/audio/mp3/sample-file-5.mp3",
    description: "L'importance de l'amour dans le contexte familial selon la Bible.",
    category: "Amour",
    categoryId: "amour",
    date: "2023-07-15"
  },
  {
    id: "8",
    title: "Cultiver la Sainteté au quotidien",
    preacher: "Dr. Jean Martin",
    imageUrl: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://sample-videos.com/audio/mp3/dummy-audio.mp3",
    description: "Des conseils pratiques pour vivre dans la sainteté jour après jour.",
    category: "Sainteté",
    categoryId: "saintete",
    date: "2023-06-30"
  },
  {
    id: "9",
    title: "La Puissance de la foi",
    preacher: "Pasteur Paul Renaud",
    imageUrl: "https://images.unsplash.com/photo-1492176273113-2d51f47b23b0?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://sample-videos.com/audio/mp3/sample-15s.mp3",
    description: "Comment la foi peut nous aider à surmonter les obstacles de la vie.",
    category: "Puissance",
    categoryId: "puissance",
    date: "2023-06-05"
  },
  {
    id: "10",
    title: "Développer une mentalité de croissance",
    preacher: "Pasteur Marc Fournier",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://sample-videos.com/audio/mp3/sample-3s.mp3",
    description: "Comment développer une mentalité qui favorise la croissance spirituelle.",
    category: "Développement",
    categoryId: "developpement",
    date: "2023-05-20"
  },
  {
    id: "11",
    title: "Équilibrer travail et famille",
    preacher: "Évangéliste Sophie Blanc",
    imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://sample-videos.com/audio/mp3/sample-9s.mp3",
    description: "Trouver un juste équilibre entre les responsabilités professionnelles et familiales.",
    category: "Équilibre",
    categoryId: "equilibre",
    date: "2023-05-10"
  },
  {
    id: "12",
    title: "Renouveler sa pensée",
    preacher: "Pasteur Thomas Dubois",
    imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=800",
    audioUrl: "https://sample-videos.com/audio/mp3/sample-12s.mp3",
    description: "Comment transformer sa vie en renouvelant sa façon de penser selon la Bible.",
    category: "Changement de Mentalité",
    categoryId: "mentalite",
    date: "2023-04-25"
  }
];

// Featured sermons
export const featuredSermons: Sermon[] = [
  allSermons[0],
  allSermons[3],
  allSermons[5],
  allSermons[8]
];

// Recent sermons
export const recentSermons: Sermon[] = [
  allSermons[0],
  allSermons[1],
  allSermons[2],
  allSermons[3],
  allSermons[4],
  allSermons[5],
];

// Recent radio sermons
export const recentRadioSermons: Sermon[] = [
  allSermons[9],
  allSermons[10],
  allSermons[11],
  allSermons[6],
  allSermons[7],
];

// Get sermons by category
export const getSermonsByCategory = (categoryId: string): Sermon[] => {
  return allSermons.filter(sermon => sermon.categoryId === categoryId);
};

// Get sermon by ID
export const getSermonById = (id: string): Sermon | undefined => {
  return allSermons.find(sermon => sermon.id === id);
};

// Get related sermons (same category but different ID)
export const getRelatedSermons = (id: string): Sermon[] => {
  const sermon = getSermonById(id);
  
  if (!sermon || !sermon.categoryId) {
    return [];
  }
  
  return allSermons
    .filter(s => s.categoryId === sermon.categoryId && s.id !== id)
    .slice(0, 5);
};

export const getAllSermons = (): Sermon[] => {
  return allSermons;
};
