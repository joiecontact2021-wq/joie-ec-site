import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { InfoMenu } from "@/components/store/InfoMenu";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
});

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "joie | Hair Care & Salon Store",
  description: "大阪のプライベートサロン joie の公式オンラインストア",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${cormorant.variable} ${notoSans.variable}`}>
      <body className="min-h-screen bg-joie-bg text-joie-text antialiased">
        <CartProvider>
          <Header />
          <main className="mx-auto min-h-[70vh] max-w-[1100px] px-6 pb-20 pt-4">{children}</main>
          <Footer />
          <InfoMenu />
        </CartProvider>
      </body>
    </html>
  );
}
