import { useState } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import productHoodie from "@/assets/product-hoodie.jpg";
import productPants from "@/assets/product-pants.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isLimited?: boolean;
  description: string;
}

const featuredProducts: Product[] = [
  {
    id: "prod-001",
    name: "CYBER HOODIE GHOST",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 127,
    image: productHoodie,
    colors: ["Black", "Dark Purple", "Neon Green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
    description: "Premium tech hoodie com detalhes neon e acabamento cyberpunk"
  },
  {
    id: "prod-002",
    name: "TECH PANTS NEON",
    price: 249,
    originalPrice: 329,
    rating: 4.9,
    reviews: 89,
    image: productPants,
    colors: ["Black", "Dark Gray", "Electric Blue"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    isLimited: true,
    description: "Calça tech com elementos futuristas e cortes anatômicos"
  }
];

export const FeaturedProductsSection = () => {
  const cart = useCart();
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
                  {product.isNew && (
                    <Badge className="bg-accent text-accent-foreground">NEW</Badge>
                  )}
                  {product.isLimited && (
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
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        R$ {product.originalPrice}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
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