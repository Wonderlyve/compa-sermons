
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
                className="glass-card rounded-xl p-4 flex gap-4"
              >
                <div className="relative w-1/3 min-w-[120px] aspect-square">
                  <img
                    src={sermon.imageUrl}
                    alt={sermon.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-white mb-2">{sermon.title}</h3>
                  <div className="w-3/4 h-2 bg-compa-600 rounded-full mb-4"></div>
                  <div className="absolute right-6 bottom-1/2 translate-y-1/2">
                    <button className="w-12 h-12 bg-compa-500 rounded-full flex items-center justify-center">
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
              index === current - 1 ? "bg-compa-500" : "bg-compa-700"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
