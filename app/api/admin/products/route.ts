import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { toSlug } from "@/lib/utils";

const parseNumber = (value: unknown) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const parseOptionalInteger = (value: unknown) => {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return Math.trunc(number);
};

const parseInteger = (value: unknown) => {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return Math.trunc(number);
};

export async function GET() {
  const { user, error } = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: error?.message || "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminSupabaseClient();
  const { data, error: fetchError } = await admin
    .from("products")
    .select("id,name,slug,price,discount_price,description,image_url,category,stock,is_active,sort_order")
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: Request) {
  const { user, error } = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: error?.message || "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const name = String(body?.name ?? "").trim();
  const price = parseNumber(body?.price);

  if (!name) {
    return NextResponse.json({ error: "商品名を入力してください。" }, { status: 400 });
  }

  if (price === null || price <= 0) {
    return NextResponse.json({ error: "価格を正しく入力してください。" }, { status: 400 });
  }

  const rawSlug = String(body?.slug ?? "").trim();
  const slug = rawSlug ? toSlug(rawSlug) : toSlug(name);

  const discountPrice = parseOptionalInteger(body?.discount_price);
  if (discountPrice !== null && discountPrice <= 0) {
    return NextResponse.json({ error: "割引価格を正しく入力してください。" }, { status: 400 });
  }

  const payload = {
    name,
    slug,
    price: Math.trunc(price),
    discount_price: discountPrice,
    description: String(body?.description ?? "").trim() || null,
    image_url: String(body?.image_url ?? "").trim() || null,
    category: String(body?.category ?? "").trim() || null,
    stock: parseInteger(body?.stock),
    is_active: Boolean(body?.is_active ?? true),
    sort_order: parseInteger(body?.sort_order),
  };

  const admin = createAdminSupabaseClient();
  const { data, error: insertError } = await admin
    .from("products")
    .insert(payload)
    .select("id,name,slug,price,discount_price,description,image_url,category,stock,is_active,sort_order")
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
