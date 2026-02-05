import { getActiveProducts } from "@/lib/products";
import { ProductGrid } from "@/components/store/ProductGrid";

export default async function Home() {
  const products = await getActiveProducts();

  return <ProductGrid products={products} />;
}
