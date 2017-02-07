/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : backbone router 
 * @author : Lyle <lylechen2014@gmial.com>
 * @since : 2014-08-18 10:59:14
 * @filename : static/mnm/src/routers/router.js
 * @version : 
 * @description : 
 */
define(function(require, exports, module) {
    var router, prevObj = null,
        cacheObj = {};

    /**
     * #name/type/tab
     * name : 界面模块名称，非seajs模块名称
     * type : part 界面交给组件维护 / whole 界面交给系统维护 
     * tab  : type为part时有效，组件维护必要参数
     */
    router = Backbone.Router.extend({

        initialize: function(options) {
            var tthis = this;

            this.route(/.*/, "all", function() { tthis.routeUrl('index', 'whole'); });
            this.route(":name/:type", "modules", function(name, type) { tthis.routeUrl(name, type); });
            this.route(":name/:type/custom:val", "modulesC", function(name, type, val) { tthis.routeUrl(name, type, val); });
            this.route(":name/:type/tab:num", "modulesT", function(name, type, num) { tthis.routeUrl(name, type, num); });
            this.route(":name/:type/pay:key", "modulesP", function(name, type, key) { tthis.routeUrl(name, type, '', { 'key': key }); });
            this.route(":name/:type/custom:val/pay:key", "modulesP", function(name, type, val, key) { tthis.routeUrl(name, type, val, { 'key': key }); });
            //this.route(":name/:type/custom:val/pay:key", "modulesP", function(name,type,val,key){tthis.routeUrl(name,type,val,{'key':key});});
            //this.route("track/:tid", "track", function(tid){tthis.routeUrl('index','whole','',{'tid':tid});});
        },

        routeUrl: function(name, type, val, params) {
            params = params || {};
            if (name != 'upgrade' && name != 'payment' && name != 'permission') {
                share.setStorage("cur_url", window.location.href);
            }
            if (params.key) {
                var tthis = this,
                    userObj = share.userInfo();
                if (params.key == hex_md5(userObj.account.usr_id + userObj.account.username + 'paid')) {
                    userObj.status.isGuest = 0;
                    share.cacheUserInfo(userObj);
                    //share.getAjaxUserInfo();
                    $('.page').each(function() {
                        tthis.delIdPage($(this).attr('id'));
                    });
                }
            }
            if (val) {
                var arr;
                if (val.indexOf('?token') < 0) {
                    arr = val.split('&token');
                } else {
                    arr = val.split('?token');
                }
                val = arr[0];
            }
            var obj = {
                name: name,
                type: type,
                num: val, //历史问题
                val: val,
                params: params
            };
            this.dispatcher(obj);
        },

        

        routesDoFuncBefore: function(obj) {
            $('.page').css('display', 'none');
            // ios BUG 无法失去焦点
            if (prevObj) {
                //$('#'+prevObj.name).css('display','none');
                var input = $('#' + prevObj.name).find('input'),
                    select = $('#' + prevObj.name).find('select');
                textarea = $('#' + prevObj.name).find('textarea');
                input.blur();
                select.blur();
                textarea.blur();
            }

            if ($('.page').length > 10) {
                var id = $('.page').eq(0).attr('id');
                this.delIdPage(id);
            }
            prevObj = obj;
        },

        delIdPage: function(id) {
            if (typeof(cacheObj[id]) !== 'undefined') {
                $(window).off('.' + id);
                $(document).off('.' + id);
                $('body').off('.' + id);
                //cacheObj[id].undelegateEvents(); 
                delete cacheObj[id];
            }
            $('#' + id).remove();
        }
    });
    module.exports = router;
});
