# 業務効率化ツール

業務効率化のための各種機能を1つにまとめたスクリプトツールです。  
**ローダースクリプトのみをインストール**すれば、
自動的に最新版の本体スクリプトを取得して動作します。

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
> 1. アドレスバーに `edge://extensions/` と入力してアクセスしてください。  
> 2. 拡張機能ページの **左** にある  
> 　「**他のストアからの拡張機能を許可する**」トグルを **オン** にしてください。  
> 3. 表示された確認ダイアログで「許可」をクリックしてください。  
>  
> この設定を有効にしないと、Chrome Web Store から拡張機能を追加できません。

2. **ご使用のブラウザで 「デベロッパーモード」または「開発者モード」を有効にしてください。**

Chromeの場合：  
- アドレスバーに `chrome://extensions/` と入力し、ページ右上にある「デベロッパーモード」をオンにします。  
※ GitHubのスクリプトをオンラインで読み込むため、Tampermonkeyがこのモードで動作している必要があります。

3. **以下のリンクをクリックしてスクリプトをインストールしてください：**  
👉 [業務効率化ツール統合版（ローダー）をインストール](https://raw.githubusercontent.com/NEL227/work-toolkit/main/script/業務効率化ツールローダー.user.js)

> 本ツールは Chrome を使用して動作確認を行っております。<br>
> 他のブラウザ（例：Edge、Opera、Firefoxなど）でも基本的には動作するはずですが、<br>
> 挙動が異なる場合がある点をあらかじめご了承ください。

---

## ⚙️ スクリプトの仕組み

- インストールされるのは **ローダースクリプト** のみです。  
- 本体スクリプト（最新版）は GitHub から自動取得され、実行されます。  
- バージョンアップ時もローダー側はそのままで問題ありません。

---

## 📖 使用方法

使用方法のページは現在準備中です。  
準備が整い次第、こちらにリンクを設置いたしますので、今しばらくお待ちください。

---

## 📬 お問い合わせ

本ツールは、一部のWebサイトに対して機能を追加・変更するスクリプトツールです。  
動作に不具合などが生じる可能性もございますので、気になる点やご要望がありましたら、  
[Issue](https://github.com/NEL227/work-toolkit/issues) かTeamsよりお気軽にお知らせください。
