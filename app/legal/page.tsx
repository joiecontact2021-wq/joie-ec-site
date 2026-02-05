export default function LegalPage() {
  return (
    <div className="space-y-6">
      <nav className="text-[10px] tracking-[0.35em] text-joie-text/60">
        ホーム / 特定商取引法に基づく表記
      </nav>
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/70 bg-white/70 p-10">
        <h1 className="mb-12 text-center text-2xl font-serif tracking-widest">特定商取引法に基づく表記</h1>

        <div className="space-y-8 text-sm leading-relaxed text-joie-text/80">
          <div className="grid grid-cols-1 gap-4 border-b border-joie-accent/20 pb-6 md:grid-cols-3">
            <div className="font-bold">販売業者</div>
            <div className="md:col-span-2">joie (ジョワ)</div>
          </div>

          <div className="grid grid-cols-1 gap-4 border-b border-joie-accent/20 pb-6 md:grid-cols-3">
            <div className="font-bold">運営統括責任者名</div>
            <div className="md:col-span-2">[下城　洋美]</div>
          </div>

          <div className="grid grid-cols-1 gap-4 border-b border-joie-accent/20 pb-6 md:grid-cols-3">
            <div className="font-bold">所在地</div>
            <div className="md:col-span-2">
              〒550-0014<br />
              [大阪市西区北堀江1-17-20FelistaHorie501]<br />
              ※開示請求があった場合、遅滞なく開示いたします。
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 border-b border-joie-accent/20 pb-6 md:grid-cols-3">
            <div className="font-bold">電話番号</div>
            <div className="md:col-span-2">
              00-0000-0000<br />
              <span className="text-xs text-joie-accent">
                ※お電話での問い合わせは受け付けておりません。メールにてご連絡ください。
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 border-b border-joie-accent/20 pb-6 md:grid-cols-3">
            <div className="font-bold">メールアドレス</div>
            <div className="md:col-span-2">joiecontact2021@gmail.com</div>
          </div>

          <div className="grid grid-cols-1 gap-4 border-b border-joie-accent/20 pb-6 md:grid-cols-3">
            <div className="font-bold">お支払方法</div>
            <div className="md:col-span-2">クレジットカード決済 (Visa, Mastercard, American Express, JCB)</div>
          </div>

          <div className="grid grid-cols-1 gap-4 border-b border-joie-accent/20 pb-6 md:grid-cols-3">
            <div className="font-bold">販売価格について</div>
            <div className="md:col-span-2">
              ・販売価格は、表示された金額（表示価格・消費税込）とします。<br />
              ・なお、商品代金以外に送料や各種手数料がかかる場合がございます。各商品ページや、お支払方法の選択ページ、注文内容のご確認ページをご確認ください。
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 border-b border-joie-accent/20 pb-6 md:grid-cols-3">
            <div className="font-bold">返品・交換について</div>
            <div className="md:col-span-2">
              商品に欠陥がある場合を除き、基本的には返品には応じません。<br />
              万が一不良品がございましたら、商品到着後7日以内にご連絡ください。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
