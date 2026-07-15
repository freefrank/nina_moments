// nina.zkx.ca 密码门 + 媒体代理 Worker
// - 未验证 → Y2K 风格密码页
// - /Moments/* 与 /link_content/* → 从私有媒体仓库代理（GitHub raw + 边缘缓存），
//   媒体因此不必进入 GitHub Pages 构建产物，部署从十几分钟降到约一分钟
// - 其余路径 → 透传 GitHub Pages 源站
// Secrets: ACCESS_PASSWORD（访问密码）、GITHUB_TOKEN（媒体仓库只读 PAT）

const COOKIE_NAME = 'nina_auth';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 天

const MEDIA_PREFIXES = ['/Moments/', '/link_content/'];
const MEDIA_REPO_RAW = 'https://raw.githubusercontent.com/freefrank/nina_moments_media/master';

const MIME = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif',
    webp: 'image/webp', svg: 'image/svg+xml', ico: 'image/x-icon',
    html: 'text/html; charset=utf-8', htm: 'text/html; charset=utf-8',
    css: 'text/css; charset=utf-8', js: 'text/javascript; charset=utf-8',
    json: 'application/json; charset=utf-8', txt: 'text/plain; charset=utf-8',
    md: 'text/plain; charset=utf-8', mp4: 'video/mp4', mp3: 'audio/mpeg',
    pdf: 'application/pdf', woff: 'font/woff', woff2: 'font/woff2',
};

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // 登录提交
        if (url.pathname === '/auth' && request.method === 'POST') {
            const form = await request.formData();
            const password = form.get('password') || '';
            if (password === env.ACCESS_PASSWORD) {
                const token = await sha256Hex(env.ACCESS_PASSWORD + COOKIE_NAME);
                return new Response(null, {
                    status: 302,
                    headers: {
                        'Location': '/',
                        'Set-Cookie': `${COOKIE_NAME}=${token}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
                    },
                });
            }
            return passwordPage(true);
        }

        // 登出
        if (url.pathname === '/logout') {
            return new Response(null, {
                status: 302,
                headers: {
                    'Location': '/',
                    'Set-Cookie': `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
                },
            });
        }

        // 校验 cookie
        const cookies = parseCookies(request.headers.get('Cookie') || '');
        const expected = await sha256Hex(env.ACCESS_PASSWORD + COOKIE_NAME);
        if (cookies[COOKIE_NAME] !== expected) {
            return passwordPage(false);
        }

        // 已验证：媒体走私有仓库代理，其余透传源站
        if (MEDIA_PREFIXES.some(p => url.pathname.startsWith(p))) {
            return serveMedia(url, env, ctx);
        }
        return fetch(request);
    },
};

async function serveMedia(url, env, ctx) {
    let path = url.pathname;
    if (path.endsWith('/')) path += 'index.html';

    // 缓存键不含查询串与 cookie；媒体内容不可变，命中即直出
    const cacheKey = new Request(url.origin + path);
    const cache = caches.default;
    const hit = await cache.match(cacheKey);
    if (hit) {
        const res = new Response(hit.body, hit);
        res.headers.set('X-Media-Cache', 'HIT');
        return res;
    }

    const gh = await fetch(MEDIA_REPO_RAW + path, {
        headers: {
            'Authorization': 'Bearer ' + env.GITHUB_TOKEN,
            'User-Agent': 'nina-moments-media-proxy',
        },
    });
    if (!gh.ok) {
        return new Response('媒体不存在: ' + path, {
            status: gh.status === 404 ? 404 : 502,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
    }

    const ext = path.split('.').pop().toLowerCase();
    const res = new Response(gh.body, {
        status: 200,
        headers: {
            'Content-Type': MIME[ext] || 'application/octet-stream',
            'Cache-Control': 'public, max-age=31536000, immutable',
            'X-Media-Cache': 'MISS',
        },
    });
    ctx.waitUntil(cache.put(cacheKey, res.clone()));
    return res;
}

async function sha256Hex(text) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function parseCookies(header) {
    const out = {};
    for (const part of header.split(';')) {
        const i = part.indexOf('=');
        if (i > 0) out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
    }
    return out;
}

function passwordPage(failed) {
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>✨ 时光机入口 ✨</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
    background: linear-gradient(120deg, #ffc7ec 0%, #ecd0ff 35%, #c9e6ff 70%, #ffd4f0 100%);
    background-size: 300% 300%;
    animation: aurora 14s ease-in-out infinite;
  }
  @keyframes aurora {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .card {
    background: rgba(255,255,255,.9);
    border: 3px solid transparent;
    background-clip: padding-box;
    border-radius: 22px;
    box-shadow: 0 6px 0 rgba(255,79,192,.3), 0 18px 40px rgba(160,108,255,.35);
    padding: 40px 36px;
    width: min(90vw, 380px);
    text-align: center;
    position: relative;
  }
  .card::before {
    content: "✦";
    position: absolute;
    top: -16px; left: 24px;
    font-size: 26px;
    color: #ffd93d;
    text-shadow: 0 0 10px rgba(255,217,61,.9);
    animation: twinkle 1.5s ease-in-out infinite;
  }
  .card::after {
    content: "✦";
    position: absolute;
    bottom: -14px; right: 28px;
    font-size: 20px;
    color: #ff4fc0;
    text-shadow: 0 0 10px rgba(255,79,192,.9);
    animation: twinkle 1.5s ease-in-out .7s infinite;
  }
  @keyframes twinkle { 0%,100% { opacity: 1; } 50% { opacity: .2; } }
  h1 {
    font-size: 22px;
    margin-bottom: 6px;
    background: linear-gradient(90deg, #ff2eb0, #a06cff, #00b8e6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  p.tip { color: #8e24aa; font-size: 14px; margin-bottom: 22px; }
  input {
    width: 100%;
    font-size: 17px;
    padding: 13px 16px;
    border: 2px solid #ff4fc0;
    border-radius: 999px;
    margin-bottom: 16px;
    text-align: center;
    color: #46246b;
    outline: none;
    background: #fff6fc;
  }
  input:focus { box-shadow: 0 0 0 3px rgba(255,79,192,.25); }
  button {
    width: 100%;
    padding: 13px;
    font-size: 17px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 1px 2px rgba(90,0,90,.6);
    background: linear-gradient(180deg, #ff8fd8 0%, #ff4fc0 48%, #d81b9a 52%, #ff6fc9 100%);
    border: 2px solid #fff;
    border-radius: 999px;
    cursor: pointer;
    box-shadow: 0 4px 0 rgba(216,27,154,.5), inset 0 2px 3px rgba(255,255,255,.7);
    transition: transform .15s ease;
  }
  button:hover { transform: translateY(-2px); }
  button:active { transform: translateY(1px); box-shadow: 0 1px 0 rgba(216,27,154,.5); }
  .err { color: #d81b9a; font-size: 14px; margin-bottom: 12px; font-weight: 700; }
  @media (prefers-reduced-motion: reduce) {
    body, .card::before, .card::after { animation: none; }
  }
</style>
</head>
<body>
  <form class="card" method="POST" action="/auth">
    <h1>✧ 我的朋友圈时光机 ✧</h1>
    <p class="tip">这是一片私人的时光海，请出示通行证 🌊</p>
    ${failed ? '<p class="err">密码不对哦，再想想～</p>' : ''}
    <input type="password" name="password" placeholder="请输入访问密码" autofocus required>
    <button type="submit">✨ 进入时光机 ✨</button>
  </form>
</body>
</html>`;
    return new Response(html, {
        status: failed ? 403 : 401,
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
    });
}
