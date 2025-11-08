import { NavHeader } from "@/components/ui/nav-header";
import { CartSidebar } from "@/components/ui/cart-sidebar";
import { ProductGrid } from "@/components/ui/product-grid";
import { getProductsByCategory } from "@/data/products";
import { useCart } from "@/hooks/use-cart";

const AccessoriesPage = () => {
  const accessoriesProducts = getProductsByCategory("accessories");
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
        products={accessoriesProducts}
        title="ACESSÓRIOS"
        description="Complete seu look com acessórios tech que elevam sua estética cyberpunk"
      />
    </div>
  );
};

export default AccessoriesPage;