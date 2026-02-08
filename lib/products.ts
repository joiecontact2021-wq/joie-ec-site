import type { Product } from "@/lib/types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const fallbackProducts: Product[] = [
  {
    id: "sample-1",
    name: "Moisture Shampoo",
    slug: "moisture-shampoo",
    price: 3800,
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
  return decoded.normalize("NFC");
};

export const getActiveProducts = async (): Promise<Product[]> => {
  if (!hasSupabaseEnv()) {
    return fallbackProducts;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("products")
      .select("id,name,slug,price,description,image_url,category,stock,is_active,sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error", error.message);
      return fallbackProducts;
    }

    return data ?? fallbackProducts;
  } catch (error) {
    console.error("Supabase error", error);
    return fallbackProducts;
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
    const { data, error } = await supabase
      .from("products")
      .select("id,name,slug,price,description,image_url,category,stock,is_active,sort_order")
      .eq("slug", normalizedSlug)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Supabase error", error.message);
      return (
        fallbackProducts.find((product) => normalizeSlug(product.slug) === normalizedSlug) ?? null
      );
    }

    if (data) {
      return data;
    }

    const { data: allData, error: listError } = await supabase
      .from("products")
      .select("id,name,slug,price,description,image_url,category,stock,is_active,sort_order")
      .eq("is_active", true);

    if (listError) {
      console.error("Supabase error", listError.message);
      return null;
    }

    return (
      allData?.find((product) => normalizeSlug(product.slug) === normalizedSlug) ?? null
    );
  } catch (error) {
    console.error("Supabase error", error);
    return (
      fallbackProducts.find((product) => normalizeSlug(product.slug) === normalizedSlug) ?? null
    );
  }
};
