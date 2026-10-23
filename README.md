# homepage
スタジオ公式サイト ― Enber Pilates（アンバーピラティス）

HTML / CSS / JavaScript のみで作成した1ページ構成のサイトです（GitHub Pages 対応）。

## ファイル構成
- `index.html` … ページ本体
- `css/style.css` … デザイン（スマホファースト、768px以上でPCレイアウト）
- `js/main.js` … スマホメニュー、固定予約ボタン、フェードイン

## 公開方法（GitHub Pages）
Settings → Pages → Branch を `main` / `(root)` に設定してください。

## 差し替えが必要な箇所（`index.html`）
- **写真**：`class="... ph"` の仮画像枠を `<img src="images/xxx.jpg" alt="...">` に置き換え
- **インストラクター3名**：名前・経歴・資格・メッセージは仮の内容です
- **アクセス**：住所・最寄り駅・営業時間・定休日、地図枠を Google マップの iframe に置き換え
- **予約・お問い合わせ**：Web予約 / LINE / Instagram ボタンの `href="#"` を実際のURLに
- **FAQ**：キャンセル規定・回数繰り越しなどスタジオのルールに合わせて調整
- **料金の税表記**：月額プランの税込／税別の表記を確認
