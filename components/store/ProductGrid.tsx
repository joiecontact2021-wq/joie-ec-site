"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatJPY } from "@/lib/utils";
import { useCart } from "@/components/cart/CartProvider";

const resolveCategory = (value?: string | null) => value?.trim() || "その他";

export const ProductGrid = ({ products }: { products: Product[] }) => {
  const { addItem } = useCart();
  const categories = useMemo(() => {
    const unique = new Set<string>();
    products.forEach((product) => unique.add(resolveCategory(product.category)));
    return ["すべて", ...Array.from(unique)];
  }, [products]);

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const visibleProducts = useMemo(() => {
    if (activeCategory === "すべて") return products;
    return products.filter((product) => resolveCategory(product.category) === activeCategory);
  }, [activeCategory, products]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-joie-text/70">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-4 py-2 transition ${
              activeCategory === category
                ? "border-joie-text bg-joie-text text-white"
                : "border-joie-mist/60 bg-white/60 hover:border-joie-text/60"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <div key={product.id} className="group rounded-3xl border border-white/80 bg-white/70 p-5 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.6)]">
            <Link href={`/products/${product.slug}`} className="block overflow-hidden rounded-2xl">
              <div className="aspect-[4/5] w-full overflow-hidden bg-joie-mist/40">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-joie-text/40">
                    No Image
                  </div>
                )}
              </div>
            </Link>

            <div className="mt-5 space-y-2">
              <p className="text-[11px] uppercase tracking-[0.3em] text-joie-text/50">
                {resolveCategory(product.category)}
              </p>
              <Link href={`/products/${product.slug}`} className="block">
                <h3 className="text-lg font-serif text-joie-text group-hover:text-joie-text/70 transition">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-joie-text/70">{formatJPY(product.price)}</p>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  className="flex-1 rounded-full bg-joie-text px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:opacity-80"
                  onClick={() => addItem(product, 1)}
                >
                  Add
                </button>
                <Link
                  href={`/products/${product.slug}`}
                  className="flex-1 rounded-full border border-joie-text/20 px-4 py-2 text-center text-xs uppercase tracking-[0.3em] text-joie-text/70 transition hover:border-joie-text"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
