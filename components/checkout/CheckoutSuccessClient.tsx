"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart/CartProvider";

export const CheckoutSuccessClient = () => {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return null;
};
