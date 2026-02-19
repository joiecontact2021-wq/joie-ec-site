import { NextRequest, NextResponse } from "next/server";
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { user, error } = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: error?.message || "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const updates: Record<string, unknown> = {};

  if (body?.name !== undefined) {
    const name = String(body.name ?? "").trim();
    if (!name) {
      return NextResponse.json({ error: "商品名を入力してください。" }, { status: 400 });
    }
    updates.name = name;
    if (body?.slug === undefined) {
      updates.slug = toSlug(name);
    }
  }

  if (body?.slug !== undefined) {
    const rawSlug = String(body.slug ?? "").trim();
    if (!rawSlug && body?.name === undefined) {
      return NextResponse.json({ error: "スラッグを入力してください。" }, { status: 400 });
    }
    updates.slug = rawSlug ? toSlug(rawSlug) : toSlug(String(body?.name ?? ""));
  }

  if (body?.price !== undefined) {
    const price = parseNumber(body.price);
    if (price === null || price <= 0) {
      return NextResponse.json({ error: "価格を正しく入力してください。" }, { status: 400 });
    }
    updates.price = Math.trunc(price);
  }

  if (body?.discount_price !== undefined) {
    const discountPrice = parseOptionalInteger(body.discount_price);
    if (discountPrice !== null && discountPrice <= 0) {
      return NextResponse.json({ error: "割引価格を正しく入力してください。" }, { status: 400 });
    }
    updates.discount_price = discountPrice;
  }

  if (body?.description !== undefined) {
    updates.description = String(body.description ?? "").trim() || null;
  }

  if (body?.image_url !== undefined) {
    updates.image_url = String(body.image_url ?? "").trim() || null;
  }

  if (body?.category !== undefined) {
    updates.category = String(body.category ?? "").trim() || null;
  }

  if (body?.stock !== undefined) {
    updates.stock = parseInteger(body.stock);
  }

  if (body?.is_active !== undefined) {
    updates.is_active = Boolean(body.is_active);
  }

  if (body?.sort_order !== undefined) {
    updates.sort_order = parseInteger(body.sort_order);
  }

  const admin = createAdminSupabaseClient();
  const { data, error: updateError } = await admin
    .from("products")
    .update(updates)
    .eq("id", id)
    .select("id,name,slug,price,discount_price,description,image_url,category,stock,is_active,sort_order")
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { user, error } = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: error?.message || "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminSupabaseClient();
  const { error: deleteError } = await admin.from("products").delete().eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
