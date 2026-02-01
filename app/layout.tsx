import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

const notoSans = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "joie | Beauty Salon & Store",
  description: "大阪のプライベートサロンjoieの公式オンラインストア",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSans.className} bg-joie-bg text-joie-text min-h-screen flex flex-col`}>
        
        {/* ヘッダー */}
        <header className="sticky top-0 z-50 bg-joie-bg/90 backdrop-blur-sm border-b border-joie-accent/20">
          <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
            {/* ロゴエリア */}
            <Link href="/" className="hover:opacity-80 transition">
              <div className="relative w-24 h-12">
                 {/* ロゴ画像がない場合のためのテキストフォールバック */}
                 <Image 
                   src="/logo.png" 
                   alt="joie logo" 
                   fill 
                   className="object-contain"
                   priority
                 />
              </div>
            </Link>

            {/* ナビゲーション */}
            <nav className="flex items-center gap-6 text-sm tracking-widest">
              <Link href="/" className="hover:text-joie-accent transition">HOME</Link>
              <div className="relative cursor-pointer">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-joie-text text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </div>
            </nav>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="flex-grow">
          {children}
        </main>

        {/* フッター */}
        <footer className="bg-white border-t border-joie-accent/20 py-10 mt-20">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <div className="relative w-20 h-10 mx-auto opacity-50">
               <Image src="/logo.png" alt="joie logo footer" fill className="object-contain" />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-xs text-joie-text/70">
              <Link href="/legal" className="hover:underline">特定商取引法に基づく表記</Link>
              <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
              <Link href="https://www.instagram.com/" target="_blank" className="hover:underline">Instagram</Link>
            </div>

            <p className="text-[10px] text-joie-text/50">© 2026 joie. All Rights Reserved.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}