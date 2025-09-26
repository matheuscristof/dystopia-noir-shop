import { useState } from "react";
import { NavHeader } from "@/components/ui/nav-header";
import { CartSidebar } from "@/components/ui/cart-sidebar";
import { HeroSection } from "@/components/sections/hero-section";
import { CollectionsSection } from "@/components/sections/collections-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { AboutSection } from "@/components/sections/about-section";
import { LookbookSection } from "@/components/sections/lookbook-section";
import { ExclusiveDropsSection } from "@/components/sections/exclusive-drops-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { FooterSection } from "@/components/sections/footer-section";
import { useCart } from "@/hooks/use-cart";

const Index = () => {
  const cart = useCart();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <NavHeader 
        cartItemsCount={cart.totalItems}
        onCartClick={cart.openCart}
      />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={cart.isOpen}
        onClose={cart.closeCart}
        items={cart.items}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Collections Section */}
        <CollectionsSection />

        {/* Featured Products Section */}
        <FeaturedProductsSection />

        {/* About Section */}
        <AboutSection />

        {/* Lookbook Section */}
        <LookbookSection />

        {/* Exclusive Drops Section */}
        <ExclusiveDropsSection />

        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Footer */}
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;
