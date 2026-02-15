import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { normalizeShippingFee } from "@/lib/settings";

const ALLOWED_KEYS = ["shipping_fee"];

export async function GET(request: Request) {
  const { user, error } = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: error?.message || "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const key = url.searchParams.get("key") ?? "shipping_fee";
  if (!ALLOWED_KEYS.includes(key)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  const admin = createAdminSupabaseClient();
  const { data, error: fetchError } = await admin
    .from("settings")
    .select("key,value")
    .eq("key", key)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function PATCH(request: Request) {
  const { user, error } = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: error?.message || "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const key = String(body?.key ?? "").trim();
  if (!ALLOWED_KEYS.includes(key)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  if (key === "shipping_fee") {
    const fee = normalizeShippingFee(body?.value);
    if (fee === null) {
      return NextResponse.json({ error: "送料は0以上の数字で入力してください。" }, { status: 400 });
    }
    const admin = createAdminSupabaseClient();
    const { data, error: updateError } = await admin
      .from("settings")
      .upsert({ key, value: String(fee) })
      .select("key,value")
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  }

  return NextResponse.json({ error: "Unsupported key" }, { status: 400 });
}
