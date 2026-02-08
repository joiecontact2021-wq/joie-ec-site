import type { Product } from "@/lib/types";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const fallbackProducts: Product[] = [
  {
    id: "sample-1",
    name: "Moisture Shampoo",
    slug: "moisture-shampoo",
    price: 3800,
    discount_price: null,
    description: "乾燥しがちな髪をやさしく整える、軽やかな泡立ち。",
    image_url: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=1200&auto=format&fit=crop",
    category: "Haircare",
    stock: 12,
    is_active: true,
    sort_order: 1,
  },
  {
    id: "sample-2",
    name: "Treatment Oil",
    slug: "treatment-oil",
    price: 4200,
    discount_price: null,
    description: "しっとりまとまるツヤ感を叶える、軽やかなオイル。",
    image_url: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=1200&auto=format&fit=crop",
    category: "Treatment",
    stock: 8,
    is_active: true,
    sort_order: 2,
  },
  {
    id: "sample-3",
    name: "Styling Balm",
    slug: "styling-balm",
    price: 2800,
    discount_price: null,
    description: "指通りの良い質感と自然な束感を両立。",
    image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop",
    category: "Styling",
    stock: 10,
    is_active: true,
    sort_order: 3,
  },
  {
    id: "sample-4",
    name: "Scalp Essence",
    slug: "scalp-essence",
    price: 3500,
    discount_price: null,
    description: "頭皮を整えて、健やかな髪へ導く美容液。",
    image_url: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1200&auto=format&fit=crop",
    category: "Scalp",
    stock: 15,
    is_active: true,
    sort_order: 4,
  },
];

const hasSupabaseEnv = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const normalizeSlug = (value: string) => {
  const trimmed = String(value ?? "").trim();
  let decoded = trimmed;
  try {
    decoded = decodeURIComponent(trimmed);
  } catch {
    decoded = trimmed;
  }
  return decoded.normalize("NFC").toLowerCase();
};

const createAdminClientSafe = () => {
  try {
    return createAdminSupabaseClient();
  } catch (error) {
    console.error("Supabase admin client error", error);
    return null;
  }
};

const selectFields =
  "id,name,slug,price,discount_price,description,image_url,category,stock,is_active,sort_order";

export const getActiveProducts = async (): Promise<Product[]> => {
  if (!hasSupabaseEnv()) {
    return fallbackProducts;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("products")
      .select(selectFields)
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error", error.message);
      const admin = createAdminClientSafe();
      if (!admin) return fallbackProducts;
      const { data: adminData, error: adminError } = await admin
        .from("products")
        .select(selectFields)
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (adminError) {
        console.error("Supabase admin error", adminError.message);
        return fallbackProducts;
      }
      return adminData ?? fallbackProducts;
    }

    return data ?? fallbackProducts;
  } catch (error) {
    console.error("Supabase error", error);
    const admin = createAdminClientSafe();
    if (!admin) return fallbackProducts;
    const { data: adminData, error: adminError } = await admin
      .from("products")
      .select(selectFields)
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (adminError) {
      console.error("Supabase admin error", adminError.message);
      return fallbackProducts;
    }
    return adminData ?? fallbackProducts;
  }
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const normalizedSlug = normalizeSlug(slug);
  if (!hasSupabaseEnv()) {
    return (
      fallbackProducts.find((product) => normalizeSlug(product.slug) === normalizedSlug) ?? null
    );
  }

  try {
    const supabase = await createServerSupabaseClient();
    const fallbackLookup = async () => {
      const { data: listData, error: listError } = await supabase
        .from("products")
        .select(selectFields)
        .eq("is_active", true);

      if (listError) {
        console.error("Supabase error", listError.message);
        return null;
      }

      return (
        listData?.find((product) => normalizeSlug(product.slug) === normalizedSlug) ?? null
      );
    };

    const { data, error } = await supabase
      .from("products")
      .select(selectFields)
      .eq("slug", normalizedSlug)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Supabase error", error.message);
      const fallback = await fallbackLookup();
      if (fallback) return fallback;
      const admin = createAdminClientSafe();
      if (admin) {
        const { data: adminData, error: adminError } = await admin
          .from("products")
          .select(selectFields)
          .eq("slug", normalizedSlug)
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (adminError) {
          console.error("Supabase admin error", adminError.message);
        } else if (adminData) {
          return adminData;
        }
      }
      return (
        fallback ??
        (fallbackProducts.find((product) => normalizeSlug(product.slug) === normalizedSlug) ?? null)
      );
    }

    if (data) {
      return data;
    }

    const fallback = await fallbackLookup();
    if (fallback) return fallback;
    const admin = createAdminClientSafe();
    if (admin) {
      const { data: adminList, error: adminError } = await admin
        .from("products")
        .select(selectFields)
        .eq("is_active", true);
      if (adminError) {
        console.error("Supabase admin error", adminError.message);
      } else {
        return (
          adminList?.find((product) => normalizeSlug(product.slug) === normalizedSlug) ?? null
        );
      }
    }

    return null;
  } catch (error) {
    console.error("Supabase error", error);
    const admin = createAdminClientSafe();
    if (admin) {
      const { data: adminList, error: adminError } = await admin
        .from("products")
        .select(selectFields)
        .eq("is_active", true);
      if (!adminError) {
        return (
          adminList?.find((product) => normalizeSlug(product.slug) === normalizedSlug) ?? null
        );
      }
    }

    return fallbackProducts.find((product) => normalizeSlug(product.slug) === normalizedSlug) ?? null;
  }
};
