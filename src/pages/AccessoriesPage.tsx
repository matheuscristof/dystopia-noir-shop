import { NavHeader } from "@/components/ui/nav-header";
import { CartSidebar } from "@/components/ui/cart-sidebar";
import { ProductGrid } from "@/components/ui/product-grid";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";

const AccessoriesPage = () => {
  const { data: accessoriesProducts, isLoading } = useProducts("accessories");
  const cart = useCart();

  return (
    <div className="min-h-screen bg-background">
      <NavHeader 
        cartItemsCount={cart.totalItems}
        onCartClick={cart.openCart}
      />
      
      <CartSidebar
        isOpen={cart.isOpen}
        onClose={cart.closeCart}
        items={cart.items}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
      />

      {/* Coming Soon Section */}
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-8">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Glowing Title */}
          <div className="relative">
            <h1 className="text-7xl md:text-9xl font-bold text-primary neon-glow animate-pulse">
              COMING SOON
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-20 blur-3xl -z-10" />
          </div>
          
          {/* Subtitle */}
          <div className="space-y-4">
            <p className="text-2xl md:text-4xl font-bold text-foreground">
              ACESSÓRIOS
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete seu look com acessórios tech que elevam sua estética cyberpunk
            </p>
          </div>
          
          {/* Tech Grid Background */}
          <div className="tech-grid absolute inset-0 pointer-events-none" />
        </div>
      </div>

      {/* Keep the original ProductGrid code for when ready */}
      {/* <ProductGrid
        products={accessoriesProducts}
        title="ACESSÓRIOS"
        description="Complete seu look com acessórios tech que elevam sua estética cyberpunk"
      /> */}
    </div>
  );
};

export default AccessoriesPage;