import { useState, useMemo } from "react";
import { Star, ShoppingCart, Heart, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface ProductGridProps {
  products: Product[];
  title: string;
  description?: string;
}

interface Filters {
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  sortBy: string;
  showOnlyInStock: boolean;
  showOnlyNew: boolean;
  showOnlyLimited: boolean;
}

export const ProductGrid = ({ products, title, description }: ProductGridProps) => {
  const cart = useCart();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    colors: [],
    sizes: [],
    priceRange: [0, 1000],
    sortBy: "name",
    showOnlyInStock: false,
    showOnlyNew: false,
    showOnlyLimited: false,
  });

  // Get unique values for filters
  const allColors = useMemo(() => {
    const colors = new Set<string>();
    products.forEach(product => product.colors.forEach(color => colors.add(color)));
    return Array.from(colors);
  }, [products]);

  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach(product => product.sizes.forEach(size => sizes.add(size)));
    return Array.from(sizes);
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Color filter
      if (filters.colors.length > 0) {
        if (!product.colors.some(color => filters.colors.includes(color))) return false;
      }

      // Size filter
      if (filters.sizes.length > 0) {
        if (!product.sizes.some(size => filters.sizes.includes(size))) return false;
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;

      // Stock filter
      if (filters.showOnlyInStock && product.stock === 0) return false;

      // New filter
      if (filters.showOnlyNew && !product.isNew) return false;

      // Limited filter
      if (filters.showOnlyLimited && !product.isLimited) return false;

      return true;
    });

    // Sort products
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [products, filters]);

  const handleAddToCart = (product: Product) => {
    if (!selectedSize || !selectedColor) return;

    cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      image: product.image,
    });

    toast({
      title: "Produto adicionado!",
      description: `${product.name} (${selectedSize}, ${selectedColor}) foi adicionado ao carrinho.`,
      duration: 3000,
    });

    setSelectedProduct(null);
    setSelectedSize("");
    setSelectedColor("");
    
    cart.openCart();
  };

  const toggleColorFilter = (color: string) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const toggleSizeFilter = (size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const clearFilters = () => {
    setFilters({
      colors: [],
      sizes: [],
      priceRange: [0, 1000],
      sortBy: "name",
      showOnlyInStock: false,
      showOnlyNew: false,
      showOnlyLimited: false,
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <label className="text-sm font-mono font-medium mb-2 block">Ordenar por:</label>
        <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nome A-Z</SelectItem>
            <SelectItem value="price-low">Menor Preço</SelectItem>
            <SelectItem value="price-high">Maior Preço</SelectItem>
            <SelectItem value="rating">Melhor Avaliado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-mono font-medium mb-2 block">
          Preço: R$ {filters.priceRange[0]} - R$ {filters.priceRange[1]}
        </label>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
          max={1000}
          min={0}
          step={10}
          className="mt-2"
        />
      </div>

      {/* Colors */}
      <div>
        <label className="text-sm font-mono font-medium mb-2 block">Cores:</label>
        <div className="flex flex-wrap gap-2">
          {allColors.map(color => (
            <Button
              key={color}
              variant={filters.colors.includes(color) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleColorFilter(color)}
              className="text-xs"
            >
              {color}
            </Button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <label className="text-sm font-mono font-medium mb-2 block">Tamanhos:</label>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(size => (
            <Button
              key={size}
              variant={filters.sizes.includes(size) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSizeFilter(size)}
              className="text-xs"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="space-y-3">
        <label className="text-sm font-mono font-medium block">Filtros rápidos:</label>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={filters.showOnlyInStock}
            onCheckedChange={(checked) => setFilters(prev => ({ ...prev, showOnlyInStock: !!checked }))}
          />
          <label htmlFor="in-stock" className="text-sm font-mono">Apenas em estoque</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="new"
            checked={filters.showOnlyNew}
            onCheckedChange={(checked) => setFilters(prev => ({ ...prev, showOnlyNew: !!checked }))}
          />
          <label htmlFor="new" className="text-sm font-mono">Novidades</label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="limited"
            checked={filters.showOnlyLimited}
            onCheckedChange={(checked) => setFilters(prev => ({ ...prev, showOnlyLimited: !!checked }))}
          />
          <label htmlFor="limited" className="text-sm font-mono">Edição limitada</label>
        </div>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        Limpar Filtros
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-tech font-black mb-4 text-primary">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-mono text-muted-foreground">
              {filteredProducts.length} produto(s) encontrado(s)
            </span>
          </div>

          {/* Mobile Filter */}
          <div className="flex items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="font-tech">Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Sort */}
            <div className="hidden md:block">
              <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nome A-Z</SelectItem>
                  <SelectItem value="price-low">Menor Preço</SelectItem>
                  <SelectItem value="price-high">Maior Preço</SelectItem>
                  <SelectItem value="rating">Melhor Avaliado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-tech font-bold">Filtros</h3>
                {(filters.colors.length > 0 || filters.sizes.length > 0 || filters.showOnlyInStock || filters.showOnlyNew || filters.showOnlyLimited) && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <FilterContent />
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-tech font-bold mb-2">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground font-mono mb-4">
                  Tente ajustar os filtros para ver mais produtos
                </p>
                <Button onClick={clearFilters}>Limpar Filtros</Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group overflow-hidden hover:border-primary transition-all duration-300 neon-glow">
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
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {product.isNew && (
                          <Badge className="bg-accent text-accent-foreground">NEW</Badge>
                        )}
                        {product.isLimited && (
                          <Badge className="bg-destructive text-destructive-foreground animate-neon-pulse">
                            LIMITED
                          </Badge>
                        )}
                        {product.isBestseller && (
                          <Badge className="bg-primary text-primary-foreground">
                            BESTSELLER
                          </Badge>
                        )}
                      </div>

                      {/* Stock Status */}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                          <Badge variant="secondary" className="text-lg font-bold">
                            ESGOTADO
                          </Badge>
                        </div>
                      )}

                      {/* Wishlist */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm border-border hover:bg-primary hover:border-primary hover:text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>

                      {/* Quick Add */}
                      {product.stock > 0 && (
                        <Button
                          size="sm"
                          className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 cyber-button"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          ADICIONAR
                        </Button>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-3">
                      {/* Rating */}
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "text-accent fill-accent"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Name */}
                      <h3 className="font-tech font-bold text-lg text-foreground line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary">
                          R$ {product.price}
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="text-sm text-muted-foreground line-through">
                              R$ {product.originalPrice}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </Badge>
                          </>
                        )}
                      </div>

                      {/* Stock */}
                      <div className="text-xs font-mono text-muted-foreground">
                        {product.stock > 0 ? (
                          product.stock < 10 ? (
                            <span className="text-destructive">Apenas {product.stock} restantes</span>
                          ) : (
                            <span>Em estoque</span>
                          )
                        ) : (
                          <span className="text-destructive">Esgotado</span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Add Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-tech font-bold text-xl">
                {selectedProduct.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSelectedProduct(null);
                  setSelectedSize("");
                  setSelectedColor("");
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Size Selection */}
            <div className="mb-4">
              <label className="text-sm font-mono font-medium mb-2 block">
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
              <label className="text-sm font-mono font-medium mb-2 block">
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
          </Card>
        </div>
      )}
    </div>
  );
};