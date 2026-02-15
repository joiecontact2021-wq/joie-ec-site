import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const DEFAULT_SHIPPING_FEE = 600;

const parseNonNegativeInt = (value: string | null) => {
  if (value === null || value === undefined) return null;
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return null;
  return Math.trunc(num);
};

export const getShippingFee = async () => {
  try {
    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
      .from("settings")
      .select("value")
      .eq("key", "shipping_fee")
      .maybeSingle();
    if (error) {
      console.error("Shipping fee lookup error", error.message);
      return DEFAULT_SHIPPING_FEE;
    }
    const parsed = parseNonNegativeInt(data?.value ?? null);
    return parsed ?? DEFAULT_SHIPPING_FEE;
  } catch (error) {
    console.error("Shipping fee lookup error", error);
    return DEFAULT_SHIPPING_FEE;
  }
};

export const normalizeShippingFee = (value: unknown) => {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return null;
  return Math.trunc(num);
};
