import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6 rounded-3xl border border-white/70 bg-white/70 p-10 text-center">
      <p className="text-[11px] uppercase tracking-[0.4em] text-joie-text/50">Checkout</p>
      <h1 className="text-3xl font-serif text-joie-ink">決済がキャンセルされました</h1>
      <p className="text-sm leading-relaxed text-joie-text/70">
        カートの内容はそのままです。ご不明点があればお気軽にご連絡ください。
      </p>
      <Link
        href="/cart"
        className="inline-flex rounded-full bg-joie-text px-6 py-3 text-xs uppercase tracking-[0.3em] text-white"
      >
        Back to Cart
      </Link>
    </div>
  );
}
