import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import streetwearImage from "@/assets/collection-streetwear.jpg";
import accessoriesImage from "@/assets/collection-accessories.jpg";
import dropsImage from "@/assets/collection-drops.jpg";

interface Collection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  itemCount: number;
  isLimited?: boolean;
  glitchText: string;
}

const collections: Collection[] = [
  {
    id: "streetwear",
    title: "STREETWEAR",
    subtitle: "Essential Tech Wear",
    image: streetwearImage,
    itemCount: 24,
    glitchText: "STREETWEAR"
  },
  {
    id: "drops",
    title: "LIMITED DROPS",
    subtitle: "Exclusive Collections",
    image: dropsImage,
    itemCount: 8,
    isLimited: true,
    glitchText: "LIMITED DROPS"
  },
  {
    id: "accessories",
    title: "ACESSÓRIOS",
    subtitle: "Complete the Look",
    image: accessoriesImage,
    itemCount: 16,
    glitchText: "ACESSÓRIOS"
  }
];

export const CollectionsSection = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="collections" className="py-20 lg:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-tech font-black mb-6">
            <span className="text-foreground">
              COLLECTIONS
            </span>
          </h2>
          <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
            Descubra nossas coleções que definem o futuro do streetwear
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary transition-all duration-500"
              onMouseEnter={() => setHoveredId(collection.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                
                {/* Glitch Effect on Hover */}
                {hoveredId === collection.id && (
                  <div className="absolute inset-0 bg-primary/10 animate-glitch" />
                )}

                {/* Limited Badge */}
                {collection.isLimited && (
                  <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground animate-neon-pulse">
                    LIMITED
                  </Badge>
                )}

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-tech font-bold text-foreground">
                        {collection.title}
                      </h3>
                      <p className="text-muted-foreground font-mono text-sm">
                        {collection.subtitle}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-mono text-accent">
                        {collection.itemCount} ITEMS
                      </span>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                      >
                        Explorar
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Scan Line Effect */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-cyber-scan" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 font-mono border-primary text-primary hover:bg-primary hover:text-primary-foreground neon-glow"
          >
            VER TODAS AS COLEÇÕES
          </Button>
        </div>
      </div>
    </section>
  );
};