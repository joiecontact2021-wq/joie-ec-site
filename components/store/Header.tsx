"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

export const Header = () => {
  const { totalQuantity } = useCart();

  return (
    <header className="border-b border-black/30 bg-white pt-24 pb-4 sm:pt-[140px]">
      <div className="relative mx-auto flex max-w-[1100px] items-center justify-end px-6">
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center font-ui text-[15px] font-black uppercase tracking-[0.45em] text-joie-text sm:text-[18px]">
          JOIE ONLINE SHOP
        </div>
        <Link
          href="/cart"
          className="cart-button relative"
          aria-label="Cart"
        >
          <ShoppingCart className="h-5 w-5 text-white" />
          {totalQuantity > 0 ? (
            <span className="absolute -right-2 -top-2 min-w-[16px] rounded-full border border-black/60 bg-white px-1 text-[9px] leading-4 text-black">
              {totalQuantity}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
};
