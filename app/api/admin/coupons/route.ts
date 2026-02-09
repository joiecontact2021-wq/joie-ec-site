import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getStripeClient } from "@/lib/stripe/server";

const normalizeCode = (value: string) => value.trim().toUpperCase();

const parseAmount = (value: unknown) => {
  const num = Number(value);
  return Number.isFinite(num) ? Math.trunc(num) : null;
};

export async function GET() {
  const { user, error } = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: error?.message || "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminSupabaseClient();
  const { data, error: fetchError } = await admin
    .from("coupons")
    .select("id,code,discount_type,amount,is_active,stripe_coupon_id,created_at")
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
  const code = normalizeCode(String(body?.code ?? ""));
  const discountType = body?.discount_type === "percent" ? "percent" : "amount";
  const amount = parseAmount(body?.amount);

  if (!code) {
    return NextResponse.json({ error: "クーポンコードを入力してください。" }, { status: 400 });
  }

  if (amount === null || amount <= 0) {
    return NextResponse.json({ error: "割引額を正しく入力してください。" }, { status: 400 });
  }

  if (discountType === "percent" && amount > 100) {
    return NextResponse.json({ error: "割引率は1〜100の間で指定してください。" }, { status: 400 });
  }

  const stripe = getStripeClient();
  const stripeCoupon = await stripe.coupons.create(
    discountType === "percent"
      ? { percent_off: amount, duration: "once", name: code }
      : { amount_off: amount, currency: "jpy", duration: "once", name: code }
  );

  const admin = createAdminSupabaseClient();
  const { data, error: insertError } = await admin
    .from("coupons")
    .insert({
      code,
      discount_type: discountType,
      amount,
      is_active: true,
      stripe_coupon_id: stripeCoupon.id,
    })
    .select("id,code,discount_type,amount,is_active,stripe_coupon_id,created_at")
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
