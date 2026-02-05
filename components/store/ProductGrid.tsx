"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatJPY } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "category";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "おすすめ順" },
  { value: "price-asc", label: "価格が低い順" },
  { value: "price-desc", label: "価格が高い順" },
  { value: "category", label: "カテゴリ順" },
];

const resolveCategory = (value: string | null) => value?.trim() || "Other";

export const ProductGrid = ({ products }: { products: Product[] }) => {
  const [sortKey, setSortKey] = useState<SortKey>("featured");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sortKey === "price-asc") {
      return items.sort((a, b) => a.price - b.price);
    }

    if (sortKey === "price-desc") {
      return items.sort((a, b) => b.price - a.price);
    }

    if (sortKey === "category") {
      return items.sort((a, b) => {
        const categoryOrder =
          resolveCategory(a.category).localeCompare(resolveCategory(b.category), "ja");
        if (categoryOrder !== 0) return categoryOrder;
        return a.name.localeCompare(b.name, "ja");
      });
    }

    return items.sort((a, b) => {
      const orderA = a.sort_order ?? 9999;
      const orderB = b.sort_order ?? 9999;
      if (orderA !== orderB) return orderA - orderB;
      return a.name.localeCompare(b.name, "ja");
    });
  }, [products, sortKey]);

  return (
    <div className="space-y-8 pt-[100px]">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <nav className="text-[10px] tracking-[0.35em] text-joie-text/60">
          ホーム / 商品一覧
        </nav>
        <div className="flex items-center gap-4 text-[11px] tracking-[0.2em] text-joie-text/70">
          <span>並び替え</span>
          <label className="selectbox-5">
            <select
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as SortKey)}
              aria-label="並び替え"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <section className="grid justify-start gap-x-16 gap-y-16 [grid-template-columns:repeat(auto-fill,minmax(230px,1fr))]">
        {sortedProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`} className="group block max-w-[260px]">
            <div className="aspect-square w-full overflow-hidden bg-[#f8f8f8]">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-contain transition duration-700 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-joie-text/50">
                  No Image
                </div>
              )}
            </div>
            <div className="mt-4 space-y-1 text-[12.5px] text-joie-text/90">
              <p className="tracking-[0.04em]">{product.name}</p>
              <p className="text-[11.5px] tracking-[0.18em] text-joie-text/60">
                {formatJPY(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};
