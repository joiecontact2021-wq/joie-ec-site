import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getStripeClient } from "@/lib/stripe/server";
import { getShippingFee } from "@/lib/settings";

type CartItemPayload = {
  id: string;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = Array.isArray(body?.items) ? (body.items as CartItemPayload[]) : [];
    const couponCode = String(body?.coupon_code ?? "")
      .trim()
      .toUpperCase();

    if (items.length === 0) {
      return NextResponse.json({ error: "カートが空です。" }, { status: 400 });
    }

    const ids = Array.from(new Set(items.map((item) => item.id)));
    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
      .from("products")
      .select("id,name,price,discount_price,image_url,is_active")
      .in("id", ids)
      .eq("is_active", true);

    if (error || !data) {
      return NextResponse.json({ error: error?.message || "商品情報の取得に失敗しました。" }, { status: 500 });
    }

    const lineItems = items.map((item) => {
      const product = data.find((row) => row.id === item.id);
      if (!product) {
        throw new Error("商品が見つかりません。");
      }
      const unitAmount =
        product.discount_price &&
        product.discount_price > 0 &&
        product.discount_price < product.price
          ? product.discount_price
          : product.price;
      return {
        quantity: Math.max(1, Math.min(item.quantity ?? 1, 99)),
        price_data: {
          currency: "jpy",
          unit_amount: unitAmount,
          product_data: {
            name: product.name,
            images: product.image_url ? [product.image_url] : undefined,
          },
        },
      };
    });

    let stripeCouponId: string | null = null;
    if (couponCode) {
      const { data: coupon, error: couponError } = await admin
        .from("coupons")
        .select("id,code,stripe_coupon_id,is_active")
        .eq("code", couponCode)
        .eq("is_active", true)
        .maybeSingle();
      if (couponError) {
        return NextResponse.json({ error: couponError.message }, { status: 500 });
      }
      if (!coupon?.stripe_coupon_id) {
        return NextResponse.json({ error: "クーポンコードが無効です。" }, { status: 400 });
      }
      stripeCouponId = coupon.stripe_coupon_id;
    }

    const stripe = getStripeClient();
    const shippingFee = await getShippingFee();
    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const shippingRequired = (process.env.CHECKOUT_REQUIRE_SHIPPING ?? "true") === "true";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: shippingRequired
        ? { allowed_countries: ["JP"] }
        : undefined,
      shipping_options: shippingRequired
        ? [
            {
              shipping_rate_data: {
                display_name: "全国一律送料",
                type: "fixed_amount",
                fixed_amount: {
                  amount: shippingFee,
                  currency: "jpy",
                },
              },
            },
          ]
        : undefined,
      phone_number_collection: shippingRequired ? { enabled: true } : undefined,
      discounts: stripeCouponId ? [{ coupon: stripeCouponId }] : undefined,
      metadata: {
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
