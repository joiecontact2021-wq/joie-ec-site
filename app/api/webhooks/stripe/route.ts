import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { formatJPY } from "@/lib/utils";

export const runtime = "nodejs";

type CartItemPayload = {
  id: string;
  quantity: number;
};

const parseItems = (session: Stripe.Checkout.Session) => {
  const raw = session.metadata?.items;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => ({
        id: String(item?.id ?? ""),
        quantity: Number(item?.quantity ?? 0),
      }))
      .filter((item) => item.id && Number.isFinite(item.quantity) && item.quantity > 0);
  } catch {
    return [];
  }
};

const postSlack = async (text: string) => {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
};

const postEmail = async (subject: string, html: string) => {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFICATION_EMAIL;
  if (!apiKey || !to) return;
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
    }),
  });
};

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing Stripe webhook secret." }, { status: 400 });
  }

  const stripe = getStripeClient();
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid signature" },
      { status: 400 }
    );
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const items = parseItems(session);

  if (items.length === 0) {
    return NextResponse.json({ received: true });
  }

  const admin = createAdminSupabaseClient();

  const { error: eventError } = await admin.from("stripe_events").insert({ id: event.id });
  if (eventError && eventError.code === "23505") {
    return NextResponse.json({ received: true });
  }
  if (eventError) {
    return NextResponse.json({ error: eventError.message }, { status: 500 });
  }

  const ids = items.map((item) => item.id);
  const { data: products, error: productError } = await admin
    .from("products")
    .select("id,name,price,stock")
    .in("id", ids);

  if (productError || !products) {
    return NextResponse.json({ error: productError?.message || "商品情報の取得に失敗しました。" }, { status: 500 });
  }

  const updates = items
    .map((item) => {
      const product = products.find((row) => row.id === item.id);
      if (!product || product.stock === null) return null;
      return {
        id: product.id,
        stock: Math.max(0, product.stock - item.quantity),
      };
    })
    .filter(Boolean) as { id: string; stock: number }[];

  if (updates.length > 0) {
    for (const update of updates) {
      const { error } = await admin.from("products").update({ stock: update.stock }).eq("id", update.id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
  }

  const lineSummary = items
    .map((item) => {
      const product = products.find((row) => row.id === item.id);
      const name = product?.name ?? "商品";
      const price = product?.price ?? 0;
      return `・${name} × ${item.quantity} (${formatJPY(price)})`;
    })
    .join("\n");

  const total = session.amount_total ? formatJPY(session.amount_total) : "";
  const customer = session.customer_details;
  const shipping = session.shipping_details;

  const header = `新しい注文が入りました${total ? ` (${total})` : ""}`;
  const customerInfo = [
    customer?.name ? `氏名: ${customer.name}` : null,
    customer?.email ? `Email: ${customer.email}` : null,
    customer?.phone ? `電話: ${customer.phone}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const shippingInfo = shipping?.address
    ? `住所: ${[
        shipping.address.postal_code,
        shipping.address.state,
        shipping.address.city,
        shipping.address.line1,
        shipping.address.line2,
      ]
        .filter(Boolean)
        .join(" ")}`
    : "";

  const slackMessage = [header, lineSummary, customerInfo, shippingInfo]
    .filter(Boolean)
    .join("\n");

  await Promise.all([
    postSlack(slackMessage),
    postEmail(
      "joie | 新しい注文が入りました",
      `
        <h2>${header}</h2>
        <pre>${lineSummary}</pre>
        ${customerInfo ? `<p>${customerInfo.replace(/\n/g, "<br/>")}</p>` : ""}
        ${shippingInfo ? `<p>${shippingInfo}</p>` : ""}
      `
    ),
  ]);

  return NextResponse.json({ received: true });
}
