import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6 border border-black/20 p-10 text-center">
      <p className="text-[10px] uppercase tracking-[0.4em] text-joie-text/60">Checkout</p>
      <h1 className="text-2xl tracking-[0.04em] text-joie-text">決済がキャンセルされました</h1>
      <p className="text-sm leading-relaxed text-joie-text/70">
        カートの内容はそのままです。ご不明点があればお気軽にご連絡ください。
      </p>
      <Link
        href="/cart"
        className="inline-flex border border-black bg-black px-6 py-2 text-[11px] uppercase tracking-[0.35em] text-white"
      >
        Back to Cart
      </Link>
    </div>
  );
}
