import { notFound } from "next/navigation";
import Link from "next/link";
import { getActiveProducts, getProductBySlug } from "@/lib/products";
import { ProductActions } from "@/components/store/ProductActions";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  let product = await getProductBySlug(params.slug);
  if (!product) {
    const normalized = decodeURIComponent(params.slug).trim().toLowerCase();
    const products = await getActiveProducts();
    product =
      products.find((item) => item.slug?.trim().toLowerCase() === normalized) ?? null;
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <nav className="font-ui text-[13px] tracking-[0.3em] text-joie-text/60 sm:text-[14px]">
        <Link href="/" className="hover:text-joie-text">
          ホーム
        </Link>{" "}
        /{" "}
        <Link href="/" className="hover:text-joie-text">
          商品一覧
        </Link>{" "}
        / {product.name}
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square w-full overflow-hidden bg-[#f8f8f8]">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-joie-text/40">
              No Image
            </div>
          )}
        </div>

        <div className="space-y-5">
          <p className="text-[10px] uppercase tracking-[0.4em] text-joie-text/60">
            {product.category || "Product"}
          </p>
          <h1 className="text-2xl tracking-[0.04em] text-joie-text">{product.name}</h1>
          <p className="text-sm leading-relaxed text-joie-text/70">
            {product.description || "丁寧につくられたヘアケアプロダクトです。"}
          </p>
          <ProductActions product={product} />
          <div className="text-[11px] leading-relaxed text-joie-text/60">
            <p>配送目安: 3営業日以内に発送</p>
            <p>返品: 商品到着後7日以内にご連絡ください</p>
          </div>
        </div>
      </div>
    </div>
  );
}
