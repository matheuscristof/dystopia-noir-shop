import { ProductGrid } from "@/components/ui/product-grid";
import { getProductsByCategory } from "@/data/products";

const LimitedDropsPage = () => {
  const dropsProducts = getProductsByCategory("drops");

  return (
    <ProductGrid
      products={dropsProducts}
      title="LIMITED DROPS"
      description="Peças exclusivas e limitadas que definem o futuro do streetwear"
    />
  );
};

export default LimitedDropsPage;