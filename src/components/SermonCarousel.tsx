
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Sermon } from "@/data/sermons";
import { Link } from "react-router-dom";
import { Play, Heart } from "lucide-react";
import { useSermon } from "@/context/SermonContext";
import { cn } from "@/lib/utils";

interface SermonCarouselProps {
  sermons: Sermon[];
  title?: string;
  featured?: boolean;
}

export default function SermonCarousel({ 
  sermons, 
  title,
  featured = false 
}: SermonCarouselProps) {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const { setCurrentSermon, setIsPlaying, toggleFavorite, isFavorite } = useSermon();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handlePlayClick = (e: React.MouseEvent, sermon: Sermon) => {
    e.preventDefault();
    setCurrentSermon(sermon);
    setIsPlaying(true);
  };

  const handleFavoriteClick = (e: React.MouseEvent, sermon: Sermon) => {
    e.preventDefault();
    toggleFavorite(sermon.id);
  };

  return (
    <div>
      {title && <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {sermons.map((sermon) => (
            <CarouselItem key={sermon.id}>
              <Link 
                to={`/sermon/${sermon.id}`}
                className="rounded-xl block overflow-hidden relative"
              >
                <div className="flex flex-col">
                  {/* Image Section */}
                  <div className="relative w-full aspect-video">
                    <img
                      src={sermon.imageUrl}
                      alt={sermon.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Text Section */}
                  <div className="bg-white p-4 rounded-b-xl">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">{sermon.title}</h3>
                        <p className="text-gray-700">{sermon.preacher}</p>
                      </div>
                      <button
                        className="ml-2"
                        onClick={(e) => handleFavoriteClick(e, sermon)}
                      >
                        <Heart
                          size={24}
                          className={cn(
                            "transition-colors duration-200",
                            isFavorite(sermon.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                          )}
                        />
                      </button>
                    </div>
                    <button 
                      className="mt-3 w-full bg-purple-600 text-white py-2 rounded-full flex items-center justify-center gap-2"
                      onClick={(e) => handlePlayClick(e, sermon)}
                    >
                      <Play size={20} className="ml-1" />
                      <span>Écouter</span>
                    </button>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current - 1 ? "bg-red-500" : "bg-compa-700"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
