// ==UserScript==
// @name         業務効率化ツールローダー
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  業務支援ツールを自動で取得・更新するローダースクリプト
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        GM_addValueChangeListener
// @grant        GM_deleteValue
// @connect      plus-nao.com
// @connect      raw.githubusercontent.com
// @connect      work-toolkit.vercel.app
// @connect      tk2-217-18298.vs.sakura.ne.jp
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/NEL227/work-toolkit/main/script/業務効率化ツールローダー.user.js
// @downloadURL  https://raw.githubusercontent.com/NEL227/work-toolkit/main/script/業務効率化ツールローダー.user.js
// ==/UserScript==

(function () {
    'use strict';

    if (window.top !== window.self) return;
    if (window.__my_unique_toolkit_loader) return;
    window.__my_unique_toolkit_loader = true;

    const SCRIPT_URL = 'https://raw.githubusercontent.com/NEL227/work-toolkit/main/script/業務効率化ツール本体.user.js';
    const STORAGE_KEY_CODE = 'cached_script_code';
    const STORAGE_KEY_DATE = 'cached_script_date';
    const STORAGE_KEY_VERSION = 'cached_script_version';

    const today = new Date().toISOString().slice(0, 10);
    const lastUpdate = GM_getValue(STORAGE_KEY_DATE, '');
    const currentVersion = GM_getValue(STORAGE_KEY_VERSION, '0.0');

    GM_registerMenuCommand(`🔄 手動更新を実行（現在：v${currentVersion}）`, () => {
        alert("最新スクリプトを取得中です…");
        fetchAndUpdateScript(true);
    });

    if (lastUpdate !== today) {
        fetchAndUpdateScript(false);
    } else {
        useCachedScript();
    }

    function fetchAndUpdateScript(isManual) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: SCRIPT_URL,
            onload: (res) => {
                if (res.status === 200) {
                    const code = res.responseText;
                    const newVersion = extractVersion(code);
                    const oldVersion = GM_getValue(STORAGE_KEY_VERSION, '0.0');

                    if (!newVersion) return useCachedScript();

                    const versionChanged = compareVersions(newVersion, oldVersion) > 0;

                    if (versionChanged || isManual) {
                        GM_setValue(STORAGE_KEY_CODE, code);
                        GM_setValue(STORAGE_KEY_DATE, today);
                        GM_setValue(STORAGE_KEY_VERSION, newVersion);
                    }

                    if (isManual) {
                        if (versionChanged) {
                            alert(`✅ スクリプトは最新バージョン（v${newVersion}）に更新されました。\nページをリロードすると反映されます。`);
                        } else {
                            alert(`🟡 現在のスクリプトはすでに最新（v${oldVersion}）です。`);
                        }
                        return;
                    }

                    useCachedScript();

                } else {
                    if (isManual) alert("⚠️ スクリプトの取得に失敗しました。");
                    useCachedScript();
                }
            },
            onerror: () => {
                if (isManual) alert("⚠️ スクリプトの取得中にエラーが発生しました。");
                useCachedScript();
            }
        });
    }

    function useCachedScript() {
        const code = GM_getValue(STORAGE_KEY_CODE, '');
        let brokenCount = GM_getValue('cache_broken_count', 0);

        if (code && isCacheValid(code)) {
            GM_setValue('cache_broken_count', 0);
            injectScript(code);
        } else {
            if (brokenCount >= 3) {
                return;
            }
            brokenCount++;
            GM_setValue('cache_broken_count', brokenCount);

            if (brokenCount === 5) {
                alert("何度もキャッシュ破損を検出しました。スクリプト開発者へご連絡ください。");
                return;
            }
            alert("⚠️ スクリプトキャッシュが壊れているため再取得します。");

            fetchAndUpdateScript(true);

            setTimeout(() => {
                if (confirm("再取得が完了しました。\nページをリロードして最新のスクリプトを反映しますか？")) {
                    location.reload();
                } else {
                    alert("リロードを中止しました。手動でページを再読み込みしてください。");
                }
            }, 2500);
        }
    }

    function isCacheValid(code) {
        return code.includes('// @integrity-check:toolkit_end');
    }

    function injectScript(code) {
        window.GM_addStyle = function(css) {
            const style = document.createElement('style');
            style.textContent = css;
            document.head.appendChild(style);
        };

        try {
            eval(code);
        } catch (e) {
            console.error("スクリプトの実行中にエラー:", e);
        }
    }

    function extractVersion(code) {
        const match = code.match(/@version\s+([\d.]+)/);
        return match ? match[1] : null;
    }

    function compareVersions(a, b) {
        const pa = a.split('.').map(Number);
        const pb = b.split('.').map(Number);
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
            const na = pa[i] || 0, nb = pb[i] || 0;
            if (na > nb) return 1;
            if (na < nb) return -1;
        }
        return 0;
    }
})();
