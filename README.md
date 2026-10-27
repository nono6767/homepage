# homepage
スタジオ公式サイト ― Enber Pilates（アンバーピラティス）

HTML / CSS / JavaScript のみで作成した1ページ構成のサイトです（GitHub Pages 対応）。

## ファイル構成
- `index.html` … トップページ（1ページ構成）
- `about.html` … 私たちについて（店名の由来）
- `reserve.html` / `js/reserve.js` … 体験レッスン予約ページ（カレンダーで希望日を選択）
- `css/style.css` … デザイン（スマホファースト、768px以上でPCレイアウト）
- `js/main.js` … スマホメニュー、固定予約ボタン、フェードイン

## 公開方法（GitHub Pages）
Settings → Pages → Branch を `main` / `(root)` に設定してください。

## 差し替えが必要な箇所（`index.html`）
- **写真**：スタジオのイメージ画像は `images/` に入っています（仮）。インストラクター写真3枚は仮画像枠（「ここに〜の写真」）のままです
- **アクセス**：住所の番地・ビル名・郵便番号、営業時間・定休日、地図枠を Google マップの iframe に置き換え
- **予約・お問い合わせ**：Web予約 / LINE / Instagram ボタンの `href="#"` を実際のURLに
- **予約フォームの送信先**：`reserve.html` はまだ送信されません（確認画面まで）。Formspree などの送信先が決まったら接続します
- **FAQ**：男性の受け入れ・キャンセル規定などをスタジオのルールに合わせて調整
