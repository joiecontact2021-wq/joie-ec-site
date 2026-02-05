export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <nav className="text-[10px] tracking-[0.35em] text-joie-text/60">
        ホーム / プライバシーポリシー
      </nav>
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/70 bg-white/70 p-10">
        <h1 className="mb-12 text-center text-2xl font-serif tracking-widest">プライバシーポリシー</h1>

        <div className="space-y-8 text-sm leading-relaxed text-joie-text/80">
          <section>
            <h2 className="mb-2 text-base font-bold">1. 個人情報の利用目的</h2>
            <p>
              当サロンは、お客様から収集した個人情報を以下の目的で利用いたします。<br />
              ・商品の発送および代金の請求<br />
              ・ご注文内容や配送方法などの連絡<br />
              ・当サロンのサービス向上、商品開発
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold">2. 個人情報の第三者への開示</h2>
            <p>
              当サロンは、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold">3. 個人情報の管理</h2>
            <p>当サロンは、お客様の個人情報を漏洩、紛失がないよう厳重に管理いたします。</p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-bold">4. お問い合わせ</h2>
            <p>
              個人情報の取り扱いに関するお問い合わせは、以下の連絡先までお願いいたします。<br />
              joie (ジョワ)<br />
              メール: joiecontact2021@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
