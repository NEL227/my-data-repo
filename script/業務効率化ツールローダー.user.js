// ==UserScript==
// @name         業務効率化ツールローダー
// @namespace    http://tampermonkey.net/
// @version      1.01
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
// @connect      plus-nao.com
// @connect      raw.githubusercontent.com
// @connect      work-toolkit.vercel.app
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/NEL227/work-toolkit/main/script/業務効率化ツールローダー.user.js
// @downloadURL  https://raw.githubusercontent.com/NEL227/work-toolkit/main/script/業務効率化ツールローダー.user.js
// ==/UserScript==

(function () {
    'use strict';

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
        if (code) {
            injectScript(code);
        } else {
            console.warn("キャッシュされたスクリプトが存在しません。");
        }
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
