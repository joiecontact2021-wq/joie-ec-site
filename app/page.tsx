import Image from "next/image";

export default function Home() {
  const dummyProducts = [
    { id: 1, name: "Moisture Shampoo", price: 3800, image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, name: "Treatment Oil", price: 4200, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=2670&auto=format&fit=crop" },
    { id: 3, name: "Styling Balm", price: 2800, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2574&auto=format&fit=crop" },
    { id: 4, name: "Scalp Essence", price: 3500, image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2680&auto=format&fit=crop" },
  ];

  return (
    <div className="pb-32">
      {/* メインビジュアル */}
      <section className="relative w-full h-[85vh] overflow-hidden mb-24">
        <Image 
          src="https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2626&auto=format&fit=crop" 
          alt="Salon Atmosphere"
          fill
          className="object-cover object-center opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif tracking-widest mb-6 drop-shadow-sm">
            Simple & Minimal
          </h1>
          <p className="text-sm md:text-base font-light tracking-[0.2em] opacity-90">
            日々の生活に、小さな喜びを。
          </p>
        </div>
      </section>

      {/* コンセプト */}
      <section className="max-w-2xl mx-auto text-center px-6 mb-32 space-y-8">
        <h2 className="text-2xl font-serif tracking-widest text-gray-800">Concept</h2>
        <p className="text-sm leading-loose text-gray-500 font-light">
          髪本来の美しさを引き出すために。<br/>
          余計なものは入れず、本当に必要な成分だけを厳選しました。<br/>
          あなたの日常に寄り添う、シンプルで上質なケアを。
        </p>
      </section>

      {/* 商品一覧 */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-3xl font-serif tracking-[0.2em] mb-16 text-gray-800">
          PRODUCTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {dummyProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5] mb-6">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-base font-serif tracking-wide text-gray-800 group-hover:text-gray-500 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-400 tracking-widest">
                  ¥{product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}