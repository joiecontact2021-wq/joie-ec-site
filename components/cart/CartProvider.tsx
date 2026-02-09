"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "@/lib/types";
import { clamp } from "@/lib/utils";

const STORAGE_KEY = "joie_cart";
const COUPON_KEY = "joie_coupon";

type CartContextValue = {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  couponCode: string;
  setCouponCode: (value: string) => void;
  clearCouponCode: () => void;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCodeState] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as CartItem[];
        setItems(parsed);
      } catch {
        setItems([]);
      }
    }
    const storedCoupon = window.localStorage.getItem(COUPON_KEY);
    if (storedCoupon) {
      setCouponCodeState(storedCoupon);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  useEffect(() => {
    if (!hydrated) return;
    if (couponCode) {
      window.localStorage.setItem(COUPON_KEY, couponCode);
    } else {
      window.localStorage.removeItem(COUPON_KEY);
    }
  }, [hydrated, couponCode]);

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: clamp(item.quantity + quantity, 1, 99) }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image_url: product.image_url,
          quantity: clamp(quantity, 1, 99),
        },
      ];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: clamp(quantity, 1, 99) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clear = () => setItems([]);

  const setCouponCode = (value: string) => {
    setCouponCodeState(value.trim().toUpperCase());
  };

  const clearCouponCode = () => setCouponCodeState("");

  const value = useMemo(
    () => ({
      items,
      totalQuantity,
      subtotal,
      couponCode,
      setCouponCode,
      clearCouponCode,
      addItem,
      updateQuantity,
      removeItem,
      clear,
    }),
    [items, totalQuantity, subtotal, couponCode]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
