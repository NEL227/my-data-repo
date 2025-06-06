# 業務効率化ツール

業務効率化のための各種機能を1つにまとめたスクリプトツールです。  
**ローダースクリプトをインストール**すれば、自動的に最新版の本体スクリプトを取得して動作します。

---

## ✅ インストール方法

### 1. Tampermonkey をインストール

ご使用のブラウザに応じて、以下のリンクから Tampermonkey 拡張機能を追加してください：

- [Chrome 用](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Firefox 用](https://addons.mozilla.org/ja/firefox/addon/tampermonkey/)
- [Edge 用（Chrome Web Store 経由）](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)

> 💡 **Edge をご利用の方へ：**
> Chrome ウェブストアから拡張機能を追加するには、以下の設定が必要です：
>
> 1. アドレスバーに `edge://extensions/` と入力して拡張機能のページにアクセス
> 2. ページ左側にある「**他のストアからの拡張機能を許可する**」トグルを **オン** にする
> 3. 表示された確認ダイアログで「許可」をクリックする

---

### 2. 開発者モードを有効にする

GitHub 上のスクリプトを Tampermonkey が正しく読み込むためには、**開発者モード**を有効にする必要があります。

#### ✅ Chrome の場合：

1. アドレスバーに `chrome://extensions/` と入力してアクセス
2. 拡張機能ページ右上にある「**デベロッパーモード**」を **オン** にしてください

#### ✅ Edge の場合：

1. アドレスバーに `edge://extensions/` と入力してアクセス
2. 拡張機能ページ左側にある「**開発者モード**」を **オン** にしてください

#### ✅ Firefox の場合：

Tampermonkey は Firefox でそのまま動作します。  
**開発者モードを有効にする必要はありません**。

Tampermonkey によってインストール画面が表示されるので
「インストール」をクリックするだけでOKです。

> Firefox では特別な設定は不要ですが、Tampermonkey のバージョンが古い場合は正常に動作しないことがあります。  
> 通常は自動で更新されますが、動作に問題がある場合は公式ページから最新版に更新してください。

---

### 3. スクリプトをインストール

以下のリンクをクリックして、スクリプトを Tampermonkey に追加してください：

👉 [業務効率化ツールローダーをインストール](https://raw.githubusercontent.com/NEL227/work-toolkit/main/script/業務効率化ツールローダー.user.js)

Tampermonkey のインストール確認画面が表示されますので、「インストール」ボタンをクリックしてください。

---

### 4. Tampermonkey の自動更新を有効にする

本ツールをご利用の際は、Tampermonkey の「自動更新」機能を有効にしておいてください。  
自動更新が無効の場合、最新の機能や修正が反映されず、正常に動作しないことがあります。

#### ✅ 設定方法（Chrome/Edge/Firefox）

1. ブラウザ右上の Tampermonkey アイコンをクリックし、「**ダッシュボード**」を開きます  
　（または「拡張機能の管理」から Tampermonkey のオプションを開いてもOKです）

2. 画面上部メニューから「**設定**」タブを選択します

3. 下にスクロールし、「**UserScript の更新**」セクションを探します。

4.  
　- 「**無効化されているスクリプトを更新する**」に**チェックを入れてください**（初期設定はオフです）  
　- 「**確認の間隔**」が「**毎日**」になっていることを確認してください（初期設定は「毎日」）

5.  
　- 「**外部**」セクションの「**更新間隔**」も「**毎日**」に設定してください（初期設定は「しない」になっています）

このように設定されていればOKです
![image](https://github.com/user-attachments/assets/33cd80ab-d311-4a77-ae87-a0f5c01d7d90)

---

> 本ツールは **Chrome** を使用して動作確認を行っております。  
> 他のブラウザでも基本的には動作しますが、挙動が異なる場合があります。  
> 万が一うまく動作しない場合は、Chrome でのご利用をお試しください。

---

## ⚙️ スクリプトの仕組み

- インストールされるのは、外部から本体スクリプトを自動で読み込み・実行する **ローダースクリプト** のみです。
- 本体スクリプトは GitHub から毎日自動取得され、最新の状態で実行されます。
- **ローダースクリプト自体も更新する場合がありますので、Tampermonkey の自動更新は必ず有効にしておいてください。**

---

## 📬 お問い合わせ

本ツールは、一部の Web サイトに対して機能を追加・変更するスクリプトツールです。  
動作に不具合などが生じる可能性もございますので、気になる点やご要望がありましたら、  
[Issue](https://github.com/NEL227/work-toolkit/issues) または Teamsよりお気軽にお知らせください。
