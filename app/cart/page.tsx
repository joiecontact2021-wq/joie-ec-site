"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatJPY } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Checkout failed");
      }

      if (data?.url) {
        window.location.href = data.url as string;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-joie-text/50">Cart</p>
          <h1 className="mt-2 text-3xl font-serif text-joie-ink">ショッピングカート</h1>
        </div>
        <Link href="/#products" className="text-[11px] uppercase tracking-[0.3em] text-joie-text/50">
          Continue Shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-white/70 bg-white/70 p-10 text-center text-sm text-joie-text/60">
          カートは空です。
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-6 rounded-3xl border border-white/70 bg-white/70 p-6 md:flex-row md:items-center">
                <div className="h-28 w-24 overflow-hidden rounded-2xl bg-joie-mist/40">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-serif text-joie-text">{item.name}</p>
                  <p className="text-xs text-joie-text/60">{formatJPY(item.price)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full border border-joie-text/20 text-lg"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full border border-joie-text/20 text-lg"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-joie-text/70">{formatJPY(item.price * item.quantity)}</div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-xs uppercase tracking-[0.3em] text-joie-text/40"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-3xl border border-white/70 bg-white/80 p-6">
            <h2 className="text-sm uppercase tracking-[0.3em] text-joie-text/60">Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-joie-text/60">Subtotal</span>
                <span>{formatJPY(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-joie-text/50">
                <span>Shipping</span>
                <span>Checkoutで計算</span>
              </div>
              <div className="flex items-center justify-between border-t border-joie-mist/60 pt-3 text-base">
                <span>Total</span>
                <span>{formatJPY(subtotal)}</span>
              </div>
            </div>
            {error ? <p className="mt-4 text-xs text-red-600">{error}</p> : null}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading}
              className="mt-6 w-full rounded-full bg-joie-text px-4 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:opacity-80 disabled:opacity-60"
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
            <button
              type="button"
              onClick={clear}
              className="mt-3 w-full text-center text-[11px] uppercase tracking-[0.3em] text-joie-text/40"
            >
              Clear cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
