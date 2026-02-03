"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Products", href: "/#products" },
  { label: "Guide", href: "/#guide" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { totalQuantity } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <button
          type="button"
          className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-joie-text/70 md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
          Menu
        </button>

        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.3em] text-joie-text/70 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-joie-text transition">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-10 w-24">
            <Image src="/logo.png" alt="joie" fill className="object-contain" priority />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-joie-text/70">
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden md:inline">Cart</span>
            <span className="absolute -right-2 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-joie-text text-[10px] text-white">
              {totalQuantity}
            </span>
          </Link>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/30">
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-joie-mist/60 px-5 py-4">
              <span className="text-xs uppercase tracking-[0.3em] text-joie-text/70">Menu</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 px-6 py-6 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-joie-text/80 hover:text-joie-text"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="mt-2 text-joie-text/80 hover:text-joie-text"
              >
                Cart
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
};
