import { ProductGrid } from "@/components/ui/product-grid";
import { getProductsByCategory } from "@/data/products";

const AccessoriesPage = () => {
  const accessoriesProducts = getProductsByCategory("accessories");

  return (
    <ProductGrid
      products={accessoriesProducts}
      title="ACESSÓRIOS"
      description="Complete seu look com acessórios tech que elevam sua estética cyberpunk"
    />
  );
};

export default AccessoriesPage;