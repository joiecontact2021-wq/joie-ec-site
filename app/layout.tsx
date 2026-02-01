import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_JP } from "next/font/google"; // フォント追加
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

// 高級感のあるセリフ体（英語用）
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
});

// 読みやすい日本語フォント
const notoSans = Noto_Sans_JP({ 
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "joie | Beauty Salon & Store",
  description: "大阪・堀江のプライベートサロンjoieの公式オンラインストア",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${cormorant.variable} ${notoSans.variable}`}>
      <body className="font-sans bg-[#FDFCF8] text-[#4A4A4A] min-h-screen flex flex-col">
        
        {/* ヘッダー */}
        <header className="fixed top-0 w-full z-50 bg-[#FDFCF8]/80 backdrop-blur-md transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
            {/* 左側：ナビゲーション（デスクトップ） */}
            <nav className="hidden md:flex gap-8 text-xs tracking-[0.2em] font-light text-gray-500">
              <Link href="/" className="hover:text-black transition-colors duration-300">HOME</Link>
              <Link href="/about" className="hover:text-black transition-colors duration-300">ABOUT</Link>
            </nav>

            {/* 中央：ロゴ */}
            <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity">
              <div className="relative w-28 h-14">
                 <Image 
                   src="/logo.png" 
                   alt="joie" 
                   fill 
                   className="object-contain"
                   priority
                 />
              </div>
            </Link>

            {/* 右側：カート */}
            <div className="flex items-center gap-6">
              <div className="relative cursor-pointer group">
                <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-black transition" strokeWidth={1.5} />
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">0</span>
              </div>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="flex-grow pt-24">
          {children}
        </main>

        {/* フッター */}
        <footer className="bg-white border-t border-gray-100 py-16 mt-32">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-8">
            <div className="relative w-24 h-12 opacity-80">
               <Image src="/logo.png" alt="joie footer" fill className="object-contain" />
            </div>
            
            <div className="flex gap-8 text-[11px] tracking-widest text-gray-500 font-light">
              <Link href="/legal" className="hover:text-black transition">特定商取引法</Link>
              <Link href="/privacy" className="hover:text-black transition">プライバシーポリシー</Link>
              <Link href="https://instagram.com" className="hover:text-black transition">Instagram</Link>
            </div>

            <p className="text-[10px] text-gray-400 tracking-widest font-serif">© 2026 JOIE. ALL RIGHTS RESERVED.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}