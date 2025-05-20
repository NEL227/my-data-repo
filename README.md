# 業務効率化ツール

業務効率化のための各種機能を1つにまとめたスクリプトツールです。  
ユーザーは **ローダースクリプトのみをインストール**すれば、自動的に最新版の本体スクリプトを取得して動作します。

---

## ✅ インストール方法

1. **Tampermonkey をインストールしていない方はこちらから追加してください：**

- [Chrome 拡張](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)  
- [Firefox アドオン](https://addons.mozilla.org/ja/firefox/addon/tampermonkey/)

2. **ご使用のブラウザで Tampermonkey を「開発者モード」で有効にしてください。**

Chromeの場合：

- アドレスバーに `chrome://extensions/` と入力し、Tampermonkeyの右上にある「開発者モード」をオンにします。

※ GitHubのスクリプトをオンラインで読み込むため、Tampermonkeyがこのモードで動作している必要があります。

3. **以下のリンクをクリックしてスクリプトをインストールしてください：**  
👉 [業務効率化ツール統合版（ローダー）をインストール](https://raw.githubusercontent.com/NEL227/work-toolkit/main/script/%E6%A5%AD%E5%8B%99%E5%8A%B9%E7%8E%87%E5%8C%96%E3%83%84%E3%83%BC%E3%83%AB%E7%B5%B1%E5%90%88%E7%89%88-1.00.user.js)

---

## ⚙️ スクリプトの仕組み

- インストールされるのは **ローダースクリプト** のみです。
- 本体スクリプト（最新版）は GitHub から自動取得され、実行されます。
- バージョンアップ時もローダー側はそのままで問題ありません。

---

## 📬 お問い合わせ

本ツールは、一部のWebサイトに対して機能を追加・変更するユーザースクリプトです。  
動作に不具合などが生じる可能性もございますので、気になる点やご要望がありましたら、
[Issue](https://github.com/NEL227/work-toolkit/issues) よりお気軽にお知らせください。
