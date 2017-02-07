;
(function() {
    window.util = {};

    // 浏览器检测支持Ie7-Ie11 Safari Firefox Chrome
    util.ifBrowser = function() {
        var browserInfo = navigator.userAgent,
            browserObj = {},
            name, rv;

            // Trident 直接判断ie浏览器
        // console.log(browserInfo)
        if (browserInfo.indexOf('MSIE') > -1) { // ie7- ie10;
            name = 'ie';
            rv = browserInfo.match(/MSIE [0-9\.]*/)[0].replace(/MSIE (.*)/, '$1');
        };


        if (browserInfo.indexOf('rv') > -1) { // ie11 Firefox
            browserInfo.indexOf('Trident') > -1 && (name = 'ie');
            browserInfo.indexOf('Firefox') > -1 && (name = 'Firefox');
            rv = browserInfo.match(/rv:[0-9\.]*/)[0].replace(/rv:(.*)/, '$1');
        };

        var indexOfCh = browserInfo.indexOf('Chrome'),
            indexOfSa = browserInfo.indexOf('Safari');
        if (indexOfSa > -1) { // safari chrome
            if (indexOfCh > -1 && indexOfSa > -1) {
                name = 'Chrome';
                rv = browserInfo.match(/Chrome\/[0-9\.]*/)[0].replace(/Chrome\/(.*)/, '$1');
            } else {
                name = 'Safari';
                rv = browserInfo.match(/Version\/[0-9\.]*/)[0].replace(/Version\/(.*)/, '$1');
            }
        }
        browserObj.name = name;
        browserObj.rv = rv;
        // console.log(browserObj)
        return browserObj;
    }

    // 设置cookie
    util.setCookie = function(name, val, options) {
        options = options || {};
        if (options.expires) {
            var expires = new Date();
            expires.setTime(expires.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        };
        // encodeURI()防止特殊字符
        var str = name + '=' + encodeURI(val) +
            (expires ? ';expires=' + expires.toUTCString() : '') +
            (options.path ? ';path=' + options.path : ';path=/') +
            (options.domain ? ';domain=' + options.domain : '');

        document.cookie = str;
        // util.setCookie(name,pass,{path:'/test/',domain:'.test.com',expires:1})
    }

    // 获取cookie
    util.getCookie = function(name) {
        var cookie = document.cookie,
            search = name + '=',
            start, end;
        if (cookie.length > 0) {
            start = cookie.indexOf(search);
            if (start > -1) {
                start += search.length;
                end = cookie.indexOf(';', start);
                return decodeURI(cookie.substring(start, end));
            }
        }
    }

    // 删除cookie
    util.delCookie = function(key) {
        this.setCookie(key, '');
    }

    // 设置localStorage
    util.setLocalStorage = function(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    };
    util.getLocalStorage = function(key) {
        var data = JSON.parse(localStorage.getItem(key));
        return data;
    };
    util.setStorage = function(key, val) {
        sessionStorage.setItem(key, JSON.stringify(val));
    };
    util.getStorage = function(key) {
        var data = JSON.parse(sessionStorage.getItem(key));
        return data;
    };
    // util.setStorage('gfm',{a:1,b:2});
    // console.log(util.getStorage('gfm'))

    // ie下调试直接输出字符
    util.deBug = function(str, time) {
        var css, html, _class = 'util_debug_div';
        css = 'position:fixed;left:0;top:0;z-index:9999999;width:96%;padding:2%;background:red;';
        html = $('<div class="' + _class + '" style="' + css + '">' + str + '</div>');
        time || (time = 6000)
        if ($('.' + _class).length > 0) {
            $('.' + _class).remove();
        }
        $('body').append(html);
        $('html').css({ 'margin-top': html.outerHeight() + 'px' });
        setTimeout(function() {
            $('.' + _class).remove();
            $('html').css({ 'margin-top': '' });
        }, time)
    }

    // 获取url参数?
    util.getUrlParameter = function() {
        var newObj = {},
            arr, paraStr,
            _href = location.href,
            offset = _href.indexOf('?');
        if (offset > -1) {
            paraStr = _href.substring(offset + 1);
            arr = paraStr.split('&');
            for (var i = 0; i < arr.length; i++) {
                var arrSplit = arr[i].split('='),
                    name = arrSplit[0],
                    val = arrSplit[1];
                newObj[name] = val;
            }
            return newObj;
        }
    }

    // 数组去重
    util.arrRemoveRepeat = function(arr) {
        var obj = {},
            newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (!obj[arr[i]]) {
                newArr.push(arr[i]);
                obj[arr[i]] = 1;
            }
        }
        return newArr;
    }

    // 随机数min最大值，max最小值
    util.random = function(min, max) {
        var min = min || (min = 0);
        return Math.round(Math.random() * (max - min) + min);
    }


    // var sz = [112, 112, 112, 34, '你好', 112, 112, 34, '你好', 'str', 'str1'];


})();
