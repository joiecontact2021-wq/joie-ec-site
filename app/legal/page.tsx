export default function LegalPage() {
  return (
    <div className="space-y-6">
      <nav className="font-ui text-[10px] tracking-[0.35em] text-joie-text/60">
        ホーム / 特定商取引法に基づく表記
      </nav>
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/70 bg-white/70 p-6 sm:p-10">
        <h1 className="font-ui mb-10 text-center text-2xl tracking-widest sm:mb-12">
          特定商取引法に基づく表記
        </h1>

        <div className="space-y-6 text-sm leading-relaxed text-joie-text/80 sm:text-[15px]">
          <div className="grid grid-cols-1 gap-3 border-b border-joie-accent/20 pb-6 sm:grid-cols-3 sm:gap-6">
            <div className="font-bold">販売業者</div>
            <div className="sm:col-span-2">joie</div>
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-joie-accent/20 pb-6 sm:grid-cols-3 sm:gap-6">
            <div className="font-bold">運営統括責任者名</div>
            <div className="sm:col-span-2">下城　洋美</div>
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-joie-accent/20 pb-6 sm:grid-cols-3 sm:gap-6">
            <div className="font-bold">所在地</div>
            <div className="sm:col-span-2">
              〒550-0014
              <br />
              大阪市西区北堀江1-17-20 FelistaHorie501
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-joie-accent/20 pb-6 sm:grid-cols-3 sm:gap-6">
            <div className="font-bold">電話番号</div>
            <div className="sm:col-span-2">お問い合わせはメールのみ対応</div>
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-joie-accent/20 pb-6 sm:grid-cols-3 sm:gap-6">
            <div className="font-bold">メールアドレス</div>
            <div className="sm:col-span-2">joiecontact2021@gmail.com</div>
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-joie-accent/20 pb-6 sm:grid-cols-3 sm:gap-6">
            <div className="font-bold">お支払方法</div>
            <div className="sm:col-span-2">Stripeで利用できるクレジットカード</div>
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-joie-accent/20 pb-6 sm:grid-cols-3 sm:gap-6">
            <div className="font-bold">販売価格について</div>
            <div className="sm:col-span-2">
              <ul className="list-disc space-y-1 pl-5">
                <li>販売価格は、表示された金額（表示価格・消費税込）とします。</li>
                <li>
                  なお、商品代金以外に送料や各種手数料がかかる場合がございます。各商品ページや、お支払方法の選択ページ、注文内容のご確認ページをご確認ください。
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-joie-accent/20 pb-6 sm:grid-cols-3 sm:gap-6">
            <div className="font-bold">商品の引渡時期</div>
            <div className="sm:col-span-2">配送のご依頼を受けてから7日以内に発送いたします。</div>
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-joie-accent/20 pb-6 sm:grid-cols-3 sm:gap-6">
            <div className="font-bold">返品・交換について</div>
            <div className="sm:col-span-2">商品に欠陥がある場合を除き、返品には応じません。</div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
            <div className="font-bold">特記事項</div>
            <div className="sm:col-span-2">特になし</div>
          </div>
        </div>
      </div>
    </div>
  );
}
