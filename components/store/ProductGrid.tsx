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

  const buildProductHref = (product: Product) => {
    const slugBase = product.slug?.trim() ? product.slug : product.id;
    const encodedSlug = encodeURIComponent(slugBase);
    return `/products/${encodedSlug}?id=${product.id}`;
  };

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
    <div className="space-y-6 pt-12 sm:space-y-8 sm:pt-20 md:pt-[100px]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <nav className="font-ui text-[14px] tracking-[0.3em] text-joie-text/60 sm:text-[15px]">
          <Link href="/" className="hover:text-joie-text">
            ホーム
          </Link>{" "}
          / 商品一覧
        </nav>
        <div className="font-ui flex w-full flex-col gap-3 text-[14px] tracking-[0.25em] text-joie-text/70 sm:w-auto sm:flex-row sm:items-center sm:text-[15px]">
          <span>並び替え</span>
          <label className="selectbox-5 w-full sm:w-auto">
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

      <section className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-10 sm:gap-y-12 md:justify-start md:gap-x-16 md:gap-y-16 md:[grid-template-columns:repeat(auto-fill,minmax(230px,1fr))]">
        {sortedProducts.map((product) => (
          <Link key={product.id} href={buildProductHref(product)} className="group block w-full md:max-w-[260px]">
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
            <div className="mt-3 space-y-1 text-[11.5px] text-joie-text/90 sm:mt-4 sm:text-[12.5px]">
              <p className="tracking-[0.04em]">{product.name}</p>
              {product.discount_price && product.discount_price < product.price ? (
                <div className="flex items-center gap-2 text-[10.5px] tracking-[0.18em] sm:text-[11.5px]">
                  <span className="text-joie-text">{formatJPY(product.discount_price)}</span>
                  <span className="text-joie-text/40 line-through">
                    {formatJPY(product.price)}
                  </span>
                  <span className="campaign-text text-[10px]">キャンペーン中</span>
                </div>
              ) : (
                <p className="text-[10.5px] tracking-[0.18em] text-joie-text/60 sm:text-[11.5px]">
                  {formatJPY(product.price)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};
