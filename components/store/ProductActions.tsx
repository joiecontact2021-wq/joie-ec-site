"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatJPY } from "@/lib/utils";
import type { Product } from "@/lib/types";

export const ProductActions = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-joie-text">
        <span className="text-[10px] uppercase tracking-[0.35em] text-joie-text/60">Price</span>
        <span className="tracking-[0.04em]">{formatJPY(product.price)}</span>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => addItem(product, 1)}
          className="flex-1 border border-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-joie-text transition hover:bg-black hover:text-white"
        >
          Add to cart
        </button>
        <Link
          href="/cart"
          className="flex-1 border border-black bg-black px-4 py-2 text-center text-[11px] uppercase tracking-[0.35em] text-white transition hover:opacity-80"
        >
          Cart
        </Link>
      </div>
      <p className="text-[10px] tracking-[0.2em] text-joie-text/50">
        決済機能は準備中です。
      </p>
    </div>
  );
};
