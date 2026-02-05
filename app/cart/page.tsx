"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatJPY } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart();

  return (
    <div className="space-y-8">
      <nav className="font-ui text-[10px] tracking-[0.35em] text-joie-text/60">
        <Link href="/" className="hover:text-joie-text">
          ホーム
        </Link>{" "}
        / カート
      </nav>
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.4em] text-joie-text/70">
        <span>Cart</span>
        <Link href="/" className="text-joie-text/60 hover:text-joie-text">
          Continue Shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="border border-black/20 px-6 py-8 text-sm text-joie-text/60">
          カートは空です。
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 border-b border-black/10 pb-6 md:flex-row md:items-center">
                <div className="h-24 w-24 overflow-hidden bg-[#f4f4f4]">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="h-full w-full object-contain" />
                  ) : null}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm tracking-[0.04em] text-joie-text">{item.name}</p>
                  <p className="text-[11px] tracking-[0.18em] text-joie-text/60">{formatJPY(item.price)}</p>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <button
                    type="button"
                    className="h-7 w-7 border border-black/40"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="w-5 text-center">{item.quantity}</span>
                  <button
                    type="button"
                    className="h-7 w-7 border border-black/40"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="text-[11px] tracking-[0.18em] text-joie-text/70">
                  {formatJPY(item.price * item.quantity)}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-[10px] uppercase tracking-[0.3em] text-joie-text/40"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-4 border border-black/20 p-6 text-[11px] tracking-[0.25em] text-joie-text/70">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="tracking-[0.1em]">{formatJPY(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-joie-text/50">
              <span>Shipping</span>
              <span>Checkoutで計算</span>
            </div>
            <div className="flex items-center justify-between border-t border-black/10 pt-4 text-[12px] text-joie-text">
              <span>Total</span>
              <span className="tracking-[0.1em]">{formatJPY(subtotal)}</span>
            </div>
            <button
              type="button"
              disabled
              className="w-full border border-black/40 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-white/80"
            >
              Checkout（準備中）
            </button>
            <button
              type="button"
              onClick={clear}
              className="w-full text-center text-[10px] uppercase tracking-[0.3em] text-joie-text/40"
            >
              Clear cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
