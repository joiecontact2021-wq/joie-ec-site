"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatJPY } from "@/lib/utils";
import type { Product } from "@/lib/types";

export const ProductActions = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const hasDiscount = Boolean(
    product.discount_price && product.discount_price > 0 && product.discount_price < product.price
  );
  const effectivePrice = hasDiscount ? product.discount_price! : product.price;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-joie-text">
        <span className="text-[10px] uppercase tracking-[0.35em] text-joie-text/60">Price</span>
        <div className="flex flex-wrap items-center gap-2">
          <span className="tracking-[0.04em]">{formatJPY(effectivePrice)}</span>
          {hasDiscount ? (
            <>
              <span className="text-xs text-joie-text/40 line-through">
                {formatJPY(product.price)}
              </span>
              <span className="text-[10px] tracking-[0.2em] text-joie-text/50">キャンペーン中</span>
            </>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => addItem({ ...product, price: effectivePrice }, 1)}
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
        決済はStripeで安全に行われます。
      </p>
    </div>
  );
};
