
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Bookmark, BookmarkCheck } from 'lucide-react';

// Mock data for a single bible study
const getStudyById = (id: string) => {
  const studies = {
    "study-1": {
      id: "study-1",
      title: "La foi qui déplace les montagnes",
      verse: "Matthieu 17:20",
      verseText: "Il leur dit: À cause de votre incrédulité. Je vous le dis en vérité, si vous aviez de la foi comme un grain de sénevé, vous diriez à cette montagne: Transporte-toi d'ici là, et elle se transporterait; rien ne vous serait impossible.",
      date: "5 mai 2025",
      description: "Découvrez comment la foi peut transformer votre vie quotidienne.",
      imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=800",
      content: `
        <h2>La puissance de la foi</h2>
        <p>Dans ce passage, Jésus nous rappelle l'incroyable puissance de la foi. Même une foi de la taille d'une graine de moutarde peut déplacer des montagnes. Ce n'est pas la quantité de foi qui compte, mais sa qualité et le fait qu'elle soit placée en Dieu.</p>
        
        <h2>Application pratique</h2>
        <p>Comment pouvons-nous appliquer ce principe dans notre vie quotidienne ? Voici quelques suggestions :</p>
        <ul>
          <li>Commencez chaque jour en mettant votre confiance en Dieu</li>
          <li>Identifiez les "montagnes" dans votre vie qui semblent insurmontables</li>
          <li>Priez spécifiquement pour ces défis</li>
          <li>Agissez avec assurance, sachant que Dieu est avec vous</li>
        </ul>
        
        <h2>Réflexion</h2>
        <p>Y a-t-il des domaines de votre vie où vous avez besoin d'exercer plus de foi ? Prenez un moment pour les identifier et les confier à Dieu.</p>
      `
    },
    "study-2": {
      id: "study-2",
      title: "L'amour inconditionnel",
      verse: "1 Corinthiens 13:4-7",
      verseText: "L'amour est patient, il est plein de bonté; l'amour n'est point envieux; l'amour ne se vante point, il ne s'enfle point d'orgueil, il ne fait rien de malhonnête, il ne cherche point son intérêt, il ne s'irrite point, il ne soupçonne point le mal, il ne se réjouit point de l'injustice, mais il se réjouit de la vérité; il excuse tout, il croit tout, il espère tout, il supporte tout.",
      date: "4 mai 2025",
      description: "Une étude sur la nature de l'amour chrétien.",
      imageUrl: "https://images.unsplash.com/photo-1518826778770-a9a28dac0769?auto=format&fit=crop&q=80&w=800",
      content: `
        <h2>Les caractéristiques de l'amour</h2>
        <p>Ce passage est l'une des descriptions les plus belles et complètes de l'amour véritable dans la Bible. Paul nous montre que l'amour n'est pas seulement un sentiment, mais se manifeste par des actions et des attitudes spécifiques.</p>
        
        <h2>Application pratique</h2>
        <p>Comment pouvons-nous vivre cet amour au quotidien ? Voici quelques suggestions :</p>
        <ul>
          <li>Pratiquer la patience avec ceux qui nous entourent</li>
          <li>Choisir la bonté même envers ceux qui nous ont blessés</li>
          <li>Rejeter l'envie et célébrer les succès des autres</li>
          <li>Cultiver l'humilité dans nos relations</li>
        </ul>
        
        <h2>Réflexion</h2>
        <p>Parmi les qualités de l'amour mentionnées dans ce passage, laquelle trouvez-vous la plus difficile à mettre en pratique ? Demandez à Dieu de vous aider à grandir dans ce domaine.</p>
      `
    }
  };

  return studies[id as keyof typeof studies];
};

const StudyDetail = () => {
  const { id } = useParams<{id: string}>();
  const [isSaved, setIsSaved] = React.useState(false);
  
  const study = getStudyById(id || '');
  
  if (!study) {
    return (
      <Layout title="Étude biblique" showBackButton={true}>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h2 className="text-lg text-white font-semibold">Étude non trouvée</h2>
          <p className="text-gray-400 text-sm mt-1">Cette étude biblique n'existe pas</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title="Étude biblique" showBackButton={true}>
      <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
        <img 
          src={study.imageUrl} 
          alt={study.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-compa-900/90" />
        <div className="absolute bottom-0 left-0 p-4">
          <p className="text-xs text-compa-300">{study.date}</p>
          <h1 className="text-xl font-bold text-white">{study.title}</h1>
          <p className="text-sm text-compa-200 mt-1">{study.verse}</p>
        </div>
      </div>
      
      <Card className="glass-card mb-4">
        <CardContent className="p-4">
          <blockquote className="border-l-2 border-compa-500 pl-3 italic text-sm text-gray-300">
            "{study.verseText}"
          </blockquote>
        </CardContent>
      </Card>
      
      <div className="mb-3 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => setIsSaved(!isSaved)}
        >
          {isSaved ? (
            <>
              <BookmarkCheck size={16} className="mr-1 text-compa-400" /> Sauvegardé
            </>
          ) : (
            <>
              <Bookmark size={16} className="mr-1" /> Sauvegarder
            </>
          )}
        </Button>
        
        <Button variant="outline" size="sm" className="flex-1">
          <Share2 size={16} className="mr-1" /> Partager
        </Button>
      </div>
      
      <div className="pb-8 prose prose-sm prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: study.content }} />
      </div>
    </Layout>
  );
};

export default StudyDetail;
