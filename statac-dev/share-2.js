/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : share
 * @author : Lyle <lylechen2014@gmial.com>
 * @since : 2014-08-18 11:09:34
 * @filename : static/mnm/src/share.js
 * @version :
 * @description :
 */

define(function(require, exports, module) {

    var share = {},
        roomName = 'masonsoft';

    module.exports = share;

    share.PMSG = null;

    share.deviceGO = function() {
            var bool = true;
            if (util.device() == 'windowsPhone') {
                //if (util.device() == 'iPad') {
                bool = false;
                window.location.href = mainSite + '?main=1';
            }
            return bool;
        },

        share.specialModules = {
            register: 'register',
            firstModule: 'activity',
        };

    share.groupMenu = {
        'top': [{
                name: 'upgrade',
                url: 'upgrade'
            }, {
                name: 'activity',
                url: 'activity'
            }, {
                name: 'search',
                url: 'userList'
            }, {
                name: 'letsMeet',
                url: 'letsMeet'
            }, {
                name: 'email',
                url: 'emailList'
            }, {
                name: 'chat',
                url: 'chat'
            }, {
                name: 'connections',
                url: 'connections'
            },
            //{name:'blogList',url:'blogList'},
            {
                name: 'feedback',
                url: 'feedback'
            }, {
                name: 'setting',
                url: 'setting'
            },
        ],

        'page': {}
    };

    share.noNeedModules = [];
    share.moduleDiff = [];

    share.activityPhotoCategory = [{
        'name': 'Profile Photo',
        'value': -1,
        'isCategory': false,
        'isMultiple': false,
        'url': ''
    }, {
        'name': 'Private Photo',
        'value': 11,
        'isCategory': false,
        'isMultiple': false,
        'url': ''
    }, ];

    share.hasLuxuries = false;

    share.hasVerifyIncome = false;

    share.hasVerifyProfile = true;

    share.isHaveMenu = function(menu) {
        var bool = false,
            obj = share.groupMenu.top;
        for (var i in obj) {
            if (obj[i].name == menu) {
                bool = true;
                break;
            }
        }
        return bool;
    };

    share.modules = [
        ['register', 'signin'],
        ['activity', 'myProfile', 'connections'],
        ['chat', 'userList', 'searchOpt', 'userProfile'],
        ['emailList', 'blogList'],
        ['letsMeet'],
        ['setting'],
        ['upgrade', 'payment'],
    ];

    share.preLoad = function(data) {
        var currentPreLoadModules = data.shift();
        if (_.isArray(currentPreLoadModules) && currentPreLoadModules.length > 0) {
            currentPreLoadModules = currentPreLoadModules.map(function(value, index, array) {
                if (_.indexOf(share.noNeedModules, value) == -1) {
                    return share.getModulePath(value);
                }
            });
            currentPreLoadModules = _.compact(currentPreLoadModules);
            require.async(currentPreLoadModules, function() {
                setTimeout(function() {
                    share.preLoad(data);
                }, 1000);
            });
        }
    };

    share.getModulePath = function(value) {
        var modulePath = '{common}controller/' + value;
        if (typeof(share.moduleDiff) !== 'undefined' && _.indexOf(share.moduleDiff, value) > -1) {
            modulePath = '{site}controller/' + value;
        }
        return modulePath;
    };

    share.repalceTpl = function(str, arr) {
        //str = 'aaa$0bbb$1ccc';
        var patten = new RegExp("\\$\\d{1}", "g"),
            newStr = str.replace(patten, function(value) {
                var index = parseInt(value.replace('$', ''));
                return arr[index];
            });
        return newStr;
        alert(str, arr);
    };

    share.fixedBug = function() {
        $("input,select,textarea").live('focus', function() {
            if ($('#' + seajs.moduleUI).find('.head').length > 0) {
                $('#' + seajs.moduleUI).find('.head').css({ 'position': 'absolute', 'left': '0px' });
            }
        }).live('focusout', function() {
            setTimeout(function() {
                share.blurChange();
            }, 0);
        });
    };

    share.blurChange = function() {
        if ($('#' + seajs.moduleUI).find('.head').length > 0) {
            var left = $('#' + seajs.moduleUI).find('.head').parent().css('left');
            $('#' + seajs.moduleUI).find('.head').css({ 'position': 'fixed', 'left': left });
        }
    };

    share.selectMultiple = function(arr) {
        var value = 0;
        for (var i in arr) {
            value += parseInt(arr[i]);
        }
        return value;
    };

    share.blur = function(id) {
        var input = $('#' + id).find('input'),
            select = $('#' + id).find('select');
        textarea = $('#' + id).find('textarea');
        input.blur();
        select.blur();
        textarea.blur();
        share.blurChange();
    };

    share.delAllPage = function() {
        $('.page').each(function() {
            var id = $(this).attr('id');
            share.delIdPage(id);
        });
    };

    share.delIdPage = function(id) {
        routerObj.delIdPage(id);
    };

    share.inputError = function(obj) {
        /**
         obj = {
            type:
             dom:
             msg:
            bool:
         }
         */
        switch (obj.type) {
            //错误渲染方式
            case 1:

                var dom = obj.dom;
                if (dom.next().hasClass('err')) {
                    dom.next().remove();
                    dom.find('input').removeAttr('style').removeClass('input_err');
                }

                if (!obj.bool) {
                    dom.after("<div class='err'>" + obj.msg + "</div>");
                    dom.find('input').css('borderColor', '#F50C70').addClass('input_err');
                }

                break;

            case 2:
                alert(obj.msg);
                break;

            case 3:
                var dom = obj.dom;
                if (dom.next().hasClass('err')) {
                    dom.next().remove();
                }

                if (!obj.bool) {
                    dom.after("<div class='err'>" + obj.msg + "</div>");
                }
                break;

        }
    };

    share.pageLoad = function(bool, dom) {
        if (bool) {
            var html = "<div id='pageLoad'></div>";
            if ($('#pageLoad').length < 1) {
                dom.append(html);
            }
        } else {
            dom.find('#pageLoad').remove();
        }

        this.pageCover(bool, dom);
    };

    //type console.log/alert
    share.error = function(type, msg, obj) {
        if (type == 'console') {
            console.log(msg);
        } else {
            alert(msg);
        }
    };

    share.pageCover = function(bool, dom) {
        if (bool) {
            var html = "<div id='pageLoadDiv'></div>";
            if ($('#pageLoadDiv').length < 1) {
                html = $(html).on('touchstart touchmove touchend', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
                dom.append(html);
            }
        } else {
            dom.find('#pageLoadDiv').remove();
        }

    };

    share.ajaxStartA = function(dom) {
        dom.parent().find('.ajaxLoading').remove();
        var html = $("<div class='ajaxLoading'></div>");
        dom.after(html);
    };

    share.ajaxEndA = function(dom) {
        dom.parent().find('.ajaxLoading').remove();
    };

    share.ajaxStartB = function(dom, bool) {
        var html = $("<div class='listLoading'></div>");
        if (dom.find('.listLoading').length < 1) {
            if (bool) {
                dom.prepend(html);
            } else {
                dom.append(html);
            }
        }
    };

    share.ajaxEndB = function(dom) {
        dom.find('.listLoading').remove();
    };

    share.backTopStart = function(dom, bool) {
        if ($('#backTop').length < 1) {
            var html = $("<div id='backTop'></div>");
            dom.append(html);
            if (bool) {
                setTimeout(function() {
                    share.backTopEnd(dom);
                }, 3000);
            }
        }
    };

    share.handleVal = function(val) {
        if (val == undefined || val == null) {
            val = '';
        }
        return val;
    };

    share.defaultVal = function(val, type) {
        if (type == 1 && (val == undefined || val == null || val == '')) {
            val = lang.unify_askMe;
        } else if (type == 2 && (val == undefined || val == null || val == '')) {
            val = '----';
        } else if (type == 3 && (val == undefined || val == null || val == '')) {
            val = '';
        } else if (val == undefined || val == null || val == '') {
            val = lang.unify_noDescribe;
        }
        return val;
    };

    share.backTopEnd = function() {
        $('#backTop').remove();
    };

    share.ajaxControl = function(obj) {
        var callback = obj.success;
        var callbackError = obj.error;
        var success = function(data, status, xhr) {
            if (data.errcode == 100) {
                share.loginOut();
                window.location.href = '#signin/whole';
            } else if (data.errcode == 404) {
                //alert(data.errmsg);
                console.log(data.errcode);
                share.pageLoad(false, $('body'));
                //share.browserClear();
                return;
            } else {
                callback(data, status, xhr);
            }
        };

        // obj.beforeSend = function(xhr) {
        //     xhr.withCredentials = true;
        // };

        //obj.headers = {'ETag':share.getETag(obj)};
        obj.async = (navigator.userAgent.indexOf('Firefox') < 0 && obj.async) ? false : true;
        obj.success = success;
        obj.timeout = 120000;
        obj.error = function(xhr, errorType, error) {
            console.log(xhr, errorType, error);
            share.pageLoad(false, $('body'));
            share.limitTime();
            if (callbackError) { callbackError(xhr, errorType, error); }
        };
        obj.xhrFields = { withCredentials: true };
        return obj;
    };

    share.limitTime = function() {
        var currentTime = new Date().getTime();
        var prevTime = util.getCookie('alert_time') || 0;
        if (currentTime - prevTime > 20000) {
            share.error('alert', lang.unify_tryAgain);
            util.setCookie('alert_time', currentTime, { path: '/', domain: util.rootDomain(domain) });
        }
    };

    share.ages = function(str) {
        var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null) return '';
        var d = new Date(r[1], r[3] - 1, r[4]);
        if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
            var Y = new Date().getFullYear();
            return (Y - r[1]);
        }
        return "error";
    };

    share.age = function(year) {
        var y = new Date().getFullYear();
        return y - year;
    };

    share.checkPermission = function(type, str) {
        var bool = this.accessPermission(),
            agree = share.getStorage("ms_agree");
        var isSupportTouch = "ontouchend" in document ? true : false;
        if (!isSupportTouch) {
            window.location.href = '#index/whole';
            return false
        };
        if ($('#sliderDialog').length > 0) { $('#sliderDialog').remove(); }
        if (type) {
            if (bool) {
                var userInfo = share.userInfo();
                if (userInfo) {
                    if (!(parseInt(agree) == 1)) {
                        setTimeout(function() {
                            window.location.href = '#agreeService/whole';
                        }, 500);
                    }
                    if (str && parseInt(agree) == 1) {
                        window.location.href = str;
                    }
                } else {
                    bool = false;
                    share.setProfileOptions();
                    share.getUserInfo();
                }
            } else {
                share.delIdPage('userNav');
                share.browserClear();
                window.location.href = '#signin/whole';
            }
        } else {
            if (bool) {
                var userInfo = share.userInfo();
                if (userInfo) {
                    window.location.href = share.HandleUrl();
                } else {
                    bool = false;
                    share.setProfileOptions();
                    share.getUserInfo();
                }
            }
        }
        return bool;
    };

    share.getUserInfo = function() {
        var url, data = localStorage.getItem("ms_user_id"),
            mock = util.queryString('mock'),
            sid = util.queryString('sid');

        if (mock) {
            url = seajs.data.vars.apiUrl + 's' + sid + '/login';
        } else {
            url = seajs.data.vars.apiUrl + 'login';
        }

        if (data == null || data == '') {
            var ajaxObj = {
                url: url,
                type: 'GET',
                success: function(data) {
                    if (typeof(data.errcode) == 'undefined') {
                        share.loginSuccess(data, function(data) {
                            if (parseInt(data.agree_pp_sa) == 1) {
                                window.location.href = '#permission/whole/custom' + hex_md5(new Date().getTime());
                            } else {
                                window.location.href = '#agreeService/whole';
                            }
                        });
                    } else {
                        share.browserClear();
                    }
                },
                error: function(xhr, errorType, error) {}
            };
            $.ajax(share.ajaxControl(ajaxObj));
        }
    };

    share.loginSuccess = function(data, callback, iAuthoListener) {

        var tthis = this;

        if (typeof(data.agree_pp_sa) == 'undefined') {
            data.agree_pp_sa = 1;
        }

        if (location.href.indexOf("?dev") > 0) {
            if (!util.queryString('mock')) {
                util.setCookie('client_key', hex_md5(new Date().getTime()), { path: '/', domain: util.rootDomain(domain) });
                util.setCookie('session_id', data.session_id, { path: '/', domain: util.rootDomain(domain) });
                seajs.data.vars.apiAccessUrl = domain + '/apis/s' + data.session_id + '/';
            }
        }

        if (data['session_id']) { delete data['session_id']; }
        share.setStorage("ms_user_id", data.account.usr_id);
        share.setStorage("ms_agree", data.agree_pp_sa);
        data.defaultImg = share.defalutImg(data.account.gender, '');
        data.pathImg = seajs.data.vars.commonResourceUrl + 'img/';
        share.setStorage(data.account.usr_id, JSON.stringify(data));
        if (!localStorage.getItem('ms_body')) {
            tthis.setProfileOptions({ async: true });
        }

        share.loginSuccessAfter();

        if (iAuthoListener) {
            callback(data);
            return;
        }
        if (callback) {
            callback(data);
        } else {
            if (parseInt(data.agree_pp_sa) == 1) {
                window.location.href = share.HandleUrl();
            } else {
                window.location.href = '#agreeService/whole';
            }
        }
        //share.delAllPage();
        //share.loginSuccessAfter();
    };

    share.loginSuccessAfter = function() {
        //share.getMessageUnread();
        share.getBarNumber();
        if (share.havaMenu('chat') && !share.chatInstance) {
            require.async('{common}controller/chatLib', function(module) {
                share.chatInstance = new module();
                //share.chatInstance.init(true);
            });
        }
        share.getForumsCategories();
        share.isOpenBlog();
    };

    share.getForumsCategories = function() {
        var obj = {
            url: seajs.data.vars.apiUrl + 'forum_categories',
            type: 'GET',
            success: function(data) {
                share.setStorage('forum_categories', JSON.stringify(data.forum_categories));
            },
            error: function(xhr, errorType, error) {
                share.error('alert', lang.unify_requestFailed);
            },
            complete: function(xhr, status) {}
        };
        $.ajax(share.ajaxControl(obj));
    };

    share.isOpenBlog = function() {
        var obj = {
            url: seajs.data.vars.apiAccessUrl + 'is_open_blog',
            type: 'GET',
            success: function(data) {
                share.setStorage('is_open_blog', data.is_open_blog);
            },
            error: function(xhr, errorType, error) {
                share.error('alert', lang.unify_requestFailed);
            },
            complete: function(xhr, status) {}
        };
        $.ajax(share.ajaxControl(obj));
    };

    share.jumpBlogUrl = function() {
        var url = '#blogMyEdit/whole/customtrue';
        if (parseInt(share.getStorage('is_open_blog')) === 1) {
            url = '#blogNew/whole';
        }
        window.location.href = url;
    }

    share.HandleUrl = function() {
        var cur_url = share.getStorage('cur_url');
        if (cur_url) {
            var cur_mod = cur_url.split('#')[1];
            if (/^(index|joinus|signin|register|sync|permission)\/[whole|part](.*|\/.*)/.test(cur_mod)) {
                return '#' + share.specialModules.firstModule + '/whole';
            } else {
                return '#' + cur_mod;
            }
        } else {
            return '#' + share.specialModules.firstModule + '/whole';
        }
    };

    share.havaMenu = function(name) {
        return _.find(share.groupMenu.top, function(obj) {
            return obj.name == name
        })
    };

    /*
    share.getETag = function(obj) {
        //return  (engine && seajs && lang && typeof(KeyCode)!=='undefined')?hex_md5(hex_md5(obj.url + KeyCode)):hex_md5(obj.url + new Date().getDay());
        return eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('M(H(p,a,c,k,e,r){e=H(c){G(c<a?\'\':e(W(c/a)))+((c=c%a)>V?L.U(c+T):c.P(S))};K(!\'\'.J(/^/,L)){I(c--)r[e(c)]=k[c]||e(c);k=[H(e){G r[e]}];e=H(){G\'\\\\w+\'};c=1};I(c--)K(k[c])p=p.J(N O(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);G p}(\'s(f(p,a,c,k,e,r){e=f(c){d c.n(a)};m(!\\\'\\\'.h(/^/,o)){l(c--)r[e(c)]=k[c]||e(c);k=[f(e){d r[e]}];e=f(){d\\\'\\\\\\\\w+\\\'};c=1};l(c--)m(k[c])p=p.h(i q(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c]);d p}(\\\'(4&&6&&7&&8(1)!==\\\\\\\'5\\\\\\\')?0(0(2.3+1)):0(2.3+9 a().b())\\\',j,j,\\\'t|u|v|x|y|z|A|B|C|i|D|E\\\'.F(\\\'|\\\'),0,{}))\',Q,Q,\'|||||||||||||G||H||J|N|12||I|K|P|L||O||M|X|Y|Z||10|11|13|14|15|16|17|18|R\'.R(\'|\'),0,{}))',62,71,'||||||||||||||||||||||||||||||||||||||||||return|function|while|replace|if|String|eval|new|RegExp|toString|42|split|36|29|fromCharCode|35|parseInt|hex_md5|KeyCode|obj|url|engine||undefined|seajs|lang|typeof|Date|getDay'.split('|'),0,{}));
    };

    share.getMessageUnread = function() {
        var dataStorage = share.getStorage("user_bar_data");
        var ajaxObj = {
            url: seajs.data.vars.apiAccessUrl + 'chat_unread_message_cnt',
            type: 'GET',
            success: function(data) {
                if (dataStorage == null || dataStorage == '') {
                    share.setStorage("user_bar_data", JSON.stringify({ "message": data.count }));
                } else {
                    share.editStorage("user_bar_data", "message", data.count);
                }
                share.setBarNumber('userNav');
                share.getBarNumber();
            },
            error: function(xhr, errorType, error) {
                share.error('alert', lang.unify_requestFailed);
            }
        };
        $.ajax(share.ajaxControl(ajaxObj));
    };

    share.getKeyCode = function() {
        console.log('getKeyCode');
        
        var ajaxObj = {
                url : seajs.data.vars.apiUrl + 'keyCode',
                type : 'GET',
                async: true, 
                success : function(data) {
                    window.KeyCode = data;
                },
                error : function(xhr, errorType, error) {
                    //share.error('alert', lang.unify_requestFailed);
                }
            };
        $.ajax(share.ajaxControl(ajaxObj));
        
    };
    */

    share.getBarNumber = function() {
        var dataStorage = share.getStorage("user_bar_data");
        var ajaxObj = {
            url: seajs.data.vars.apiAccessUrl + 'status_bar_data',
            type: 'GET',
            success: function(data) {
                share.setStorage("user_bar_data", JSON.stringify({
                    'email': data.wm_unread_count.new_count || 0,
                    'visitors': data.viewed_count.new_count || 0,
                    'viewed_count': data.viewed_count.total || 0,
                    'winked_me': data.winked_me_count.new_count || 0,
                    'Interestedinme': data.interested_count.new_count || 0,
                    'interested_count': data.interested_count.total || 0,
                    'mutually_count': data.mutually_count.new_count || 0,
                    'message': data.unread_message_count.new_count || 0
                }));
                share.setBarNumber('userNav');
            },
            error: function(xhr, errorType, error) {
                share.error('alert', lang.unify_requestFailed);
            }
        };
        $.ajax(share.ajaxControl(ajaxObj));

    };

    share.userNavMessageAddNotice = function(num) {
        var barNumber = JSON.parse(share.getStorage('user_bar_data')) || {};
        share.userNavMessageNotice(parseInt(barNumber.message) + parseInt(num));
    };

    share.userNavMessageNotice = function(count) {
        share.editStorage("user_bar_data", "message", count);
        share.setBarNumber('userNav');
    };

    share.setBarNumber = function(mId) {
        var barNumber = JSON.parse(share.getStorage('user_bar_data')) || {};

        $('#' + mId).find('.num').remove();
        if ($('#chat').length > 0) {
            $('#chat').find('span[type="chatContacts"]').find('.redNum').remove();
        }

        if (barNumber.visitors || barNumber.winked_me || barNumber.Interestedinme) {
            var connectionsNum = parseInt(barNumber.visitors) + parseInt(barNumber.winked_me) + parseInt(barNumber.Interestedinme);
            $('#' + mId).find('li[nav="connections"]').append('<span class="num">' + connectionsNum + '</span>');
        }
        if (barNumber.email) {
            $('#' + mId).find('li[nav="email"]').append('<span class="num">' + parseInt(barNumber.email) + '</span>');
        }
        if (barNumber.message) {
            $('#' + mId).find('li[nav="chat"]').append('<span class="num">' + parseInt(barNumber.message) + '</span>');
            if ($('#chat').length > 0) {
                $('#chat').find('span[type="chatContacts"]').append('<span class="redNum"> ' + parseInt(barNumber.message) + ' </span>');
            }
        }
        if (barNumber.mutually_count) {
            $('#' + mId).find('li[nav="letsMeet"]').append('<span class="num">' + parseInt(barNumber.mutually_count) + '</span>');
        }

    };

    share.accessPermission = function() {
        var bool = false,
            //nmmid = util.getCookie('session_id');
            nmmid = util.getCookie('client_key');
        if (nmmid) {
            bool = true;
        }
        return bool;
    };

    share.isGuest = function() {
        var bool = false,
            obj = share.userInfo();
        if (obj && obj.status.isGuest) {
            bool = true;
        }
        return bool;
    };

    share.getSessionId = function() {
        return util.getCookie('client_key');
    };

    share.editStorage = function(name, key, val) {
        var obj = JSON.parse(share.getStorage(name));
        obj[key] = val;
        share.setStorage(name, JSON.stringify(obj));
    };

    share.cacheUserList = function(obj) {
        for (var i in obj) {
            this.cacheUserInfo(obj[i]);
        }
    };

    share.cacheUserInfo = function(obj) {
        var data = JSON.parse(this.getStorage(obj.account.usr_id));
        if (data) {
            obj = _.extend(data, obj);
        }
        this.setStorage(obj.account.usr_id, JSON.stringify(obj));
        share.removeChatList(obj.account.usr_id);
    };

    share.setStorage = function(key, val) {
        sessionStorage.setItem(key, val);
    };

    share.getObjStorage = function(key) {
        return JSON.parse(sessionStorage.getItem(key));
    };

    share.getStorage = function(key) {
        return sessionStorage.getItem(key);
    };

    share.getLocalStorage = function(key) {
        var data = JSON.parse(localStorage.getItem(key));
        if (data == null || data == undefined || data == '') {
            this.setProfileOptions({
                async: 0
            });
            data = JSON.parse(localStorage.getItem(key));
        }
        return data;
    };

    share.userId = function() {
        return share.getStorage("ms_user_id");
    };

    share.userInfo = function() {
        return JSON.parse(share.getStorage(share.userId()));
    };

    share.loginOut = function() {
        var info = share.userInfo();
        if (info) {
            var ajaxObj = {
                url: seajs.data.vars.apiAccessUrl + 'logout',
                type: 'GET',
                success: function(data) {
                    //share.browserClear();
                },
                error: function(xhr, errorType, error) {
                    share.error('alert', lang.unify_requestFailed);
                },
                complete: function() {
                    share.pageLoad(false, $('body'));
                    share.browserClear();
                },
            };
            share.pageLoad(true, $('body'));
            $.ajax(share.ajaxControl(ajaxObj));
        } else {
            //share.browserClear();
        }

    };

    share.removeChatList = function(usr_id) {
        var str = share.getStorage('chatList');
        if (str) {
            var obj = JSON.parse(str);
            for (var i in obj) {
                if (obj[i].usr_id == usr_id) {
                    delete obj[i];
                }
            }
            share.setStorage('chatList', JSON.stringify(obj));
        }
    };

    share.defalutImg = function(gender, img) {
        // if (Object.prototype.toString.call(gender) === "[object String]") {
        //     gender = gender.toLowerCase();
        // }
        if (img != '' && img != undefined) {
            img = img.indexOf('woman') > -1 || img.indexOf('man') > -1 || img.indexOf('couple') > -1 ? '' : img;
        }
        if (img == '' || img == undefined) {
            if (parseInt(gender) == 2 || parseInt(gender) == 32) {
                img = seajs.data.vars.commonResourceUrl + 'img/icon_male.png';
            } else if (parseInt(gender) == 1 || parseInt(gender) == 256) {
                img = seajs.data.vars.commonResourceUrl + 'img/icon_remale.png';
            } else if (parseInt(gender) == 16 || parseInt(gender) == 64) {
                img = seajs.data.vars.commonResourceUrl + 'img/icon_married.png';
            } else {
                img = seajs.data.vars.commonResourceUrl + 'img/default_avatar1.png';
            }
        }
        return img;
    };

    share.defalutIcon = function(obj, img) {
        if (img != '' && img != undefined) {
            img = img.indexOf('woman') > -1 || img.indexOf('man') > -1 || img.indexOf('couple') > -1 ? '' : img;
        }
        var userInfo = share.userInfo();
        if ((userInfo.account.usr_id == obj.usr_id) && (img == '' || img == undefined) && (userInfo.pictures !== undefined && userInfo.pictures.length > 0)) {
            img = userInfo.pictures[0].icon;
        }
        return share.defalutImg(obj.gender, img);
    };

    share.userIcon = function(obj) {
        var img = _.isEmpty(obj) ? '' : (obj.icon || obj.picture.icon || obj.picture.picture);
        return share.defalutImg(obj.gender, img);
    };

    share.browserClear = function() {
        util.delCookie('client_key', { path: '/', expires: -1, domain: util.rootDomain(domain) });
        util.delCookie('session_id', { path: '/', expires: -1, domain: util.rootDomain(domain) });
        util.delCookie('password', { path: '/', expires: -1, domain: util.rootDomain(domain) });
        sessionStorage.clear();
        share.delGlobalVariable();
        //localStorage.clear(); //if localStorage are change can reset request coverage it.
        share.delAllPage();
        share.delIdPage('userNav');
        if (share.disconnect) { share.disconnect(); }
        //window.location.href = '#index/whole/custom' + hex_md5(new Date().getTime());
        window.location.href = domain + window.location.pathname + window.location.search;
    };

    share.delGlobalVariable = function() {
        delete share.locationSearchOptions;
    };

    share.getLongAndLat = function() {
        return JSON.parse(localStorage.getItem('ms_location'));
    };

    share.setLongAndLat = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var data = { longitude: position.coords.longitude, latitude: position.coords.latitude };
                localStorage.setItem('ms_location', JSON.stringify(data));
            }, function(error) {
                /*    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            alert(lang.unify_geoDenied);
                            break;
                        default:
                            alert(lang.unify_geoGetNot);
                            break;
                    }
                */
            }, {
                enableHighAcuracy: true,
                timeout: 5000,
                maximumAge: 3000
            });
        } else {
            // alert(lang.unify_geoNoSupport);
        }
    };

    share.getCountryList = function(obj) {
        var data = localStorage.getItem("ms_country_list");
        if (data == null || data == '') {
            var ajaxObj = {
                url: seajs.data.vars.apiUrl + 'get_country_list',
                type: 'GET',
                success: function(data) {
                    if (data.results == 1) {
                        obj.callback(data, obj);
                        localStorage.setItem("ms_country_list", JSON.stringify(data));
                    }
                },
                error: function(xhr, errorType, error) {
                    share.error('alert', lang.unify_requestFailed);
                }
            };
            $.ajax(share.ajaxControl(ajaxObj));
        } else {
            obj.callback(JSON.parse(data), obj);
        }
    };

    share.setProfileOptions = function(opt, callback, that) {
        if (typeof opt === 'undefined') {
            opt = {};
        }
        var data = localStorage.getItem("ms_gender");
        if (data == null || data == '' || opt.cover) {
            var ajaxObj = {
                url: seajs.data.vars.apiUrl + 'get_profile_options',
                type: 'GET',
                async: opt.async ? true : false,
                success: function(data) {
                    if (data.results == 1) {
                        for (var item in data.data) {
                            localStorage.setItem("ms_" + item, JSON.stringify(data.data[item]));
                        }
                        if (callback) {
                            callback(that)
                        }
                    }
                },
                error: function(xhr, errorType, error) {
                    share.error('alert', lang.unify_requestFailed);
                }
            };
            $.ajax(share.ajaxControl(ajaxObj));
        }
    };

    share.showCheckboxLabel = function(mid, val, spe, defaultStr) {
        var str = share.getSelectStr(mid, val, spe);
        return str || defaultStr || lang.userProfile_askMe;
    };

    share.getSelectHtml = function(mid, val, spe, len, defaultStr) {
        var str = share.getSelectStr(mid, val, spe, len);
        return str || defaultStr || lang.userProfile_askMe;
    };

    share.getSelectStr = function(mid, val, spe, len) {
        var arr = [],
            select = share.getLocalStorage(mid);
        var str = '',
            spe = spe ? spe : '<br />';
        if (select.length > 0) {
            for (var i in select) {
                if (parseInt(parseInt(val) & parseInt(select[i].value)) > 0) {
                    arr.push(select[i].label);
                }
            }
            str = arr.join(spe);
            if (len) {
                str = util.subString(str, len);
            }
        }
        return str;
    };

    share.replaceMatchGender = function(str) {
        if (str != null) {
            str = str.replace(/man/g, "men");
            str = str.replace(/Man/g, "Men");
            str = str.replace(/Couple/g, "Couples");
            str = str.replace(/Cub \/ Men/g, "Cubs / Men");
            str = str.replace(/Cougar/g, "Cougars");
        }
        return str;
    };

    share.getStateList = function(obj) {
        var dataObj = localStorage.getItem("ms_state_list");
        if (dataObj == null || dataObj == undefined || dataObj == '') {
            dataObj = {};
        } else {
            dataObj = JSON.parse(dataObj);
        }
        var data = dataObj[obj.country];

        if (data == null || data == undefined || data == '') {
            var ajaxObj = {
                url: seajs.data.vars.apiUrl + 'get_state_list?country=' + obj.country,
                type: 'GET',
                success: function(data) {
                    if (data.results == 1) {
                        obj.callback(data, obj);
                        dataObj[obj.country] = data;
                        localStorage.setItem("ms_state_list", JSON.stringify(dataObj));
                    }
                },
                error: function(xhr, errorType, error) {
                    share.error('alert', lang.unify_requestFailed);
                }
            };
            $.ajax(share.ajaxControl(ajaxObj));
        } else {
            obj.callback(data, obj);
        }
    };

    share.getIncomeList = function(obj) {
        var data = localStorage.getItem("ms_type");
        if (data == null || data == '') {
            console.log('dependent load failed!');
        } else {
            var datas = {};
            datas.data = JSON.parse(data);
            obj.callback(datas, obj);
        }
    };

    share.getDisabilityList = function(obj) {
        var data = localStorage.getItem("ms_disability");
        if (data == null || data == '') {
            var ajaxObj = {
                url: seajs.data.vars.apiUrl + 'get_disability_list',
                type: 'GET',
                success: function(data) {
                    if (data.results == 1) {
                        obj.callback(data, obj);
                        localStorage.setItem("ms_disability", JSON.stringify(data.data));
                    }
                },
                error: function(xhr, errorType, error) {
                    share.error('alert', lang.unify_requestFailed);
                }
            };
            $.ajax(share.ajaxControl(ajaxObj));
        } else {
            var datas = {};
            datas.data = JSON.parse(data);
            obj.callback(datas, obj);
        }
    };

    share.tabSwitch = function(dom, index) {
        dom.find('.tabInfo').find('.tabTitle').find('li').removeClass('tabTitle_selected_li');
        dom.find('.tabInfo').find('.tabContent').css('display', 'none');
        dom.find('.tabTitle').find('li').eq(index).addClass('tabTitle_selected_li');
        dom.find('.tabContent').eq(index).show();
    };

    share.updateMainPhoto = function() {
        var userObj = share.userInfo();
        userObj.photo = (userObj.pictures[0] !== undefined && userObj.pictures.length > 0) ? userObj.pictures[0] : '';
        share.cacheUserInfo(userObj);
    };

    share.updateProfile = function(usr_id, callback, data) {
        //data.save = 1;
        share.pageLoad(true, $('body'));
        var obj = {
            //url : seajs.data.vars.apiAccessUrl+'save_profile',
            url: seajs.data.vars.apiAccessUrl + 'update_profile',
            type: 'POST',
            data: data,
            success: function(data) {
                share.pageLoad(false, $('body'));
                //if (data.ret !== 1) {
                if (data.errcode) {
                    alert(data.errmsg);
                } else if (data.errs) {
                    alert(data.errs[0].errmsg);
                } else {
                    callback(data);
                }
            },
            error: function(xhr, errorType, error) {
                share.error('alert', lang.unify_requestFailed);
            }
        };
        $.ajax(share.ajaxControl(obj));
    };

    share.formatChatDate = function(datetime, type) {
        if (!datetime) {
            return;
        }
        var date_msg = new Date(share.correctChatDateString(datetime));
        var date_now = new Date();
        var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        if (type == 1) {
            if (date_msg.getFullYear() < date_now.getFullYear()) {
                //return mm/dd/yyyy
                return ((date_msg.getMonth() + 1) + '/' + date_msg.getDate() + '/' + date_msg.getFullYear());
                //return (monthArr[date_msg.getMonth()] + ' ' + date_msg.getDate() + ', ' + date_msg.getFullYear() + ' ' + hours + ':' + (date_msg.getMinutes() < 10 ? ('0' + date_msg.getMinutes()) : date_msg.getMinutes()));
            } else {
                //return Mon dd
                return (monthArr[date_msg.getMonth()] + ' ' + date_msg.getDate());
            }
        } else {
            var hours = date_msg.getHours();
            var ampm = hours >= 12 ? ' pm' : ' am';
            hours = hours % 12 || 12;
            if (date_msg.getFullYear() == date_now.getFullYear() && date_msg.getMonth() == date_now.getMonth() && date_msg.getDate() == date_now.getDate()) {
                //return hh24:mi
                return (hours + ':' + (date_msg.getMinutes() < 10 ? ('0' + date_msg.getMinutes()) : date_msg.getMinutes()) + ampm);
            } else if (date_msg.getFullYear() < date_now.getFullYear()) {
                //return mm/dd/yyyy
                //return ((date_msg.getMonth() + 1) + '/' + date_msg.getDate() + '/' + date_msg.getFullYear());
                return (monthArr[date_msg.getMonth()] + ' ' + date_msg.getDate() + ', ' + date_msg.getFullYear() + ' ' + hours + ':' + (date_msg.getMinutes() < 10 ? ('0' + date_msg.getMinutes()) : date_msg.getMinutes()));
            } else {
                //return Mon dd, hh24:mi
                return (monthArr[date_msg.getMonth()] + ' ' + date_msg.getDate() + ' ' + hours + ':' + (date_msg.getMinutes() < 10 ? ('0' + date_msg.getMinutes()) : date_msg.getMinutes()) + ampm);
            }
        }
    };

    share.formatStringDate = function(datetime) {
        var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            date = datetime.split('-'),
            year = date[0],
            month = Number(date[1]),
            day = date[2];
        month = monthArr[month - 1];
        return month + ' ' + day + ', ' + year;
    }

    share.correctChatDateString = function(datetime) {
        if (!_.isNumber(datetime)) {
            datetime = new Date(datetime).getTime();
            datetime = datetime;
        }
        return datetime;
    };

 

    share.panel = function(panel, tpl, mId, nav, callback) {
        if ($('#userNav').length < 1) {
            $('body').append(tpl({ lang: lang }));
            panel.init();
            $('#userNav').imglazyload({ startY: 0, endY: $(window).height(), sW: 50, sH: 50 });
        }

        panel.run({
            navName: nav,
            rootDom: $('#' + mId),
            contentDom: $('#' + mId).find('.body_all'),
            callback: function(obj) {
                if (callback) {
                    callback(obj);
                }
            }
        });
    };

    share.ajaxSetHidden = function(callback, data) {
        var obj = {
            url: seajs.data.vars.apiAccessUrl + 'set_hidden',
            type: 'POST',
            data: { hide: 0 },
            success: function(result) {
                if (result) {
                    var userObj = share.userInfo();
                    userObj.account.hidden = 0;
                    share.cacheUserInfo(userObj);
                    data.userObj = userObj;
                    callback(result, data);
                }
            },
            error: function(xhr, errorType, error) {

            },
            complete: function(xhr, status) {
                share.pageLoad(false, $('body'));
            }
        };
        share.pageLoad(true, $('body'));
        $.ajax(share.ajaxControl(obj));
    };

    /**********Facebook star*********/

    share.FacebookUserInfo = {};
    share.FacebookstatusChangeCallback = function() {
        $('#index').find('.signinfacebook').addClass('signinfacebookon');
        $('#index').find('.signinfacebook').find('span').show();
        $('#index').find('.signinfacebook').find('div.css3_loading_two').hide();
    };
    share.FacebookLoading = function() {
        $('#index').find('.signinfacebook').removeClass('signinfacebookon');
        $('#index').find('.signinfacebook').find('span').hide();
        $('#index').find('.signinfacebook').find('div.css3_loading_two').show();
    };

    share.hasFbImprotPhotos = false;

    share.FbAlbums = {};

    share.setFbPhotos = function(data) {
        share.setStorage('fb_photos', JSON.stringify(data));
    };

    share.getFbPhotos = function() {
        return JSON.parse(share.getStorage('fb_photos'));
    };

    share.delFbPhotos = function() {
        sessionStorage.removeItem('fb_photos');
    };


    /**********Facebook end*********/

    share.fromAgeSelect = function(val, valT, mId, lim, max) {
        var lim = (lim) ? lim : 18;
        var max = (max) ? max : 99;
        var val = (typeof val == 'undefined') || val == null || parseInt(val) < lim ? lim : val;
        var valT = (typeof valT == 'undefined') || valT == null ? max : valT;

        var html = '<select id="from_age" class="age_group">' +
            '<option value="" disabled selected>' + lang.unify_PleaseChoose + '</option>';
        for (var i = lim; i <= valT; i++) {
            if (i == val) {
                html = html + '<option value=' + i + ' selected>' + i + '</option>';
            } else {
                html = html + '<option value=' + i + '>' + i + '</option>';
            }
        }
        $('#' + mId).find('.fromAge').html(html);
    };

    share.toAgeSelect = function(val, valT, mId, lim, max) {
        var lim = (lim) ? lim : 18;
        var max = (max) ? max : 99;
        var val = (typeof val == 'undefined') || val == null || parseInt(val) < lim ? lim : val;
        var valT = (typeof valT == 'undefined') || valT == null ? max : valT;

        var html = '<select id="to_age" class="age_group">' +
            '<option value="" disabled selected>' + lang.unify_PleaseChoose + '</option>';
        for (var i = val; i < 100; i++) {
            if (i == valT) {
                html = html + '<option value=' + i + ' selected>' + i + '</option>';
            } else {
                html = html + '<option value=' + i + '>' + i + '</option>';
            }
        }
        $('#' + mId).find('.toAge').html(html);
    };

    share.toAgeSelectOption = function(val, valT, mId, lim, max) {
        var lim = (lim) ? lim : 18;
        var max = (max) ? max : 99;
        var val = (typeof val == 'undefined') || val == null || parseInt(val) < lim ? lim : val;
        var valT = (typeof valT == 'undefined') || valT == null ? max : valT;

        var html = '<option value="" disabled selected>' + lang.unify_PleaseChoose + '</option>';
        for (var i = val; i < 100; i++) {
            if (i == valT) {
                html = html + '<option value=' + i + ' selected>' + i + '</option>';
            } else {
                html = html + '<option value=' + i + '>' + i + '</option>';
            }
        }
        $('#' + mId).find('.toAge').find('select').html(html);
    };

    share.genderToggle = function(tthis) {
        $(tthis).parent().find(".gender_item").each(function() {
            var type = $(this).attr('type');
            $(this).removeAttr('select').removeClass('gender_item_' + type + '_select').find('div').removeClass(type + '_select').addClass(type);
        });
        var type = $(tthis).attr('type');

        $(tthis).attr('select', true).addClass('gender_item_' + type + '_select').find('div').removeClass(type).addClass(type + '_select');
    };

    share.regFieldValidata = function(field, model, spe) {
        var obj = { bool: true, field: field };
        var patrn = /^[a-zA-Z0-9_]{1}[a-zA-Z0-9_]+$/;
        switch (field) {
            case 'email':
                if (model[field] == null || $.trim(model[field]) == '') {
                    obj.bool = false;
                    obj.msg = lang.unify_required;
                } else if (!util.isEmail(model[field])) {
                    obj.bool = false;
                    obj.msg = lang.unify_emailFormatError;
                }
                break;

            case 'username':
                var arr = model['email'].split('@');
                if (model[field] == null || $.trim(model[field]) == '') {
                    obj.bool = false;
                    obj.msg = lang.unify_required;
                } else if (!patrn.exec(model[field])) {
                    obj.bool = false;
                    obj.msg = lang.unify_usernameFormatError;
                } else if (!util.isLength(model[field], 6, 18)) {
                    obj.bool = false;
                    obj.msg = lang.unify_lengthError;
                } else if (arr[0].toLowerCase() == model[field].toLowerCase()) {
                    obj.bool = false;
                    obj.msg = lang.unify_joinusUsernameError;
                }
                break;

            case 'password':
                if (model[field] == null || $.trim(model[field]) == '') {
                    obj.bool = false;
                    obj.msg = lang.unify_required;
                } else if (!util.isLength(model[field], 6, 18)) {
                    obj.bool = false;
                    obj.msg = lang.unify_pwdLengthError;
                }
                break;

            case 'match_gender':
            case 'gender':
                if (model[field] == null || model[field] == '') {
                    obj.bool = false;
                    obj.msg = lang.unify_genderTip;
                }
                break;
            case 'age':
                if (model[field] == null || model[field] === '') {
                    obj.bool = false;
                    obj.msg = lang.unify_required;
                } else if (model[field] > 99) {
                    obj.bool = false;
                    obj.msg = lang.unify_age99;
                } else if (model[field] < ((spe.lim) ? spe.lim : 18)) {
                    obj.bool = false;
                    obj.msg = lang['unify_age' + ((spe.lim) ? spe.lim : 18)] ? lang['unify_age' + ((spe.lim) ? spe.lim : 18)] : lang.unify_ageError;
                } else if (model[field] == ((spe.lim) ? spe.lim : 18)) {
                    var date = new Date,
                        month = date.getMonth() + 1,
                        day = date.getDate();
                    if (model.age_month > month) {
                        obj.bool = false;
                        obj.msg = lang['unify_age' + ((spe.lim) ? spe.lim : 18)] ? lang['unify_age' + ((spe.lim) ? spe.lim : 18)] : lang.unify_ageError;
                    } else if (model.age_month == month && model.age_day > day) {
                        obj.bool = false;
                        obj.msg = lang['unify_age' + ((spe.lim) ? spe.lim : 18)] ? lang['unify_age' + ((spe.lim) ? spe.lim : 18)] : lang.unify_ageError;
                    }
                }
                break;
            case 'type':
            case 'r_country':
            case 'r_state':
            case 'ethnicity':
            case 'body':
            case 'm_type':
            case 'marital':
            case 'disability':
                if (model[field] == null || model[field] == '') {
                    obj.bool = false;
                    obj.msg = lang.unify_required;
                }
                break;
            case 'r_zip':
                if (typeof(model['skip_zip_check']) !== 'undefined') {
                    break;
                }
                if (model[field] == null || model[field] == '') {
                    obj.bool = false;
                    obj.msg = lang.unify_required;
                }
                break;
            case 'img':
                break;

            case 'match_age_min':
            case 'match_age_max':
                if (model[field] == null || model[field] == '') {
                    obj.bool = false;
                    obj.msg = lang.unify_required;
                }
                if (field == 'match_age_max') {
                    if (model[field] < model['match_age_min']) {
                        obj.bool = false;
                        obj.msg = lang.unify_lookforAge;
                    }
                }
                break;
        }

        return obj;
    };

    share.getSurplus = function(str, maxNum) {
        var length = str.length,
            surplus = parseInt(maxNum) - length;
        if (surplus < 0) {
            surplus = 0;
        };
        return surplus;
    };

    share.getMultipleData = function(arr) {
        if (!$.isArray(arr)) {
            return arr || 0;
        }
        var value = 0;
        for (var i in arr) {
            if (arr[i]) {
                value += parseInt(arr[i]);
            }
        }
        if (value == 0) {
            value = '';
        }
        return value;
    };

    share.showBtnLoading = function(btn) {
        var str = btn.html();
        btn.html('<div class="css3_loading_two" style=""> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div><span style="display:none">' + str + '</span>');
    };

    share.hideBtnLoading = function(btn) {
        var str = btn.find('span').html();
        btn.html(str);
    };

    share.sortAZ = function(arr, key) {
        var newArr = [],
            arrAZ = _.uniq(_.pluck(arr, key).sort());
        for (var i in arrAZ) {
            for (var j in arr) {
                if (arr[j][key] == arrAZ[i]) {
                    newArr.push(arr[j]);
                }
            }
        }
        return newArr;
    };

    share.sortNum = function(arr, key, func) {
        var newArr = [],
            arrSort = _.uniq(_.pluck(arr, key).sort(func));
        for (var i in arrSort) {
            for (var j in arr) {
                if (arr[j][key] == arrSort[i]) {
                    newArr.push(arr[j]);
                }
            }
        }
        return newArr;
    };

    share.getCheckCoreProfile = function() {
        var bool = true,
            userInfo = share.userInfo();
        if (userInfo) {
            if (share.handleVal(userInfo.about.headline) === '' || share.handleVal(userInfo.about.about_me) === '' || share.handleVal(userInfo.about.about_my_match) === '') {
                bool = false;
            }
        }
        return bool;
    };

    share.promptCompleteProfile = function(menuName) {
        var bool = (!share.isGuest()) || share.getCheckCoreProfile();
        if (!bool) {
            $('#userNav').find('li').removeClass('action');
            window.location.href = '#completeProfile/whole/custom' + menuName;
        }
        return bool;
    };

    share.getAjaxUserInfo = function(callback) {
        var tthis = this,
            obj = {
                url: seajs.data.vars.apiAccessUrl + 'user_profile',
                type: 'POST',
                success: function(data) {
                    if (data.errcode == 121) {
                        alert(data.errmsg);
                    } else {
                        share.cacheUserInfo(data);
                        if (callback) {
                            callback();
                        }
                    }
                },
                error: function(xhr, errorType, error) {
                    share.error('alert', lang.unify_requestFailed);
                }
            };
        $.ajax(share.ajaxControl(obj));
    };

    share.handleSystemProfile = function(username, obj) {
        if (_.indexOf(['support', 'noreply', 'no-reply', 'customerservices', 'affiliates'], username.toLowerCase()) > -1) {
            delete(obj.usr_id);
            obj.membership = 'G';
            obj.gender = 0;
            obj.icon = seajs.data.vars.commonResourceUrl + 'img/email_default_avatar.png';
        }
        return obj;
    };

    share.searchSelect = function(mid, value, defaultStr) {
        var select = share.getLocalStorage(mid);
        for (var i in select) {
            if (select[i].value == value) {
                return select[i].label;
            }
            if (mid == 'ms_height' && (value == '-47' || value == '')) {
                return (select[i]) ? select[i].label : lang.myProfile_notToSay;
            }
        }
        return defaultStr || lang.userProfile_askMe;
    };

    //check img size
    share.checkImgSize = function(imgObj, img) {
        if (imgObj.size >= 5140000) {
            alert(lang.imgSzieErrOne);
            return false;
        }
        if (img.width('')[0].naturalWidth < 144 || img.height('')[0].naturalHeight < 144) {
            alert(lang.imgSzieErrTwo);
            return false;
        } else {
            return true;
        }
    };

    share.goback = function(url, callUrl) {
        window.location.href = callUrl ? callUrl : url;
    };

    share.linkReferrer = function() {
        return document.referrer;
    };

    share.setGender = function(selectArr, val, dom) {
        var genderHtml = '';
        $.each(selectArr, function(index, value) {
            if (parseInt(value.value) == parseInt(val)) {
                genderHtml += '<dd class="action" type="' + value.label.toLowerCase() + '" val="' + value.value + '">' + value.label + '</dd>';
            } else {
                genderHtml += '<dd type="' + value.label.toLowerCase() + '" val="' + value.value + '">' + value.label + '</dd>';
            }
        });
        dom.html(genderHtml);
        if (parseInt(val) == 0) {
            dom.find('dd:first').attr('class', 'action');
        }
    };

    share.selectGender = function(tthis) {
        tthis.parent().find('dd').removeAttr('class');
        tthis.attr('class', 'action');
    };

    /*share.commentFormat = function(value) {
         var commentHtml='',arr = value.split('Quoting');        
         if (arr.length < 2) {
              commentHtml = value;
         } else {
              console.log(arr.length);
              for (var i = arr.length - 1; i > 0 ;i-- ) {
                 var arri = arr[i].split(':');
                 commentHtml = commentHtml + "<span class='quote'>@"+$.trim(arri[0])+'</span>';
              }
              commentHtml = '<div>'+commentHtml +' '+ arr[0]+'</div>';
         }
         return commentHtml;

    }*/

    share.commentFormat = function(value) {
        var commentHtml = '',
            arr = value.split('Quoting');
        if (arr.length < 2) {
            commentHtml = value;
        } else {
            for (var i = 0; i < arr.length; i++) {
                var arri = arr[i].split(':');
                if (arri.length < 2) {
                    commentHtml += arri[0];
                } else {
                    commentHtml += "<span class='quote'>@" + $.trim(arri[0]) + '</span>' + arri[1];
                }
            }
        }
        return commentHtml;
    };

    // share.commentForum = function(comment) {
    //     return comment.replace(/(\[quote_message\]|\[\/quote_message\])/ig, "")
    //         .replace(/Quoting \[b\](\w+)\[\/b\]:/ig, "<span class='quote'>@$1</span>")
    //         .replace(/Quoting: Originally posted by \[b\](\w+)\[\/b\]/ig, "<span class='quote'>@$1</span>");
    // };

    share.initMultipleData = function(key, val) {
        var arr = [],
            select = share.getLocalStorage(key);

        for (var i in select) {
            if (select[i].label == lang.userProfile_askMe) {
                select.splice(i, 1);
                continue;
            }
            if (parseInt(parseInt(val) & parseInt(select[i].value)) > 0) {
                arr.push(select[i].value);
            }
        }

        return { 'select': select, 'arr': arr };

    };

    share.flagPhoto = function(touch, data) {
        // var objData = {prof_id: data.usr_id, type: 10, text: 'From MOBILE: Bad photo',blog_id: data.blog_id || ''};
        data.type = 10;
        data.text = 'From MOBILE: Bad photo';

        var obj = {
            url: seajs.data.vars.apiAccessUrl + 'report',
            type: 'POST',
            data: data,
            success: function(data) {
                share.pageLoad(false, $('body'));
                var html = $('<div class="success"> <span class="promptTip_left"></span> <span class="promptTip_content">' + lang.unify_ReportedSuccess + '</span> <span class="promptTip_right"> X </span> </div>');
                $('#sliderDialog').find('.promptTip').show().html(html);
                $('#sliderDialog .promptTip_right').on('tap', function() {
                    html.remove();
                })
                setTimeout(function() {
                    html.remove();
                }, 3000)
            },
            complete: function() {},
            error: function(xhr, errorType, error) {

            }
        };

        share.pageLoad(true, $('body'));
        $.ajax(share.ajaxControl(obj));
    };

    share.emailAuto = function(str, dom, mId) {
        var autodom = dom.find('.email_select_help'),
            autoHtml = '',
            lstr = str.split('@')[0];
        if (str.indexOf('@') > -1) {
            var host = str.split('@')[1];
            if (host === '') {
                autoHtml += '<dd>' + lstr + '@gmail.com</dd>';
                autoHtml += '<dd>' + lstr + '@yahoo.com</dd>';
                autoHtml += '<dd>' + lstr + '@hotmail.com</dd>';
            } else if ('gmail.com'.indexOf(host) === 0) {
                autoHtml = '<dd>' + lstr + '@gmail.com</dd>';
            } else if ('yahoo.com'.indexOf(host) === 0) {
                autoHtml = '<dd>' + lstr + '@yahoo.com</dd>';
            } else if ('hotmail.com'.indexOf(host) === 0) {
                autoHtml = '<dd>' + lstr + '@hotmail.com</dd>';
            } else {
                if (autodom.length > 0) {
                    autodom.remove();
                }
                return;
            }
            if (autodom.length > 0) {
                autodom.html(autoHtml);
            } else {
                dom.append('<dl class="email_select_help">' + autoHtml + '</dl>');
            }
            $('#' + mId).on('tap', '.email_select_help dd', function() {
                dom.find('input').val($.trim($(this).html()));
                $(this).parent().remove();
            })
            dom.find('input').on('blur', function() {
                var delDom = $(this).parent().find('.email_select_help');
                setTimeout(function() {
                    if (delDom.length > 0) {
                        delDom.remove();
                    }
                }, 200)
            })
        } else {
            if (autodom.length > 0) {
                autodom.remove();
            }
        }
    };

    share.getGenderName = function(val) {
        var data = this.getLocalStorage("ms_gender"),
            genderName = '';
        $.each(data, function(index, value) {
            if (parseInt(val) == parseInt(value.value)) {
                genderName = value.label.toLowerCase();
                return false;
            }
        });
        return genderName;
    };

    share.updateTopic = function(obj) {
        if (obj.typeId == 'forums') {
            var dom = $('#' + obj.typeId).find('li[topicid=\'' + obj.id + '\']');
        } else if (obj.typeId == 'blogList') {
            var dom = $('#' + obj.typeId).find('li[blogid=\'' + obj.id + '\']');
        } else {
            return false;
        }
        if (dom.length > 0) {
            dom.find('.text').eq(0).html('<h3>' + obj[obj.pre + '_topic'] + '</h3>' + obj[obj.pre + '_message']);
            if (obj[obj.pre + '_picture']) {
                var photoDom = dom.find('.photoList'),
                    imgHtml = '<img class="imglazyload" src="' + obj[obj.pre + '_picture'] + '" url="' + obj[obj.pre + '_picture'] + '" />';
                if (photoDom.length > 0) {
                    photoDom.html(imgHtml);
                } else {
                    dom.find('.text').after('<div class="photoList">' + imgHtml + '</div>');
                }
            }
        } else {
            return false;
        }

    };

    share.getFileMd5 = function(uploadObj, callback) {
        var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
            chunkSize = 2097152, // read in chunks of 2MB
            file = uploadObj.file,
            chunks = Math.ceil(file.size / chunkSize),
            currentChunk = 0,
            spark = new SparkMD5.ArrayBuffer(),
            frOnload = function(e) {
                spark.append(e.target.result); // append array buffer
                currentChunk++;
                if (currentChunk < chunks) {
                    loadNext();
                } else {
                    callback(spark.end(), uploadObj);
                }
            },
            frOnerror = function() {
                console.log("\noops, something went wrong.");
            };

        function loadNext() {
            var fileReader = new FileReader();
            fileReader.onload = frOnload;
            fileReader.onerror = frOnerror;
            var start = currentChunk * chunkSize,
                end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        };
        loadNext();
    };

    share.messageImageSize = function(width, height) {
        var width = parseInt(width),
            height = parseInt(height),
            maxNum = 100,
            minNum = 40;

        if (width > maxNum || height > maxNum) {
            if (width / maxNum > height / maxNum) {
                height = height / (width / maxNum);
                width = maxNum;
            } else {
                width = width / (height / maxNum);
                height = maxNum;
            }
        }

        if (width < minNum) {
            width = minNum;
        }

        if (height < minNum) {
            height = minNum;
        }

        return { height: height, width: width };
    };

    share.replaceMessageUrl = function(url, obj) {
        var arr = url.split('?');
        if (obj.width) {
            url = arr[0] + '?w=' + obj.width + '&h=' + obj.height;
        }
        return url;
    };

    share.setHeadButton = function(dom, val, min, max) {
        var domSave = dom.find('.head').find('.save');
        if (val.length < (min || 1) || (max ? val.length > max : false)) {
            domSave.css({ 'opacity': 0.5 }).attr({ 'clickBool': '' });
        } else {
            domSave.css({ 'opacity': 1 }).attr({ 'clickBool': true });
        }
    }

    share.replaceAddMore = function(text, num) {
        if (text.length > num) {
            var showText = util.HTMLAllEnCode(text.substring(0, num)) + '<b class="more">… read more>></b>',
                hideText = '<span class="hideStr">' + util.HTMLAllEnCode(text.substring(num)) + '</span><b class="less"> less<<</b>';
            text = showText + hideText;
        } else {
            text = util.HTMLAllEnCode(text);
        }
        return text.replace(/&nbsp;/g, " ");
    }

});
