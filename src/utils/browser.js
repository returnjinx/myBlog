function mobileVersion(e, t) {
    //ios的版本
    var i = window.navigator.userAgent,
        n = i.match(e)
    return (
        (n = n ? n[1].split(t) : []),
        {
            major: parseInt(n[0]) || 0,
            minor: parseInt(n[1]) || 0,
            patch: parseInt(n[2]) || 0,
        }
    )
}
var browser = {
    changeURLArg: function (url, arg, arg_val) {
        var pattern = arg + '=([^&]*)'
        var replaceText = arg + '=' + arg_val
        if (url.match(pattern)) {
            var tmp = '/(' + arg + '=)([^&]*)/gi'
            tmp = url.replace(eval(tmp), replaceText)
            return tmp
        } else {
            if (url.match('[?]')) {
                return url + '&' + replaceText
            } else {
                return url + '?' + replaceText
            }
        }
    },

    isFullscreen: function () {
        return document.fullscreenElement || document.mozFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
    },
    supportsFullscreen: function () {
        return document.fullscreenEnabled || document.mozFullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled
    },
    isPointerLocked: function () {
        return document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement
    },
    requestFullscreen: function (dom, t) {
        dom.requestFullscreen
            ? dom.requestFullscreen()
            : dom.mozRequestFullScreen
            ? dom.mozRequestFullScreen()
            : dom.webkitRequestFullscreen
            ? dom.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            : dom.msRequestFullscreen && dom.msRequestFullscreen(),
            t && $(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', browser.requestPointerLock)
    },
    requestPointerLock: function () {
        var e
        if (document.fullscreenElement) e = document.fullscreenElement()
        else if (document.mozFullscreenElement) e = document.mozFullscreenElement()
        else if (document.mozFullScreenElement) e = document.mozFullScreenElement()
        else {
            if (!document.webkitFullscreenElement) return
            e = document.webkitFullscreenElement()
        }
        ;(e.requestPointerLock = e.requestPointerLock || e.mozRequestPointerLock || e.webkitRequestPointerLock),
            e.requestPointerLock(),
            $(document).off('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', this)
    },
    exitPointerLock: function () {
        ;(document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock), document.exitPointerLock()
    },
    exitFullscreen: function () {
        document.exitFullscreen
            ? document.exitFullscreen()
            : document.msExitFullscreen
            ? document.msExitFullscreen()
            : document.mozCancelFullScreen
            ? document.mozCancelFullScreen()
            : document.webkitExitFullscreen && document.webkitExitFullscreen()
    },
    details: function () {
        var e = navigator.userAgent.match('(Firefox|Chrome|Safari)/([\\d]+)')
        return e
            ? {
                  name: e[1],
                  version: parseInt(e[2]),
                  platform: navigator.platform,
              }
            : {}
    },
    is: function (e) {
        return this.details() && this.details().name === e
    },
    inIframe: function () {
        return window.parent !== window
    },
    aspectRatio: function ($elem) {
        $elem = $elem || $('#player')
        var e = $elem.width() / $elem.height()
        return isFinite(e) ? e : 0
    },
    userAgent: function () {
        return window.navigator.userAgent
    },
    isMobile: function () {
        var e = navigator.userAgent || navigator.vendor || window.opera
        return (
            /(android|bb\d+|meego).+mobile|android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                e
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                e.substr(0, 4)
            )
        )
    },
    isLandscape: function () {
        return this.isMobile && this.aspectRatio() > 1
    },
    isSmallScreen: function () {
        var e = screen.width / window.devicePixelRatio
        return e < 240
    },
    detectIE: function () {
        var e = window.navigator.userAgent,
            t = e.indexOf('MSIE ')
        return t !== -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./)
    },
    detectSafari: function () {
        var e = window.navigator.userAgent,
            t = e.indexOf('Safari')
        return t !== -1 && !this.detectOpera() && !this.detectChrome() //xzw add detectOpera
    },
    detectFirefox: function () {
        var e = window.navigator.userAgent
        return e.indexOf('Firefox') !== -1
    },
    detectChrome: function () {
        var e = window.navigator.userAgent
        return e.indexOf('Chrome') !== -1 && !this.detectOpera()
    },
    detectOpera: function () {
        var e = window.navigator.userAgent
        return e.indexOf('OPR') !== -1
    },
    detectApp: function () {
        return this.hasURLParam('app')
    },
    detectPad: function () {
        return this.hasURLParam('pad')
    },
    detectIOS: function () {
        return this.detectIPhone() || this.detectIPad() || this.detectIPod()
    },
    detectIPad: function () {
        var e = window.navigator.userAgent,
            t = /iPad/
        return t.test(e)
    },
    detectIPod: function () {
        var e = window.navigator.userAgent,
            t = /iPod/
        return t.test(e)
    },
    detectIPhone: function () {
        var e = window.navigator.userAgent,
            t = /iPhone/
        return t.test(e)
    },
    detectAndroid: function () {
        var e = window.navigator.userAgent
        return e.indexOf('Android') !== -1
    },
    detectAndroidMobile: function () {
        var e = window.navigator.userAgent
        return this.detectAndroid() && e.indexOf('Mobile') !== -1
    },
    detectSamsungNative: function () {
        var e = window.navigator.userAgent
        return e.indexOf('SM-G900H') !== -1 || e.indexOf('GT-I9500') !== -1 || e.indexOf('SM-N900') !== -1
    },
    detectSamsungS6: function () {
        var e = window.navigator.userAgent
        return e.indexOf('SM-G92') !== -1
    },
    /************************************************************徐世廷*************************************************************/
    detectHUAWEI5X: function () {
        return -1 !== window.navigator.userAgent.indexOf('KIW-TL00H')
    },
    /*******************************************************************************************************************************/
    detectWebVR: function () {
        return !(!window.navigator.getVRDisplays || !window.VRDisplay)
    },
    getVRDisplay: function () {
        var e = $.Deferred()
        return this.detectWebVR()
            ? (navigator.getVRDisplays().then(function (t) {
                  t.length >= 1 && e.resolve(t[0]), e.reject(null)
              }),
              e)
            : e.reject(null)
    },
    iosVersion: function () {
        if (!this.detectIOS()) throw new DeviceMismatchException('Did not detect an iDevice')
        var e = /((?:\d+\_?){1,3}) like Mac OS/,
            t = '_'
        return mobileVersion(e, t)
    },
    androidVersion: function () {
        if (!this.detectAndroid()) throw new DeviceMismatchException('Did not detect an Android based device')
        var e = /Android ((?:\d+\.?){1,3})/,
            t = '.'
        return mobileVersion(e, t)
    },
    valueFromCookie: function (e, t) {
        var i = new RegExp(e + '=([0-9a-f]+)(; ?|$)').exec(document.cookie)
        if (!i) return t
        var n = i[1]
        return 'boolean' == typeof t ? 'true' === n || '1' === n : 'number' == typeof t ? parseFloat(n) : n
    },
    valueFromHash: function (e, t) {
        var i = new RegExp('[#&?]' + e + '=([^#&?]*)'),
            n = i.exec(window.location.href)
        if (!n) return t
        var r = n[1]
        return 'boolean' == typeof t ? 'true' === r || '1' === r : 'number' == typeof t ? parseFloat(r) : window.decodeURIComponent(r)
    },
    //-------许钟文：-------------------------------------------------

    getProjectNum: function () {
        //获取场景projectNum

        if (window.__ProjectNum && window.__ProjectNum != '__ProjectNum__') {
            return window.__ProjectNum
        }

        var number = window.location.href.substring(window.location.href.indexOf('=') + 1)
        if (number.indexOf('&') != -1) {
            number = number.substring(0, number.indexOf('&'))
        }
        if (number.indexOf('#') != -1) {
            number = number.substring(0, number.indexOf('#'))
        }
        return number
    },

    urlHasValue: function (key, isGetValue) {
        // debugger
        // if (getValue) { //得到类似n=1 的 1
        //     var b = window.location.href.substring(window.location.href.indexOf("?") + 1);
        //     var a = b.indexOf('&' + t + "=");
        //     if (a > -1) {
        //         var s = b.substring(a + ('&' + t + "=").length);
        //         s.indexOf("&") > -1 && (s = s.substring(0, s.indexOf("&")));
        //         s.indexOf("#") > -1 && (s = s.substring(0, s.indexOf("#")));
        //         return s;
        //     } else return false;
        // } else return window.location.search.match("&" + t + "|\\?" + t) != null; //window.location.href.substring(window.location.href.indexOf("?") + 1).indexOf('&' + t) > -1;

        //const value = window.location.search.match("&" + t + "|\\?" + t)

        if (key === 'm' && window.__ProjectNum && window.__ProjectNum != '__ProjectNum__') {
            return window.__ProjectNum
        }

        let querys = window.location.search.substr(1).split('&')
        if (isGetValue) {
            for (let i = 0; i < querys.length; i++) {
                let keypair = querys[i].split('=')
                if (keypair.length === 2 && keypair[0] === key) {
                    return keypair[1]
                }
            }
            return ''
        } else {
            //return window.location.search.match("&" + key + "|\\?" + key) != null  有bug
            for (let i = 0; i < querys.length; i++) {
                let keypair = querys[i].split('=')
                if (keypair[0] == key) {
                    return true
                }
            }
            return false
        }
    },
    /**
     * 获取查询参数的值
     * @param {String} key
     * @returns String
     */
    urlQueryValue(key) {
        return this.urlHasValue(key, true) || ''
    },
    /**
     * 获取hash参数的值
     * @param {String} key
     * @returns String
     */
    urlHashValue(key) {
        let querys = window.location.hash.substr(1).replace('/?', '').split('&')
        for (let i = 0; i < querys.length; i++) {
            let keypair = querys[i].split('=')

            if (keypair.length === 2 && keypair[0] === key) {
                return keypair[1]
            }
        }
        return ''
    },
    /**
     * 判断是否存在hash
     * @param {String} key
     * @returns Boolean
     */
    urlIsHasHash(key) {
        let querys = window.location.hash.substr(1).replace('/?', '').split('&')
        return querys.includes(key)
    },
    islongPhone: function () {
        //是否是刘海全面屏幕 仅仅根据比例判断 - -
        //screen.height == 812 && screen.width == 375)
        var r = screen.height / screen.width //可能横屏
        return this.isMobile() && (r > 1.99 || r < 0.502512) //18/9=2.165   //???
    },
    detectWeixin: function () {
        //微信 包括PC的微信
        return window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
    },
    detectWeixinMiniProgram: function () {
        return window.navigator.userAgent.match('miniProgram')
    },
    detectAlipay: function () {
        //微信 包括PC的微信
        return window.navigator.userAgent.toLowerCase().match(/Alipay/i) == 'alipay'
    },
    detectEdge: function () {
        return window.navigator.userAgent.indexOf('Edge') > -1
    },
    detectApp: function () {
        return this.urlHasValue('app')
    },

    /**
     * 判断标签页是否切换状态
     */
    isTabHidden: function () {
        var prefixes = ['webkit', 'moz', 'ms', 'o']

        if ('hidden' in document) return document.hidden

        for (var i = 0; i < prefixes.length; i++) {
            if (prefixes[i] + 'Hidden' in document) return document[prefixes[i] + 'Hidden']
        }

        return false
    },
    hasURLParam: function (key) {
        let querys = window.location.search.substring(1).split('&')
        for (let i = 0; i < querys.length; i++) {
            let keypair = querys[i].split('=')
            if (keypair[0] == key) {
                return true
            }
        }
        return false
    },
    getURLParam: function (key) {
        let querys = window.location.search.substring(1).split('&')
        for (let i = 0; i < querys.length; i++) {
            let keypair = querys[i].split('=')
            if (keypair.length === 2 && keypair[0] === key) {
                try {
                    return decodeURIComponent(keypair[1])
                } catch (error) {
                    return keypair[1]
                }
            }
        }
        return ''
    },
}

export default browser
