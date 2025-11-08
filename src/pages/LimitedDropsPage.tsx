import { NavHeader } from "@/components/ui/nav-header";
import { CartSidebar } from "@/components/ui/cart-sidebar";
import { ProductGrid } from "@/components/ui/product-grid";
import { getProductsByCategory } from "@/data/products";
import { useCart } from "@/hooks/use-cart";

const LimitedDropsPage = () => {
  const dropsProducts = getProductsByCategory("drops");
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
        products={dropsProducts}
        title="LIMITED DROPS"
        description="Peças exclusivas e limitadas que definem o futuro do streetwear"
      />
    </div>
  );
};

export default LimitedDropsPage;