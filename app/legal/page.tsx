export default function LegalPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-light text-center mb-12 tracking-widest">特定商取引法に基づく表記</h1>
      
      <div className="space-y-8 text-sm leading-relaxed text-joie-text/90">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-joie-accent/20 pb-6">
          <div className="font-bold">販売業者</div>
          <div className="md:col-span-2">joie (ジョワ)</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-joie-accent/20 pb-6">
          <div className="font-bold">運営統括責任者名</div>
          <div className="md:col-span-2">[あなたの氏名を入力]</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-joie-accent/20 pb-6">
          <div className="font-bold">所在地</div>
          <div className="md:col-span-2">
            〒550-0014<br />
            [大阪市西区北堀江1-17-20FelistaHorie501]<br />
            ※開示請求があった場合、遅滞なく開示いたします。
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-joie-accent/20 pb-6">
          <div className="font-bold">電話番号</div>
          <div className="md:col-span-2">
            00-0000-0000<br />
            <span className="text-xs text-joie-accent">※お電話での問い合わせは受け付けておりません。メールにてご連絡ください。</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-joie-accent/20 pb-6">
          <div className="font-bold">メールアドレス</div>
          <div className="md:col-span-2">contact@example.com</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-joie-accent/20 pb-6">
          <div className="font-bold">お支払方法</div>
          <div className="md:col-span-2">クレジットカード決済 (Visa, Mastercard, American Express, JCB)</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-joie-accent/20 pb-6">
          <div className="font-bold">商品代金以外の<br/>必要料金</div>
          <div className="md:col-span-2">
            ・消費税<br />
            ・送料（全国一律 〇〇円 / 〇〇円以上で送料無料）
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-joie-accent/20 pb-6">
          <div className="font-bold">返品・交換について</div>
          <div className="md:col-span-2">
            商品に欠陥がある場合を除き、基本的には返品には応じません。<br />
            万が一不良品がございましたら、商品到着後7日以内にご連絡ください。
          </div>
        </div>

      </div>
    </div>
  );
}