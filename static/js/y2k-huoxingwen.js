// 火星文模式：悬浮按钮一键把全站文字变成火星文（2005 年味儿拉满）
// 依赖 huoxingwen-lib.js 提供的字符表；还原用 WeakMap 存原文，无损
(function () {
    'use strict';

    var STORE_KEY = 'y2k-huoxingwen';
    var active = false;
    var hxMap = null;               // 简体/繁体字符 → 火星文
    var originals = new WeakMap();  // 文本节点 → 原文
    var touched = [];               // 转换过的文本节点（供还原遍历）
    var observer = null;
    var btn = null;

    function buildMap() {
        if (hxMap) return;
        var jt = charjt(), ft = charft(), hx = charhx();
        hxMap = new Map();
        for (var i = 0; i < hx.length; i++) {
            hxMap.set(jt.charAt(i), hx.charAt(i));
            hxMap.set(ft.charAt(i), hx.charAt(i));
        }
    }

    function toMars(str) {
        var rs = '';
        for (var i = 0; i < str.length; i++) {
            var c = str.charAt(i);
            rs += hxMap.get(c) || c;
        }
        return rs;
    }

    var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, CODE: 1, PRE: 1, TEXTAREA: 1, INPUT: 1 };

    function eachTextNode(root, fn) {
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                var p = node.parentElement;
                if (!p || SKIP_TAGS[p.tagName] || p.closest('.y2k-hxw-btn')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return /\S/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
            }
        });
        var n;
        while ((n = walker.nextNode())) fn(n);
    }

    function convertNode(node) {
        if (!originals.has(node)) {
            originals.set(node, node.nodeValue);
            touched.push(node);
        }
        node.nodeValue = toMars(originals.get(node));
    }

    function enable() {
        buildMap();
        eachTextNode(document.body, convertNode);
        // 动态加载的内容（加载更多、搜索结果）也跟着转换
        observer = new MutationObserver(function (mutations) {
            for (var m of mutations) {
                for (var node of m.addedNodes) {
                    if (node.nodeType === Node.TEXT_NODE) convertNode(node);
                    else if (node.nodeType === Node.ELEMENT_NODE) eachTextNode(node, convertNode);
                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        active = true;
        try { localStorage.setItem(STORE_KEY, '1'); } catch (e) { /* 隐私模式忽略 */ }
        syncButton();
    }

    function disable() {
        if (observer) { observer.disconnect(); observer = null; }
        for (var node of touched) {
            if (node.isConnected && originals.has(node)) {
                node.nodeValue = originals.get(node);
            }
        }
        active = false;
        try { localStorage.removeItem(STORE_KEY); } catch (e) { /* 忽略 */ }
        syncButton();
    }

    function syncButton() {
        if (!btn) return;
        btn.textContent = active ? '✦ 地球文 ✦' : '✦ 火星文 ✦';
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        btn.classList.toggle('hxw-on', active);
    }

    function init() {
        if (typeof charhx !== 'function') return; // 字符表未加载
        btn = document.createElement('button');
        btn.className = 'y2k-hxw-btn';
        btn.type = 'button';
        btn.title = '一键切换火星文/地球文';
        document.body.appendChild(btn);
        btn.addEventListener('click', function () {
            active ? disable() : enable();
        });
        var saved = false;
        try { saved = localStorage.getItem(STORE_KEY) === '1'; } catch (e) { /* 忽略 */ }
        if (saved) enable(); else syncButton();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
