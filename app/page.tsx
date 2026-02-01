import Image from "next/image";

export default function Home() {
  // 商品プレビュー用のダミー配列
  const dummyProducts = [
    { id: 1, name: "Original Shampoo", price: 3800 },
    { id: 2, name: "Treatment Oil", price: 4200 },
    { id: 3, name: "Styling Balm", price: 2800 },
    { id: 4, name: "Scalp Care Mist", price: 3500 },
  ];

  return (
    <div className="pb-20">
      {/* ヒーローセクション */}
      <section className="relative h-[60vh] bg-[#f0eee9] flex items-center justify-center mb-16">
        <div className="text-center space-y-4 px-4">
          <h1 className="text-3xl md:text-5xl font-light tracking-widest text-joie-text">
            Simple & Minimal
          </h1>
          <p className="text-sm md:text-base text-joie-accent tracking-wider">
            日々の生活に、小さな喜びを。
          </p>
        </div>
      </section>

      {/* 商品一覧セクション */}
      <section className="max-w-5xl mx-auto px-4">
        <h2 className="text-center text-xl tracking-widest mb-10 text-joie-text font-light">
          PRODUCTS
        </h2>

        {/* グリッド表示 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {dummyProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* 商品画像プレビュー（グレーの箱） */}
              <div className="relative aspect-[3/4] bg-gray-200 mb-4 overflow-hidden rounded-sm">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                  Coming Soon
                </div>
              </div>
              
              {/* 商品情報 */}
              <div className="text-center space-y-1">
                <h3 className="text-sm font-medium text-joie-text">{product.name}</h3>
                <p className="text-xs text-joie-accent">¥{product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}