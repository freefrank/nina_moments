// Y2K 特效：漫天飘落星星、鼠标星星尾迹、点击星星爆炸
// 触屏设备与 prefers-reduced-motion 用户自动禁用
(function () {
    'use strict';

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var finePointer = window.matchMedia('(pointer: fine)');

    if (reducedMotion.matches) return;

    var FLAVORS = ['', ' pink', ' blue', ' heart'];

    // 裁剪容器：所有特效元素装进 overflow:hidden 的固定层，绝不撑大页面
    var fxBack = document.createElement('div');
    fxBack.className = 'y2k-fx-back';
    var fxFront = document.createElement('div');
    fxFront.className = 'y2k-fx-front';

    /* ---------- 漫天飘落星星 ---------- */
    var SPARKLE_COUNT = window.innerWidth < 768 ? 8 : 18;

    function makeFaller() {
        var el = document.createElement('div');
        el.className = 'y2k-sparkle' + FLAVORS[Math.floor(Math.random() * FLAVORS.length)];
        el.style.left = (Math.random() * 98) + 'vw';
        var size = 7 + Math.random() * 10;
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        // 飘落时长 8~18 秒，负延迟让首屏就有星星在半空
        var dur = 8 + Math.random() * 10;
        el.style.animationDuration = dur.toFixed(1) + 's, 1.6s';
        el.style.animationDelay = (-Math.random() * dur).toFixed(1) + 's, ' + (Math.random() * 1.6).toFixed(1) + 's';
        fxBack.appendChild(el);
    }

    /* ---------- 鼠标星星尾迹（节流 + 上限） ---------- */
    var lastTrail = 0;
    var trailCount = 0;
    var TRAIL_MAX = 48;
    var TRAIL_FLAVORS = ['', ' gold', ' blue'];

    function spawnTrail(x, y) {
        if (trailCount >= TRAIL_MAX) return;
        trailCount++;
        var el = document.createElement('div');
        el.className = 'y2k-trail' + TRAIL_FLAVORS[Math.floor(Math.random() * TRAIL_FLAVORS.length)];
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        fxFront.appendChild(el);
        setTimeout(function () {
            el.remove();
            trailCount--;
        }, 900);
    }

    function onMove(e) {
        var now = Date.now();
        if (now - lastTrail < 36) return;
        lastTrail = now;
        // 每次撒 2 颗，围绕魔棒星尖散开
        spawnTrail(e.clientX + 10 + Math.random() * 14, e.clientY + 12 + Math.random() * 14);
        spawnTrail(e.clientX - 2 + Math.random() * 8, e.clientY + 20 + Math.random() * 10);
    }

    /* ---------- 点击星星爆炸 ---------- */
    var BURST_FLAVORS = ['', ' pink', ' blue'];

    function onClick(e) {
        var n = 10;
        for (var i = 0; i < n; i++) {
            var el = document.createElement('div');
            el.className = 'y2k-burst' + BURST_FLAVORS[i % BURST_FLAVORS.length];
            var angle = (Math.PI * 2 * i) / n + Math.random() * 0.4;
            var dist = 30 + Math.random() * 40;
            el.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
            el.style.setProperty('--by', Math.sin(angle) * dist + 'px');
            el.style.left = (e.clientX - 5) + 'px';
            el.style.top = (e.clientY - 5) + 'px';
            fxFront.appendChild(el);
            setTimeout(function (node) { node.remove(); }, 700, el);
        }
    }

    function init() {
        document.body.appendChild(fxBack);
        document.body.appendChild(fxFront);
        for (var i = 0; i < SPARKLE_COUNT; i++) makeFaller();
        if (finePointer.matches) {
            document.addEventListener('mousemove', onMove, { passive: true });
            document.addEventListener('click', onClick, { passive: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
