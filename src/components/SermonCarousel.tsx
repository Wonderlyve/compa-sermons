
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Sermon } from "@/data/sermons";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

interface SermonCarouselProps {
  sermons: Sermon[];
  featured?: boolean;
}

export default function SermonCarousel({ 
  sermons, 
  featured = false 
}: SermonCarouselProps) {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

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

  return (
    <div>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {sermons.map((sermon) => (
            <CarouselItem key={sermon.id}>
              <Link 
                to={`/sermon/${sermon.id}`}
                className="glass-card rounded-xl p-0 block overflow-hidden relative"
              >
                <div className="relative w-full aspect-video">
                  <img
                    src={sermon.imageUrl}
                    alt={sermon.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-xl font-semibold text-white mb-1">{sermon.title}</h3>
                    <p className="text-gray-300">{sermon.preacher}</p>
                  </div>
                  <div className="absolute right-4 bottom-4">
                    <button className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <Play size={20} className="text-white ml-1" />
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
