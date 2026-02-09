"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatJPY } from "@/lib/utils";
import type { Product } from "@/lib/types";

export const ProductActions = ({ product }: { product: Product }) => {
  const { addItem, couponCode, setCouponCode } = useCart();
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
          coupon_code: couponCode || null,
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
          className="flex-1 rounded-2xl border border-black bg-black px-8 py-5 text-[13px] tracking-[0.3em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(0,0,0,0.26)] sm:text-[14px]"
        >
          カートに追加
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={buyNowLoading}
          className="flex-1 rounded-2xl border border-black/60 bg-white px-8 py-5 text-[13px] tracking-[0.3em] text-joie-text transition duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white disabled:opacity-60 sm:text-[14px]"
        >
          {buyNowLoading ? "購入処理中..." : "今すぐ購入"}
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-joie-text/60">
          クーポンコード
        </p>
        <input
          value={couponCode}
          onChange={(event) => setCouponCode(event.target.value)}
          placeholder="例: JOIE10"
          className="w-full rounded-full border border-black/40 bg-white px-4 py-3 text-[11px] tracking-[0.2em] text-joie-text focus:outline-none focus:ring-2 focus:ring-black/20"
        />
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
