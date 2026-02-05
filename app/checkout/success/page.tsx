import Link from "next/link";
import { CheckoutSuccessClient } from "@/components/checkout/CheckoutSuccessClient";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6 border border-black/20 p-10 text-center">
      <CheckoutSuccessClient />
      <p className="text-[10px] uppercase tracking-[0.4em] text-joie-text/60">Thank you</p>
      <h1 className="text-2xl tracking-[0.04em] text-joie-text">ご購入ありがとうございます</h1>
      <p className="text-sm leading-relaxed text-joie-text/70">
        ご注文内容を確認後、通常3営業日以内に発送いたします。メールが届かない場合はお問い合わせください。
      </p>
      <Link
        href="/"
        className="inline-flex border border-black bg-black px-6 py-2 text-[11px] uppercase tracking-[0.35em] text-white"
      >
        Back to Home
      </Link>
    </div>
  );
}
