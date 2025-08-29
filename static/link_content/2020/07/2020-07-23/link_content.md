# 头条文章

**链接地址:** https://card.weibo.com/article/m/show/id/2309404526712384782810?_wb_client_=1
**作者:** 
**获取时间:** 2025/8/28 20:10:23
**图片数量:** 0

---

## 原始HTML内容


<div id="app">
    <div class="m-loading-box-v2">
        <div class="top">
            <div class="line ht1"></div>
            <div class="line ht1 wt1"></div>
        </div>
        <div class="con">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line wt2"></div>
        </div>
    </div>
</div>
<script>
    window.__FW_CONTROL = Object.freeze({
        '1000': 1 
    })
    function preloadArticle(oid) {
        try {
            oid = oid.split(':')[1] || oid
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", function (res) {
                const json = JSON.parse(res.target.response)
                if (json && json.code == 100000) {
                    localStorage.setItem(`article_detail_${oid}:${new Date().getTime().toString(32)}:${new Date().valueOf() + 600000}`, JSON.stringify(json.data))
                }
            })
            oReq.open("GET", `//weibo.com/ttarticle/x/m/aj/detail?id=${oid}`)
            oReq.send()
        } catch (e) {
        }
    }
</script>
<script>
    setTimeout(function () {
        !window.publish_version && window.location.reload()
    }, 10000)
</script>
<link href="//js.t.sinajs.cn/t6/toutiao/article/h5/static/fw.css?v=431a3cc8645ac7c0fe8111f55b3d923d" type="text/css" rel="stylesheet">

<script src="//js.t.sinajs.cn/t6/toutiao/article/h5/fw.js?v=431a3cc8645ac7c0fe8111f55b3d923d"></script>




---

## 纯文本内容

window.__FW_CONTROL = Object.freeze({
        '1000': 1 
    })
    function preloadArticle(oid) {
        try {
            oid = oid.split(':')[1] || oid
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", function (res) {
                const json = JSON.parse(res.target.response)
                if (json && json.code == 100000) {
                    localStorage.setItem(`article_detail_${oid}:${new Date().getTime().toString(32)}:${new Date().valueOf() + 600000}`, JSON.stringify(json.data))
                }
            })
            oReq.open("GET", `//weibo.com/ttarticle/x/m/aj/detail?id=${oid}`)
            oReq.send()
        } catch (e) {
        }
    }


    setTimeout(function () {
        !window.publish_version && window.location.reload()
    }, 10000)

---

## 图片列表


