"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatJPY } from "@/lib/utils";
import type { Product } from "@/lib/types";

export const ProductActions = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [buyNowError, setBuyNowError] = useState<string | null>(null);
  const hasDiscount = Boolean(
    product.discount_price && product.discount_price > 0 && product.discount_price < product.price
  );
  const effectivePrice = hasDiscount ? product.discount_price! : product.price;

  const handleBuyNow = async () => {
    setBuyNowLoading(true);
    setBuyNowError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: product.id, quantity: 1 }],
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "決済の開始に失敗しました。");
      }
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setBuyNowError(err instanceof Error ? err.message : "決済の開始に失敗しました。");
    } finally {
      setBuyNowLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-joie-text">
        <span className="text-[10px] uppercase tracking-[0.35em] text-joie-text/60">価格</span>
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
          className="flex-1 rounded-full border border-black bg-black px-5 py-3 text-[11px] tracking-[0.35em] text-white shadow-[0_10px_28px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.22)]"
        >
          カートに追加
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={buyNowLoading}
          className="flex-1 rounded-full border border-black/50 bg-white px-5 py-3 text-[11px] tracking-[0.35em] text-joie-text transition duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white disabled:opacity-60"
        >
          {buyNowLoading ? "購入処理中..." : "今すぐ購入"}
        </button>
      </div>
      {buyNowError ? (
        <p className="text-[11px] tracking-[0.18em] text-red-600">{buyNowError}</p>
      ) : null}
      <Link
        href="/cart"
        className="block text-center text-[10px] tracking-[0.25em] text-joie-text/50 hover:text-joie-text"
      >
        カートを見る
      </Link>
      <p className="text-[10px] tracking-[0.2em] text-joie-text/50">
        決済はStripeで安全に行われます。
      </p>
    </div>
  );
};
