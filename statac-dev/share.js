define(function(require, exports, module) {

    var share = {};


    share.panelList = [
        { class:'upgrade', text:'Upgrade', url:'upgrade'},
        { class:'activity', text:'Activities', url:'activity'},
        { class:'search', text:'Search', url:'search'},
        { class:'letsMeet', text:'Let\'s Meet', url:'letsMeet'},
        { class:'emails', text:'Emails / Winks', url:'emails'},
        // { class:'LiveChat', text:'Live Chat', url:'letsMeet'},
        { class:'connections', text:'Connections', url:'connections'},
        { class:'Blogs', text:'Blogs', url:'Blogs'},
        { class:'forums', text:'forums', url:'forums'},
        { class:'Feedback', text:'Feedback', url:'Feedback'},
        { class:'setting', text:'Settings & Help', url:'setting'},
    ];

    share.tabSwitch = function(dom,index){
        var domTitle = dom.find('.tab_title'),
            domContent = dom.find('.tab_content_box');
        domTitle.find('li').removeClass('selected');
        domTitle.find('li').eq(index).addClass('selected');
        domContent.find('.tab_content').hide();
        domContent.find('.tab_content').eq(index).show().addClass('selected');
    };

    share.blur = function(mId){
        var dom = $('#' + mId);
        dom.find('input,select,textarea').blur();
    };

    share.logout = function(){
        share.clearStorage();
        window.location.href = '#index/whole';
    };

    share.clearStorage = function(){
        util.delCookie('session_id');
        localStorage.clear();
        sessionStorage.clear();
    };

    share.checkPermissions = function(type){
        var bool=true,
            userInfo = share.userInfo(),
            session = util.getCookie('session_id');

            if(type){
                if(session){
                    if(userInfo){
                        // window.location.href = '#activity/whole';
                    }else{
                        share.getUserInfo();
                        bool = false;
                    }
                }else{
                    window.location.href = '#signin/whole';
                    bool = false;
                }
            }else{
                if(session){
                    if(userInfo){
                        window.location.href = '#activity/whole';
                    }else{
                        share.getUserInfo();
                        bool = false;
                    }
                }
            }
            // return;
        return bool;
    };

    share.getUserInfo = function(){
        var ajaxObj = {
            url: seajs.data.vars.apiUrl + "login",
            type: 'POST',
            success: function(data) {
                if(data.errcode == undefined){
                    util.setCookie('session_id',data.session_id);
                    seajs.data.vars.apiAccessUrl = seajs.data.vars.apiUrl + 's' + data.session_id + '/';
                    share.cacheLoadUser(data);
                    window.location.href = '#signin/whole';
                }else{
                    window.location.href = '#index/whole';
                }
            }
        }
        $.ajax(share.ajaxControl(ajaxObj));
    };

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
           userId = share.getStorage('user_id'); 
        }
        return JSON.parse(share.getStorage(userId));
    };

    share.cacheLoadUser = function(data) {
        share.cacheUser(data);
        share.setStorage('user_id', data.account.usr_id);
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
            "<div class='load'></div>" +
            "<div class='loadBg'></div>" +
            "</div>";
        $('#loading').remove();
        if (bool || bool === undefined) {
            dom.append(html);
        }
    };

    share.loadList = function(domWrapper,bool){
        var html = '<div class="u-loadList"></div>';
        if(bool || bool == undefined){
            domWrapper.append(html);
        }else{
            domWrapper.find('.u-loadList').remove();
        }
    };

    share.loadPage = function(dom, bool) {
        var html = "<div id='loading'>" +
            "<div class='load'></div>" +
            "<div class='loadBg'></div>" +
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
            callback && callback(this);
        };
        newImg.error = function(){
            alert('chucuo img')
        }
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
