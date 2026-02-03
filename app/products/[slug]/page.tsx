import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import { ProductActions } from "@/components/store/ProductActions";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <Link href="/#products" className="text-[11px] uppercase tracking-[0.3em] text-joie-text/50">
        ← Back to products
      </Link>

      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white/70">
          <div className="aspect-[4/5] w-full bg-joie-mist/40">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-joie-text/40">
                No Image
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-joie-text/50">
            {product.category || "Product"}
          </p>
          <h1 className="mt-3 text-3xl font-serif text-joie-ink">{product.name}</h1>
          <p className="mt-4 text-sm leading-loose text-joie-text/70">
            {product.description || "丁寧につくられたヘアケアプロダクトです。"}
          </p>
          <ProductActions product={product} />
          <div className="mt-6 rounded-2xl border border-white/80 bg-white/60 p-5 text-xs leading-relaxed text-joie-text/60">
            <p>配送目安: 3営業日以内に発送</p>
            <p>返品: 商品到着後7日以内にご連絡ください</p>
          </div>
        </div>
      </div>
    </div>
  );
}
