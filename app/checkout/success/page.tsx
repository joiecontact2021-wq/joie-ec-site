import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6 rounded-3xl border border-white/70 bg-white/70 p-10 text-center">
      <p className="text-[11px] uppercase tracking-[0.4em] text-joie-text/50">Thank you</p>
      <h1 className="text-3xl font-serif text-joie-ink">ご購入ありがとうございます</h1>
      <p className="text-sm leading-relaxed text-joie-text/70">
        ご注文内容を確認後、通常3営業日以内に発送いたします。メールが届かない場合はお問い合わせください。
      </p>
      <Link
        href="/"
        className="inline-flex rounded-full bg-joie-text px-6 py-3 text-xs uppercase tracking-[0.3em] text-white"
      >
        Back to Home
      </Link>
    </div>
  );
}
