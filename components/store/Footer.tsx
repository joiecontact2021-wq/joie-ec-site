import Link from "next/link";
import Image from "next/image";

export const Footer = () => (
  <footer className="mt-24 border-t border-white/80 bg-white/70">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-16 text-center">
      <div className="relative h-10 w-24 opacity-80">
        <Image src="/logo.png" alt="joie" fill className="object-contain" />
      </div>
      <p className="max-w-xl text-xs leading-relaxed text-joie-text/70">
        自分らしい美しさを引き出すヘアケアと、日常に寄り添う小さな習慣。joie のオンラインストアへようこそ。
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-[0.3em] text-joie-text/60">
        <Link href="/#about" className="hover:text-joie-text">About</Link>
        <Link href="/#products" className="hover:text-joie-text">Products</Link>
        <Link href="/legal" className="hover:text-joie-text">Legal</Link>
        <Link href="/privacy" className="hover:text-joie-text">Privacy</Link>
      </div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-joie-text/40">© 2026 JOIE</p>
    </div>
  </footer>
);
