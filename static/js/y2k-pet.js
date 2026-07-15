// 页面底部桌宠：弟弟（didi）——灰白奶牛猫，追着鼠标跑
// 素材: https://petdex.dev/pets/didi （作者 styh1997），精灵图 8列×9行、每帧 192×208
// 触屏设备改为自主漫步；prefers-reduced-motion 时不生成
(function () {
    'use strict';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var SPRITE = '/pets/didi/sprite.webp';
    var FW = 192, FH = 208;      // 原始帧尺寸
    var SHEET_W = 1536, SHEET_H = 1872;
    var SCALE = 0.45;            // 显示缩放（约 86×94px）

    // 各动画: r=行号 n=帧数 fps=播放速度 once=只播 N 轮后回待机
    var ANIM = {
        idle:  { r: 0, n: 6, fps: 6 },
        runR:  { r: 1, n: 8, fps: 14 },
        runL:  { r: 2, n: 8, fps: 14 },
        walkR: { r: 1, n: 8, fps: 8 },
        walkL: { r: 2, n: 8, fps: 8 },
        wave:  { r: 3, n: 4, fps: 8,  once: 3 },
        jump:  { r: 4, n: 5, fps: 10, once: 1 },
        sleep: { r: 6, n: 6, fps: 3 },
        groom: { r: 7, n: 6, fps: 7,  once: 2 },
        look:  { r: 8, n: 6, fps: 5,  once: 2 },
    };

    var WALK_SPEED = 1.5;
    var RUN_SPEED = 4.5;
    var RUN_DISTANCE = 380;   // 超过此距离用跑
    var STOP_DISTANCE = 40;
    var SLEEP_AFTER = 12000;  // 待机多久后睡觉(ms)
    var FIDGET_MIN = 5000;    // 待机小动作间隔
    var W = FW * SCALE;

    var hasMouse = window.matchMedia('(pointer: fine)').matches;

    var pet, sprite;
    var petX = 30;
    var targetX = Math.min(window.innerWidth / 2, 600);
    var mouseNearPet = false;

    var anim = null, animName = '';
    var frame = 0, loops = 0, lastFrameAt = 0;
    var idleSince = Date.now();
    var nextFidgetAt = Date.now() + FIDGET_MIN + Math.random() * 8000;
    var lastWaveAt = 0;
    var ranLongDash = 0;

    function setAnim(name) {
        if (animName === name) return;
        animName = name;
        anim = ANIM[name];
        frame = 0;
        loops = 0;
        lastFrameAt = 0;
        drawFrame();
    }

    function drawFrame() {
        sprite.style.backgroundPosition =
            (-(frame * FW) * SCALE) + 'px ' + (-(anim.r * FH) * SCALE) + 'px';
    }

    function stepFrames(now) {
        if (now - lastFrameAt < 1000 / anim.fps) return;
        lastFrameAt = now;
        frame++;
        if (frame >= anim.n) {
            frame = 0;
            loops++;
            if (anim.once && loops >= anim.once) {
                setAnim('idle');
                idleSince = Date.now();
                return;
            }
        }
        drawFrame();
    }

    function isBusy() {
        return anim && anim.once && loops < anim.once; // 单次动画播完前不被打断
    }

    function tick(nowHr) {
        var now = Date.now();
        var dx = targetX - petX;
        var dist = Math.abs(dx);

        if (dist > STOP_DISTANCE) {
            // 追逐优先级最高，可打断任何动画
            var running = dist > RUN_DISTANCE;
            setAnim(running ? (dx > 0 ? 'runR' : 'runL') : (dx > 0 ? 'walkR' : 'walkL'));
            petX += (dx > 0 ? 1 : -1) * (running ? RUN_SPEED : WALK_SPEED);
            if (running) ranLongDash = now;
            idleSince = now;
            nextFidgetAt = now + FIDGET_MIN + Math.random() * 8000;
        } else if (!isBusy()) {
            if (animName === 'runR' || animName === 'runL' || now - ranLongDash < 120) {
                // 冲刺到位，开心跳一下
                setAnim('jump');
                ranLongDash = 0;
            } else if (animName === 'walkR' || animName === 'walkL') {
                setAnim('idle');
                idleSince = now;
            } else if (hasMouse && mouseNearPet && now - lastWaveAt > 6000 && animName !== 'sleep') {
                lastWaveAt = now;
                setAnim('wave');
            } else if (now - idleSince > SLEEP_AFTER) {
                setAnim('sleep');
            } else if (animName === 'idle' && now > nextFidgetAt) {
                nextFidgetAt = now + FIDGET_MIN + Math.random() * 10000;
                setAnim(Math.random() < 0.5 ? 'groom' : 'look');
            } else if (animName === 'sleep' || animName === 'idle') {
                // 保持现状
            } else {
                setAnim('idle');
            }
        }

        petX = Math.max(0, Math.min(window.innerWidth - W, petX));
        pet.style.transform = 'translateX(' + petX.toFixed(1) + 'px)';
        stepFrames(nowHr);
        requestAnimationFrame(tick);
    }

    function onMouseMove(e) {
        targetX = e.clientX - W / 2;
        mouseNearPet = Math.abs(e.clientX - petX - W / 2) < 90 &&
                       (window.innerHeight - e.clientY) < 160;
        // 睡着时鼠标靠近会被叫醒
        if (mouseNearPet && animName === 'sleep') {
            setAnim('idle');
            idleSince = Date.now();
        }
    }

    // 触屏设备：随机溜达
    function wander() {
        targetX = 10 + Math.random() * (window.innerWidth - W - 20);
        setTimeout(wander, 7000 + Math.random() * 10000);
    }

    function init() {
        pet = document.createElement('div');
        pet.className = 'y2k-pet';
        pet.setAttribute('aria-hidden', 'true');
        sprite = document.createElement('div');
        sprite.className = 'y2k-pet-sprite';
        sprite.style.width = W + 'px';
        sprite.style.height = (FH * SCALE) + 'px';
        sprite.style.backgroundImage = 'url("' + SPRITE + '")';
        sprite.style.backgroundSize = (SHEET_W * SCALE) + 'px ' + (SHEET_H * SCALE) + 'px';
        pet.appendChild(sprite);
        document.body.appendChild(pet);

        setAnim('idle');
        pet.style.transform = 'translateX(' + petX + 'px)';

        if (hasMouse) {
            document.addEventListener('mousemove', onMouseMove, { passive: true });
        } else {
            wander();
        }
        requestAnimationFrame(tick);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
