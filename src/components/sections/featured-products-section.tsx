import { useState } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useProducts, Product } from "@/hooks/use-products";

export const FeaturedProductsSection = () => {
  const cart = useCart();
  const { data: allProducts } = useProducts();
  
  // Get featured products (first 2 products or fallback)
  const featuredProducts = allProducts?.slice(0, 2) || [];
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleAddToCart = (product: Product) => {
    if (!selectedSize || !selectedColor) {
      // Could show a toast here asking to select size/color
      return;
    }

    cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      image: product.image,
    });

    cart.openCart();
  };

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-tech font-black mb-6">
            <span className="text-foreground">
              FEATURED
            </span>
            <br />
            <span className="text-primary">
              PRODUCTS
            </span>
          </h2>
          <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
            Produtos em destaque da nossa coleção tech streetwear
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-500 neon-glow"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                {product.is_new && (
                  <Badge className="bg-accent text-accent-foreground">NEW</Badge>
                )}
                {product.is_limited && (
                    <Badge className="bg-destructive text-destructive-foreground animate-neon-pulse">
                      LIMITED
                    </Badge>
                  )}
                </div>

                {/* Wishlist */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm border-border hover:bg-primary hover:border-primary hover:text-primary-foreground"
                >
                  <Heart className="h-4 w-4" />
                </Button>

                {/* Quick Add */}
                <Button
                  size="lg"
                  className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 cyber-button"
                  onClick={() => setSelectedProduct(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  QUICK ADD
                </Button>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-accent fill-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Name & Description */}
                <div>
                  <h3 className="font-tech font-bold text-xl text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    {product.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-primary">
                    R$ {product.price}
                  </span>
                  {product.original_price && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        R$ {product.original_price}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                      </Badge>
                    </>
                  )}
                </div>

                {/* Colors */}
                <div>
                  <p className="text-sm font-mono text-muted-foreground mb-2">
                    Cores disponíveis:
                  </p>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="w-6 h-6 rounded-full border-2 border-border bg-muted cursor-pointer hover:border-primary transition-colors"
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <p className="text-sm font-mono text-muted-foreground mb-2">
                    Tamanhos disponíveis:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Badge
                        key={size}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary"
                      >
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 font-mono border-primary text-primary hover:bg-primary hover:text-primary-foreground neon-glow"
          >
            VER TODOS OS PRODUTOS
          </Button>
        </div>
      </div>

      {/* Quick Add Modal would go here */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <h3 className="font-tech font-bold text-xl mb-4">
              {selectedProduct.name}
            </h3>
            
            {/* Size Selection */}
            <div className="mb-4">
              <label className="text-sm font-mono text-muted-foreground mb-2 block">
                Tamanho:
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="text-sm font-mono text-muted-foreground mb-2 block">
                Cor:
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setSelectedProduct(null);
                  setSelectedSize("");
                  setSelectedColor("");
                }}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 cyber-button"
                onClick={() => {
                  handleAddToCart(selectedProduct);
                  setSelectedProduct(null);
                  setSelectedSize("");
                  setSelectedColor("");
                }}
                disabled={!selectedSize || !selectedColor}
              >
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};