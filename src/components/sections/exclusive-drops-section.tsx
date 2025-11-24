import { useState, useEffect } from "react";
import { Clock, ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProducts, Product } from "@/hooks/use-products";

export const ExclusiveDropsSection = () => {
  const { data: allProducts } = useProducts("drops");
  
  // Get exclusive drops (limited items)
  const exclusiveProducts = allProducts?.filter(p => p.is_limited).slice(0, 3) || [];
  
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addToCart = (product: Product) => {
    // Cart functionality would be implemented here
    console.log('Added to cart:', product);
  };

  return (
    <section id="drops" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-destructive/5 via-background to-accent/5" />
      <div className="absolute inset-0 tech-grid opacity-10" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-6 w-6 text-destructive animate-neon-pulse" />
            <Badge className="bg-destructive text-destructive-foreground animate-neon-pulse">
              EXCLUSIVO
            </Badge>
            <Zap className="h-6 w-6 text-destructive animate-neon-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-tech font-black mb-6">
            <span className="text-foreground">
              DROPS
            </span>
            <br />
            <span className="text-destructive">
              EXCLUSIVOS
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
            Peças limitadas que definem o futuro. Quando acabar, acabou.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-card/50 backdrop-blur-sm border border-destructive/30 rounded-lg p-8 mb-16 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-tech font-bold text-destructive mb-2">
              DROP TERMINA EM:
            </h3>
            <p className="text-sm text-muted-foreground font-mono">
              Última chance para garantir essas peças exclusivas
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'DIAS', value: timeLeft.days },
              { label: 'HORAS', value: timeLeft.hours },
              { label: 'MIN', value: timeLeft.minutes },
              { label: 'SEG', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={item.label} className="text-center">
                <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-4 mb-2">
                  <span className="text-2xl md:text-3xl font-tech font-bold text-destructive">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exclusiveProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card border border-border hover:border-destructive rounded-lg overflow-hidden transition-all duration-500 neon-glow"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                
                {/* Stock Badge */}
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                  {product.stock} RESTANTES
                </Badge>
                
                {/* Limited Badge */}
                {product.is_limited && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground animate-neon-pulse">
                    LIMITED
                  </Badge>
                )}

                {/* Quick Add Button */}
                <Button
                  size="icon"
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cyber-button"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-tech font-bold text-lg text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    Edição limitada • {product.stock} unidades
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-destructive">
                    R$ {product.price}
                  </span>
                  {product.original_price && (
                    <span className="text-sm text-muted-foreground line-through">
                      R$ {product.original_price}
                    </span>
                  )}
                  {product.original_price && (
                    <Badge variant="secondary" className="text-xs">
                      -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                    </Badge>
                  )}
                </div>

                <Button 
                  className="w-full cyber-button"
                  onClick={() => addToCart(product)}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  GARANTIR AGORA
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-card/30 backdrop-blur-sm border border-destructive/30 rounded-lg p-8 max-w-lg mx-auto">
            <h3 className="text-xl font-tech font-bold text-destructive mb-4">
              NÃO PERCA O PRÓXIMO DROP
            </h3>
            <p className="text-sm text-muted-foreground font-mono mb-6">
              Seja notificado quando lançarmos novas peças exclusivas
            </p>
            <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
              NOTIFICAR-ME
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};