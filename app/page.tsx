import Link from "next/link";
import { ProductGrid } from "@/components/store/ProductGrid";
import { getActiveProducts } from "@/lib/products";
import { formatJPY } from "@/lib/utils";

export default async function Home() {
  const products = await getActiveProducts();
  const highlight = products.slice(0, 2);
  const usingFallback = products.some((product) => product.id.startsWith("sample-"));

  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden rounded-[48px] border border-white/70 bg-white/60 p-8 shadow-[0_40px_120px_-80px_rgba(0,0,0,0.6)] md:p-16">
        <div className="absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-joie-accent/20 blur-[80px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-joie-mist/80 blur-[120px]" />
        <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-[11px] uppercase tracking-[0.4em] text-joie-text/60 animate-fade-up">
              Hair Care & Salon Store
            </p>
            <h1 className="text-4xl font-serif leading-tight text-joie-ink md:text-5xl animate-fade-up">
              日常に、
              <br />
              ほどける艶と余白を。
            </h1>
            <p className="max-w-md text-sm leading-loose text-joie-text/70 animate-fade-up">
              joie は大阪のプライベートサロンから生まれたヘアケアブランド。
              毎日のケアが少しだけ心地よくなる、やさしい処方と香りを届けます。
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up">
              <Link
                href="#products"
                className="rounded-full bg-joie-text px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:opacity-80"
              >
                Shop Now
              </Link>
              <Link
                href="#guide"
                className="rounded-full border border-joie-text/20 px-6 py-3 text-xs uppercase tracking-[0.3em] text-joie-text/70 transition hover:border-joie-text"
              >
                Guide
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.3em] text-joie-text/50">
              <span>Small Batch</span>
              <span>Salon Quality</span>
              <span>Made in Japan</span>
            </div>
          </div>

          <div className="grid gap-6">
            {highlight.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-3xl border border-white/80 bg-white/70 p-4 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.6)]"
              >
                <div className="h-24 w-20 overflow-hidden rounded-2xl bg-joie-mist/40">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-joie-text/50">Featured</p>
                  <h3 className="text-sm font-serif text-joie-text">{product.name}</h3>
                  <p className="text-xs text-joie-text/60">{formatJPY(product.price)}</p>
                  <Link href={`/products/${product.slug}`} className="mt-2 inline-flex text-[10px] uppercase tracking-[0.3em] text-joie-text/50">
                    View Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {usingFallback ? (
        <div className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-amber-900">
          Supabase が未接続のため、デモ商品を表示しています。
        </div>
      ) : null}

      <section id="about" className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/70 bg-white/70 p-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-joie-text/50">Concept</p>
          <h2 className="mt-4 text-2xl font-serif text-joie-ink">Simple, honest, gentle.</h2>
        </div>
        <div className="rounded-3xl border border-white/70 bg-white/70 p-8 text-sm leading-loose text-joie-text/70">
          髪本来の美しさを引き出すために。余計なものは入れず、本当に必要な成分だけを厳選しました。
          サロン帰りの軽やかな手触りを、毎日のケアで。
        </div>
      </section>

      <section id="products" className="space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-joie-text/50">Products</p>
            <h2 className="mt-3 text-3xl font-serif text-joie-ink">ラインナップ</h2>
          </div>
          <Link
            href="/cart"
            className="rounded-full border border-joie-text/20 px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-joie-text/70 transition hover:border-joie-text"
          >
            View Cart
          </Link>
        </div>
        <ProductGrid products={products} />
      </section>

      <section id="guide" className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "配送について",
            body: "全国配送に対応。決済完了後、3営業日以内に出荷します。",
          },
          {
            title: "お支払い方法",
            body: "クレジットカード決済（Visa / Master / Amex / JCB）。",
          },
          {
            title: "サポート",
            body: "商品に関するご相談はお問い合わせフォームからご連絡ください。",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/70 bg-white/70 p-6">
            <p className="text-[11px] uppercase tracking-[0.4em] text-joie-text/50">Guide</p>
            <h3 className="mt-3 text-lg font-serif text-joie-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-joie-text/70">{item.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
