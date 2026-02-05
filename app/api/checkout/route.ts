import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getStripeClient } from "@/lib/stripe/server";

type CartItemPayload = {
  id: string;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = Array.isArray(body?.items) ? (body.items as CartItemPayload[]) : [];

    if (items.length === 0) {
      return NextResponse.json({ error: "カートが空です。" }, { status: 400 });
    }

    const ids = Array.from(new Set(items.map((item) => item.id)));
    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
      .from("products")
      .select("id,name,price,image_url,is_active")
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
      return {
        quantity: Math.max(1, Math.min(item.quantity ?? 1, 99)),
        price_data: {
          currency: "jpy",
          unit_amount: product.price,
          product_data: {
            name: product.name,
            images: product.image_url ? [product.image_url] : undefined,
          },
        },
      };
    });

    const stripe = getStripeClient();
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
      phone_number_collection: shippingRequired ? { enabled: true } : undefined,
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
