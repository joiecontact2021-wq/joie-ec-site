import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <nav className="font-ui text-[10px] tracking-[0.35em] text-joie-text/60">
        <Link href="/" className="hover:text-joie-text">
          ホーム
        </Link>{" "}
        / プライバシーポリシー
      </nav>
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/70 bg-white/70 p-6 sm:p-10">
        <div className="mb-6 flex justify-center sm:mb-8">
          <img
            src="/joie-mark.png"
            alt="joie"
            className="h-24 w-24 object-contain sm:h-28 sm:w-28"
            loading="eager"
          />
        </div>
        <h1 className="font-ui mb-10 text-center text-2xl tracking-widest sm:mb-12">
          プライバシーポリシー
        </h1>

        <div className="space-y-10 text-sm leading-relaxed text-joie-text/80 sm:text-[15px]">
          <section className="space-y-4">
            <h2 className="text-base font-bold">1. 当ショップが取得するお客様情報</h2>
            <p>
              当ショップは、以下のお客様情報を、a.当ショップに関するサービス上でお客様自身が直接入力する方法、b.お客様が当ショップに対し、電子メール、郵便、書面、電話等の手段により提供する方法、c.お客様の当ショップに関するサービスの利用又は閲覧の際に収集する方法等により取得します。
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold">お客様による商品の購入等に際して取得する情報</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>お客様の氏名、住所、職業等の基本的情報</li>
                  <li>お客様の電話番号、メールアドレス等連絡先に関する情報</li>
                  <li>お客様の銀行口座情報等の情報</li>
                  <li>その他お客様及びお客様による商品の購入等に関する情報</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">お客様による当ショップの利用に際して取得するその他の情報</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>お客様が購入した商品等、当ショップの利用に関する情報</li>
                  <li>お客様の当ショップ上での決済状況に関する情報</li>
                  <li>
                    お客様が当ショップを利用する際のクッキー、IPアドレス、端末の種類、携帯端末識別子、ブラウザの種類、ブラウザの言語、参照元URL、プラットフォームの種類、ページ閲覧数、ページ閲覧時間及び当ショップのアプリ又はウェブサイトにおけるアクティビティを行った日時
                  </li>
                  <li>その他お客様による当ショップの利用に関する情報</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">当ショップがお客様に対して行うアンケートに際して取得する情報</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>お客様による当ショップの利用状況、当ショップに関する要望等その他お客様によるアンケートへの回答内容</li>
                  <li>その他お客様へのアンケートに関する情報</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-bold">2. 利用目的</h2>
            <p>当ショップは、先に記載したお客様情報を以下の目的に利用します。</p>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold">お客様に対する当ショップに関するサービスの提供等</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>当ショップを利用した商品等の購入等を確認するため</li>
                  <li>当ショップに関する請求、支払いとその確認のため</li>
                  <li>その他お客様に当ショップに関するサービスを提供するため</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">当ショップに関するサービスの改善及び新サービスの立案等</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>当ショップの利用状況・利用態様等に関する調査・分析のため</li>
                  <li>お客様に対する当ショップに関するアンケートの実施のため</li>
                  <li>調査等への協力に対して謝礼等を送るため</li>
                  <li>当ショップに関するサービスの改善・改良及び新サービスの立案のため</li>
                  <li>当ショップに関するサービスの内容を個々のお客様に合わせてカスタマイズするため</li>
                  <li>新サービスの企画立案・研究開発のため</li>
                  <li>その他当ショップのサービスの品質向上のため</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">当ショップに関するサービスに関する案内、お客様からの問い合わせ等への対応等</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>当ショップに関するサービスに係る連絡や情報提供を行うため</li>
                  <li>電子メール配信サービスの申し込みの確認やメールを配信するため</li>
                  <li>キャンペーンの案内のため</li>
                  <li>応募があった懸賞等に対して景品等を送るため</li>
                  <li>新商品、新サービス等の案内に利用するため</li>
                  <li>利用規約の変更等当ショップに関するサービスに係る重大な変更をお知らせするため</li>
                  <li>お客様による問い合わせ、請求等への対応のため</li>
                  <li>その他当ショップの利用に関してお客様と適切な連絡を行うため</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">広告、マーケティング等</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>当ショップの広告の配信、表示又は効果測定のため</li>
                  <li>その他広告及びマーケティングを目的とした施策を実施するため</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">管理運営等</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>お客様の当ショップに関するサービスの利用状況や登録情報の確認のため</li>
                  <li>お客様による規約の遵守状況の確認のため</li>
                  <li>規約違反が疑われる又は規約違反が認められたお客様への対応その他当ショップ運営上のトラブルの解決のため</li>
                  <li>その他お客様による安全な利用の確保及び当ショップに関するサービスの品質の保持に必要な措置を実施するため</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">第三者への提供</h3>
                <ul className="list-disc space-y-1 pl-5">
                  <li>
                    カード発行会社が行う不正利用検知・防止のために、お客様が利用されているカード発行会社へ提供するため（EMV 3-D セキュアの利用のため）
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-bold">3. お客様情報の第三者への預託、提供について</h2>
            <p>
              当ショップは、以下のような場合において、お客様情報を第三者に提供、預託することがあります。なお、かかる場合において、当ショップは、必要に応じて、当該提供先について、当ショップが定める基準を満たす者であるか審査を行い、当ショップの適切な監督のもと、お客様情報を預託、提供し、契約に際してはお客様情報が適正に管理されるように契約内容に配慮します。
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold">業務委託先への預託・提供</h3>
                <p>
                  お客様情報の処理、お客様への情報提供、キャンペーン・アンケートの実施及び当ショップに関するサービスの利用状況等に関する調査又は分析等を行うために、業務の全部又は一部を他の企業に委託する場合
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">当ショップの協力事業者・提携先への預託・提供</h3>
                <p>
                  当ショップに関するサービス提供のため、他の企業等と協力関係・提携関係を結ぶ場合（当ショップの広告の配信、表示又は効果測定を目的として、広告配信サービス提供会社、広告代理店その他の広告に関連する事業者等との間で、協力関係・提携関係を結ぶ場合を含みます。）
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">事業の承継等に伴う承継先等への提供</h3>
                <p>
                  合併、会社分割、及び事業譲渡等により他の企業に当ショップに関するサービスを含む事業を承継させる場合。（当ショップが別途法人を設立して当ショップの事業を当該法人に承継する場合を含みます。）
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">法令等に基づく提供</h3>
                <p>
                  法令等に基づき、裁判所、行政機関、監督官庁その他の公的機関からお客様情報を提供するよう求められた場合
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">第三者との紛争解決のため</h3>
                <p>
                  第三者との紛争解決のため、又は当ショップに関するサービスのお客様や第三者の権利利益を確保するためにお客様情報の提供が必要と判断した場合
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">カード発行会社への提供</h3>
                <p>
                  当ショップではEMV 3-D セキュアを導入しており、不正利用検知・防止のために、氏名・電話番号・メールアドレス等のお客様情報をお客様が利用されているカード発行会社へ提供します。なお、お客様が利用されているカード発行会社が外国にある場合、これらの情報は当該発行会社が所属する国に移転される場合があります。当社では、お客様から収集した情報からは、ご利用のカード発行会社及び当該会社が所在する国を特定することができないため、以下の個人情報保護措置に関する情報を把握して、ご提供することはできません。
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  <li>提供先が所在する外国の名称</li>
                  <li>当該国の個人情報保護制度に関する情報</li>
                  <li>発行会社の個人情報保護の措置</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-bold">4. 安全管理措置</h2>
            <p>
              当ショップでは、お客様情報の紛失、破壊、改ざん並びに不正アクセス及び漏えい等が起きないように、お客様情報について厳重に管理を行います。なお、3のとおり、当ショップでは、個人情報の取扱いを他の企業等に委託する場合がありますが、この場合当ショップは当該企業に対して適切な監督を行うものとします。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold">5. お問い合わせ先</h2>
            <p>
              本ポリシーに関するお問い合わせは、特定商取引法に基づく表記に記載の連絡先（メール）までお願いいたします。<br />
              メール: joiecontact2021@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
