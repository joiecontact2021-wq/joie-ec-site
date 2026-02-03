"use client";

import { useCart } from "@/components/cart/CartProvider";
import { formatJPY } from "@/lib/utils";
import type { Product } from "@/lib/types";

export const ProductActions = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <div className="mt-6 rounded-2xl border border-joie-mist/60 bg-white/70 p-6">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.3em] text-joie-text/50">Price</span>
        <span className="text-lg text-joie-text">{formatJPY(product.price)}</span>
      </div>
      <button
        type="button"
        onClick={() => addItem(product, 1)}
        className="mt-5 w-full rounded-full bg-joie-text px-4 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:opacity-80"
      >
        Add to cart
      </button>
    </div>
  );
};
