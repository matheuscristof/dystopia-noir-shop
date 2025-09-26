import { ProductGrid } from "@/components/ui/product-grid";
import { getProductsByCategory } from "@/data/products";

const StreetwearPage = () => {
  const streetwearProducts = getProductsByCategory("streetwear");

  return (
    <ProductGrid
      products={streetwearProducts}
      title="STREETWEAR"
      description="Coleção essencial de streetwear tech com design futurista e qualidade premium"
    />
  );
};

export default StreetwearPage;