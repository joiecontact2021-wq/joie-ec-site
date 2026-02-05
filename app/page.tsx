import { getActiveProducts } from "@/lib/products";
import { ProductGrid } from "@/components/store/ProductGrid";
import { InfoMenu } from "@/components/store/InfoMenu";

export default async function Home() {
  const products = await getActiveProducts();

  return (
    <div className="space-y-10 sm:space-y-14">
      <ProductGrid products={products} />
      <div className="pb-6">
        <InfoMenu />
      </div>
    </div>
  );
}
