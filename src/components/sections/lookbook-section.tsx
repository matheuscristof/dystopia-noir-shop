import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";
import lookbook4 from "@/assets/lookbook-4.jpg";

const lookbookImages = [
  {
    id: 1,
    src: lookbook1,
    alt: "Tech Hoodie Collection",
    title: "TECH HOODIE",
    subtitle: "Future Essential"
  },
  {
    id: 2,
    src: lookbook2,
    alt: "Neon Accent Series",
    title: "NEON SERIES",
    subtitle: "Electric Vibes"
  },
  {
    id: 3,
    src: lookbook3,
    alt: "Urban Tech Jacket",
    title: "CYBER JACKET",
    subtitle: "Street Authority"
  },
  {
    id: 4,
    src: lookbook4,
    alt: "Complete Tech Look",
    title: "FULL TECH",
    subtitle: "Dystopian Style"
  }
];

export const LookbookSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="lookbook" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-tech font-black mb-6">
            <span className="text-foreground glitch" data-text="LOOKBOOK">
              LOOKBOOK
            </span>
          </h2>
          <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
            Explore como a estética dystópica se traduz em street style autêntico
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="bg-card/50 border-border hover:bg-primary hover:border-primary hover:text-primary-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="bg-card/50 border-border hover:bg-primary hover:border-primary hover:text-primary-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm font-mono text-muted-foreground">
            Scroll horizontal • {lookbookImages.length} looks
          </div>
        </div>

        {/* Horizontal Scroll Gallery */}
        <div 
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {lookbookImages.map((image, index) => (
            <div
              key={image.id}
              className="flex-none w-80 md:w-96 group cursor-pointer"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary transition-all duration-500 h-[500px] md:h-[600px]">
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                
                {/* Glitch Effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 animate-glitch transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-tech font-bold text-foreground glitch" data-text={image.title}>
                      {image.title}
                    </h3>
                    <p className="text-muted-foreground font-mono text-sm">
                      {image.subtitle}
                    </p>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 mt-4"
                    >
                      Shop Look
                    </Button>
                  </div>
                </div>

                {/* Scan Line */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-cyber-scan" />
                
                {/* Image Number */}
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-mono text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {lookbookImages.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-muted transition-colors duration-300 hover:bg-primary"
            />
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};