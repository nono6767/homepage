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
- **写真**：仮画像枠（「ここに〜の写真」と書かれた `class="... ph"` の部分）を `<img src="images/xxx.jpg" alt="...">` に置き換え
- **インストラクター3名**：名前・経歴・資格・メッセージは仮の内容です
- **アクセス**：住所の番地・ビル名・郵便番号、営業時間・定休日、地図枠を Google マップの iframe に置き換え
- **予約・お問い合わせ**：Web予約 / LINE / Instagram ボタンの `href="#"` を実際のURLに
- **FAQ**：男性の受け入れ・キャンセル規定などをスタジオのルールに合わせて調整
- **料金の税表記**：月額プランの税込／税別の表記を確認
