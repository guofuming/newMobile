define(function(require, exports, module) {

    var util = {};

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
                end = cookie.indexOf(';', start) == -1 && cookie.length ;
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

    module.exports = util;
});
