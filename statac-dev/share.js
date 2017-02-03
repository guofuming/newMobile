define(function(require, exports, module) {

    var share = {};

    share.formGender = function(val){
        var str;
        if(parseInt(val) == 1){
            str = 'Woman';
        }else{
            str = 'Man';
        }
        return str;

    };

    share.userInfo = function(userId) {
        if(!userId){
           userId = share.getStorage('loadId'); 
        }
        return JSON.parse(share.getStorage(userId));
    };

    share.cacheLoadUser = function(data) {
        share.cacheUser(data);
        share.setStorage('loadId', data.account.usr_id);
    };

    share.cacheUser = function(data) {
        var key = data.account.usr_id;
        share.setStorage(key,  JSON.stringify(data));
    };

    share.setStorage = function(key, data) {
        sessionStorage.setItem(key, data);
    };

    share.getStorage = function(key) {
        return sessionStorage.getItem(key);
    }

    share.isDom = function(dom) {
        var bool = dom.length > 0 ? true : false;
        return bool;
    };

    share.loadPage = function(dom, bool) {
        var html = "<div id='loading'>" +
            "<div class='u-load'></div>" +
            "<div class='u-loadBg'></div>" +
            "</div>";
        $('#loading').remove();
        if (bool || bool === undefined) {
            dom.append(html);
        }
    };

    share.ajax = function(obj) {
        $.ajax({
            url: "test.html",
            cache: false,
            success: function(data) {
                $("#results").append(html);
            }
        });
    };

    share.imgLoad = function(url, callback) {
        var newImg = new Image();
        newImg.src = url;
        newImg.onload = function() {
            callback && callback();
        };
    };

    share.ajaxControl = function(obj) {
        var callback = obj.success,
            callbackError = obj.error;
        var success = function(data, status, xhr) {
            if (callback) {
                callback(data, status, xhr);
            }
        };
        // obj.async = (navigator.userAgent.indexOf('Firefox') < 0 && obj.async) ? false : true;
        obj.success = success;
        obj.timeout = 120000;
        obj.error = function(xhr, errorType, error) {
            // console.log(xhr, errorType, error);
            // share.pageLoad(false, $('body'));
            // share.limitTime();
            console.log('请求错误');
            if (callbackError) { callbackError(xhr, errorType, error); }
        };
        obj.xhrFields = { withCredentials: true };
        return obj;
    };

    share.btnLoading = function(btn, bool) {
        if (bool === false) {
            var str = btn.find('span').html();
            btn.html(str);
        } else {
            var str = btn.html();
            btn.html('<div class="css3_loading_two" style=""> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div><span style="display:none">' + str + '</span>');
        }
    };

    module.exports = share;
});
