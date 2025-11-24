import { NavHeader } from "@/components/ui/nav-header";
import { CartSidebar } from "@/components/ui/cart-sidebar";
import { ProductGrid } from "@/components/ui/product-grid";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";

const StreetwearPage = () => {
  const { data: streetwearProducts, isLoading } = useProducts("streetwear");
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

      <ProductGrid
        products={streetwearProducts || []}
        title="STREETWEAR"
        description="Coleção essencial de streetwear tech com design futurista e qualidade premium"
        isLoading={isLoading}
      />
    </div>
  );
};

export default StreetwearPage;