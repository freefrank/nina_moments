// 页面底部桌宠：小灰猫，追着鼠标跑
// 素材来自 webpets 项目（github.com/sankalpaacharya/webpets），CC BY-ND 4.0
// 触屏设备改为自主漫步；prefers-reduced-motion 时不生成
(function () {
    'use strict';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var BASE = '/pets/gray/';
    var STATES = {
        idle: 'gray_idle_8fps.gif',
        walk: 'gray_walk_8fps.gif',
        run:  'gray_run_8fps.gif',
        lie:  'gray_lie_8fps.gif',
        jump: 'gray_jump_8fps.gif',
    };

    var WALK_SPEED = 1.6;    // px/帧
    var RUN_SPEED = 4.2;
    var RUN_DISTANCE = 420;  // 距离目标超过此值就跑
    var STOP_DISTANCE = 46;  // 进入此范围就停下
    var LIE_AFTER = 9000;    // 停下多久后趴下(ms)

    var hasMouse = window.matchMedia('(pointer: fine)').matches;

    var pet, img;
    var petX = 40;
    var targetX = window.innerWidth / 2;
    var facing = 0;          // 1=朝右 -1=朝左 0=未设置（保证首次必定应用翻转）
    var state = '';
    var idleSince = Date.now();
    var lastJump = 0;

    function setState(s) {
        if (state === s) return;
        state = s;
        img.src = BASE + STATES[s];
    }

    function setFacing(dir) {
        if (facing === dir) return;
        facing = dir;
        // 素材原始朝向为左，朝右时水平翻转
        img.style.transform = dir === 1 ? 'scaleX(-1)' : '';
    }

    function tick() {
        var dx = targetX - petX;
        var dist = Math.abs(dx);
        var now = Date.now();

        if (dist > STOP_DISTANCE) {
            setFacing(dx > 0 ? 1 : -1);
            var speed = dist > RUN_DISTANCE ? RUN_SPEED : WALK_SPEED;
            setState(dist > RUN_DISTANCE ? 'run' : 'walk');
            petX += (dx > 0 ? 1 : -1) * speed;
            idleSince = now;
        } else if (state === 'jump') {
            // 跳跃动画播完一轮（约1s）回到待机
            if (now - lastJump > 1000) setState('idle');
        } else if (now - idleSince > LIE_AFTER) {
            setState('lie');
        } else {
            setState('idle');
        }

        // 鼠标悬到头顶附近时蹦一下打招呼（3 秒冷却）
        if (hasMouse && dist < STOP_DISTANCE && now - lastJump > 3000 && state !== 'lie' && mouseNearPet) {
            lastJump = now;
            setState('jump');
        }

        petX = Math.max(0, Math.min(window.innerWidth - 70, petX));
        pet.style.transform = 'translateX(' + petX.toFixed(1) + 'px)';
        requestAnimationFrame(tick);
    }

    var mouseNearPet = false;

    function onMouseMove(e) {
        targetX = e.clientX - 32; // 让猫的中心对准鼠标
        mouseNearPet = Math.abs(e.clientX - petX - 32) < 70 &&
                       (window.innerHeight - e.clientY) < 130;
    }

    // 触屏设备：每隔一段时间随机溜达
    function wander() {
        targetX = 20 + Math.random() * (window.innerWidth - 110);
        setTimeout(wander, 6000 + Math.random() * 9000);
    }

    function init() {
        pet = document.createElement('div');
        pet.className = 'y2k-pet';
        pet.setAttribute('aria-hidden', 'true');
        img = document.createElement('img');
        img.alt = '';
        img.draggable = false;
        pet.appendChild(img);
        document.body.appendChild(pet);

        setState('idle');
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
