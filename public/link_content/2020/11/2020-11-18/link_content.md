# 无标题

**链接地址:** http://mp.weixin.qq.com/s?__biz=MzI4NDYyNjAwNw==&mid=2247484514&idx=1&sn=b84cdb6716abf6c86bded4f3d602d2ab&chksm=ebf9d95adc8e504c8462240a5bb28c5fd7ecb72b008742d1ee55961c359726f59bd740142fb1&scene=0&xtrack=1#rd
**作者:** 
**获取时间:** 2025/8/28 20:01:07
**图片数量:** 0

---

## 原始HTML内容

<div class="share_notice" id="js_common_share_desc_wrap"><div class="weui-ellipsis__text__wrp"><span id="js_common_share_desc" class="weui-ellipsis__text"></span></div>
         <script type="text/javascript" nonce="1730404183" reportloaderror="">var __INLINE_SCRIPT__ = (function () {
  'use strict';

  function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
  }

  function textOverflow(el, binding) {
    var _a, _b;
    var text = el.innerHTML;
    if (!text || !text.length) return;
    var retainTail = [];
    if ((_a = binding.value) === null || _a === void 0 ? void 0 : _a.tailNum) {
      retainTail = Array.from(el.childNodes).slice(-binding.value.tailNum);
    }
    var count = 0;
    function needTextOverflow() {
      var _a;
      if ((_a = binding.value) === null || _a === void 0 ? void 0 : _a.lineClamp) {
        return binding.value.lineClamp < computeLineNum(el);
      }
      return el.offsetHeight < el.scrollHeight;
    }
    if (needTextOverflow()) {
      try {
        var getLeaf = function getLeaf(node) {
          var result = [];
          if (!node.childNodes || node.childNodes.length === 0) {
            return [node];
          }
          node.childNodes.forEach(function (child) {
            result = [].concat(_toConsumableArray(result), _toConsumableArray(getLeaf(child)));
          });
          return result;
        };
        var getFragmentHTML = function getFragmentHTML(frag) {
          var _a, _b;
          var div = document.createDocumentFragment();
          div.appendChild(frag);
          var span = document.createElement('span');
          span.innerHTML = ((_a = binding.value) === null || _a === void 0 ? void 0 : _a.html) || '...';
          if (div.lastElementChild) {
            div.lastElementChild.style.display = 'inline';
          }
          div.appendChild(span);
          el.extraElement = span;
          if ((_b = binding.value) === null || _b === void 0 ? void 0 : _b.tailNum) {
            retainTail.forEach(function (tail) {
              div.appendChild(tail);
            });
          }
          return div;
        };
        var findLastNode = function findLastNode(start, end) {
          if (end - start <= 1) {
            range.setEndAfter(leaves[start]);
            setNewFrag(el, getFragmentHTML(range.cloneContents()));
            return needTextOverflow() ? start : end;
          }
          var mid = start + end >> 1;
          count++;
          range.setEndAfter(leaves[mid]);
          setNewFrag(el, getFragmentHTML(range.cloneContents()));
          return needTextOverflow() ? findLastNode(start, mid) : findLastNode(mid, end);
        };
        var findLastCharIndex = function findLastCharIndex(start, end) {
          if (end - start <= 1) {
            if (start === 0) {
              range.setEndAfter(leaves[Math.max(lastNodeIndex - 1, 0)]);
            } else {
              range.setEnd(lastNode, start);
            }
            setNewFrag(el, getFragmentHTML(range.cloneContents()));
            return start;
          }
          var mid = start + end >> 1;
          count++;
          range.setEnd(lastNode, mid);
          setNewFrag(el, getFragmentHTML(range.cloneContents()));
          return needTextOverflow() ? findLastCharIndex(start, mid) : findLastCharIndex(mid, end);
        };
        var dom = document.createElement('div');
        dom.innerHTML = text;
        var leaves = getLeaf(dom);
        var range = document.createRange();
        range.setStartBefore(leaves[0]);
        var lastNodeIndex = findLastNode(0, leaves.length - 1);
        var lastNode = leaves[lastNodeIndex];
        findLastCharIndex(0, lastNode.textContent.length);
        ((_b = binding.value) === null || _b === void 0 ? void 0 : _b.processExtraElement) && binding.value.processExtraElement(el.extraElement, el);
      } catch (error) {
        console.error(error);
      }
    }
  }
  function computeLineNum(el) {
    var computyStyle = getComputedStyle(el);
    return Math.round(el.offsetHeight / parseFloat(computyStyle.lineHeight));
  }
  function removeAllChild(el) {
    var childNodes = Array.from(el.childNodes);
    childNodes.forEach(function (child) {
      el.removeChild(child);
    });
  }
  function setNewFrag(el, frag) {
    removeAllChild(el);
    el.appendChild(frag);
  }

  
  
  var Device = {};
  function detect(ua) {
    var MQQBrowser = ua.match(/MQQBrowser\/(\d+\.\d+)/i);
    var MQQClient = ua.match(/QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i) || ua.match(/V1_AND_SQ_([\d\.]+)/);
    var WeChat = ua.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/) || ua.match(/MicroMessenger\/((\d+)\.(\d+))/);
    var MacOS = ua.match(/Mac\sOS\sX\s(\d+[\.|_]\d+)/);
    var WinOS = ua.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/);
    var Linux = ua.match(/Linux\s/);
    var MiuiBrowser = ua.match(/MiuiBrowser\/(\d+\.\d+)/i);
    var M1 = ua.match(/MI-ONE/);
    var MIPAD = ua.match(/MI PAD/);
    var UC = ua.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/) || ua.match(/\sUC\s/);
    var IEMobile = ua.match(/IEMobile(\/|\s+)(\d+\.\d+)/) || ua.match(/WPDesktop/);
    var ipod = ua.match(/(ipod).*\s([\d_]+)/i);
    var ipad = ua.match(/(ipad).*\s([\d_]+)/i);
    var iphone = ua.match(/(iphone)\sos\s([\d_]+)/i);
    var Chrome = ua.match(/Chrome\/(\d+\.\d+)/);
    var AndriodBrowser = ua.match(/Mozilla.*Linux.*Android.*AppleWebKit.*Mobile Safari/);
    var android = ua.match(/(android)\s([\d\.]+)/i);
    var harmony = ua.match(/(OpenHarmony)\s([\d\.]+)/i);
    Device.browser = Device.browser || {}, Device.os = Device.os || {};
    Device.os.type = -1;
    Device.os.unifiedPC = ua.match(/UnifiedPC/);
    Device.os.unifiedMac = /UnifiedPCMac/i.test(ua);
    Device.os.unifiedWindows = /UnifiedPCWindows/i.test(ua);
    if (window.ActiveXObject) {
      var vie = 6;
      (window.XMLHttpRequest || ua.indexOf('MSIE 7.0') > -1) && (vie = 7);
      (window.XDomainRequest || ua.indexOf('Trident/4.0') > -1) && (vie = 8);
      ua.indexOf('Trident/5.0') > -1 && (vie = 9);
      ua.indexOf('Trident/6.0') > -1 && (vie = 10);
      Device.browser.ie = true, Device.browser.version = vie;
    } else if (ua.indexOf('Trident/7.0') > -1) {
      Device.browser.ie = true, Device.browser.version = 11;
    }
    if (android) {
      Device.os.android = true;
      Device.os.version = android[2];
      Device.os.type = 2;
    }
    if (harmony) {
      Device.os.harmony = true;
      Device.os.version = harmony[2];
      Device.os.type = 42;
    }
    if (ipod) {
      Device.os.ios = Device.os.ipod = true;
      Device.os.version = ipod[2].replace(/_/g, '.');
    }
    if (ipad) {
      Device.os.ios = Device.os.ipad = true;
      Device.os.version = ipad[2].replace(/_/g, '.');
      Device.os.type = 13;
    }
    if (iphone) {
      Device.os.iphone = Device.os.ios = true;
      Device.os.version = iphone[2].replace(/_/g, '.');
      Device.os.type = 1;
    }
    if (WinOS) Device.os.windows = true, Device.os.version = WinOS[2], Device.os.type = 15;
    if (MacOS) Device.os.Mac = true, Device.os.version = MacOS[1], Device.os.type = 14;
    if (Linux) Device.os.Linux = true, Device.os.type = 33;
    if (ua.indexOf('lepad_hls') > 0) Device.os.LePad = true;
    if (MIPAD) Device.os.MIPAD = true;
    if (MQQBrowser) Device.browser.MQQ = true, Device.browser.version = MQQBrowser[1];
    if (MQQClient) Device.browser.MQQClient = true, Device.browser.version = MQQClient[1];
    if (WeChat) Device.browser.WeChat = true, Device.browser.mmversion = Device.browser.version = WeChat[1];
    if (MiuiBrowser) Device.browser.MIUI = true, Device.browser.version = MiuiBrowser[1];
    if (UC) Device.browser.UC = true, Device.browser.version = UC[1] || NaN;
    if (IEMobile) Device.browser.IEMobile = true, Device.browser.version = IEMobile[2];
    if (AndriodBrowser) {
      Device.browser.AndriodBrowser = true;
    }
    if (M1) {
      Device.browser.M1 = true;
    }
    if (Chrome) {
      Device.browser.Chrome = true, Device.browser.version = Chrome[1];
    }
    if (Device.os.windows) {
      if (typeof navigator.platform !== "undefined" && navigator.platform.toLowerCase() == "win64") {
        Device.os.win64 = true;
      } else {
        Device.os.win64 = false;
      }
    }
    if (Device.os.Mac || Device.os.windows || Device.os.Linux || Device.os.unifiedPC) {
      Device.os.pc = true;
    }
    var osType = {
      iPad7: 'iPad; CPU OS 7',
      LePad: 'lepad_hls',
      XiaoMi: 'MI-ONE',
      SonyDTV: "SonyDTV",
      SamSung: 'SAMSUNG',
      HTC: 'HTC',
      VIVO: 'vivo'
    };
    for (var os in osType) {
      Device.os[os] = ua.indexOf(osType[os]) !== -1;
    }
    Device.os.phone = Device.os.phone || /windows phone/i.test(ua);
    Device.os.getNumVersion = function () {
      return parseFloat(Device.os.version);
    };
    Device.os.hasTouch = 'ontouchstart' in window;
    if (Device.os.hasTouch && Device.os.ios && Device.os.getNumVersion() < 6) {
      Device.os.hasTouch = false;
    }
    if (Device.browser.WeChat && Device.browser.version < 5.0) {
      Device.os.hasTouch = false;
    }
    Device.browser.getNumVersion = function () {
      return parseFloat(Device.browser.version);
    };
    Device.browser.isFFCanOcx = function () {
      return !!Device.browser.firefox && Device.browser.getNumVersion() >= 3.0;
    };
    Device.browser.isCanOcx = function () {
      return !!Device.os.windows && (!!Device.browser.ie || Device.browser.isFFCanOcx() || !!Device.browser.webkit);
    };
    Device.browser.isNotIESupport = function () {
      return !!Device.os.windows && (!!Device.browser.webkit || Device.browser.isFFCanOcx());
    };
    Device.userAgent = {};
    Device.userAgent.browserVersion = Device.browser.version;
    Device.userAgent.osVersion = Device.os.version;
    if (Device.os.unifiedPC) {
      if (Device.os.unifiedWindows) Device.os.type = 37;else if (Device.os.unifiedMac) Device.os.type = 38;else Device.os.type = 39;
    }
    delete Device.userAgent.version;
  }
  detect(window.navigator.userAgent);
  function canSupportH5Video() {
    var ua = window.navigator.userAgent,
      m = null;
    if (!!Device.os.android) {
      if (Device.browser.MQQ && Device.browser.getNumVersion() >= 4.2) {
        return true;
      }
      if (ua.indexOf('MI2') != -1) {
        return true;
      }
      if (Device.os.version >= '4' && (m = ua.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/))) {
        if (parseFloat(m[1]) >= 4.2) {
          return true;
        }
      }
      if (Device.os.version >= '4.1') {
        return true;
      }
    }
    return false;
  }
  function canSupportVideoMp4() {
    var video = document.createElement('video');
    if (typeof video.canPlayType === 'function') {
      if (video.canPlayType('video/mp4; codecs="mp4v.20.8"') === 'probably') {
        return true;
      }
      if (video.canPlayType('video/mp4; codecs="avc1.42E01E"') === 'probably' || video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') === 'probably') {
        return true;
      }
    }
    return false;
  }
  function canSupportAutoPlay() {
    if (Device.os.ios && Device.os.getNumVersion() < 10) {
      return false;
    }
    return true;
  }
  function isLockdownMode() {
    if (!Device.os.ios || Device.os.getNumVersion() < 16) {
      return false;
    }
    if (typeof WebAssembly === 'undefined' && typeof OfflineAudioContext === 'undefined' && typeof WebGLRenderingContext === 'undefined') {
      return true;
    }
    return false;
  }
  Device.canSupportVideo = canSupportVideoMp4 || canSupportH5Video;
  Device.canSupportVideoMp4 = canSupportVideoMp4;
  Device.canSupportH5Video = canSupportH5Video;
  Device.canSupportAutoPlay = canSupportAutoPlay;
  Device.isLockdownMode = isLockdownMode;
  
  Device.cpVersion = function (version) {
    var cp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var canEqual = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var nowVersionStr = Device.os.version;
    if (!nowVersionStr) return false;
    var versionArr = version.split('.');
    var nowVersionArr = nowVersionStr.split('.');
    for (var i = 0; i < Math.max(nowVersionArr.length, versionArr.length); i++) {
      var vi = +versionArr[i];
      var nvi = +nowVersionArr[i];
      if (vi === nvi) continue;
      if (cp > 0) return vi > nvi;
      if (cp < 0) return vi < nvi;
    }
    return canEqual || cp === 0;
  };

  function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  
  
  var ua$1 = navigator.userAgent;
  var is_ios = /(iPhone|iPad|iPod|iOS)/i.test(ua$1);
  var is_wp = /Windows\sPhone/i.test(ua$1);
  var is_android$1 = /(Android)/i.test(ua$1);
  var is_wechat = /MicroMessenger\/([\d\.]+)/i.test(ua$1);
  var is_mac = /mac\sos/i.test(ua$1) && !is_ios;
  var is_windows = /windows\snt/i.test(ua$1) && !is_wp;
  var is_mpapp = /MPAPP\/([\d\.]+)/i.test(ua$1);
  var is_ipad = /iPad/i.test(ua$1);
  var is_windows_wechat = /WindowsWechat/i.test(ua$1);
  var is_mac_wechat = /MacWechat/i.test(ua$1) || /wechat.*mac os/i.test(ua$1);
  var is_prefetch = is_wechat && window.WeixinPrefecherJSBridge;
  var is_donut_app = /SAAASDK/i.test(ua$1);
  var is_harmony = /OpenHarmony|ArkWeb/i.test(ua$1);
  var is_linux = /Linux\s/i.test(ua$1);
  var is_in_miniProgram = is_android$1 && /miniprogram/.test(ua$1.toLowerCase()) || window.__wxjs_environment == 'miniprogram';
  var is_wx_work = /wxwork/i.test(ua$1);
  function getUrlParams() {
    var vars = location.search.substring(1).split('&');
    var params = {};
    var _iterator = _createForOfIteratorHelper$1(vars),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var ele = _step.value;
        var pair = ele.split('=');
        var key = decodeURIComponent(pair[0]);
        if (typeof params[key] === 'undefined') {
          params[key] = decodeURIComponent(pair[1]);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return params;
  }
  function get() {
    var reg = /MicroMessenger\/([\d\.]+)/i;
    var ret = ua$1.match(reg);
    if (ret && ret[1]) {
      return ret[1];
    }
    return false;
  }
  function getMac() {
    var reg = /MacWechat\/([\d\.]+)/i;
    var ret = ua$1.match(reg);
    if (ret && ret[1]) {
      return ret[1];
    }
    return false;
  }
  function getMacOS() {
    var reg = /Mac OS X ([\d_]+)/i;
    var ret = ua$1.match(reg);
    if (ret && ret[1]) {
      return ret[1].replace(/_/g, '.');
    }
    return false;
  }
  function getWindows() {
    var reg = /WindowsWechat\(0x(.+?)\)/i;
    var ret = ua$1.match(reg);
    if (ret && ret[1]) {
      return ret[1];
    }
    return false;
  }
  function getWxWork() {
    var reg = /wxwork\/([\d\.]+)/i;
    var ret = ua$1.match(reg);
    if (ret && ret[1]) {
      return ret[1];
    }
    return false;
  }
  function getMpApp() {
    var appVersion = [2, 4, 5];
    var match = navigator.userAgent.match(/MPAPP\/(\d+(\.\d+)*)/);
    if (match) {
      appVersion = match[1].split('.').map(function (v) {
        return Number(v);
      });
    }
    return appVersion.join('.');
  }
  function getUnifiedPcVer() {
    var versionInfo = navigator.userAgent.match(/UnifiedPC\w+Wechat\(0xf\w{2}(\w+?)\w{2}\)/);
    if (versionInfo && versionInfo.length === 2) {
      var version = versionInfo[1];
      var mainVersion = getVersionNumber(version.slice(0, 1));
      var subVersion = getVersionNumber(version.slice(1, 2));
      var subVersion2 = getVersionNumber(version.slice(2, 3));
      return [mainVersion, subVersion, subVersion2].join('.');
    }
  }
  function getVersionNumber(hexStr) {
    return Number(Number("0x".concat(hexStr)).toString(10));
  }
  function getWindowsVersionFormat() {
    var versionInfo = navigator.userAgent.match(/WindowsWechat\(0x(\w+?)\)/);
    if (versionInfo && versionInfo.length === 2) {
      var version = versionInfo[1];
      var mainVersion = getVersionNumber(version.slice(1, 2));
      var subVersion = getVersionNumber(version.slice(2, 4));
      var subVersion2 = getVersionNumber(version.slice(4, 6));
      return [mainVersion, subVersion, subVersion2].join('.');
    }
    return false;
  }
  function getInner() {
    var reg = /MicroMessenger\/[\d\.]+\(0x(.+?)\)/i;
    var ret = ua$1.match(reg);
    if (ret && ret[1] && ret[1] != null) {
      return ret[1];
    }
    if (!ret && /MicroMessenger\/[\d\.]+/i.test(ua$1)) {
      var urlParams = getUrlParams();
      if (urlParams.version) {
        return urlParams.version;
      }
    }
    return false;
  }
  var opfunc = {
    'cp-1': function cp1(a, b) {
      return a < b;
    },
    cp0: function cp0(a, b) {
      return a === b;
    },
    cp1: function cp1(a, b) {
      return a > b;
    }
  };
  function cpVersion(ver, op, canEq, type) {
    var mmver = false;
    switch (type) {
      case 'mac':
        mmver = getMac();
        break;
      case 'windows':
        mmver = getWindowsVersionFormat();
        break;
      case 'wxwork':
        mmver = getWxWork();
        break;
      case 'mpapp':
        mmver = getMpApp();
        break;
      case 'unifiedpc':
        mmver = getUnifiedPcVer();
        break;
      default:
        mmver = get();
        break;
    }
    if (!mmver) {
      return;
    }
    var mmversion = mmver.split('.');
    var version = ver.split('.');
    if (!/\d+/g.test(mmversion[mmversion.length - 1])) {
      mmversion.pop();
    }
    for (var i = 0, len = Math.max(mmversion.length, version.length); i < len; ++i) {
      var mmv = mmversion[i] || '';
      var v = version[i] || '';
      var mmvn = parseInt(mmv, 10) || 0;
      var vn = parseInt(v, 10) || 0;
      var eq = opfunc.cp0(mmvn, vn);
      if (eq) {
        continue;
      }
      var cp = opfunc["cp".concat(op)];
      return cp(mmvn, vn);
    }
    return canEq || op === 0;
  }
  function eqVersion(version) {
    return cpVersion(version, 0);
  }
  function gtVersion(version, canEq) {
    return cpVersion(version, 1, canEq);
  }
  function ltVersion(version, canEq) {
    return cpVersion(version, -1, canEq);
  }
  function getPlatform() {
    if (is_ios) {
      return 'ios';
    }
    if (is_android$1) {
      return 'android';
    }
    if (is_mac) {
      return 'mac_os';
    }
    if (is_windows) {
      return 'windows';
    }
    return 'unknown';
  }
  var is_google_play = false;
  var inner_ver_for_google_play_check = getInner();
  if (is_android$1 && inner_ver_for_google_play_check) {
    var v = "0x".concat(inner_ver_for_google_play_check.substr(-2));
    if (parseInt(v) >= 64 && parseInt(v) <= 79) {
      is_google_play = true;
    }
  }
  function compareHexVersion(hexNum) {
    var innerVersion = getInner();
    if (innerVersion && hexNum) {
      if (typeof hexNum === 'string') {
        hexNum = parseInt(hexNum, 16);
      }
      var version = parseInt(innerVersion, 16);
      return version >= hexNum;
    }
    return false;
  }
  var Mmversion = {
    get: get,
    getMac: getMac,
    getMacOS: getMacOS,
    getWindows: getWindows,
    getInner: getInner,
    getWxWork: getWxWork,
    getMpApp: getMpApp,
    cpVersion: cpVersion,
    eqVersion: eqVersion,
    gtVersion: gtVersion,
    ltVersion: ltVersion,
    getPlatform: getPlatform,
    getVersionNumber: getVersionNumber,
    isWp: is_wp,
    isIOS: is_ios,
    isAndroid: is_android$1,
    isHarmony: is_harmony,
    isHarmonyWechat: is_harmony && is_wechat && cpVersion('1.0.0', 1, true),
    isInMiniProgram: is_in_miniProgram,
    isWechat: is_wechat,
    isMac: is_mac,
    isWindows: is_windows,
    isLinux: is_linux,
    isMacWechat: is_mac_wechat,
    isWindowsWechat: is_windows_wechat,
    isWxWork: is_wx_work,
    isOnlyWechat: is_wechat && !is_wx_work,
    isMpapp: is_mpapp,
    isNewMpApp: false,
    isIPad: is_ipad,
    isGooglePlay: is_google_play,
    isPrefetch: is_prefetch,
    isDonutAPP: is_donut_app,
    compareHexVersion: compareHexVersion
  };

  Device.os.ipad && Device.os.getNumVersion() >= 13 && Device.os.getNumVersion() < 14;
  function getScaleByDom() {
    var fontDom = document.createElement('div');
    fontDom.style.fontSize = '16px';
    document.body.appendChild(fontDom);
    var originFontSize = parseFloat(fontDom.style.fontSize);
    var realFontSize = parseFloat(window.getComputedStyle(fontDom, null).getPropertyValue('font-size'));
    document.body.removeChild(fontDom);
    var percent = realFontSize / originFontSize;
    return percent;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest();
  }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  

  var filterTagName = ['code', 'table', 'thead', 'tbody', 'td', 'blockquote'];
  function rgbaToHsb(rgba) {
    var rgbaValues = rgba.slice(rgba.indexOf('(') + 1, rgba.indexOf(')')).split(',');
    var red = parseInt(rgbaValues[0].trim(), 10);
    var green = parseInt(rgbaValues[1].trim(), 10);
    var blue = parseInt(rgbaValues[2].trim(), 10);
    var alpha = 1;
    if (rgbaValues[3]) {
      alpha = parseFloat(rgbaValues[3].trim());
    }
    var r = red / 255;
    var g = green / 255;
    var b = blue / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;
    var h = 0;
    var s = 0;
    var v = max;
    if (delta !== 0) {
      if (max === r) {
        h = (g - b) / delta % 6;
      } else if (max === g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }
    }
    h = Math.round(h * 60);
    if (h < 0) {
      h += 360;
    }
    if (max !== 0) {
      s = delta / max;
    }
    return [h, Math.round(s * 100), Math.round(v * 100), alpha];
  }
  function isHsbInRange(hsb, hMin, hMax, sMin, sMax, bMin, bMax) {
    var _hsb = _slicedToArray(hsb, 3),
      h = _hsb[0],
      s = _hsb[1],
      b = _hsb[2];
    return h >= hMin && h <= hMax && s >= sMin && s <= sMax && b >= bMin && b <= bMax;
  }
  var checkTextColor = function checkTextColor(node) {
    var _window$getComputedSt = window.getComputedStyle(node),
      backgroundColor = _window$getComputedSt.backgroundColor,
      color = _window$getComputedSt.color;
    if (!backgroundColor || !color) return false;
    var hbsBackgroundColor = rgbaToHsb(backgroundColor);
    var hbsTextColor = rgbaToHsb(color);
    if (isHsbInRange(hbsTextColor, 210, 230, 40, 60, 40, 60) && hbsTextColor[3] > 0.2) {
      return true;
    }
    if ((isHsbInRange(hbsBackgroundColor, 0, 360, 0, 20, 15, 85) || isHsbInRange(hbsBackgroundColor, 0, 360, 20, 100, 15, 100)) && hbsBackgroundColor[3] > 0.2) {
      return true;
    }
    return false;
  };
  var textToSpanFn = function textToSpanFn(text, startIdx, endIdx) {
    if (!text) {
      text = '';
    }
    var span = document.createElement('span');
    if (startIdx <= endIdx) {
      var spanText = getSubstringByIndices(text, startIdx, endIdx);
      span.textContent = spanText;
    }
    return span;
  };
  var splitTextToSpan = function splitTextToSpan(node, textNode, startIdx, endIdx) {
    if (!node || !textNode || startIdx > endIdx) return;
    var text = textNode.textContent;
    var textLen = calAccurateTextLen(text);
    if (startIdx > 0) {
      node.insertBefore(textToSpanFn(text, 0, startIdx - 1), textNode);
    }
    if (endIdx < textLen - 1) {
      node.appendChild(textToSpanFn(text, endIdx + 1, textLen - 1));
    }
    var span = textToSpanFn(text, startIdx, endIdx);
    node.replaceChild(span, textNode);
    return span;
  };

  
  var calAccurateTextLen = function calAccurateTextLen(str) {
    var count = 0;
    var _iterator = _createForOfIteratorHelper(str),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _char = _step.value;
        count++;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return count;
  };

  
  
  function highlightElement(_ref, filterFn) {
    var elem = _ref.elem,
      startIdx = _ref.startIdx,
      endIdx = _ref.endIdx;
    var selectedNodes = [];

    
    var splitAndHighlight = function splitAndHighlight(node) {
      var childNodesLen = node.childNodes.length;
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (filterFn && filterFn(node, startIdx, endIdx)) {
          return;
        }
      }
      for (var i = 0; i < childNodesLen; i++) {
        if (startIdx > endIdx) break;
        var childNode = node.childNodes[i];
        if (!childNode) break;
        if (childNode.nodeType === Node.ELEMENT_NODE) {
          if (filterFn && filterFn(childNode, startIdx, endIdx)) {
            var textLen = calAccurateTextLen(childNode.innerText);
            if (startIdx <= textLen) {
              startIdx = 0;
              endIdx = -1;
              break;
            } else {
              endIdx -= textLen;
              startIdx -= textLen;
              continue;
            }
          }
          splitAndHighlight(childNode);
        }
        if (childNode.nodeType === Node.TEXT_NODE) {
          var childNodeText = childNode.textContent;
          var _textLen = calAccurateTextLen(childNodeText);
          var newNode = node;
          if (childNodesLen > 1) {
            newNode = textToSpanFn(childNodeText, 0, _textLen - 1);
            node.replaceChild(newNode, childNode);
            childNode = newNode.childNodes[0];
          }
          if (startIdx >= 0 && endIdx <= _textLen - 1) {
            var match = splitTextToSpan(newNode, childNode, startIdx, endIdx);
            match && selectedNodes.push(match);
            startIdx = 0;
            endIdx = -1;
            break;
          }
          if (endIdx > _textLen - 1) {
            var _match = splitTextToSpan(newNode, childNode, startIdx, _textLen - 1);
            _match && selectedNodes.push(_match);
            if (startIdx <= _textLen) {
              endIdx -= _textLen;
              startIdx = 0;
            } else {
              endIdx -= _textLen;
              startIdx -= _textLen;
            }
          }
        }
      }
    };
    splitAndHighlight(elem);
    return selectedNodes;
  }

  
  function getSubstringByIndices(str, beginIdx, endIdx) {
    var startIndex = 0;
    var endIndex = str.length - 1;
    var charCount = 0;
    for (var i = 0; i < str.length; i++) {
      if (charCount === beginIdx) {
        startIndex = i;
        break;
      }
      if (str.charCodeAt(i) >= 0xD800 && str.charCodeAt(i) <= 0xDBFF) {
        i++;
      }
      charCount++;
    }
    charCount = 0;
    for (var _i = startIndex; _i < str.length; _i++) {
      if (charCount === endIdx - beginIdx + 1) {
        endIndex = _i - 1;
        break;
      }
      if (str.charCodeAt(_i) >= 0xD800 && str.charCodeAt(_i) <= 0xDBFF) {
        _i++;
      }
      charCount++;
    }
    return str.slice(startIndex, endIndex + 1);
  }

  
  var blockEleTagName = ['P', 'DIV', 'SECTION', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'TABLE', 'WX-VIEW'];
  var canNotSplitEleClassName = ['js_product_container', 'js_blockquote_wrap'];
  var canNotSplitEleTagName = ['BLOCKQUOTE'];
  function childNodesHasBlockEle(element, opts) {
    if (!element || element.nodeType !== 1) {
      return false;
    }
    for (var i = 0; i < element.children.length; i++) {
      if (blockEleTagName.indexOf(element.children[i].tagName) !== -1 || opts.getSpan && element.children[i].tagName === 'SPAN' && childNodesHasBlockEle(element.children[i], opts)) {
        return true;
      }
    }
  }
  function isNotSplitEle(ele, opts) {
    for (var i = 0; i < canNotSplitEleClassName.length; i++) {
      if (ele.className.indexOf(canNotSplitEleClassName[i]) > -1) {
        return true;
      }
    }
    if (opts.ignoreFlexChildren && ele.style.display === 'flex' || opts.ignoreNotWriteableChildren && (ele.getAttribute('contenteditable') === 'false' || ele.childNodes.length === 1 && ele.childNodes[0].getAttribute('contenteditable') === 'false')) {
      return true;
    }
    return canNotSplitEleTagName.indexOf(ele.tagName) > -1;
  }
  function isElement(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }
  function getParaListAllNodes(element, opts) {
    var childNodes = Array.from(element.childNodes);
    if (!childNodes.length) {
      return [];
    }
    var child;
    var paragraphList = [];
    for (var i = 0; i < childNodes.length; i++) {
      child = childNodes[i];
      if (child.nodeType === Node.TEXT_NODE) {
        paragraphList.push(child);
        continue;
      } else if (isElement(child)) {
        child.isWrapper = undefined;
        if (opts && opts.isMarkNode && opts.isMarkNode(child)) {
          continue;
        }
        if (childNodesHasBlockEle(child, opts) && !isNotSplitEle(child, opts)) {
          paragraphList = paragraphList.concat(getParaListAllNodes(child, opts));
          if (opts.getNestedStructure) {
            child.isWrapper = true;
            paragraphList.push(child);
          }
        } else {
          paragraphList.push(child);
          if (opts.ignorePreloadNode && child.getAttribute('data-preloadingid') || child.classList.contains('wx_img_placeholder')) {
            paragraphList.pop();
          }
        }
      }
    }
    return paragraphList;
  }

  var initJsBridge = false;
  if (!window.JSAPIEventCallbackMap) {
    window.JSAPIEventCallbackMap = {};
  }
  function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewMPapp || window.WebViewJavascriptBridge) {
      return callback(window.WebViewMPapp || window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    if (!initJsBridge) {
      initJsBridge = true;
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'https://__bridge_loaded__';
      document.body.appendChild(WVJBIframe);
      setTimeout(function () {
        initJsBridge = false;
        document.body.removeChild(WVJBIframe);
      }, 0);
    }
    return false;
  }
  function invoke$1(jsapiName, opt, callback) {
    connectWebViewJavascriptBridge(function (bridge) {
      try {
        if (typeof opt === 'function') {
          callback = opt;
        }
        if (_typeof(opt) !== 'object' && typeof opt !== 'string') {
          opt = {};
        }
        bridge.callHandler(jsapiName, opt, function (res) {
          try {
            var ret = _typeof(res) === 'object' ? res : JSON.parse(res);
            var errMsg = ret.err_msg || ret.errMsg;
            console.info("[mpapp jsapi] invoke->".concat(jsapiName, " ").concat(opt.action || '', " ").concat(errMsg));
            typeof callback === 'function' && callback(ret);
          } catch (e) {
            window.WX_BJ_REPORT.BadJs.report('invoke', "callback ".concat(jsapiName, " error:"), {
              mid: 'mmbizwebapp:js_brridge',
              _info: e
            });
            console.error("[mpapp jsapi] ".concat(jsapiName, " ").concat(opt.action || ''), e, res);
          }
        });
      } catch (e) {
        window.WX_BJ_REPORT.BadJs.report('invoke', 'callback error:', {
          mid: 'mmbizwebapp:js_brridge',
          _info: e
        });
        console.error('[mpapp jsapi]', e);
      }
    });
  }

  var doc$1 = {};
  var isAcrossOrigin$1 = false;
  var notFoundedMPPageAction = [];
  var __moon_report$1 = window.__moon_report || function () {};
  var MOON_JSAPI_KEY_OFFSET = 8;
  try {
    doc$1 = top.window.document;
  } catch (e) {
    isAcrossOrigin$1 = true;
  }
  if (!window.JSAPIEventCallbackMap) {
    window.JSAPIEventCallbackMap = {};
  }
  function ready(onBridgeReady) {
    var bridgeReady = function bridgeReady() {
      try {
        if (onBridgeReady) {
          window.onBridgeReadyTime = window.onBridgeReadyTime || Date.now();
          onBridgeReady();
        }
      } catch (e) {
        __moon_report$1([{
          offset: MOON_JSAPI_KEY_OFFSET,
          log: 'ready',
          e: e
        }]);
        throw e;
      }
      window.jsapiReadyTime = Date.now();
    };
    if (!isAcrossOrigin$1 && (typeof top.window.WeixinJSBridge === 'undefined' || !top.window.WeixinJSBridge.invoke)) {
      if (doc$1.addEventListener) {
        doc$1.addEventListener('WeixinJSBridgeReady', bridgeReady, false);
      } else if (doc$1.attachEvent) {
        doc$1.attachEvent('WeixinJSBridgeReady', bridgeReady);
        doc$1.attachEvent('onWeixinJSBridgeReady', bridgeReady);
      }
    } else {
      bridgeReady();
    }
  }
  var invokeNotWaitA8key = ['notifyPageInfo'];
  var checkNotFoundedInvoke = function checkNotFoundedInvoke(methodName, args) {
    if (methodName === 'handleMPPageAction' && (args === null || args === void 0 ? void 0 : args.action) && notFoundedMPPageAction.includes(args === null || args === void 0 ? void 0 : args.action)) {
      return true;
    }
    return false;
  };
  function invoke(methodName, args, callback) {
    if (!invokeNotWaitA8key.includes(methodName) && window.__second_open_wait_a8key__ && window.__second_open_wait_a8key_task__) {
      window.__second_open_wait_a8key_task__.push(function () {
        invoke(methodName, args, callback);
      });
      return;
    }
    ready(function () {
      if (isAcrossOrigin$1) return false;
      if (_typeof(top.window.WeixinJSBridge) !== 'object') {
        alert('请在微信中打开此链接');
        return false;
      }
      if (checkNotFoundedInvoke(methodName, args)) {
        setTimeout(function () {
          if (callback) {
            callback.apply(window, [{
              err_msg: "".concat(methodName, ":fail"),
              err_desc: 'action isn\'t supported'
            }]);
          }
        }, 0);
      } else {
        top.window.WeixinJSBridge.invoke(methodName, args, function () {
          try {
            for (var _len = arguments.length, rets = new Array(_len), _key = 0; _key < _len; _key++) {
              rets[_key] = arguments[_key];
            }
            var ret = rets[0];
            var errMsg = ret && ret.err_msg ? ", err_msg-> ".concat(ret.err_msg) : '';
            if (['handleMPPageAction', 'handleVideoAction', 'handleHaokanAction'].indexOf(methodName) !== -1) {
              var action = (args === null || args === void 0 ? void 0 : args.action) || '';
              console.info('[system]', "[jsapi] invoke->".concat(methodName, ", action->").concat(action).concat(errMsg));
            } else {
              console.info('[system]', "[jsapi] invoke->".concat(methodName).concat(errMsg));
            }
            if (methodName === 'handleMPPageAction' && (args === null || args === void 0 ? void 0 : args.action) && (ret === null || ret === void 0 ? void 0 : ret.err_desc) === 'action isn\'t supported') {
              notFoundedMPPageAction.push(args === null || args === void 0 ? void 0 : args.action);
            }
            if (callback) {
              callback.apply(window, rets);
            }
          } catch (e) {
            __moon_report$1([{
              offset: MOON_JSAPI_KEY_OFFSET,
              log: "invoke;methodName:".concat(methodName),
              e: e
            }]);
            throw e;
          }
        });
      }
    });
  }
  function call(methodName) {
    if (window.__second_open_wait_a8key__ && window.__second_open_wait_a8key_task__) {
      window.__second_open_wait_a8key_task__.push(function () {
        call(methodName);
      });
      return;
    }
    ready(function () {
      if (isAcrossOrigin$1) return false;
      if (_typeof(top.window.WeixinJSBridge) !== 'object') {
        return false;
      }
      try {
        top.window.WeixinJSBridge.call(methodName);
      } catch (e) {
        __moon_report$1([{
          offset: MOON_JSAPI_KEY_OFFSET,
          log: "call;methodName:".concat(methodName),
          e: e
        }]);
        throw e;
      }
    });
  }
  function on$1(eventName, callback) {
    if (window.__second_open_wait_a8key__ && window.__second_open_wait_a8key_task__) {
      window.__second_open_wait_a8key_task__.push(function () {
        on$1(eventName, callback);
      });
      return;
    }
    ready(function () {
      if (isAcrossOrigin$1) return false;
      if (_typeof(top.window.WeixinJSBridge) !== 'object' || !top.window.WeixinJSBridge.on) {
        return false;
      }
      if (!window.JSAPIEventCallbackMap[eventName]) {
        window.JSAPIEventCallbackMap[eventName] = [];
      }
      window.JSAPIEventCallbackMap[eventName].push(callback);
      if (window.JSAPIEventCallbackMap[eventName].length > 1) {
        return false;
      }
      top.window.WeixinJSBridge.on(eventName, function () {
        try {
          for (var _len2 = arguments.length, rets = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            rets[_key2] = arguments[_key2];
          }
          var ret = rets[0];
          var errMsg = ret && ret.err_msg ? ", err_msg-> ".concat(ret.err_msg) : '';
          console.info('[system]', "[jsapi] event->".concat(eventName).concat(errMsg));
          if (window.JSAPIEventCallbackMap[eventName] && window.JSAPIEventCallbackMap[eventName].length) {
            var result;
            for (var i = 0; i < window.JSAPIEventCallbackMap[eventName].length; i++) {
              result = window.JSAPIEventCallbackMap[eventName][i].apply(window, rets);
            }
            return result;
          }
        } catch (e) {
          __moon_report$1([{
            offset: MOON_JSAPI_KEY_OFFSET,
            log: "on;eventName:".concat(eventName),
            e: e
          }]);
          throw e;
        }
      });
    });
  }
  function remove(eventName, callback) {
    if (window.__second_open_wait_a8key__ && window.__second_open_wait_a8key_task__) {
      window.__second_open_wait_a8key_task__.push(function () {
        remove(eventName, callback);
      });
      return;
    }
    ready(function () {
      if (!window.JSAPIEventCallbackMap[eventName]) {
        return false;
      }
      var result = false;
      for (var i = window.JSAPIEventCallbackMap[eventName].length - 1; i >= 0; i--) {
        if (window.JSAPIEventCallbackMap[eventName][i] === callback) {
          window.JSAPIEventCallbackMap[eventName].splice(i, 1);
          result = true;
        }
      }
      return result;
    });
  }
  var JSAPI = {
    ready: ready,
    invoke: invoke,
    call: call,
    on: on$1,
    remove: remove
  };

  
  
  var reportLogs = [];
  var reportExtraLogs = [];
  var sendUrl = '/mp/jsmonitor?#wechat_redirect';
  var monitor = {};
  monitor._reportOptions = {
    idkey: {}
  };
  function ObjWithoutProperty(source, exclude) {
    if (source === null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    for (var i = 0; i < sourceKeys.length; i++) {
      var key = sourceKeys[i];
      if (exclude.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
  function formatDataToString(data) {
    var reportData = [];
    for (var key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        reportData.push(key + '=' + encodeURIComponent(data[key]));
      }
    }
    return reportData.join('&');
  }
  monitor.getReportData = function (opt) {
    opt = opt || {};
    var idkey = monitor._reportOptions.idkey || {};
    var key = null;
    var reportData = {};
    var nextKey;
    try {
      for (key in idkey) {
        if (Object.prototype.hasOwnProperty.call(idkey, key) && idkey[key]) {
          reportLogs.push(key + '_' + idkey[key]);
        }
      }
    } catch (e) {
      return false;
    }
    if (reportLogs.length === 0) {
      return false;
    }
    if (reportExtraLogs.length) {
      reportData.lc = reportExtraLogs.length;
      reportExtraLogs.forEach(function (extraLog, index) {
        reportData["log".concat(index)] = extraLog;
      });
    }
    try {
      var reportOptions = monitor._reportOptions;
      if (reportOptions !== null && reportOptions !== undefined) {
        for (nextKey in reportOptions) {
          if (Object.prototype.hasOwnProperty.call(reportOptions, nextKey)) {
            reportData[nextKey] = reportOptions[nextKey];
          }
        }
      }
    } catch (e) {
      reportData = {};
    }
    reportData.idkey = reportLogs.join(';');
    reportData.t = Math.random();
    if (opt.remove !== false) {
      reportLogs = [];
      reportExtraLogs = [];
      monitor._reportOptions = {
        idkey: {}
      };
    }
    return reportData;
  };
  monitor.setLogs = function (opt) {
    var id = opt.id;
    var key = opt.key;
    var value = opt.value;
    var extraLog = opt.log;
    var others = ObjWithoutProperty(opt, ['id', 'key', 'value', 'log']);
    var idkey = monitor._reportOptions.idkey || {};
    var param = id + '_' + key;
    if (idkey[param]) {
      idkey[param] += value;
    } else {
      idkey[param] = value;
    }
    monitor._reportOptions.idkey = idkey;
    if (extraLog) {
      reportExtraLogs.push(extraLog);
    }
    try {
      if (others !== null && others !== undefined) {
        for (var otherKey in others) {
          if (Object.prototype.hasOwnProperty.call(others, otherKey)) {
            monitor._reportOptions[otherKey] = others[otherKey];
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    return monitor;
  };
  monitor.setAvg = function (id, key, value) {
    var idkey = monitor._reportOptions.idkey || {};
    var param1 = id + '_' + key;
    var param2 = id + '_' + (key - 1);
    if (idkey[param1]) {
      idkey[param1] += value;
    } else {
      idkey[param1] = value;
    }
    if (idkey[param2]) {
      idkey[param2] += 1;
    } else {
      idkey[param2] = 1;
    }
    monitor._reportOptions.idkey = idkey;
    return monitor;
  };
  monitor.setSum = function (id, key) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var idkey = monitor._reportOptions.idkey;
    var param = id + '_' + key;
    if (idkey[param]) {
      idkey[param] += value;
    } else {
      idkey[param] = value;
    }
    monitor._reportOptions.idkey = idkey;
    return monitor;
  };
  monitor.send = function (async, ajax, origin) {
    if (async !== false) {
      async = true;
    }
    var data = monitor.getReportData();
    origin = origin || '';
    if (!data) {
      return;
    }
    if (!!ajax && ajax instanceof Function) {
      ajax({
        url: origin + sendUrl,
        type: 'POST',
        mayAbort: true,
        data: data,
        async: async,
        timeout: 2000
      });
    } else {
      new Image().src = origin + '/mp/jsmonitor?' + formatDataToString(data) + '#wechat_redirect';
    }
  };
  if (typeof window !== 'undefined' && window.__monitor) {
    monitor = window.__monitor;
  } else {
    typeof window !== 'undefined' && (window.__monitor = monitor);
  }
  var monitor$1 = monitor;

  
  var logList = [];
  var log = function log(msg) {
    logList.push(msg);
  };
  var printLog = function printLog() {
    for (var i = 0, len = logList.length; i < len; ++i) {
      console.log("[RespType]".concat(logList[i]));
    }
  };
  var isArray = function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
  };
  var getValueType = function getValueType(value) {
    if (isArray(value)) {
      return 'array';
    }
    return _typeof(value);
  };
  var parseRtDesc = function parseRtDesc(rtDesc, k) {
    var type = 'mix';
    var isRequired = false;
    var key = k;
    if (k) {
      var requireKeyWord = '_R';
      var pos = k.indexOf(requireKeyWord);
      var len = k.length - requireKeyWord.length;
      isRequired = pos !== -1 && pos === len;
      key = isRequired ? k.substring(0, len) : k;
    }
    if (typeof rtDesc === 'string') {
      type = rtDesc;
    } else if (isArray(rtDesc)) {
      type = 'array';
    } else if (_typeof(rtDesc) === 'object') {
      type = 'object';
    }
    return {
      key: key,
      type: type,
      isRequired: isRequired
    };
  };
  var checkForArrayRtDesc = function checkForArrayRtDesc(arr, rtDescs) {
    if (!isArray(arr)) {
      return false;
    }
    for (var i = 0, len = arr.length; i < len; ++i) {
      var value = arr[i];
      var rtDesc = void 0;
      var j = 0;
      var flag = rtDescs.length === 0;
      while (rtDesc = rtDescs[j++]) {
        if (checkForRtDesc(value, rtDesc)) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        return false;
      }
    }
    return true;
  };
  var checkForStringRtDesc = function checkForStringRtDesc(value, rtDesc) {
    var valueType = getValueType(value);
    var desc = parseRtDesc(rtDesc);
    var ret = desc.type === valueType;
    if (!ret) {
      log("miss match type : ".concat(valueType, " !== ").concat(desc.type));
    }
    return ret;
  };
  var checkForObjectRtDesc = function checkForObjectRtDesc(json, rtDesc) {
    if (_typeof(json) !== 'object' || isArray(json)) {
      log('must be object');
      return false;
    }
    var rootJson = json;
    var nowCheckValue = json;
    for (var k in rtDesc) {
      if (rtDesc.hasOwnProperty(k)) {
        var nowCheckDesc = rtDesc[k];
        var desc = parseRtDesc(nowCheckDesc, k);
        var key = desc.key;
        nowCheckValue = rootJson[key];
        var valueType = getValueType(nowCheckValue);
        if (desc.isRequired && nowCheckValue === undefined) {
          log("is required @key=".concat(key));
          return false;
        }
        if (nowCheckValue !== undefined) {
          if (valueType !== desc.type && desc.type !== 'mix') {
            log("miss match type : ".concat(valueType, " !== ").concat(desc.type, " @key=").concat(key));
            return false;
          }
          if ((valueType === 'array' || valueType === 'object') && desc.type !== 'mix') {
            if (!checkForRtDesc(nowCheckValue, nowCheckDesc)) {
              return false;
            }
          }
        }
      }
    }
    return true;
  };
  var checkForRtDesc = function checkForRtDesc(json, rtDesc) {
    if (isArray(rtDesc)) {
      return checkForArrayRtDesc(json, rtDesc);
    }
    if (_typeof(rtDesc) === 'object') {
      return checkForObjectRtDesc(json, rtDesc);
    }
    if (typeof rtDesc === 'string') {
      return checkForStringRtDesc(json, rtDesc);
    }
    return false;
  };
  var _check = function check(json, rtDescs) {
    if (typeof json === 'string') {
      try {
        json = eval("(".concat(json, ")"));
      } catch (e) {
        log('parse json error');
        return false;
      }
    }
    if (_typeof(json) !== 'object') {
      log('must be object');
      return false;
    }
    if (!isArray(rtDescs)) {
      rtDescs = [rtDescs];
    }
    var rtDesc;
    var i = 0;
    while (rtDesc = rtDescs[i++]) {
      if (checkForRtDesc(json, rtDesc)) {
        return true;
      }
    }
    return false;
  };
  var RespTypes = {
    check: function check(json, rtDesc) {
      logList = [];
      try {
        var ret = _check(json, rtDesc);
        if (!ret) {
          printLog();
        }
        return ret;
      } catch (e) {
        logList.push("[rtException]".concat(e.toString()));
        printLog();
        return false;
      }
    },
    getMsg: function getMsg() {
      return logList.join(';');
    }
  };

  var IS_AUTHOR_SCENE = [305, 306];
  var innerVersion = (Mmversion.getInner() || '').toUpperCase();
  var biz = null;
  function getBiz() {
    var needCheckBiz = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return new Promise(function (resolve, reject) {
      if (needCheckBiz || biz === null) {
        if (Mmversion.isIOS && innerVersion < '18003C2A' || Mmversion.isAndroid && innerVersion < '28003D3C') {
          reject('Not support');
        } else {
          JSAPI.invoke('handleMPPageAction', {
            action: 'getBiz',
            needCheckBiz: needCheckBiz
          }, function (res) {
            console.log("getBiz with needCheckBiz ".concat(needCheckBiz, " res: ").concat(JSON.stringify(res)));
            if (res && res.err_msg && res.err_msg.indexOf('ok') > -1) {
              biz = res.biz;
              resolve(res.biz);
            } else {
              reject('Failed to get biz');
            }
          });
        }
      } else {
        resolve(biz);
      }
    });
  }
  function getIsAuthor(cb) {
    var bizuin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.biz;
    var scene = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.source;
    var needCheckBiz = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (IS_AUTHOR_SCENE.indexOf(scene * 1) > -1) {
      getBiz(needCheckBiz).then(function (biz) {
        cb(biz && biz === bizuin);
      })["catch"](function () {
        cb(false);
      });
    } else {
      cb(false);
    }
  }
  getBiz().then(function (biz) {
    console.log("getBiz false result: ".concat(biz));
  })["catch"](function () {
    console.error('Failed to get biz');
  });

  function parseUrl(url) {
    var len = url.length;
    var ques_pos = url.indexOf('?');
    var hash_pos = url.indexOf('#');
    hash_pos = hash_pos == -1 ? len : hash_pos;
    ques_pos = ques_pos == -1 ? hash_pos : ques_pos;
    var host = url.substring(0, ques_pos);
    var query_str = url.substring(ques_pos + 1, hash_pos);
    var hash = url.substring(hash_pos + 1);
    return {
      host: host,
      query_str: query_str,
      hash: hash
    };
  }
  function join(url, args, noEncode) {
    var ret = parseUrl(url);
    var query_str = ret.query_str;
    var args_arr = [];
    if (_typeof(args) === 'object') {
      for (var key in args) {
        if (args.hasOwnProperty(key)) {
          args_arr.push("".concat(key, "=").concat(noEncode ? args[key] : encodeURIComponent(args[key])));
        }
      }
    } else {
      args_arr.push(noEncode ? args : encodeURIComponent(args));
    }
    if (args_arr.length > 0) {
      query_str += (query_str !== "" ? "&" : "") + args_arr.join("&");
    }
    return ret.host + (query_str !== "" ? "?".concat(query_str) : "") + (ret.hash !== "" ? "#".concat(ret.hash) : "");
  }
  
  function addParam(url, param, value, forceReplace) {
    url = url || location.href;
    var firstAndPos = url.indexOf("&");
    var len = url.length;
    var reverseUrl = url.replace(/^[\w\d]+:[/\\]+/g, "").split("").reverse();
    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function (searchElement, fromIndex) {
        var k;
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (len === 0) {
          return -1;
        }
        var n = fromIndex || 0;
        if (Math.abs(n) === Infinity) {
          n = 0;
        }
        if (n >= len) {
          return -1;
        }
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        while (k < len) {
          if (k in O && O[k] === searchElement) {
            return k;
          }
          k++;
        }
        return -1;
      };
    }
    var lastSlashPos = len - 1 - reverseUrl.indexOf("/");
    if (firstAndPos !== -1 && url.indexOf("?") == -1 && firstAndPos > lastSlashPos) {
      url = url.replace("&", "?");
    }
    var reg = new RegExp("([\\?&]".concat(param, "=)[^&#]*"));
    if (!url.match(reg)) {
      var urlInfo = parseUrl(url);
      var hash = urlInfo.hash ? '#' + urlInfo.hash : '';
      url = url.replace(hash, '');
      var _pos = url.indexOf("?");
      if (_pos == -1) {
        return "".concat(url, "?").concat(param, "=").concat(value).concat(hash);
      }
      if (_pos == url.length - 1) {
        return "".concat(url + param, "=").concat(value).concat(hash);
      }
      return "".concat(url, "&").concat(param, "=").concat(value).concat(hash);
    }
    if (forceReplace === true) {
      return url.replace(reg, "$1".concat(value));
    }
    return url;
  }
  function addWxfrom(src, wxfrom) {
    var offset = window.service_type === 1 ? 10000 : 0;
    return addParam(src, 'wxfrom', offset + Number(wxfrom), true);
  }
  function removeParam(url, param) {
    var _URL = new URL(url),
      protocol = _URL.protocol,
      host = _URL.host,
      pathname = _URL.pathname,
      search = _URL.search,
      hash = _URL.hash;
    var queryParams = new URLSearchParams(search);
    queryParams["delete"](param);
    var newSearch = queryParams.toString();
    var newUrl = new URL("".concat(protocol, "//").concat(host).concat(pathname).concat(newSearch ? "?".concat(decodeURIComponent(newSearch)) : "").concat(hash));
    return newUrl.toString();
  }
  function getQuery(name, url) {
    var u = url || window.location.search;
    var reg = new RegExp("(^|&)".concat(name, "=([^&]*)(&|$)"));
    var r = u.substring(u.indexOf('?') + 1).match(reg);
    return r !== null ? r[2] : '';
  }
  function encodeBase64(value) {
    try {
      return window.btoa(value);
    } catch (e) {
      return '';
    }
  }
  function decodeBase64(value) {
    try {
      return window.atob(value);
    } catch (e) {
      return '';
    }
  }
  function joinUrl$1(url) {
    var obj = {};
    if (typeof window.uin !== 'undefined') {
      obj.uin = window.uin;
    }
    if (typeof window.key !== 'undefined') {
      obj.key = window.key;
    }
    if (typeof window.pass_ticket !== 'undefined') {
      obj.pass_ticket = window.pass_ticket;
    }
    if (typeof window.wxtoken !== 'undefined') {
      obj.wxtoken = window.wxtoken;
    }
    if (typeof window.devicetype !== 'undefined') {
      obj.devicetype = window.devicetype;
    }
    if (typeof window.clientversion !== 'undefined') {
      obj.clientversion = window.clientversion || Mmversion.getInner();
    }
    obj.version = obj.clientversion;
    if (window.biz) {
      obj.__biz = window.biz;
    }
    if (getQuery('enterid')) {
      obj.enterid = getQuery('enterid');
    }
    if (typeof window.appmsg_token !== 'undefined') {
      obj.appmsg_token = window.appmsg_token;
    } else if (url.indexOf('advertisement_report') > -1) {
      new Image().src = "".concat(location.protocol, "//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_13_1&r=").concat(Math.random());
    }
    obj.x5 = navigator.userAgent.indexOf('TBS/') !== -1 ? '1' : '0';
    obj.f = 'json';
    return join(url, obj);
  }
  function joinUserArticleRole(url, notJoin, cb) {
    var bizuin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window.biz;
    var scene = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : window.source;
    var needCheckBiz = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    if (notJoin) {
      cb(url);
    } else {
      getIsAuthor(function (isAuthor) {
        cb(addParam(url, 'user_article_role', isAuthor ? 1 : 0, true));
      }, bizuin, scene, needCheckBiz);
    }
  }
  function getA8keyQuery(name, url) {
    return new Promise(function (resolve) {
      if (window.__second_open_wait_a8key__ && window.__second_open_wait_a8key_task__) {
        window.__second_open_wait_a8key_task__.push(function () {
          resolve(getQuery(name, url));
        });
      } else {
        resolve(getQuery(name, url));
      }
    });
  }
  var Url = {
    parseUrl: parseUrl,
    join: join,
    addParam: addParam,
    addWxfrom: addWxfrom,
    getQuery: getQuery,
    getA8keyQuery: getA8keyQuery,
    encodeBase64: encodeBase64,
    decodeBase64: decodeBase64,
    joinUrl: joinUrl$1,
    joinUserArticleRole: joinUserArticleRole,
    removeParam: removeParam
  };

  
  function _log(level, msg) {
    if (level === 'log') {
      level = 'info';
      msg = "[WechatFe]".concat(msg);
    } else {
      var prefix = "__wap__".concat(window.__second_open__ ? ' (sec)' : '');
      msg = "".concat(prefix, " ").concat(msg, " location:[").concat(location.href, "]");
    }
    msg += new Error().stack;
    if (Mmversion.isMpapp) {
      invoke$1('WNNativeCallbackLog', msg);
    } else if (Mmversion.isWechat) {
      if (Mmversion.isAndroid) {
        console.warn('[system]', "[MicroMsg.JsApiLog][".concat(level, "] jslog : ").concat(msg));
      } else if (Mmversion.isIOS) {
        JSAPI.invoke('writeLog', {
          level: level,
          msg: msg
        });
      } else {
        JSAPI.invoke('log', {
          level: level,
          msg: msg
        });
      }
    }
  }
  var Log = {
    info: function info() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _log('info', args.join(' '));
    },
    warn: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      _log('warn', args.join(' '));
    },
    error: function error() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      _log('error', args.join(' '));
    },
    debug: function debug() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      _log('debug', args.join(' '));
    },
    log: function log() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      _log('info', args.join(' '));
    }
  };

  var html = function html(_str, encode) {
    if (!_str) return '';
    var replace = ['&#96;', '`', '&#39;', '\'', '&quot;', '"', '&nbsp;', ' ', '&gt;', '>', '&lt;', '<', '&yen;', '¥', '&amp;', '&', '&#60;', '<', '&#62;', '>'];
    
    var replaceReverse = ['&', '&amp;', '¥', '&yen;', '<', '&lt;', '>', '&gt;', ' ', '&nbsp;', '"', '&quot;', '\'', '&#39;', '`', '&#96;'];
    var str = _str;
    var target;
    if (encode) {
      target = replaceReverse;
    } else {
      target = replace;
    }
    for (var i = 0; i < target.length; i += 2) {
      str = str.replace(new RegExp(target[i], 'g'), target[i + 1]);
    }
    return str;
  };
  var htmlLite = function htmlLite(_str, encode) {
    if (!_str) return '';
    var replace = ['&#96;', '`', '&#39;', '\'', '&quot;', '"', '&gt;', '>', '&lt;', '<', '&amp;', '&'];
    
    var replaceReverse = ['&', '&amp;', '<', '&lt;', '>', '&gt;', '"', '&quot;', '\'', '&#39;', '`', '&#96;'];
    var str = _str;
    var target;
    if (encode) {
      target = replaceReverse;
    } else {
      target = replace;
    }
    for (var i = 0; i < target.length; i += 2) {
      str = str.replace(new RegExp(target[i], 'g'), target[i + 1]);
    }
    return str;
  };
  var htmlEncode = function htmlEncode(str) {
    return html(str, true);
  };
  var htmlDecode = function htmlDecode(str) {
    return html(str, false);
  };
  var htmlEncodeLite = function htmlEncodeLite(str) {
    return htmlLite(str, true);
  };
  var htmlDecodeLite = function htmlDecodeLite(str) {
    return htmlLite(str, false);
  };
  String.prototype.html = function (encode) {
    return html(this.toString(), encode);
  };
  String.prototype.htmlEncode = function () {
    return htmlEncode(this.toString());
  };
  String.prototype.htmlDecode = function () {
    return htmlDecode(this.toString());
  };
  String.prototype.htmlLite = function (encode) {
    return htmlLite(this.toString(), encode);
  };
  String.prototype.htmlEncodeLite = function () {
    return htmlEncodeLite(this.toString());
  };
  String.prototype.htmlDecodeLite = function () {
    return htmlDecodeLite(this.toString());
  };
  
  var _a;
  var METHOD_ENUM = {
    GET: 0,
    POST: 1
  };
  var __moon_report = window.__moon_report || function () {};
  var MOON_AJAX_SUCCESS_OFFSET = 3;
  var MOON_AJAX_NETWORK_OFFSET = 4;
  var MOON_AJAX_ERROR_OFFSET = 5;
  var MOON_AJAX_TIMEOUT_OFFSET = 6;
  var MOON_AJAX_COMPLETE_OFFSET = 7;
  var LENGTH_LIMIT = 4096;
  var doc;
  var isAcrossOrigin = false;
  try {
    doc = (_a = window.top) === null || _a === void 0 ? void 0 : _a.window.document;
  } catch (e) {
    isAcrossOrigin = true;
  }
  function networkStartLog(item) {
    var _a, _b, _c;
    console.log('[system]', "< [request ".concat(item.requestType, "]"), item.method, item);
    if ((_a = window.vConsole) === null || _a === void 0 ? void 0 : _a.network) {
      try {
        return (_c = (_b = window.vConsole.network).add) === null || _c === void 0 ? void 0 : _c.call(_b, Object.assign({}, item, {
          startTime: Date.now(),
          endTime: Date.now(),
          status: 0,
          readyState: 2,
          response: ''
        }));
      } catch (err) {}
    }
    return Object.assign({}, item, {
      id: '__system_log__'
    });
  }
  function networkEndLog(item) {
    var _a, _b, _c;
    console.log('[system]', "> [response ".concat(item.requestType, "]"), item.response, item);
    if (((_a = window.vConsole) === null || _a === void 0 ? void 0 : _a.network) && item.id !== '__system_log__') {
      try {
        return (_c = (_b = window.vConsole.network).update) === null || _c === void 0 ? void 0 : _c.call(_b, item.id, Object.assign({}, item, {
          readyState: 4
        }));
      } catch (err) {}
    }
  }
  function reqType(obj, path) {
    return obj.url.indexOf(path) > -1 && obj.url.indexOf('action=') === -1 && (!obj.data || !obj.data.action);
  }
  function reportRtError(type, id, key, content) {
    var log = '';
    var prefix = type === 'rt' ? 'rtCheckError' : 'Ajax Length Limit';
    if (content === null || content === void 0 ? void 0 : content.length) {
      var loglen = 1000;
      var len = content.length;
      var lc = Math.ceil(len / loglen);
      log = ["&lc=".concat(lc)];
      for (var i = 0; i < lc; ++i) {
        log.push("&log".concat(i, "=") + "[".concat(prefix, "][").concat(i, "]").concat(encodeURIComponent(content.substring(i * loglen, i * loglen + loglen))));
      }
      log = log.join('');
    }
    var data = "idkey=".concat(id, "_").concat(key, "_1").concat(log, "&r=").concat(Math.random());
    var xmlobj = new XMLHttpRequest();
    xmlobj.open('POST', "".concat(location.protocol, "//").concat(location.host, "/mp/jsmonitor?"), true);
    xmlobj.setRequestHeader('cache-control', 'no-cache');
    xmlobj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xmlobj.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xmlobj.send(data);
    if (type === 'ajaxLen') {
      monitor$1.setLogs({
        id: id,
        key: key,
        value: 1,
        log: log
      });
    }
  }
  function reportRt(id, key, content) {
    reportRtError('rt', id, key, content);
  }
  function reportAjaxLength(id, key, content) {
    reportRtError('ajaxLen', id, key, content);
  }
  function setCurrentMpInfo(ifShow) {
    var supportNewTopBar = Mmversion.isIOS && Mmversion.gtVersion('7.0.10', true) || Mmversion.isAndroid && Mmversion.gtVersion('7.0.12', true);
    var supportLiveStatus = Mmversion.isIOS && Mmversion.gtVersion('8.0.46', true) || Mmversion.isAndroid && Mmversion.gtVersion('8.0.46', true);
    JSAPI.invoke('currentMpInfo', {
      userName: window.user_name,
      brandName: !!supportNewTopBar && window.nickname === '' ? '未命名账号' : window.title,
      title: window.msg_title || '',
      brandIcon: window.hd_head_img.replace(/\/0$/, '/132'),
      itemShowType: window.item_show_type,
      isPaySubscribe: window.isPaySubscribe,
      topBarStyle: supportNewTopBar ? 1 : 0,
      topBarShowed: ifShow,
      disableShowFinderLiveTopBar: !ifShow && supportLiveStatus ? 1 : 0,
      brandServiceType: window.service_type === undefined ? 0 : window.service_type + 1
    }, function () {});
  }
  function findAjaxScopeByConfig(url, config) {
    var pathname = new URL(url, location.href).pathname || '';
    var scope = config[pathname.slice(1)];
    if (scope) {
      Log.log('ajax transfer config: ', JSON.stringify(config));
      return scope;
    }
  }
  function getAjaxScope(ajaxUrl) {
    if (Url.getQuery('no_transfer', location.href) !== '1' && Mmversion.isWechat && !Mmversion.isInMiniProgram && !Mmversion.isWxWork && !Mmversion.isMpapp && !isAcrossOrigin && window.__ajaxTransferConfig && _typeof(window.__ajaxTransferConfig) === 'object' && (
    Mmversion.isIOS && Mmversion.compareHexVersion('1800282F') || Mmversion.isAndroid && Mmversion.compareHexVersion('28002234') || Mmversion.isWindowsWechat && Mmversion.cpVersion('3.9.5', 1, true, 'windows') || Mmversion.isMacWechat && Mmversion.cpVersion('3.8.4', 1, true, 'mac'))) {
      try {
        return findAjaxScopeByConfig(ajaxUrl, window.__ajaxTransferConfig);
      } catch (err) {
        
      }
    }
  }
  function setXhrHeader(xhr, type, opt) {
    if (opt.contentType) {
      xhr.setRequestHeader('Content-Type', opt.contentType);
    } else if (type === 'POST') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
    if (!opt.noXRequestedWidthHeader) {
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }
  }
  function Ajax(obj) {
    if (obj.usePb) {
      obj.type = 'POST';
      obj.data = {
        data: JSON.stringify(obj.data)
      };
    }
    var ajaxScope = getAjaxScope(obj.url);
    var type = (obj.type || 'GET').toUpperCase();
    var timer;
    var _url;
    if (obj.notJoinUrl) {
      _url = obj.url;
    } else {
      _url = Url.joinUrl(obj.url);
    }
    Url.joinUserArticleRole(_url, !!obj.notJoinUrl, function (url) {
      if (obj.f === 'html') {
        url = url.replace('&f=json', '');
      }
      var data = null;
      if (obj.data instanceof Blob) {
        data = obj.data;
      } else if (_typeof(obj.data) === 'object') {
        var d = obj.data;
        var ds = [];
        for (var k in d) {
          if (d.hasOwnProperty(k)) {
            ds.push("".concat(k, "=").concat(encodeURIComponent(d[k])));
          }
        }
        data = ds.join('&');
      } else {
        data = typeof obj.data === 'string' ? obj.data : null;
      }
      var beginTs;
      var beforeReq = function beforeReq() {
        if (reqType(obj, '/mp/getappmsgext')) {
          window.startGetAppmsgExtTime = Date.now();
          Log.log('start get appmsgext, url: ', obj.url);
        }
        if (reqType(obj, '/mp/getappmsgad')) {
          window.startGetAppmsgAdTime = Date.now();
          Log.log('start get appmsgad, url: ', obj.url);
        }
        beginTs = Date.now();
      };
      var beforeResp = function beforeResp(xhr) {
        if (reqType(obj, '/mp/getappmsgext')) {
          window.receiveGetAppmsgExt = "".concat(xhr.status, "|").concat(Date.now());
          Log.log("receive appmsgext response, status: ".concat(xhr.status));
        }
        if (reqType(obj, '/mp/getappmsgad')) {
          window.receiveGetAppmsgAd = "".concat(xhr.status, "|").concat(Date.now());
          Log.log("receive appmsgad response, status: ".concat(xhr.status));
        }
        if (Math.random() < 0.01 && window.WX_BJ_REPORT && window.WX_BJ_REPORT.BadJs) {
          try {
            var key = ajaxScope ? 'transfer' : 'xhr';
            var interval = 250;
            var time = Date.now() - beginTs;
            var range = Math.floor(time / interval) * interval;
            var pathname = new URL(obj.url, location.href).pathname || '';
            window.WX_BJ_REPORT.BadJs.report("".concat(key, "_perf:").concat(pathname), JSON.stringify({
              status: xhr.status,
              time: "[".concat(range, "-").concat(range + interval, ")")
            }), {
              mid: 'mmbizwap:ajaxtransfer',
              view: 'wap_business'
            });
          } catch (err) {}
        }
      };
      var handleRespSucc = function handleRespSucc(xhr) {
        var _a;
        try {
          var responseText = xhr.responseText;
          var resp = responseText;
          if (obj.dataType === 'json') {
            try {
              if (JSON && JSON.parse) {
                resp = JSON.parse(resp);
              } else {
                resp = eval("(".concat(resp, ")"));
                monitor$1.setSum(523105, 127, 1).send();
              }
              var rtId = obj.rtId;
              var rtKey = obj.rtKey || 0;
              var rtDesc = obj.rtDesc;
              if (rtId && rtDesc && RespTypes && !RespTypes.check(resp, rtDesc)) {
                reportRt(+rtId, +rtKey, "".concat(RespTypes.getMsg(), "[detail]").concat(responseText, ";").concat(obj.url));
              }
              if (resp && resp.base_resp && ((_a = resp.base_resp) === null || _a === void 0 ? void 0 : _a.ret) !== 0 && typeof window.WX_BJ_REPORT !== 'undefined' && window.WX_BJ_REPORT.BadJs && Math.random() < 0.001) {
                var reportUrl = url;
                if (url.indexOf('?') !== -1) {
                  reportUrl = url.substring(0, url.indexOf('?'));
                  if (Url.getQuery('action', url)) {
                    reportUrl = "".concat(reportUrl, "?action=").concat(Url.getQuery('action', url));
                  }
                }
                if (!((reportUrl === '/mp/getappmsgext' || reportUrl === '/mp/getappmsgad') && typeof resp.base_resp.ret === 'undefined')) {
                  window.WX_BJ_REPORT.BadJs.report(reportUrl, "ret=".concat(resp.base_resp.ret), {
                    mid: window.PAGE_MID,
                    view: 'wap_retcode'
                  });
                }
              }
            } catch (e) {
              obj.error && obj.error(xhr, {
                type: 1,
                error: e,
                status: xhr.status
              });
              return;
            }
          }
          obj.success && obj.success(resp);
        } catch (e) {
          __moon_report({
            offset: MOON_AJAX_SUCCESS_OFFSET,
            e: e
          });
          throw e;
        }
      };
      var handleRespErr = function handleRespErr(xhr, error) {
        try {
          obj.error && obj.error(xhr, {
            type: 2,
            error: error,
            status: xhr.status
          });
        } catch (e) {
          __moon_report({
            offset: MOON_AJAX_ERROR_OFFSET,
            e: e
          });
          throw e;
        }
      };
      var handleRespComplete = function handleRespComplete() {
        clearTimeout(timer);
        try {
          obj.complete && obj.complete();
        } catch (e) {
          __moon_report({
            offset: MOON_AJAX_COMPLETE_OFFSET,
            e: e
          });
          throw e;
        }
        obj.complete = null;
      };
      var handleReqTimeout = function handleReqTimeout(xhr) {
        if (typeof obj.timeout !== 'undefined') {
          timer = setTimeout(function () {
            xhr.abort();
            try {
              obj.complete && obj.complete();
            } catch (e) {
              __moon_report({
                offset: MOON_AJAX_COMPLETE_OFFSET,
                e: e
              });
              throw e;
            }
            obj.complete = null;
            __moon_report({
              offset: MOON_AJAX_TIMEOUT_OFFSET,
              log: "ajax_timeout_error: ".concat(url),
              e: ''
            });
          }, obj.timeout);
        }
      };
      var retryXhrFn = function retryXhrFn(res, isTimeout, reqLogItem) {
        var retryXhr = new XMLHttpRequest();
        try {
          retryXhr._noVConsole = true;
        } catch (err) {}
        retryXhr.open(type, url);
        retryXhr.onreadystatechange = function () {
          if (isTimeout) return;
          if (retryXhr.readyState === 3) {
            obj.received && obj.received(retryXhr);
          }
          if (retryXhr.readyState === 4) {
            beforeResp(retryXhr);
            var retryStatus = retryXhr.status;
            if (retryStatus >= 200 && retryStatus < 400) {
              handleRespSucc(retryXhr);
            } else {
              handleRespErr(retryXhr, res);
              window.WX_BJ_REPORT && window.WX_BJ_REPORT.BadJs && window.WX_BJ_REPORT.BadJs.report('req_failure', JSON.stringify({
                retryXhrStatus: retryStatus,
                transferRes: res
              }), {
                mid: 'mmbizwap:ajaxtransfer',
                view: 'wap_business'
              });
            }
            reqLogItem.status = retryStatus;
            reqLogItem.endTime = Date.now();
            reqLogItem.response = retryXhr.responseText;
            handleRespComplete();
            networkEndLog(reqLogItem);
          }
        };
        setXhrHeader(retryXhr, type, obj);
        retryXhr.send(data);
      };
      if (ajaxScope && !obj.pureHttp) {
        var header = {
          'User-Agent': navigator.userAgent,
          'Cookie': (window.__test_env__ ? 'uniproxy_route=1; ' : '') + document.cookie,
          'Referer': location.href
        };
        if (obj.contentType) {
          header['Content-Type'] = obj.contentType;
        } else if (type === 'POST') {
          header['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        if (!obj.noXRequestedWidthHeader) {
          header['X-Requested-With'] = 'XMLHttpRequest';
        }
        var reqUrl = new URL(url, location.href).href;
        var method = METHOD_ENUM[type] || 0;
        var params = Device.os.pc ? {
          url: reqUrl,
          req_json: data || '',
          scope: ajaxScope,
          webcgi_method: method,
          webcgi_header: Object.keys(header).map(function (headerItemKey) {
            return Device.os.Mac ? _defineProperty({}, headerItemKey, header[headerItemKey]) : {
              key: headerItemKey,
              value: header[headerItemKey]
            };
          }),
          cgi_type: 1
        } : {
          reqUrl: reqUrl,
          reqBody: data,
          scope: ajaxScope,
          method: method,
          header: header
        };
        var reqLogItem = networkStartLog({
          method: type,
          url: url,
          postData: obj.data || {},
          requestHeader: header,
          requestType: 'transfer'
        });
        var isTimeout = false;
        handleReqTimeout({
          abort: function abort() {
            isTimeout = true;
            reqLogItem.endTime = Date.now();
            reqLogItem.response = 'timeout';
            networkEndLog(reqLogItem);
          }
        });
        Device.os.pc && monitor$1.setSum(115849, 69, 1);
        JSAPI.invoke(Device.os.pc ? 'H5ExtTransfer' : 'webTransfer', params, function (res) {
          var _a, _b, _c, _d, _e, _f;
          if (isTimeout) return;
          var status = 400;
          var result = '';
          if (Device.os.pc) {
            try {
              var retFlag = res.base_resp.ret === 0 && res.jsapi_resp.ret === 0 && res.err_msg.indexOf(':ok') > -1;
              var respJsonFlag = res.jsapi_resp.resp_json;
              status = retFlag && respJsonFlag ? 200 : 400;
              result = res.jsapi_resp.resp_json;
            } catch (err) {
              console.error(err);
            }
          } else {
            status = res && res.errCode * 1 === 0 && typeof res.result === 'string' && res.result ? 200 : 400;
            result = res.result;
          }
          if (status >= 200 && status < 400) {
            obj.received && obj.received(null);
            beforeResp({
              status: status
            });
            handleRespSucc({
              status: status,
              responseText: result
            });
            reqLogItem.status = status;
            reqLogItem.endTime = Date.now();
            reqLogItem.response = result;
            handleRespComplete();
            networkEndLog(reqLogItem);
          } else if (window.__second_open__) {
            JSAPI.invoke('request', {
              url: reqUrl,
              method: type,
              data: data,
              header: header
            }, function (retryRes) {
              if (isTimeout) return;
              var retryStatus = retryRes.statusCode;
              obj.received && obj.received(null);
              beforeResp({
                status: retryStatus
              });
              if (retryRes.err_msg.indexOf(':ok') > -1 && retryStatus >= 200 && retryStatus < 400) {
                handleRespSucc({
                  status: retryStatus,
                  responseText: retryRes.data
                });
              } else {
                retryXhrFn(res, isTimeout, reqLogItem);
                handleRespErr({
                  status: retryStatus
                }, res);
                window.WX_BJ_REPORT && window.WX_BJ_REPORT.BadJs && window.WX_BJ_REPORT.BadJs.report('req_failure_sec_open', JSON.stringify({
                  retryReqJsapiRes: retryRes,
                  transferRes: res,
                  url: reqUrl
                }), {
                  mid: 'mmbizwap:ajaxtransfer',
                  view: 'wap_business'
                });
              }
              reqLogItem.status = retryStatus;
              reqLogItem.endTime = Date.now();
              reqLogItem.response = retryRes.data;
              handleRespComplete();
              networkEndLog(reqLogItem);
            });
          } else {
            retryXhrFn(res, isTimeout, reqLogItem);
          }
          if (Device.os.pc) {
            if (!res.err_msg.includes(':ok')) {
              (_b = (_a = window.WX_BJ_REPORT) === null || _a === void 0 ? void 0 : _a.BadJs) === null || _b === void 0 ? void 0 : _b.report("pc transfer res no ok: ".concat(res.err_msg), params.url || '', {
                mid: window.PAGE_MID,
                _info: "".concat(JSON.stringify(params), " || ").concat(JSON.stringify(res))
              });
            }
            try {
              if (res.jsapi_resp.resp_json && JSON.parse(res.jsapi_resp.resp_json).base_resp.ret !== 0 && JSON.parse(res.jsapi_resp.resp_json).base_resp.ret !== 190001 || res.base_resp.ret !== 0 || res.jsapi_resp.ret !== 0) {
                (_d = (_c = window.WX_BJ_REPORT) === null || _c === void 0 ? void 0 : _c.BadJs) === null || _d === void 0 ? void 0 : _d.report("pc transfer res invalid ret", params.url || '', {
                  mid: window.PAGE_MID,
                  _info: "".concat(JSON.stringify(params), " || ").concat(JSON.stringify(res))
                });
              }
            } catch (err) {}
          } else {
            try {
              if (res.errCode !== 0) {
                (_f = (_e = window.WX_BJ_REPORT) === null || _e === void 0 ? void 0 : _e.BadJs) === null || _f === void 0 ? void 0 : _f.report("mobile transfer res invalid ret", params.url || '', {
                  mid: window.PAGE_MID,
                  _info: "".concat(JSON.stringify(params), " || ").concat(JSON.stringify(res))
                });
              }
            } catch (err) {}
          }
        });
        beforeReq();
        return;
      }
      var xhr = new XMLHttpRequest();
      var mayAbort = !!obj.mayAbort;
      var async = typeof obj.async === 'undefined' ? true : obj.async;
      var _onreadystatechange = xhr.onreadystatechange;
      xhr.open(type, url, async);
      xhr.onreadystatechange = function () {
        if (typeof _onreadystatechange === 'function') {
          _onreadystatechange.apply(xhr);
        }
        if (xhr.readyState === 3) {
          obj.received && obj.received(xhr);
        }
        if (xhr.readyState === 4) {
          beforeResp(xhr);
          xhr.onreadystatechange = null;
          var status = xhr.status;
          if (status >= 200 && status < 400) {
            handleRespSucc(xhr);
          } else {
            handleRespErr(xhr, 'status error');
            if (!!status || !mayAbort) {
              var __ajaxtest = window.__ajaxtest || '0';
              __moon_report({
                offset: MOON_AJAX_NETWORK_OFFSET,
                log: "ajax_network_error[".concat(status, "][").concat(__ajaxtest, "]: ").concat(url, ";host:").concat(location.host),
                e: ''
              });
            }
          }
          handleRespComplete();
        }
      };
      setXhrHeader(xhr, type, obj);
      handleReqTimeout(xhr);
      try {
        xhr.send(data);
        try {
          if (url && url.length > LENGTH_LIMIT) {
            reportAjaxLength(27613, 17, "ajax get limit[length: ".concat(url.length, "]").concat(url.substring(0, 1024)));
          }
          if (data && !(data instanceof Blob) && data.length > LENGTH_LIMIT) {
            reportAjaxLength(27613, 18, "ajax post limit[length: ".concat(data.length, "]").concat(data.substring(0, 1024)));
          }
          if (data && data instanceof Blob && data.size > LENGTH_LIMIT) {
            reportAjaxLength(27613, 18, "ajax post limit[length: ".concat(data.size, "]blob"));
          }
        } catch (e) {
        }
      } catch (e) {
        obj.error && obj.error(xhr, {
          type: 3,
          error: e,
          status: 0
        });
      }
      beforeReq();
    });
  }
  function AjaxWx(obj) {
    obj.url += obj.url.indexOf('?') === -1 ? '?fasttmplajax=1' : '&fasttmplajax=1';
    if (getAjaxScope(obj.url)) {
      Ajax(obj);
      return;
    }
    if (obj.usePb) {
      obj.type = 'POST';
      obj.data = {
        data: JSON.stringify(obj.data)
      };
    }
    if (!/^(http:\/\/|https:\/\/|\/\/)/.test(obj.url)) {
      obj.url = "https://mp.weixin.qq.com/".concat(obj.url.replace(/^\//, ''));
    } else if (/^\/\//.test(obj.url)) {
      obj.url = "https:".concat(obj.url);
    }
    if (obj.f !== 'html' && (obj.url.indexOf('?f=json') === -1 || obj.url.indexOf('&f=json') === -1)) {
      obj.url += '&f=json';
    }
    if (!obj.notJoinUrl && obj.f !== 'html') {
      obj.url = Url.joinUrl(obj.url);
    }
    Url.joinUserArticleRole(obj.url, !!obj.notJoinUrl, function (url) {
      obj.url = url;
      var data = null;
      if (_typeof(obj.data) === 'object') {
        var d = obj.data;
        var ds = [];
        for (var k in d) {
          if (d.hasOwnProperty(k)) {
            ds.push("".concat(k, "=").concat(encodeURIComponent(d[k])));
          }
        }
        data = ds.join('&');
      } else {
        data = typeof obj.data === 'string' ? obj.data : null;
      }
      var header = {
        Cookie: document.cookie,
        referer: location.href
      };
      var reqLogItem = networkStartLog({
        method: obj.type || 'GET',
        url: obj.url,
        postData: obj.data || {},
        requestHeader: header,
        requestType: 'jsapi'
      });
      var retryTime = 1;
      var jsapiRequest = function jsapiRequest(obj, data) {
        return JSAPI.invoke('request', {
          url: obj.url,
          method: obj.type,
          data: data,
          header: header
        }, function (res) {
          var _a;
          if (res.err_msg.indexOf(':ok') > -1) {
            if (reqType(obj, '/mp/getappmsgext')) {
              window.receiveGetAppmsgExt = "".concat(res.statusCode, "|").concat(Date.now());
            }
            if (reqType(obj, '/mp/getappmsgad')) {
              window.receiveGetAppmsgAd = "".concat(res.statusCode, "|").concat(Date.now());
            }
            if (retryTime === 1) {
              obj.received && obj.received(null);
            }
            var resData = {};
            if (res.data) {
              try {
                if (obj.dataType === 'json') {
                  resData = JSON.parse(res.data);
                } else {
                  resData = res.data;
                }
                if (resData && resData.base_resp && ((_a = resData.base_resp) === null || _a === void 0 ? void 0 : _a.ret) !== 0 && typeof window.WX_BJ_REPORT !== 'undefined' && window.WX_BJ_REPORT.BadJs && Math.random() < 0.001) {
                  var reportUrl = obj.url;
                  if (obj.url.indexOf('?') !== -1) {
                    reportUrl = obj.url.substring(0, obj.url.indexOf('?'));
                    if (Url.getQuery('action', obj.url)) {
                      reportUrl = "".concat(reportUrl, "?action=").concat(Url.getQuery('action', obj.url));
                    }
                  }
                  if (!((reportUrl === '/mp/getappmsgext' || reportUrl === '/mp/getappmsgad') && typeof resData.base_resp.ret === 'undefined')) {
                    window.WX_BJ_REPORT.BadJs.report(reportUrl, "ret=".concat(resData.base_resp.ret), {
                      mid: window.PAGE_MID,
                      view: 'wap_retcode'
                    });
                  }
                }
              } catch (e) {
                console.error(e);
                obj.error && obj.error(null, {
                  type: 1,
                  error: e,
                  status: res.statusCode
                });
                obj.complete && obj.complete();
                reqLogItem.endTime = Date.now();
                reqLogItem.response = res;
                networkEndLog(reqLogItem);
                return;
              }
            }
            var tmpResData = {};
            try {
              tmpResData = JSON.parse(res.data);
            } catch (e) {}
            if (tmpResData && tmpResData.base_resp && tmpResData.base_resp.ret === -3 && retryTime < 2 && (Mmversion.isIOS || Mmversion.isAndroid && Mmversion.getInner() > '27000600')) {
              var _retryTime = retryTime++;
              JSAPI.invoke('updatePageAuth', {}, function (res) {
                console.log('[skeleton] updatePageAuth', res);
                monitor$1.setSum(112287, 3, 1);
                if (res && res.err_msg && res.err_msg.indexOf(':ok') > -1) {
                  window.top.pass_ticket = encodeURIComponent(Url.getQuery('pass_ticket', res.fullUrl).html(false).replace(/\s/g, '+'));
                  if (obj.pass_ticket) {
                    obj.pass_ticket = window.top.pass_ticket;
                  }
                  console.warn('[skeleton] updatePageAuth resetTopbar');
                  var supportNewTopBar = Mmversion.isIOS && Mmversion.gtVersion('7.0.10', true);
                  var showBottomBar = !!window.is_login;
                  if (window.top.item_show_type === '0' && supportNewTopBar) {
                    var _top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
                    setCurrentMpInfo(_top > 40 && !showBottomBar);
                  }
                  try {
                    obj.url = Url.addParam(obj.url, 'retry', _retryTime, true);
                  } catch (err) {
                    console.error(err);
                  }
                  jsapiRequest(obj, data);
                  monitor$1.setSum(112287, 4, 1);
                } else {
                  obj.success && obj.success(resData);
                  obj.complete && obj.complete();
                  if (Mmversion.isIOS) {
                    monitor$1.setSum(112287, 35, 1);
                  } else {
                    monitor$1.setSum(112287, 36, 1);
                  }
                  reqLogItem.status = 200;
                  reqLogItem.endTime = Date.now();
                  reqLogItem.response = resData;
                  networkEndLog(reqLogItem);
                }
              });
            } else {
              obj.success && obj.success(resData);
              obj.complete && obj.complete();
              reqLogItem.status = 200;
              reqLogItem.endTime = Date.now();
              reqLogItem.response = resData;
              networkEndLog(reqLogItem);
            }
          } else if (res.err_msg.indexOf('no permission') > -1 || !Mmversion.isOnlyWechat) {
            Ajax(obj);
            if (res.err_msg.indexOf('no permission') > -1) {
              console.warn('[JSAPI Request] No permission');
              monitor$1.setSum(112287, 31, 1);
            }
            reqLogItem.status = 302;
            reqLogItem.endTime = Date.now();
            reqLogItem.response = res;
            networkEndLog(reqLogItem);
          } else {
            obj.error && obj.error(null, {
              type: 3,
              error: res,
              status: 0
            });
            obj.complete && obj.complete();
            monitor$1.setSum(112287, 32, 1);
            var sample = 0.001;
            if (Math.random() < sample) {
              var msg = "request: ".concat(JSON.stringify(obj.type), " ").concat(JSON.stringify(obj.url), " ;;;; cookie: ").concat(JSON.stringify(document.cookie), " ;;;; data: ").concat(JSON.stringify(data), " ;;;; resp: ").concat(JSON.stringify(res));
              if (window.WX_BJ_REPORT && window.WX_BJ_REPORT.BadJs) {
                window.WX_BJ_REPORT.BadJs.report('ajax_wx_request_error', msg, {
                  mid: 'mmbizwap:Monitor'
                });
              }
            }
            reqLogItem.status = 400;
            reqLogItem.endTime = Date.now();
            reqLogItem.response = res;
            networkEndLog(reqLogItem);
          }
        });
      };
      if (reqType(obj, '/mp/getappmsgext')) {
        window.startGetAppmsgExtTime = Date.now();
      }
      if (reqType(obj, '/mp/getappmsgad')) {
        window.startGetAppmsgAdTime = Date.now();
      }
      jsapiRequest(obj, data);
    });
  }
  var ajax = function ajax(obj) {
    if (window.__second_open_wait_a8key__ && window.__second_open_wait_a8key_task__) {
      window.__second_open_wait_a8key_task__.push(function () {
        ajax(obj);
      });
      return;
    }
    if (!Mmversion.isWxWork && (window.__second_open__ || !isAcrossOrigin && top.window.__second_open__) && window.__is_page_auth_return__ && !obj.pureHttp) {
      return AjaxWx(obj);
    }
    return Ajax(obj);
  };

  
  var timer = null;
  var jsmonitorReport = {
    setSum: function setSum(id, key, value) {
      throw new Error('Function not implemented.');
    },
    setAvg: function setAvg(id, key, value) {
      throw new Error('Function not implemented.');
    },
    setLogs: function setLogs(opt) {
      throw new Error('Function not implemented.');
    },
    send: function send(async) {
      throw new Error('Function not implemented.');
    }
  };
  window.__monitor_unload_has_done__ = false;
  jsmonitorReport.setSum = function (id, key, value) {
    monitor$1.setSum(id, key, value);
    return jsmonitorReport;
  };
  jsmonitorReport.setAvg = function (id, key, value) {
    monitor$1.setAvg(id, key, value);
    return jsmonitorReport;
  };
  jsmonitorReport.setLogs = function (opt) {
    monitor$1.setLogs(opt);
    return jsmonitorReport;
  };
  jsmonitorReport.send = function (async) {
    if (async !== false) {
      async = true;
    }
    monitor$1.send(async, ajax);
    return jsmonitorReport;
  };
  function reportInterval(fn, delay) {
    timer = window.setTimeout(function () {
      fn();
      reportInterval(fn, delay);
    }, delay);
  }
  reportInterval(function () {
    jsmonitorReport.send();
  }, 1 * 1000);
  window.addEventListener('unload', function () {
    if (window.__monitor_report_has_done__) return;
    window.__ajaxtest = '2';
    if (timer) {
      window.clearTimeout(timer);
      timer = null;
    }
    jsmonitorReport.send(false);
    window.__monitor_unload_has_done__ = true;
  }, false);
  if (window.__jsmonitorReport) {
    jsmonitorReport = window.__jsmonitorReport;
  } else {
    window.__jsmonitorReport = jsmonitorReport;
  }
  var jsmonitorReport$1 = jsmonitorReport;

  var isx5 = navigator.userAgent.indexOf('TBS/') !== -1;
  var getDataFunc = [];
  var reportData = [];
  
  var specificData = {};
  function joinUrl(url) {
    var obj = {};
    if (typeof window.uin !== 'undefined') {
      obj.uin = window.uin;
    }
    if (typeof window.key !== 'undefined') {
      obj.key = window.key;
    }
    if (typeof window.pass_ticket !== 'undefined') {
      obj.pass_ticket = window.pass_ticket;
    }
    if (typeof window.wxtoken !== 'undefined') {
      obj.wxtoken = window.wxtoken;
    }
    if (typeof window.devicetype !== 'undefined') {
      obj.devicetype = window.devicetype;
    }
    if (typeof window.clientversion !== 'undefined') {
      obj.clientversion = window.clientversion;
    }
    if (typeof window.appmsg_token !== 'undefined') {
      obj.appmsg_token = window.appmsg_token;
    } else if (url.indexOf('advertisement_report') > -1) {
      new Image().src = "".concat(location.protocol, "//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_13_1&r=").concat(Math.random());
    }
    obj.x5 = isx5 ? '1' : '0';
    obj.f = 'json';
    return Url.join(url, obj);
  }
  function isObj(obj) {
    return obj && _typeof(obj) === 'object';
  }
  function assign(target, source) {
    if (isObj(target) && isObj(source)) {
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
  }
  function assembleReportData(initiative) {
    var leaveReportLog = [];
    leaveReportLog.push({
      content: "[LeaveReport] specificData keys: ".concat(Object.keys(specificData)),
      timestamp: Date.now()
    });
    Log.log("[LeaveReport] specificData keys: ".concat(Object.keys(specificData)));
    console.log("[LeaveReport] specificData keys: ".concat(Object.keys(specificData)));
    var allReportData = {};
    for (var reportField in specificData) {
      if (!allReportData[reportField]) {
        allReportData[reportField] = {};
      }
      for (var i = 0; i < specificData[reportField].length; i++) {
        var param = specificData[reportField][i];
        if (typeof param === 'function') {
          try {
            assign(allReportData[reportField], param(initiative));
          } catch (err) {
            leaveReportLog.push({
              content: "[LeaveReport] specificData exec error: ".concat(param.toString().substring(0, 50)),
              timestamp: Date.now()
            });
            Log.error("[LeaveReport] specificData exec error: ".concat(param.toString().substring(0, 50)));
            console.error("[LeaveReport] specificData exec error: ".concat(param.toString().substring(0, 50)));
          }
        } else if (isObj(param)) {
          assign(allReportData[reportField], param);
        }
      }
    }
    leaveReportLog.push({
      content: "[LeaveReport] reportData.length: ".concat(reportData.length),
      timestamp: Date.now()
    });
    Log.log("[LeaveReport] reportData.length: ".concat(reportData.length));
    console.log("[LeaveReport] reportData.length: ".concat(reportData.length));
    leaveReportLog.push({
      content: "[LeaveReport] getDataFunc.length: ".concat(getDataFunc.length),
      timestamp: Date.now()
    });
    Log.log("[LeaveReport] getDataFunc.length: ".concat(getDataFunc.length));
    console.log("[LeaveReport] getDataFunc.length: ".concat(getDataFunc.length));
    for (var _i = 0; _i < getDataFunc.length; _i++) {
      try {
        var data = getDataFunc[_i](initiative);
        if (isObj(data)) {
          reportData.push(data);
        }
      } catch (err) {
        leaveReportLog.push({
          content: "[LeaveReport] getDataFunc exec error: ".concat(getDataFunc[_i].toString().substring(0, 50)),
          timestamp: Date.now()
        });
        Log.error("[LeaveReport] getDataFunc exec error: ".concat(getDataFunc[_i].toString().substring(0, 50)));
        console.error("[LeaveReport] getDataFunc exec error: ".concat(getDataFunc[_i].toString().substring(0, 50)));
      }
    }
    for (var _i2 = 0; _i2 < reportData.length; _i2++) {
      if (reportData[_i2].reportUrl) {
        reportData[_i2].reportUrl = joinUrl(reportData[_i2].reportUrl);
      }
    }
    allReportData.data = {
      'requestList': reportData
    };
    leaveReportLog.push({
      content: "[LeaveReport] final reportData.length: ".concat(reportData.length, ", data=").concat(JSON.stringify(reportData)),
      timestamp: Date.now()
    });
    Log.log("[LeaveReport] final reportData.length: ".concat(reportData.length));
    console.log("[LeaveReport] final reportData.length: ".concat(reportData.length));
    allReportData.info = leaveReportLog;
    return allReportData;
  }
  function addReport(param) {
    if (typeof param === 'function') {
      getDataFunc.push(param);
    } else if (isObj(param)) {
      reportData.push(param);
    }
  }
  
  function addSpecificReport(reportField, param) {
    if (!specificData[reportField]) {
      specificData[reportField] = [];
    }
    specificData[reportField].push(param);
  }
  
  function reportNow(callback) {
    var allReportData = assembleReportData(true);
    JSAPI.invoke('handleMPPageAction', {
      action: 'reportByLeaveForMPGateway',
      reportData: allReportData
    }, function (res) {
      if (res && res.err_msg && res.err_msg.indexOf(':ok') !== -1) {
        getDataFunc = [];
        reportData = [];
        specificData = {};
        typeof callback === 'function' && callback(res);
      } else {
        getDataFunc = [];
        reportData = [];
        var len = allReportData.data.requestList.length;
        allReportData.data.requestList.forEach(function (req) {
          if (req.reportUrl) {
            ajax({
              type: req.method || 'GET',
              url: req.reportUrl,
              data: req.reportData,
              async: false,
              success: function success(resp) {
                if (--len < 0) {
                  typeof callback === 'function' && callback({
                    err_msg: 'handleMPPageAction:ok',
                    fallback: true,
                    resp: resp
                  });
                }
              },
              error: function error(xhr, err) {
                if (--len < 0) {
                  typeof callback === 'function' && callback({
                    err_msg: 'handleMPPageAction:fail',
                    fallback: true,
                    err: err
                  });
                }
              }
            });
          }
        });
      }
    });
  }
  var leaveReport = {
    reportNow: reportNow,
    addReport: addReport,
    addSpecificReport: addSpecificReport
  };
  var _leaveReport = (function () {
    var doc = {};
    var isCrossOrigin = false;
    try {
      doc = top.window.document;
    } catch (e) {
      isCrossOrigin = true;
    }
    if (!isCrossOrigin && top.window.__leaveReport) {
      return top.window.__leaveReport;
    }
    if (window.__leaveReport) {
      return window.__leaveReport;
    }
    JSAPI.on('reportOnLeaveForMP', function () {
      return assembleReportData(false);
    });
    return window.__leaveReport = leaveReport;
  })();
  var batchReportDataArr = [];
  var getRepeatedReportJson = function getRepeatedReportJson() {
    if (!batchReportDataArr || !batchReportDataArr.length) return false;
    var reportData = {
      count: 0
    };
    reportData.count = batchReportDataArr.length;
    batchReportDataArr.forEach(function (data, index) {
      reportData["reportjson".concat(index)] = data;
    });
    batchReportDataArr = [];
    console.log('[reportData]: ', reportData);
    return reportData;
  };
  _leaveReport.addReport(function () {
    var repeatedReportJson = getRepeatedReportJson();
    if (!repeatedReportJson) return false;
    var reportData = [];
    for (var _i = 0, _Object$entries = Object.entries(repeatedReportJson); _i < _Object$entries.length; _i++) {
      var _Object_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object_i[0],
        value = _Object_i[1];
      reportData.push("".concat(key, "=").concat(encodeURIComponent(value)));
    }
    return {
      reportUrl: 'https://mp.weixin.qq.com/mp/wapcommreport?action=batch_report',
      reportData: reportData.join('&'),
      method: 'POST'
    };
  });

  
  var ua = navigator.userAgent;
  var is_android = /(Android)/i.test(ua);
  var g = {
    x: 0,
    y: 0,
    isPc: /(WindowsNT)|(Windows NT)|(Macintosh)|Linux/i.test(navigator.userAgent) && !is_android,
    isWp: /Windows\sPhone/i.test(ua),
    tsTime: -1
  };
  var prefixes = ['webkit', 'moz', 'ms', 'o'];
  if (isUseTap()) {
    on(document, "touchstart", function (e) {
      if (e.touches.length === 1) {
        var st = e.touches[0];
        g.x = st.clientX;
        g.y = st.clientY;
        g.tsTime = +new Date();
      } else {
        g.tsTime = -1;
      }
    });
  }
  var scrolling;
  function isScrolling() {
    if (scrolling && new Date().getTime() - scrolling < 200) return true;
    return false;
  }
  window.addEventListener('scroll', function () {
    scrolling = new Date().getTime();
  }, true);
  function isUseTap() {
    if (g.isPc || g.isWp) {
      return false;
    }
    return true;
  }
  
  function tap(el, cb, flag, className) {
    if (!isUseTap()) {
      on(el, "click", className, cb, flag);
    } else {
      cb.tap_handler = function (e) {
        if (g.tsTime == -1 || +new Date() - g.tsTime > 200 || isScrolling()) {
          return;
        }
        var st = e.changedTouches[0];
        if (Math.abs(g.y - st.clientY) <= 5 && Math.abs(g.x - st.clientX) <= 5) {
          return cb.call(this, e);
          
        }
      };
      on(el, "touchend", className, cb.tap_handler, flag);
    }
  }
  
  function longtap(el, cb, _flag, className, cancelCb) {
    var self = this;
    var timeOutEvent;
    if (g.isPc || g.isWp) {
      var mousedown = false;
      var x;
      var y;
      var triggerLongClick;
      on(el, 'mousedown', className, function (e) {
        triggerLongClick = false;
        mousedown = true;
        x = e.clientX;
        y = e.clientY;
        timeOutEvent = setTimeout(function () {
          triggerLongClick = true;
          timeOutEvent = undefined;
          cb.call(this, e);
        }, 500);
        e.preventDefault();
      });
      on(el, 'mousemove', className, function (e) {
        if (!mousedown) return;
        if (timeOutEvent && (Math.abs(y - e.clientY) > 5 || Math.abs(x - e.clientX) > 5)) {
          clearTimeout(timeOutEvent);
          timeOutEvent = undefined;
          typeof cancelCb === 'function' && cancelCb.call(self, e);
        }
      });
      on(el, 'mouseup', className, function () {
        mousedown = false;
        clearTimeout(timeOutEvent);
      });
      on(el, 'click', className, function () {
        if (triggerLongClick) return false;
      });
    } else {
      on(el, 'touchstart', className, function (e) {
        e.touches.length === 1 && (timeOutEvent = setTimeout(function () {
          timeOutEvent = undefined;
          cb.call(self, e);
        }, 500));
      });
      on(el, 'touchmove', className, function (e) {
        if (!timeOutEvent) return;
        var st = e.changedTouches[0];
        if (Math.abs(g.y - st.clientY) > 5 || Math.abs(g.x - st.clientX) > 5) {
          clearTimeout(timeOutEvent);
          timeOutEvent = undefined;
          typeof cancelCb === 'function' && cancelCb.call(self, e);
        }
      });
      on(el, 'touchend', className, function (e) {
        if (timeOutEvent) {
          clearTimeout(timeOutEvent);
          timeOutEvent = undefined;
        } else {
          e.preventDefault();
        }
      }, true);
    }
  }
  function doubletap(el, cb) {
    var _this = this;
    var __lastTouchVideoTs = 0;
    var realCb = function realCb(e) {
      if (Date.now() - __lastTouchVideoTs < 300) {
        cb.call(_this, e);
      }
      __lastTouchVideoTs = Date.now();
    };
    tap(el, realCb);
    return function () {
      return off(el, 'touchend', realCb);
    };
  }
  function matches(ele, className) {
    if (!ele || !className || ele.nodeType != ele.ELEMENT_NODE) return false;
    var matchesSelector = ele.webkitMatchesSelector || ele.msMatchesSelector || ele.matchesSelector;
    if (matchesSelector) return matchesSelector.call(ele, className);
    className = className.substr(1);
    return ele.className.indexOf(className) > -1;
  }
  function closest(target, className, context) {
    while (target && !matches(target, className)) {
      target = target !== context && target.nodeType !== target.DOCUMENT_NODE && target.parentNode;
    }
    return target;
  }
  function on(el, type, className, cb, flag, extra) {
    var callback;
    var handler;
    var delegator;
    if (type == "input" && g.isPc) {
      type = "keyup";
    }
    if (!el) return;
    if (typeof className === 'function') {
      extra = flag;
      flag = cb;
      cb = className;
      className = '';
    }
    if (typeof className !== 'string') {
      className = '';
    }
    if (el == window && type == "load" && /complete|loaded/.test(document.readyState)) {
      return cb({
        type: "load"
      });
    }
    if (type == 'tap') return tap(el, cb, flag, className);
    if (type === 'longtap') return longtap(el, cb, flag, className, extra);
    if (type == "unload" && "onpagehide" in window) {
      type = "pagehide";
    }
    callback = function callback(e) {
      var ret = cb(e);
      if (ret === false) {
        e.stopPropagation && e.stopPropagation();
        e.preventDefault && e.preventDefault();
      }
      return ret;
    };
    if (className && className.charAt(0) == '.') delegator = function delegator(e) {
      var target = e.target || e.srcElement;
      var match = closest(target, className, el);
      if (match) {
        e.delegatedTarget = match;
        return callback(e);
      }
    };
    handler = delegator || callback;
    cb["".concat(type, "_handler")] = handler;
    if (el.addEventListener) {
      el.addEventListener(type, handler, !!flag);
      return;
    }
    if (el.attachEvent) {
      el.attachEvent("on".concat(type), handler, !!flag);
      return;
    }
  }
  function off(el, type, cb, flag) {
    if (!el) return;
    var handlerType = type;
    var handler;
    if (handlerType == 'tap') {
      if (isUseTap()) {
        handlerType = 'touchend';
        handler = cb.tap_handler && cb.tap_handler.touchend_handler ? cb.tap_handler.touchend_handler : cb;
      } else {
        handlerType = 'click';
      }
    }
    if (!handler) {
      handler = cb["".concat(handlerType, "_handler")] || cb;
    }
    if (el.removeEventListener) {
      el.removeEventListener(handlerType, handler, !!flag);
      return;
    }
    if (el.detachEvent) {
      el.detachEvent("on".concat(handlerType), handler, !!flag);
      return;
    }
    if (handlerType == 'tap' && isUseTap()) {
      if (cb.tap_handler) {
        cb.tap_handler.touchend_handler = null;
      }
      cb.tap_handler = null;
    } else {
      cb["".concat(handlerType, "_handler")] = null;
    }
  }
  function getHiddenProp() {
    if ('hidden' in document) {
      return 'hidden';
    }
    for (var i = 0; i < prefixes.length; i++) {
      if ("".concat(prefixes[i], "Hidden") in document) {
        return "".concat(prefixes[i], "Hidden");
      }
    }
    return null;
  }
  function getVisibilityState() {
    if ('visibilityState' in document) {
      return 'visibilityState';
    }
    for (var i = 0; i < prefixes.length; i++) {
      if ("".concat(prefixes[i], "VisibilityState") in document) {
        return "".concat(prefixes[i], "VisibilityState");
      }
    }
    return null;
  }
  function bindVisibilityChangeEvt(cb) {
    var visProp = getHiddenProp();
    if (visProp) {
      var evtname = "".concat(visProp.replace(/[H|h]idden/, ''), "visibilitychange");
      var handler = function handler() {
        var isShow = document[getVisibilityState()] !== 'hidden';
        typeof cb === 'function' && cb(isShow);
      };
      document.addEventListener(evtname, handler, false);
      return function () {
        document.removeEventListener(evtname, handler, false);
      };
    }
    return function () {};
  }
  var DomEvent = {
    on: on,
    off: off,
    tap: tap,
    longtap: longtap,
    bindVisibilityChangeEvt: bindVisibilityChangeEvt,
    doubletap: doubletap
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  
  var prefix = '__WXLS__';
  var localStorage = window.localStorage || {
    getItem: function getItem() {},
    setItem: function setItem() {},
    removeItem: function removeItem() {},
    key: function key() {},
    clear: function clear() {
      var _a, _b;
      (_b = (_a = window.localStorage) === null || _a === void 0 ? void 0 : _a.clear) === null || _b === void 0 ? void 0 : _b.call(_a);
    },
    length: 0
  };
  var evictionPolicies = {
    noeviction: function noeviction(data) {
      return data;
    },
    'allkeys-random': function allkeysRandom(data, size) {
      var keys = Object.keys(data);
      var memCnt = 0;
      while (memCnt < size) {
        var len = keys.length;
        var randomKeyIdx = Math.floor(Math.random() * len);
        var randomKey = keys[randomKeyIdx];
        memCnt += JSON.stringify(data[randomKey]).length;
        delete data[randomKey];
        keys = Object.keys(data);
      }
      return data;
    },
    'volatile-ttl': function volatileTtl(data, size) {
      var keys = Object.keys(data);
      keys = keys.sort(function (key1, key2) {
        var d1 = data[key1];
        var d2 = data[key2];
        if (d1.exp < d2.exp) return -1;
        if (d1.exp > d2.exp) return 1;
        return 0;
      });
      var memCnt = 0;
      for (var i = 0; i < keys.length; i++) {
        if (memCnt >= size) break;
        var key = keys[i];
        memCnt += JSON.stringify(data[key]).length;
        delete data[key];
      }
      return data;
    },
    'clear-all': function clearAll() {
      localStorage.clear();
      return {};
    }
  };
  function formatLogMsg(str) {
    return "[WXLS] ".concat(str);
  }
  
  var LS = function () {
    function LS(func, evictionPolicy, logger) {
      _classCallCheck(this, LS);
      this.logger = function () {};
      if (!func) throw 'require function name.';
      this.evictionPolicy = 'noeviction';
      this.key = func;
      if (typeof logger === 'function') {
        this.logger = function (str, type) {
          return logger(formatLogMsg(str), type);
        };
      }
      if (evictionPolicy && Object.keys(evictionPolicies).indexOf(evictionPolicy) !== -1) {
        this.evictionPolicy = evictionPolicy;
      }
      this.init();
    }
    _createClass(LS, [{
      key: "init",
      value: function init() {
        var _a, _b;
        this.check();
        if (Math.random() * 1000 < 1) {
          (_a = this.logger) === null || _a === void 0 ? void 0 : _a.call(this, "LSlen: ".concat(((_b = window === null || window === void 0 ? void 0 : window.localStorage) === null || _b === void 0 ? void 0 : _b.length) || localStorage.length), 'report');
        }
      }
    }, {
      key: "getData",
      value: function getData() {
        var data = LS.getItem(this.key) || '{}';
        try {
          data = JSON.parse(data);
        } catch (e) {
          this.logger("getData error: ".concat(e), 'error');
          localStorage.removeItem(prefix + this.key);
          data = {};
        }
        return data;
      }
    }, {
      key: "check",
      value: function check(isReturn) {
        var data = this.getData();
        var temp = {};
        var now = +new Date();
        var key;
        var val;
        for (key in data) {
          val = data[key];
          if (+val.exp > now) {
            temp[key] = val;
          }
        }
        this.logger("check info: isReturn:".concat(isReturn, " data:").concat(JSON.stringify(temp)), 'info');
        if (isReturn) return temp;
        LS.setItem(this.key, JSON.stringify(temp), this.logger);
      }
    }, {
      key: "set",
      value: function set(key, val, exp) {
        var _a, _b;
        var data = this.check(true);
        data[key] = {
          val: val,
          exp: exp || +new Date()
        };
        try {
          if (localStorage.getItem(prefix + this.key)) localStorage.removeItem(prefix + this.key);
          localStorage.setItem(prefix + this.key, JSON.stringify(data));
          this.logger("first set success: LSlen:".concat((_a = window === null || window === void 0 ? void 0 : window.localStorage) === null || _a === void 0 ? void 0 : _a.length, " key:").concat(prefix + this.key, " data:").concat(JSON.stringify(data)), 'success');
        } catch (e) {
          this.logger("first set error: LSlen:".concat((_b = window === null || window === void 0 ? void 0 : window.localStorage) === null || _b === void 0 ? void 0 : _b.length, " error:").concat(e, " key:").concat(prefix + this.key, " data:").concat(JSON.stringify(data), " k:").concat(key, " v:").concat(val, " exp:").concat(exp), 'error');
          localStorage.clear();
          LS.setItem(this.key, JSON.stringify(_defineProperty({}, key, {
            val: val,
            exp: exp || +new Date()
          })), this.logger);
        }
      }
    }, {
      key: "get",
      value: function get(key) {
        var data = this.getData();
        data = data[key];
        return data ? data.val || null : null;
      }
    }, {
      key: "remove",
      value: function remove(key) {
        var data = this.getData();
        if (data[key]) delete data[key];
        LS.setItem(this.key, JSON.stringify(data), this.logger);
      }
    }], [{
      key: "getItem",
      value: function getItem(key) {
        key = prefix + key;
        return localStorage.getItem(key);
      }
    }, {
      key: "setItem",
      value: function setItem(key, val, logger) {
        var _a, _b;
        key = prefix + key;
        var n = 3;
        while (n--) {
          try {
            if (localStorage.getItem(key)) localStorage.removeItem(key);
            localStorage.setItem(key, val);
            typeof logger === 'function' && logger("setItem success: LSlen:".concat((_a = window === null || window === void 0 ? void 0 : window.localStorage) === null || _a === void 0 ? void 0 : _a.length, " key:").concat(key, " val:").concat(val), 'success');
            break;
          } catch (e) {
            typeof logger === 'function' && logger("setItem error: LSlen:".concat((_b = window === null || window === void 0 ? void 0 : window.localStorage) === null || _b === void 0 ? void 0 : _b.length, " error:").concat(e, " key:").concat(key, " val:").concat(val), 'error');
            LS.clear();
          }
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        var i;
        var k;
        for (i = localStorage.length - 1; i >= 0; i--) {
          k = localStorage.key(i);
          if (k.indexOf(prefix) == 0) {
            localStorage.removeItem(k);
          }
        }
      }
    }, {
      key: "getSupportEvicationPolicy",
      value: function getSupportEvicationPolicy() {
        return Object.keys(evictionPolicies);
      }
    }]);
    return LS;
  }();

  
  try {
    if (typeof parent.window.hasListenMpPageAction === 'undefined') {
      parent.window.hasListenMpPageAction = false;
    }
    if (typeof parent.window.hasListenStateChange === 'undefined') {
      parent.window.hasListenStateChange = false;
    }
  } catch (error) {
  }
  var mpPageActionCb = [];
  var stateChangeCb = [];
  var HistoryLS = new LS('history4secondopen');
  var HistoryKey = 'from';
  var hasListenPopstateForSecOpenReload = false;
  
  var webComptStatus = {
    status: 'loading'
  };
  var webComptInitCb = [];
  var directionHandlerId = 0;
  var directionChangeHandlersMap = {};
  function isNativePage() {
    return Url.getQuery('isNativePage') === '1' || Url.getQuery('isNativePage') === '2';
  }
  
  function debounce(func) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    var timeout;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var context = this;
      var later = function later() {
        timeout = null;
        func.apply(context, args);
      };
      if (timeout) {
        return;
      }
      timeout = setTimeout(later, wait);
    };
  }
  
  function checkIntersect(rectA, rectB) {
    return !(rectB.right < rectA.left || rectB.left > rectA.right || rectB.bottom < rectA.top || rectB.top > rectA.bottom);
  }
  var utils = {
    isNativePage: isNativePage,
    isNewNativePage: function isNewNativePage() {
      return Url.getQuery('isNativePage') === '2';
    },
    isOldNativePage: function isOldNativePage() {
      return Url.getQuery('isNativePage') === '1';
    },
    __useWcSlPlayer: false,
    isWcSlPage: function isWcSlPage() {
      return utils.__useWcSlPlayer;
    },
    getPlayerType: function getPlayerType() {
      if (isNativePage()) {
        return 2;
      }
      return 1;
    },
    getParam: function getParam(key) {
      if (!key) return null;
      var m = location.href.match(new RegExp("(\\?|&)".concat(key, "=([^&]+)")));
      return m ? m[2] : null;
    },
    
    insertAfter: function insertAfter(newElement, targetElement) {
      var parentElement = targetElement.parentNode;
      if (parentElement.lastChild === targetElement) {
        parentElement.appendChild(newElement);
      } else {
        parentElement.insertBefore(newElement, targetElement.nextSibling);
      }
    },
    getInnerHeight: function getInnerHeight() {
      var innerHeightFromApp = window.getInnerHeight && window.getInnerHeight();
      return innerHeightFromApp || window.innerHeight || document.documentElement.clientHeight;
    },
    getInnerWidth: function getInnerWidth() {
      return window.innerWidth || document.documentElement.clientWidth;
    },
    getScrollTop: function getScrollTop() {
      return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    },
    getDocumentHeight: function getDocumentHeight() {
      return document.body.scrollHeight;
    },
    getElementActualTop: function getElementActualTop(element) {
      var elRect = element.getBoundingClientRect();
      var actualTop = elRect.top + this.getScrollTop();
      return actualTop;
    },
    getElementTop: function getElementTop(element) {
      return element.getBoundingClientRect().top;
    },
    getElementHeight: function getElementHeight(element) {
      return element.getBoundingClientRect().height;
    },
    getOrientation: function getOrientation() {
      var _a, _b;
      return (_b = (_a = window.screen.orientation) === null || _a === void 0 ? void 0 : _a.angle) !== null && _b !== void 0 ? _b : window.orientation;
    },
    getDirection: function getDirection() {
      var orientation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : utils.getOrientation();
      return (Mmversion.isIPad ? [90, 270] : [0, 180]).indexOf(orientation) > -1 ? 'vertical' : 'horizontal';
    },
    listenDirectionChange: function listenDirectionChange(cb) {
      var _a, _b;
      if ((_b = (_a = window.screen) === null || _a === void 0 ? void 0 : _a.orientation) === null || _b === void 0 ? void 0 : _b.addEventListener) {
        directionChangeHandlersMap[directionHandlerId] = function (e) {
          cb === null || cb === void 0 ? void 0 : cb(utils.getDirection(e.target.angle), e.target.angle);
        };
        window.screen.orientation.addEventListener('change', directionChangeHandlersMap[directionHandlerId]);
      } else {
        directionChangeHandlersMap[directionHandlerId] = function () {
          var orientation = utils.getOrientation();
          cb === null || cb === void 0 ? void 0 : cb(utils.getDirection(orientation), orientation);
        };
        window.addEventListener('orientationchange', directionChangeHandlersMap[directionHandlerId]);
      }
      return directionHandlerId++;
    },
    unlistenDirectionChange: function unlistenDirectionChange(handlerId) {
      var _a, _b;
      if ((_b = (_a = window.screen) === null || _a === void 0 ? void 0 : _a.orientation) === null || _b === void 0 ? void 0 : _b.removeEventListener) {
        window.screen.orientation.removeEventListener('change', directionChangeHandlersMap[handlerId]);
      } else {
        window.removeEventListener('orientationchange', directionChangeHandlersMap[handlerId]);
      }
      delete directionChangeHandlersMap[handlerId];
    },
    isScrollEnd: function isScrollEnd(threshold) {
      return this.getScrollTop() + this.getInnerHeight() + threshold >= this.getDocumentHeight();
    },
    
    listenStateChange: function listenStateChange() {
      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      stateChangeCb.push(opt.cb);
      try {
        if (parent.window.hasListenStateChange) {
          return;
        }
      } catch (error) {
      }
      JSAPI.on('activity:state_change', function (res) {
        stateChangeCb.forEach(function (callback) {
          callback(res);
        });
      });
      try {
        parent.window.hasListenStateChange = true;
      } catch (error) {
      }
    },
    
    listenMpPageAction: function listenMpPageAction(cb) {
      mpPageActionCb.push(cb);
      try {
        if (parent.window.hasListenMpPageAction) {
          return;
        }
      } catch (error) {
      }
      JSAPI.on('onMPPageAction', function (res) {
        mpPageActionCb.forEach(function (callback) {
          callback(res);
        });
      });
      try {
        parent.window.hasListenMpPageAction = true;
      } catch (error) {
      }
    },
    getIosMainVersion: function getIosMainVersion() {
      var versionInfo = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
      return versionInfo && versionInfo[1] && parseInt(versionInfo[1].split('_')[0], 10);
    },
    
    report120081: function report120081(key, times) {
      jsmonitorReport$1.setSum(120081, key, times);
      jsmonitorReport$1.send();
    },
    loadNewPageKeepingHistoryStackIfSecOpen: function loadNewPageKeepingHistoryStackIfSecOpen(url) {
      if (window.__second_open__ && typeof url === 'string' && /^https?:\/\/mp.weixin.qq.com\//.test(url)) {
        HistoryLS.set(HistoryKey, location.href, Date.now() + 10000);
      }
      location.href = "".concat(url.replace(/#.*$/, ''), "#wechat_redirect");
    },
    initNewPageHistoryStackFromSecOpen: function initNewPageHistoryStackFromSecOpen() {
      var fromUrl = HistoryLS.get(HistoryKey);
      if (fromUrl && typeof fromUrl === 'string' && /^https?:\/\/mp.weixin.qq.com\//.test(fromUrl)) {
        HistoryLS.remove(HistoryKey);
        if (history && history.replaceState && history.pushState) {
          var curUrl = location.href;
          try {
            history.replaceState({
              __mock_secopen_history_stack_reload__: 1
            }, '', fromUrl);
            history.pushState({
              __mock_secopen_history_stack_reload__: 1
            }, '', curUrl);
          } catch (e) {
            console.error('[initNewPageHistoryStackFromSecOpen]', e);
          }
        }
      }
      if (!hasListenPopstateForSecOpenReload) {
        hasListenPopstateForSecOpenReload = true;
        window.addEventListener('popstate', function (e) {
          if (e.state && e.state.__mock_secopen_history_stack_reload__ === 1) {
            location.reload();
          }
        });
      }
    },
    initWebCompt: function initWebCompt(webComptList, callback) {
      var flushCb = function flushCb() {
        while (webComptInitCb.length) {
          var cb = webComptInitCb.shift();
          cb(webComptStatus);
        }
      };
      if (Mmversion.isWechat && !Mmversion.isInMiniProgram && (Device.os.iphone && Device.os.getNumVersion() >= 10.3 && (Mmversion.gtVersion('7.0.14', 1) && Device.os.getNumVersion() < 15 || Mmversion.gtVersion('8.0.7')) || Device.os.android && Mmversion.gtVersion('7.0.15', 1) && Device.os.getNumVersion() >= 5)) {
        document.addEventListener('WeixinOpenTagsReady', function () {
          webComptStatus = {
            status: 'ready'
          };
          flushCb();
        });
        document.addEventListener('WeixinOpenTagsError', function (e) {
          webComptStatus = {
            status: 'error',
            error: e && e.detail && e.detail.errMsg
          };
          flushCb();
        });
        JSAPI.invoke('handleMPPageAction', {
          action: 'wxConfig',
          appid: 'wxmpfakeid',
          webComptList: webComptList,
          url: location.href
        }, function (res) {
          console.log('wx config web compt result', webComptList, res);
          Log.info('wx config web compt result', webComptList, JSON.stringify(res));
          if (res && res.err_msg && res.err_msg.indexOf(':ok') === -1) {
            webComptStatus = {
              status: 'error',
              error: res.err_msg
            };
            flushCb();
          }
          if (typeof callback === 'function') {
            callback(res);
          }
        });
      } else {
        var res = {
          err_msg: 'handleMPPageAction:fail_webcompt unsupported'
        };
        console.log('wx config web compt result', webComptList, res);
        Log.info('wx config web compt result', webComptList, JSON.stringify(res));
        webComptStatus = {
          status: 'error',
          error: res.err_msg
        };
        flushCb();
        if (typeof callback === 'function') {
          callback(res);
        }
      }
    },
    initWebComptForWcSlVideoSharePage: function initWebComptForWcSlVideoSharePage() {
      var initAfterConfWxOpen = function initAfterConfWxOpen(res) {
        if (res.err_msg.indexOf(':ok') !== -1) {
          utils.initNewPageHistoryStackFromSecOpen();
        } else {
          window.__failConfigWxOpen = true;
          Log.info('failed to config wxopen: res not ok');
          jsmonitorReport$1.setSum(221515, Device.os.iphone ? 7 : 8, 1);
          window.WX_BJ_REPORT && window.WX_BJ_REPORT.BadJs && res && window.WX_BJ_REPORT.BadJs.report('WcSlPlayer:CfgError', (window.__second_open__ ? 'secopen:' : 'h5:') + JSON.stringify(res));
        }
      };
      if (Mmversion.isAndroid) {
        var clientVer = Mmversion.getInner();
        if (clientVer > '27001037' && clientVer < '27001060' || clientVer >= '27001100') {
          utils.initWebCompt(['wxOpen' ], initAfterConfWxOpen);
        } else if (Mmversion.gtVersion('7.0.15', 1)) {
          window.__failConfigWxOpen = true;
          Log.info('failed to config wxopen: android version check failed (gt 7.0.15)');
        } else {
          window.__failConfigWxOpen = true;
          Log.info('failed to config wxopen: android version check failed');
        }
      } else if (Mmversion.isIOS) {
        if (Mmversion.gtVersion('7.0.15', 1)) {
          utils.initWebCompt(['wxOpen' ], initAfterConfWxOpen);
        } else {
          window.__failConfigWxOpen = true;
          Log.info('failed to config wxopen: ios version check failed');
        }
      } else {
        window.__failConfigWxOpen = true;
      }
    },
    
    getWebComptStatus: function getWebComptStatus(cb) {
      if (typeof cb !== 'function') {
        return webComptStatus;
      }
      if (webComptStatus.status === 'loading') {
        webComptInitCb.push(cb);
      } else {
        cb(webComptStatus);
      }
      return true;
    },
    
    supportImmersiveMode: Mmversion.isWechat && !Mmversion.isInMiniProgram && (Mmversion.isIOS && Mmversion.gtVersion('8.0.9', 1) || Mmversion.isAndroid && Mmversion.gtVersion('8.0.9', 1)),
    debounce: debounce,
    
    bindDebounceScrollEvent: function bindDebounceScrollEvent(fn) {
      var scrollEle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
      var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
      var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var debounceFn = debounce(fn, wait);
      DomEvent.on(scrollEle, 'scroll', '', debounceFn, useCapture);
    },
    checkIntersect: checkIntersect,
    
    clickRange: function clickRange(evt) {
      var selection = window.getSelection();
      var range = selection.rangeCount && selection.getRangeAt(0);
      if (!range || range.collapsed || !range.intersectsNode(evt.target)) {
        return false;
      }
      var rangeClientRects = range.getClientRects();
      var targetLineHeight = parseFloat(getComputedStyle(evt.target).lineHeight, 10);
      var targetRect = evt.target.getBoundingClientRect();
      for (var i in rangeClientRects) {
        if (rangeClientRects.hasOwnProperty(i)) {
          var rect = rangeClientRects[i];
          var extraHeight = targetLineHeight ? (targetLineHeight - rect.height) / 2 : 0;
          if (rect.width && checkIntersect(rect, targetRect) && evt.clientX >= rect.left && evt.clientX <= rect.right && evt.clientY >= rect.top - extraHeight && evt.clientY <= rect.bottom + extraHeight) {
            return true;
          }
        }
      }
    },
    once: function once(fn) {
      return function () {
        if (fn) {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          var ret = fn.apply(this, args);
          fn = null;
          return ret;
        }
      };
    },
    getRealHeightOfIOSNativePanel: function getRealHeightOfIOSNativePanel(oriHeight, callback) {
      if (Mmversion.isIOS) {
        JSAPI.invoke('handleDeviceInfo', {
          action: 'getUIParams'
        }, function (res) {
          var realHeight = oriHeight;
          if (res.isShowBottomBar) {
            realHeight -= res.bottomBarHeight;
          }
          realHeight = Math.max(realHeight, 0);
          typeof callback === 'function' && callback(realHeight);
        });
      } else {
        typeof callback === 'function' && callback(oriHeight);
      }
    }
  };
  var getOriginExpVal = function getOriginExpVal(key) {
    return window.frontend_exp_list && window.frontend_exp_list.reduce(function (res, item) {
      if (item.key === key) res = (item === null || item === void 0 ? void 0 : item.value) || '';
      return res;
    }, '');
  };

  Mmversion.isIOS && Mmversion.compareHexVersion('18003C31') || Mmversion.isAndroid && Mmversion.compareHexVersion('28003E11');
  Mmversion.isIOS && Mmversion.compareHexVersion('18003622') || Mmversion.isAndroid && Mmversion.compareHexVersion('2800353C') || Device.os.unifiedPC && Mmversion.cpVersion('4.0.6', 1, true, 'unifiedpc') && getOriginExpVal('unified_share_card_style_pc') !== '0'
;

  var e = {
      d: function d(t, r) {
        for (var i in r) e.o(r, i) && !e.o(t, i) && Object.defineProperty(t, i, {
          enumerable: !0,
          get: r[i]
        });
      },
      o: function o(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }
    },
    t = {};
  e.d(t, {
    A: function A() {
      return s;
    },
    Q: function Q() {
      return a;
    }
  });
  var r = function r(e, t) {
      var r = {};
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (r[i] = e[i]);
      if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
        var n = 0;
        for (i = Object.getOwnPropertySymbols(e); n < i.length; n++) t.indexOf(i[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[n]) && (r[i[n]] = e[i[n]]);
      }
      return r;
    },
    i = function i(e, t, r) {
      if (r || 2 === arguments.length) for (var i, n = 0, o = t.length; n < o; n++) !i && n in t || (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
      return e.concat(i || Array.prototype.slice.call(t));
    },
    n = function n(e) {
      if ("object" == _typeof(e) && e) return e;
      if ("string" == typeof e) try {
        return JSON.parse(e);
      } catch (e) {
        return;
      }
    },
    o = function o(e) {
      return 173 === e ? 95 : 166 === e ? 147 : [205, 207, 206].includes(e) ? 135 : 78;
    };
  function a(e) {
    var t,
      a,
      s = e.thirdExtParam,
      m = void 0 === s ? "" : s,
      p = e.kvItems,
      d = void 0 === p ? [] : p,
      l = e.sessionKvItems,
      c = void 0 === l ? [] : l,
      u = e.scene,
      x = void 0 === u ? -1 : u,
      y = (e.query, e.parentType),
      h = r(e, ["thirdExtParam", "kvItems", "sessionKvItems", "scene", "query", "parentType"]),
      g = {
        crossExtReqParams: [],
        sessionExtReqParams: [],
        originThirdExtParam: ""
      };
    try {
      if (console.warn("mpThirdExtParamToSearchExtParam init extReqParams:", g), !m) throw new Error("mpThirdExtParamToSearchExtParam thirdExtParam 不存在");
      var _ = JSON.parse(decodeURIComponent(m));
      if (_) {
        if (g.originThirdExtParam = JSON.stringify({
          s1sKeywordsData: null == _ ? void 0 : _.s1sKeywordsData,
          mp_bizuin_msgid_msgidx: null == _ ? void 0 : _.mp_bizuin_msgid_msgidx,
          mp_finger_search_query_pos: null == _ ? void 0 : _.mp_finger_search_query_pos
        }), null == _ ? void 0 : _.s1sKeywordsData) {
          var P = (_ || {}).s1sKeywordsData,
            v = void 0 === P ? {} : P,
            f = v.enterId,
            E = void 0 === f ? 0 : f,
            S = v.s1sContextInfo,
            q = void 0 === S ? "{}" : S,
            T = v.s1sStatInfo,
            I = void 0 === T ? "{}" : T,
            R = v.sessionId,
            O = void 0 === R ? "" : R,
            b = v.postype,
            C = n(decodeURIComponent(q)) || {},
            k = n(decodeURIComponent(I)) || {},
            w = k.bizuin,
            j = void 0 === w ? 0 : w,
            z = k.msgid,
            J = void 0 === z ? 0 : z,
            N = k.msgidx,
            V = void 0 === N ? 0 : N,
            A = C.mixerCommonContext,
            D = void 0 === A ? "" : A,
            U = (C.isNeedUpdateGPTInfo, C.S1SPageType);
          if ([2, 5].includes(void 0 === U ? 1 : U)) return {
            thirdExtParam: m
          };
          g.crossExtReqParams.push({
            key: "parentSearchID",
            textValue: [y || o(x), E || k.enterId, "", "".concat(j, "_").concat(J, "_").concat(V), encodeURIComponent(JSON.stringify({
              enterId: E || k.enterId,
              sessionId: O,
              s1sStatInfo: k,
              postype: b,
              mpBizuinMsgidMsgidx: (null == _ ? void 0 : _.mp_bizuin_msgid_msgidx) || "".concat(j, "_").concat(J, "_").concat(V),
              mpFingerSearchQueryPos: null == _ ? void 0 : _.mp_finger_search_query_pos
            }))].join(":").replace(/,/g, ";")
          }), D && g.crossExtReqParams.push({
            key: "mixerCommonContext",
            textValue: D
          });
        } else g.crossExtReqParams.push({
          key: "parentSearchID",
          textValue: [y || o(x), 0, "", "", encodeURIComponent(JSON.stringify({
            mpBizuinMsgidMsgidx: null == _ ? void 0 : _.mp_bizuin_msgid_msgidx,
            mpFingerSearchQueryPos: null == _ ? void 0 : _.mp_finger_search_query_pos
          }))].join(":").replace(/,/g, ";")
        });
        (null == _ ? void 0 : _.mpSelectedContent) && g.sessionExtReqParams.push({
          key: "mpSelectedContent",
          textValue: _.mpSelectedContent
        }), (null == _ ? void 0 : _.mpSelectActionType) && g.sessionExtReqParams.push({
          key: "mpSelectActionType",
          textValue: String(_.mpSelectActionType)
        }), (null == _ ? void 0 : _.mp_bizuin_msgid_msgidx) && g.sessionExtReqParams.push({
          key: "mpBizuinMsgidMsgidx",
          textValue: _.mp_bizuin_msgid_msgidx
        }), (null == _ ? void 0 : _.mp_finger_search_query_context) && g.sessionExtReqParams.push({
          key: "mpFingerSearchQueryContext",
          textValue: _.mp_finger_search_query_context
        }), (null == _ ? void 0 : _.mp_finger_search_query_pos) && g.sessionExtReqParams.push({
          key: "mpFingerSearchQueryPos",
          textValue: String(_.mp_finger_search_query_pos)
        }), ((null == _ ? void 0 : _.aiH5Link) || (null == _ ? void 0 : _.aiH5Title)) && g.sessionExtReqParams.push({
          key: "aiSearchUploadInfo",
          textValue: JSON.stringify({
            uploadFiles: [{
              fileType: 4,
              fileContentDetail: {
                mpContentDetail: {
                  title: null == _ ? void 0 : _.aiH5Title
                }
              },
              url: String(null == _ ? void 0 : _.aiH5Link)
            }],
            contentType: 4,
            allowedContentType: 4
          })
        });
      }
      return (null == d ? void 0 : d.length) && (t = g.crossExtReqParams).push.apply(t, d), (null == c ? void 0 : c.length) && (a = g.sessionExtReqParams).push.apply(a, c), h && Object.keys(h).length && (g.otherJsApiParams = h), console.warn("mpThirdExtParamToSearchExtParam extReqParams:", g), {
        thirdExtParam: encodeURIComponent(JSON.stringify(g)),
        extReqParams: JSON.stringify(i(i([], g.crossExtReqParams, !0), g.sessionExtReqParams, !0))
      };
    } catch (e) {
      return console.error("mpThirdExtParamToSearchExtParam err:", e), {
        thirdExtParam: m
      };
    }
  }
  var s = {
    mpThirdExtParamToSearchExtParam: a
  };
  t.A;
    t.Q;

  utils.getInnerHeight();
  utils.getInnerWidth();
  (function () {
      var style = document.createElement('style');
      style.innerHTML = '*:not(input):not(textarea):not([contenteditable="true"]) { -webkit-touch-callout: none !important; -webkit-user-select: none !important; -khtml-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; user-select: none !important; }';
      return {
        enableSelect: function enableSelect() {
          document.head.contains(style) && document.head.removeChild(style);
        },
        disableSelect: function disableSelect() {
          document.head.appendChild(style);
        }
      };
    })();
  var calLanguageRatio = function calLanguageRatio(htmlContent) {
    var text = htmlContent.replace(/\s+/g, '');
    var chineseMatches = text.match(/[\u4e00-\u9fa5]/g) || [];
    var englishMatches = text.match(/[a-zA-Z]/g) || [];
    var chineseCount = chineseMatches.length;
    var englishCount = englishMatches.length;
    var ratio = englishCount / chineseCount;
    return ratio > 1;
  };

  var SearchWordsClassName = 'wx_search_keyword';
  var SearchWordsBoxClassName = 'wx_search_keyword_wrap';
  var AdvWordsClassName = 'filter_wx_adv_keyword';

  
  var checkBadCase = function checkBadCase(keyWordsNodeList, keyWordInfo, reportName) {
    var hasBadCase = false;
    var nodeText = keyWordsNodeList.map(function (a) {
      return a.textContent;
    }).join("");
    var keyword = keyWordInfo.keyword,
      idx_range_list = keyWordInfo.idx_range_list;
    if (nodeText !== keyword) {
      window.WX_BJ_REPORT && window.WX_BJ_REPORT.BadJs && window.WX_BJ_REPORT.BadJs.report(reportName, "biz=".concat(window.biz, "&mid=").concat(window.mid, "&idx=").concat(window.idx), {
        mid: 'mmbizwap:search_business',
        view: 'wap_business',
        _info: {
          keyWordsHTML: keyWordsNodeList.map(function (node) {
            return node.outerHTML;
          }).join(''),
          keyWordInfo: {
            keyword: keyword,
            idx_range_list: idx_range_list
          },
          url: location.href
        }
      });
      hasBadCase = true;
    }
    return hasBadCase;
  };
  var renderKeyWord = function renderKeyWord(keywordsData, paragraphList) {
    var idx_range_list = keywordsData.idx_range_list;
    var _idx_range_list$ = idx_range_list[0],
      begin_idx = _idx_range_list$.begin_idx,
      end_idx = _idx_range_list$.end_idx,
      section_idx = _idx_range_list$.section_idx;
    var section = paragraphList[section_idx];
    if (!section) return [];
    var keyWordsNodeList = highlightElement({
      elem: section,
      startIdx: begin_idx * 1,
      endIdx: end_idx * 1
    }, function (elem, curStartIdx) {
      if ((elem.tagName === 'A' || checkTextColor(elem)) && curStartIdx < elem.textContent.length || elem.classList.contains(AdvWordsClassName) || elem.classList.contains(SearchWordsBoxClassName) || filterTagName.includes(elem.tagName.toLowerCase())) {
        return true;
      }
      return false;
    });
    if (keyWordsNodeList.length > 0) {
      if (checkBadCase(keyWordsNodeList, keywordsData, 's1s_keywords')) return;
      keyWordsNodeList.forEach(function (node) {
        node.keywordsData = keywordsData;
        node.classList.add(SearchWordsBoxClassName);
      });
      var lastNode = keyWordsNodeList[keyWordsNodeList.length - 1];
      var i = document.createElement('i');
      i.className = SearchWordsClassName;
      lastNode.appendChild(i);
    }
    return keyWordsNodeList;
  };
  function addKeywordToHtml(html, keywordsData) {
    if (!keywordsData) return html;
    var div = document.createElement('div');
    div.innerHTML = html;
    var paraList = getParaListAllNodes(div, {
      ignorePreloadNode: true,
      ignoreNotWriteableChildren: true
    });
    try {
      wrapTextNodesWithSpan(paraList);
      var finalParaList = getParaListAllNodes(div, {
        ignorePreloadNode: true,
        ignoreNotWriteableChildren: true
      });
      keywordsData.forEach(function (data) {
        renderKeyWord(data, finalParaList);
      });
    } catch (error) {
      return html;
    }
    return div.innerHTML;
  }
  function wrapTextNodesWithSpan(paraList) {
    paraList.forEach(function (textNode) {
      if (textNode.nodeType === Node.TEXT_NODE) {
        var span = document.createElement('span');
        span.className = 'text-node-wrapper';
        span.textContent = textNode.nodeValue;
        var parent = textNode.parentNode;
        if (parent) {
          parent.replaceChild(span, textNode);
        }
      }
    });
  }

  var isAllowRender = (Mmversion.isAndroid || Mmversion.isIOS || Mmversion.isWindows || Mmversion.isMac && Mmversion.cpVersion("3.8.2", 1, true, "mac")) && Mmversion.isWechat && !Mmversion.isWxWork;
  Mmversion.isWechat && !Mmversion.isInMiniProgram && (Mmversion.isAndroid && Mmversion.compareHexVersion('28003D3C') || Mmversion.isIOS && Mmversion.compareHexVersion('18003D22'));

  

  var __setPoiInfo = function __setPoiInfo(poiInfo) {
    try {
      var poiArea = document.getElementById('js_end_poi_area');
      if (!poiInfo || !poiInfo.poiid && !poiInfo.districtid || !poiArea) return;
      var link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', 'javascript:void(0);');
      link.setAttribute('class', 'js_poi_entry wx_poi_link wx_poi_end_link');
      link.setAttribute('data-type', '1');
      link.setAttribute('data-poiid', (poiInfo === null || poiInfo === void 0 ? void 0 : poiInfo.poiid) || '');
      link.setAttribute('data-name', (poiInfo === null || poiInfo === void 0 ? void 0 : poiInfo.name) || '');
      link.setAttribute('data-address', (poiInfo === null || poiInfo === void 0 ? void 0 : poiInfo.address) || '');
      link.setAttribute('data-latitude', (poiInfo === null || poiInfo === void 0 ? void 0 : poiInfo.latitude) || '');
      link.setAttribute('data-longitude', (poiInfo === null || poiInfo === void 0 ? void 0 : poiInfo.longitude) || '');
      link.setAttribute('data-districtid', (poiInfo === null || poiInfo === void 0 ? void 0 : poiInfo.districtid) || '');
      link.innerText = (poiInfo === null || poiInfo === void 0 ? void 0 : poiInfo.content) || (poiInfo === null || poiInfo === void 0 ? void 0 : poiInfo.name) || '';
      poiArea.innerHTML = '';
      poiArea.appendChild(link);
    } catch (err) {
      console.error('set_end_poi_link_fail', err);
    }
  };
  if (!window.__second_open__) {
    var poiInfo = {
      longitude: '',
      latitude: '',
      name: '',
      address: '',
      poiid: '',
      content: '',
      districtid: ''
    };
    __setPoiInfo(poiInfo);
  }

  
  var ltReplaceChar = "lt-".concat(Date.now(), "-").concat(Math.random());
  var gtReplaceChar = "gt-".concat(Date.now(), "-").concat(Math.random());
  var ltReplaceCharReg = new RegExp(ltReplaceChar, 'g');
  var gtReplaceCharReg = new RegExp(gtReplaceChar, 'g');
  function isAudioPage(itemShowType) {
    return itemShowType * 1 === 7;
  }
  function isImagePage(itemShowType) {
    return itemShowType * 1 === 8;
  }
  function replaceTagChar(str, enableTagReg) {
    var strAfterReplace;
    while (true) {
      str = str.replace(enableTagReg, function (match, sub1, sub2, sub3) {
        return "".concat(ltReplaceChar).concat(sub1).concat(gtReplaceChar).concat(sub2).concat(ltReplaceChar).concat(sub3).concat(gtReplaceChar);
      });
      if (str !== strAfterReplace) {
        strAfterReplace = str;
        continue;
      }
      break;
    }
    return strAfterReplace;
  }
  function extractOldEndPoi(desc) {
    try {
      var regex = /\n+(<a\b[^>]*\bclass\s*=\s*["'][^"']*?\bjs_poi_entry\b[^"']*["'][^>]*>.*?<\/a>)/;
      var match = desc.match(regex);
      if (match) {
        var extractedATag = match[1];
        var poiArea = document.getElementById('js_end_poi_area');
        poiArea.innerHTML = extractedATag;
        poiArea.getElementsByClassName('js_poi_entry')[0].classList.add('wx_poi_end_link');
        desc = desc.replace(regex, '');
      }
    } catch (err) {
      console.error('extract old end poi fail', err);
    }
    return desc;
  }
  var __setDesc = function __setDesc(desc, isNoEncode, itemShowType) {
    var extData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    function getAttr(s, a) {
      var m = s.match(new RegExp(a + '\\s*=\\s*["\']?([^"\'\\s>]+)["\']?'));
      return m && m[1];
    }
    function getClassAttr(s, a) {
      var m = s.match(new RegExp(a + '\\s*=\\s*["\']?([^"\'>]+)["\']?'));
      return m && m[1];
    }
    function addFinderTags(desc, finderTransInfo) {
      var str = desc;
      if (finderTransInfo.tag_json) {
        try {
          var data = JSON.parse(finderTransInfo.tag_json);
          console.log('[finder] 插入话题标签', data);
          var topics = data.topic_info;
          topics.filter(function (topicItem) {
            return topicItem.topic_type === 1;
          }).forEach(function (topicItem) {
            var text = topicItem.topic;
            var tagHtml = ['<a target="_blank" href="javascript:;" class="wx_topic_link"', "data-topicid=\"".concat(topicItem.topic_id, "\""), "data-topic=\"".concat(text, "\">#").concat(text, "</a>")].join(' ');
            str = str.replace(new RegExp("#".concat(text), 'g'), tagHtml);
          });
        } catch (e) {
          console.error('[finder] 插入话题标签失败', e);
        }
      }
      if (finderTransInfo.location_json) {
        try {
          var _data = JSON.parse(finderTransInfo.location_json);
          console.log('[finder] 插入poi标签', _data);
          var text = _data.poiName;
          var poiId = _data.poiClassifyId.replace(/^qqmap_/, '');
          
          __setPoiInfo({
            longitude: _data.longitude,
            latitude: _data.latitude,
            name: text,
            address: _data.poiAddress,
            poiid: poiId,
            content: text,
            districtid: ''
          });
        } catch (e) {
          console.error('[finder] 插入poi标签失败', e);
        }
      }
      if (finderTransInfo.music_json && false) {
        try {
          var dataWrp = JSON.parse(finderTransInfo.music_json);
          var _data2 = dataWrp.music_info;
          console.log('[finder] 插入音频标签', _data2);
          var listenId = _data2.doc_type === 1 ? _data2.doc_id : '';
          var musicId = _data2.doc_type === 0 ? _data2.doc_id : '';
          var _text = _data2.name || '原声';
          var source = _data2.doc_type === 1 ? 0 : _data2.doc_type;
          if (listenId || musicId) {
            var tagHtml = ['<a class="js_plain-music_entry wx_plain-music_link wx_tap_link js_wx_tap_highlight"', "data-music_name=\"".concat(_text, "\""), "data-singer=\"".concat(_data2.artist || '', "\""), "data-type=\"0\"", "data-music_source=\"".concat(source, "\""), "data-plain_music_id=\"".concat(listenId || musicId, "\">").concat(_text, "</a>")].join(' ');
            str += "\n".concat(tagHtml);
          } else {
            console.error('[finder] 插入音频标签失败 不支持的音频类型', _data2);
          }
        } catch (e) {
          console.error('[finder] 插入音频标签失败', e);
        }
      }
      console.log('[finder] 最终内容', str);
      return str;
    }
    function filterContentWithLinkNWeapp(str, enableTagReg, preserveS1SReg) {
      enableTagReg && (str = replaceTagChar(str, enableTagReg));
      var s1sMatches = [];
      if (preserveS1SReg) {
        str = str.replace(preserveS1SReg, function (match) {
          s1sMatches.push(match);
          return "__S1S_PLACEHOLDER_".concat(s1sMatches.length - 1, "__");
        });
      }
      str = str.split(/(<a\s+\w[^>]*>)((?:.|\n)*?)(<\/a>)/);
      var valid;
      for (var i = 0; i < str.length; i++) {
        if (i % 4 === 1) {
          valid = false;
          var href = getAttr(str[i], 'href');
          if (/^https?:\/\/mp\.weixin\.qq\.com/.test(href)) {
            valid = true;
          }
          var r = '<a target="_blank" data-href="' + (valid ? href : '') + '"';
          var weappId = getAttr(str[i], 'data-miniprogram-appid');
          var poiLongitude = getAttr(str[i], 'data-longitude');
          var poiLatitude = getAttr(str[i], 'data-latitude');
          var bizFakeId = getAttr(str[i], 'data-biz');
          var topicClass = getAttr(str[i], 'class') || '';
          var plainMusicId = getAttr(str[i], 'data-plain_music_id') || '';
          var quoteId = getAttr(str[i], 'data-quote-id');
          var seqId = getAttr(str[i], 'data-seq');
          if (poiLongitude && poiLatitude) {
            r += ' class="js_poi_entry wx_poi_link"' + ' data-poiid="' + (getAttr(str[i], 'data-poiid') || '') + '"' + ' data-districtid="' + (getAttr(str[i], 'data-districtid') || '') + '"' + ' data-name="' + (getAttr(str[i], 'data-name') || '') + '"' + ' data-address="' + (getAttr(str[i], 'data-address') || '') + '"' + ' data-longitude="' + poiLongitude + '"' + ' data-latitude="' + poiLatitude + '"';
            valid = true;
          } else if (topicClass && topicClass.includes('wx_topic_link')) {
            r += ' class="wx_topic_link"' + ' data-topicid="' + (getAttr(str[i], 'topic-id') || '') + '"' + ' data-topic="' + (getAttr(str[i], 'data-topic') || '') + '"';
            valid = true;
          } else if (seqId) {
            r += ' class="wx_img_refer_link js_wx_tap_highlight wx_tap_link"' + ' data-seq="' + seqId + '"';
            valid = true;
          } else if (weappId) {
            r += ' class="weapp_text_link"' +
            ' data-miniprogram-type="text"' + ' data-miniprogram-appid="' + weappId + '"' + ' data-miniprogram-path="' + (getAttr(str[i], 'data-miniprogram-path') || '') + '"' + ' data-miniprogram-nickname="' + (getAttr(str[i], 'data-miniprogram-nickname') || '') + '"' + ' data-miniprogram-servicetype="' + (getAttr(str[i], 'data-miniprogram-servicetype') || '0') + '"';
            valid = true;
          } else if (quoteId) {
            str[i] = "<mp-common-blockquote data-quote-id=\"".concat(quoteId, "\">");
            str[i + 1] = '';
            str[i + 2] = "</mp-common-blockquote>";
            i += 3;
            valid = true;
            continue;
          } else if (bizFakeId) {
            r += " class=\"js_mention_entry wx_at_link\" data-username=\"".concat(getAttr(str[i], 'data-username'), "\" data-biz=\"").concat(bizFakeId, "\" ");
            valid = true;
          } else if (plainMusicId) {
            str[i] = str[i].replace('<a', '<mp-common-plain-music');
            str[i + 1] = "<canvas class=\"js-music-pag\" width=\"16\" height=\"16\" style=\"display:none;margin-right:4px\"></canvas><a>".concat(str[i + 1], "</a>");
            str[i + 2] = "</mp-common-plain-music>";
            i += 3;
            continue;
          } else if (getAttr(str[i], 'tagname') === 'mp-common-product') {
            if (getAttr(str[i], 'data-cardtype') === '2') {
              str[i] = str[i].replace('<a', '<mp-common-product');
              str[i + 1] = "<a class='product_text_link'>".concat(str[i + 1], "</a>");
              str[i + 2] = "</mp-common-product>";
              i += 3;
              continue;
            } else if (getAttr(str[i], 'data-cardtype') === '3') {
              var customstyle = getAttr(str[i], 'data-customstyle');
              var customHeight = void 0;
              if (customstyle) {
                try {
                  var _JSON$parse = JSON.parse(customstyle.html(false)),
                    display = _JSON$parse.display,
                    height = _JSON$parse.height;
                  if (display !== 'none') {
                    customHeight = parseInt(height, 10);
                  } else {
                    customHeight = 0;
                  }
                } catch (err) {
                  console.error(err);
                }
              } else {
                var fontScale = getScaleByDom();
                customHeight = 24 + 44 * fontScale;
              }
              str[i] = str[i].replace('<a', "<section style=\"margin: 8px 0;\"><div class='wx_img_placeholder' style='height: ".concat(customHeight, "px'></div><mp-common-product"));
              str[i + 1] = '';
              str[i + 2] = "</mp-common-product></section>";
              i += 3;
              continue;
            }
          } else if (valid) {
            var className = getClassAttr(str[i], 'class');
            r += " class=\"js_common_share_desc_link".concat(className ? " ".concat(className) : '', "\"");
            var _itemShowType = getAttr(str[i], 'data-itemshowtype');
            _itemShowType && (r += ' data-itemshowtype="' + _itemShowType + '"');
          }
          str[i] = valid ? r + '>' : '';
        } else if (i % 4 === 3) {
          !valid && (str[i] = '');
        } else {
          str[i] = str[i].replace(/<.*?>/g, '');
        }
      }
      str = str.join('');
      enableTagReg && (str = str.replace(ltReplaceCharReg, '<'));
      enableTagReg && (str = str.replace(gtReplaceCharReg, '>'));
      if (preserveS1SReg && s1sMatches.length > 0) {
        str = str.replace(/__S1S_PLACEHOLDER_(\d+)__/g, function (_, index) {
          return s1sMatches[parseInt(index, 10)];
        });
      }
      return str;
    }
    function modifySecondRendContent(str) {
      var blockquoteRegex = /(<mp-common-blockquote\s+\w[^>]*>)((?:.|\n)*?)(<\/mp-common-blockquote>)/g;
      console.log('[quote]', extData.quoteList, str, blockquoteRegex.test(blockquoteRegex));
      str = str.replace(blockquoteRegex, function (match) {
        var quoteId = getAttr(match, 'data-quote-id');
        if (!(Array.isArray(extData.quoteList) && extData.quoteList.length > 0)) return '';
        var quoteItem = extData.quoteList.find(function (item) {
          return item.quote_id === quoteId;
        });
        if (!quoteItem) return '';
        var content = quoteItem.content;
        return "<mp-common-blockquote data-quote-id=\"".concat(quoteId, "\" data-content=\"").concat(content, "\"></mp-common-blockquote>");
      });
      return str;
    }
    function getContentTimePoint(desc, validFunc) {
      function getTimePointTag(str) {
        var timeArr = str.split(':').map(function (item) {
          return parseInt(item, 10);
        });
        if (timeArr.length === 2) {
          timeArr.unshift(0);
        }
        var timeSec = timeArr[0] * 3600 + timeArr[1] * 60 + timeArr[2];
        return "<span class=\"wx_time_point_tag\" data-timepoint=\"".concat(timeSec, "\">").concat(str, "</span>");
      }
      function validTimePoint(str) {
        console.log('=====[validTimePoint]', str);
        var timeArr = str.split(':').map(function (item) {
          return parseInt(item, 10);
        });
        if (timeArr.length === 1 || timeArr.length > 3 || str.includes('.')) return false;
        if (timeArr.length === 2) {
          var tempTime = timeArr.shift();
          timeArr.unshift(tempTime % 60);
          timeArr.unshift(Math.floor(tempTime / 60));
        }
        var timeSec = timeArr[0] * 3600 + timeArr[1] * 60 + timeArr[2];
        for (var i = 0; i < 3; i++) {
          switch (i) {
            case 0:
              if (timeArr[i] < 0 || timeArr[i] > 23) return false;
              break;
            case 1:
              if (timeArr[i] < 0 || timeArr[i] > 59) return false;
              break;
            case 2:
              if (timeArr[i] < 0 || timeArr[i] > 59) return false;
              break;
          }
        }
        if (window.cgiData && window.cgiData.duration && timeSec > window.cgiData.duration) return false;
        if (validFunc && validFunc instanceof Function && !validFunc(timeSec)) return false;
        return true;
      }
      var regex = new RegExp('\\b\\d{1,2}:\\d{2}(?::\\d{2})?\\b', 'g');
      return desc.replace(regex, function (match) {
        console.log('=====[match]', match);
        if (validTimePoint(match)) {
          return getTimePointTag(match);
        }
        return match;
      });
    }
    if (isNoEncode) {
      if (itemShowType * 1 === 8) {
        desc = desc.html(false);
        if (extData.send_source * 1 === 4) {
          desc = extractOldEndPoi(desc);
        }
        if (extData.searchKeywordsData && window.cgiData) {
          window.cgiData.search_keywords = extData.searchKeywordsData;
        }
        if (window.cgiData && window.cgiData.search_keywords && isAllowRender) {
          desc = addKeywordToHtml(desc, window.cgiData.search_keywords);
        }
      }
      var searchKeywordsFilterReg;
      if (window.cgiData && window.cgiData.search_keywords && isImagePage(itemShowType)) {
        searchKeywordsFilterReg = window.cgiData.search_keywords.length > 0 ? /<span class="wx_search_keyword_wrap">([\s\S]*?)<i class="wx_search_keyword"><\/i><\/span>/g : undefined;
      }
      if (extData.transAppmsgData && extData.transAppmsgData.trans_type === 1 && extData.transAppmsgData.finder_trans_info) {
        desc = addFinderTags(desc, extData.transAppmsgData.finder_trans_info);
      }
      desc = filterContentWithLinkNWeapp(desc, isAudioPage(itemShowType) ? /<(span[^>]+?textstyle[^>]+?)>([\s\S]+?)<(\/span)>/g : undefined, searchKeywordsFilterReg);
      desc = modifySecondRendContent(desc);
      desc = window.__emojiFormat(desc.replace(/\r/g, '').replace(/\n/g, '<br>'));
    } else {
      desc = desc.replace(/\r/g, '').replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;');
    }
    if (itemShowType * 1 === 8) {
      var descDom = document.getElementById('js_image_desc');
      descDom && (descDom.innerHTML = desc);
      if (location.href.indexOf('immerse_style=1') > -1 && descDom) {
        var r = window.innerHeight - descDom.getBoundingClientRect().y - document.getElementById('wx_expand_bottom').offsetHeight;
        var l = window.getComputedStyle(descDom).lineHeight;
        window.__immersiveFullDesc = desc;
        window.__immersiveOmited = 1;
        textOverflow(descDom, {
          value: {
            lineClamp: Math.floor(r / parseFloat(l)),
            html: '... <span style="color:var(--weui-LINK)">展开</span>'
          }
        });
      }
      if (descDom) {
        descDom.childNodes.forEach(function (child, idx) {
          var lastNode;
          if (idx > 0) {
            lastNode = descDom.childNodes[idx - 1];
          }
          if (lastNode && lastNode.nodeName === 'BR' || idx === 0) {
            var isLeft = calLanguageRatio(child.textContent);
            if (isLeft) {
              if (child.nodeType === Node.TEXT_NODE) {
                var span = document.createElement('span');
                span.classList.add('wx_english_text_left');
                span.textContent = child.nodeValue;
                descDom.replaceChild(span, child);
              } else if (child.nodeType === Node.ELEMENT_NODE && child.classList && child.classList.contains('text-node-wrapper')) {
                child.classList.add('wx_english_text_left');
              }
            }
          }
        });
      }
    } else if (itemShowType * 1 === 10) {
      var dom = document.querySelector('.js_share_notice_dom');
      var _descDom = document.getElementById('js_text_desc');
      _descDom && (_descDom.innerHTML = desc);
      if (extData.superVoteId) dom && dom.classList.add('no_min_height');
      var titleDom = document.getElementById('js_text_title');
      var titleRect = titleDom ? titleDom.getBoundingClientRect() : undefined;
      var descRect = _descDom ? _descDom.getBoundingClientRect() : undefined;
      if (titleRect && titleRect.height > 17 * 1.4 + 2 || descRect && descRect.height > 17 * 1.6 + 2 || extData.superVoteId) {
        dom && dom.classList.add('text_align_left');
      }
    } else if (isAudioPage(itemShowType)) {
      var audioDesc = window.cgiData && window.cgiData.parse_time_to_seek || extData.parse_time_to_seek ? getContentTimePoint(desc) : desc;
      document.querySelector('#js_audio_desc') && (document.querySelector('#js_audio_desc').innerHTML = audioDesc);
    } else {
      var _descDom2 = document.getElementById('js_common_share_desc');
      var descDomWrap = document.getElementById('js_common_share_desc_wrap');
      if (!_descDom2 || !descDomWrap) {
        return;
      }
      _descDom2.innerHTML = desc;
      if (itemShowType * 1 !== 5) {
        setTimeout(function () {
          var folderSwitcher = document.getElementById('js_folder_text_switch');
          if (_descDom2.offsetHeight - descDomWrap.offsetHeight > 1) {
            descDomWrap.className += ' weui-ellipsis_multi';
            folderSwitcher.style.display = 'block';
          } else {
            folderSwitcher.style.display = 'none';
          }
        }, 300);
      }
    }
  };
  if (!window.__second_open__) {
    var videoContentNoEncode = window.a_value_which_never_exists || '职场社交活动大批取消，面试机会几乎为零，在这样的求职寒冬，我们到底应该怎样扩展自己的社交圈，为自己开拓更广阔的职业前景呢？';
    var TextContentNoEncode = window.a_value_which_never_exists || '';
    var ContentNoEncode = window.a_value_which_never_exists || '';
    var itemShowType = window.a_value_which_never_exists || '5';
    var content = window.a_value_which_never_exists || '';
    var desc = window.a_value_which_never_exists || '职场社交活动大批取消，面试机会几乎为零，在这样的求职寒冬，我们到底应该怎样扩展自己的社交圈，为自己开拓更广阔的职业前景呢？';
    var superVoteId = window.a_value_which_never_exists || '';
    var quoteList = null;
    try {
      quoteList = JSON.parse('[]');
    } catch (e) {
      console.error(e);
    }
    var extData = {
      superVoteId: superVoteId,
      quoteList: quoteList,
      isFinderImage: false,
      transAppmsgData: +itemShowType === 8 ? window.cgiData && window.cgiData.trans_appmsg_info : null,
      send_source: window.a_value_which_never_exists || '' * 1
    };
    if (videoContentNoEncode) {
      __setDesc(videoContentNoEncode, true, itemShowType, extData);
    } else if (itemShowType * 1 === 10 && (ContentNoEncode || superVoteId) || isAudioPage(itemShowType) && ContentNoEncode) {
      __setDesc(ContentNoEncode, true, itemShowType, extData);
    } else if (TextContentNoEncode) {
      __setDesc(TextContentNoEncode, true, itemShowType, extData);
    } else if (itemShowType * 1 === 8) {
      __setDesc(content || desc, true, itemShowType, extData);
    } else {
      __setDesc(desc, false, itemShowType, extData);
    }
    window.__setDesc = __setDesc;
  }

  return __setDesc;

})();</script>
          </div>
        

---

## 纯文本内容

var __INLINE_SCRIPT__ = (function () {
  'use strict';

  function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
  }

  function textOverflow(el, binding) {
    var _a, _b;
    var text = el.innerHTML;
    if (!text || !text.length) return;
    var retainTail = [];
    if ((_a = binding.value) === null || _a === void 0 ? void 0 : _a.tailNum) {
      retainTail = Array.from(el.childNodes).slice(-binding.value.tailNum);
    }
    var count = 0;
    function needTextOverflow() {
      var _a;
      if ((_a = binding.value) === null || _a === void 0 ? void 0 : _a.lineClamp) {
        return binding.value.lineClamp < computeLineNum(el);
      }
      return el.offsetHeight < el.scrollHeight;
    }
    if (needTextOverflow()) {
      try {
        var getLeaf = function getLeaf(node) {
          var result = [];
          if (!node.childNodes || node.childNodes.length === 0) {
            return [node];
          }
          node.childNodes.forEach(function (child) {
            result = [].concat(_toConsumableArray(result), _toConsumableArray(getLeaf(child)));
          });
          return result;
        };
        var getFragmentHTML = function getFragmentHTML(frag) {
          var _a, _b;
          var div = document.createDocumentFragment();
          div.appendChild(frag);
          var span = document.createElement('span');
          span.innerHTML = ((_a = binding.value) === null || _a === void 0 ? void 0 : _a.html) || '...';
          if (div.lastElementChild) {
            div.lastElementChild.style.display = 'inline';
          }
          div.appendChild(span);
          el.extraElement = span;
          if ((_b = binding.value) === null || _b === void 0 ? void 0 : _b.tailNum) {
            retainTail.forEach(function (tail) {
              div.appendChild(tail);
            });
          }
          return div;
        };
        var findLastNode = function findLastNode(start, end) {
          if (end - start <= 1) {
            range.setEndAfter(leaves[start]);
            setNewFrag(el, getFragmentHTML(range.cloneContents()));
            return needTextOverflow() ? start : end;
          }
          var mid = start + end >> 1;
          count++;
          range.setEndAfter(leaves[mid]);
          setNewFrag(el, getFragmentHTML(range.cloneContents()));
          return needTextOverflow() ? findLastNode(start, mid) : findLastNode(mid, end);
        };
        var findLastCharIndex = function findLastCharIndex(start, end) {
          if (end - start <= 1) {
            if (start === 0) {
              range.setEndAfter(leaves[Math.max(lastNodeIndex - 1, 0)]);
            } else {
              range.setEnd(lastNode, start);
            }
            setNewFrag(el, getFragmentHTML(range.cloneContents()));
            return start;
          }
          var mid = start + end >> 1;
          count++;
          range.setEnd(lastNode, mid);
          setNewFrag(el, getFragmentHTML(range.cloneContents()));
          return needTextOverflow() ? findLastCharIndex(start, mid) : findLastCharIndex(mid, end);
        };
        var dom = document.createElement('div');
        dom.innerHTML = text;
        var leaves = getLeaf(dom);
        var range = document.createRange();
        range.setStartBefore(leaves[0]);
        var lastNodeIndex = findLastNode(0, leaves.length - 1);
        var lastNode = leaves[lastNodeIndex];
        findLastCharIndex(0, lastNode.textContent.length);
        ((_b = binding.value) === null || _b === void 0 ? void 0 : _b.processExtraElement) && binding.value.processExtraElement(el.extraElement, el);
      } catch (error) {
        console.error(error);
      }
    }
  }
  function computeLineNum(el) {
    var computyStyle = getComputedStyle(el);
    return Math.round(el.offsetHeight / parseFloat(computyStyle.lineHeight));
  }
  function removeAllChild(el) {
    var childNodes = Array.from(el.childNodes);
    childNodes.forEach(function (child) {
      el.removeChild(child);
    });
  }
  function setNewFrag(el, frag) {
    removeAllChild(el);
    el.appendChild(frag);
  }

  
  
  var Device = {};
  function detect(ua) {
    var MQQBrowser = ua.match(/MQQBrowser\/(\d+\.\d+)/i);
    var MQQClient = ua.match(/QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i) || ua.match(/V1_AND_SQ_([\d\.]+)/);
    var WeChat = ua.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/) || ua.match(/MicroMessenger\/((\d+)\.(\d+))/);
    var MacOS = ua.match(/Mac\sOS\sX\s(\d+[\.|_]\d+)/);
    var WinOS = ua.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/);
    var Linux = ua.match(/Linux\s/);
    var MiuiBrowser = ua.match(/MiuiBrowser\/(\d+\.\d+)/i);
    var M1 = ua.match(/MI-ONE/);
    var MIPAD = ua.match(/MI PAD/);
    var UC = ua.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/) || ua.match(/\sUC\s/);
    var IEMobile = ua.match(/IEMobile(\/|\s+)(\d+\.\d+)/) || ua.match(/WPDesktop/);
    var ipod = ua.match(/(ipod).*\s([\d_]+)/i);
    var ipad = ua.match(/(ipad).*\s([\d_]+)/i);
    var iphone = ua.match(/(iphone)\sos\s([\d_]+)/i);
    var Chrome = ua.match(/Chrome\/(\d+\.\d+)/);
    var AndriodBrowser = ua.match(/Mozilla.*Linux.*Android.*AppleWebKit.*Mobile Safari/);
    var android = ua.match(/(android)\s([\d\.]+)/i);
    var harmony = ua.match(/(OpenHarmony)\s([\d\.]+)/i);
    Device.browser = Device.browser || {}, Device.os = Device.os || {};
    Device.os.type = -1;
    Device.os.unifiedPC = ua.match(/UnifiedPC/);
    Device.os.unifiedMac = /UnifiedPCMac/i.test(ua);
    Device.os.unifiedWindows = /UnifiedPCWindows/i.test(ua);
    if (window.ActiveXObject) {
      var vie = 6;
      (window.XMLHttpRequest || ua.indexOf('MSIE 7.0') > -1) && (vie = 7);
      (window.XDomainRequest || ua.indexOf('Trident/4.0') > -1) && (vie = 8);
      ua.indexOf('Trident/5.0') > -1 && (vie = 9);
      ua.indexOf('Trident/6.0') > -1 && (vie = 10);
      Device.browser.ie = true, Device.browser.version = vie;
    } else if (ua.indexOf('Trident/7.0') > -1) {
      Device.browser.ie = true, Device.browser.version = 11;
    }
    if (android) {
      Device.os.android = true;
      Device.os.version = android[2];
      Device.os.type = 2;
    }
    if (harmony) {
      Device.os.harmony = true;
      Device.os.version = harmony[2];
      Device.os.type = 42;
    }
    if (ipod) {
      Device.os.ios = Device.os.ipod = true;
      Device.os.version = ipod[2].replace(/_/g, '.');
    }
    if (ipad) {
      Device.os.ios = Device.os.ipad = true;
      Device.os.version = ipad[2].replace(/_/g, '.');
      Device.os.type = 13;
    }
    if (iphone) {
      Device.os.iphone = Device.os.ios = true;
      Device.os.version = iphone[2].replace(/_/g, '.');
      Device.os.type = 1;
    }
    if (WinOS) Device.os.windows = true, Device.os.version = WinOS[2], Device.os.type = 15;
    if (MacOS) Device.os.Mac = true, Device.os.version = MacOS[1], Device.os.type = 14;
    if (Linux) Device.os.Linux = true, Device.os.type = 33;
    if (ua.indexOf('lepad_hls') > 0) Device.os.LePad = true;
    if (MIPAD) Device.os.MIPAD = true;
    if (MQQBrowser) Device.browser.MQQ = true, Device.browser.version = MQQBrowser[1];
    if (MQQClient) Device.browser.MQQClient = true, Device.browser.version = MQQClient[1];
    if (WeChat) Device.browser.WeChat = true, Device.browser.mmversion = Device.browser.version = WeChat[1];
    if (MiuiBrowser) Device.browser.MIUI = true, Device.browser.version = MiuiBrowser[1];
    if (UC) Device.browser.UC = true, Device.browser.version = UC[1] || NaN;
    if (IEMobile) Device.browser.IEMobile = true, Device.browser.version = IEMobile[2];
    if (AndriodBrowser) {
      Device.browser.AndriodBrowser = true;
    }
    if (M1) {
      Device.browser.M1 = true;
    }
    if (Chrome) {
      Device.browser.Chrome = true, Device.browser.version = Chrome[1];
    }
    if (Device.os.windows) {
      if (typeof navigator.platform !== "undefined" && navigator.platform.toLowerCase() == "win64") {
        Device.os.win64 = true;
      } else {
        Device.os.win64 = false;
      }
    }
    if (Device.os.Mac || Device.os.windows || Device.os.Linux || Device.os.unifiedPC) {
      Device.os.pc = true;
    }
    var osType = {
      iPad7: 'iPad; CPU OS 7',
      LePad: 'lepad_hls',
      XiaoMi: 'MI-ONE',
      SonyDTV: "SonyDTV",
      SamSung: 'SAMSUNG',
      HTC: 'HTC',
      VIVO: 'vivo'
    };
    for (var os in osType) {
      Device.os[os] = ua.indexOf(osType[os]) !== -1;
    }
    Device.os.phone = Device.os.phone || /windows phone/i.test(ua);
    Device.os.getNumVersion = function () {
      return parseFloat(Device.os.version);
    };
    Device.os.hasTouch = 'ontouchstart' in window;
    if (Device.os.hasTouch && Device.os.ios && Device.os.getNumVersion() < 6) {
      Device.os.hasTouch = false;
    }
    if (Device.browser.WeChat && Device.browser.versi...

---

## 图片列表


