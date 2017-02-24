define(function(require, exports, module) {

    var controller,
        condition,
        mId = 'connections',
        tabObj = {},
        // slideImg = require('{component}slideImg/slideImg'),
        // tplSlideImg = require('{component}slideImg/slideImg.tpl'),
        panel = require('{component}panel/panel'),
        tpl = require('view/connections.tpl'),
        tplL = require('view/userLi.tpl'),
        tplPanel = require('view/panel.tpl');


    controller = {
        reRender:true,
        template: _.template(tpl),
        templateL: _.template(tplL),
        templatePanel: _.template(tplPanel),

        render: function(obj) {
            if (!share.checkPermissions(true)) {
                return;
            };
            panel.render(this.templatePanel);
            userInfo = share.userInfo();

            this.resetTabInfo(obj.val);

            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(this.template());
                this.bindEvt();
            }
            this.switchTab(tabObj.tabName);
        },

        switchTab: function(tabName) {

            var _content = $('#' + mId).find('.tabC_' + tabName);
            var _menu = $('#' + mId).find('.menuArea');

            _menu.find('div').removeClass('on');
            _menu.find('div[name=' + tabName + ']').addClass('on');

            $('#' + mId).find('.userList').empty();

            share.loadList(_content.find('.userList'));
            this.ajaxUserList(tabName);
        },

        resetTabInfo: function(val) {
            tabObj.condition = {
                'visitors': {
                    from: 0,
                    offset: 20,
                    ajaxBool: true,
                    scrollTop: 0
                },
                'winkedMe': {
                    from: 0,
                    offset: 20,
                    ajaxBool: true,
                    scrollTop: 0
                },
                'interestedInMe': {
                    from: 0,
                    offset: 20,
                    ajaxBool: true,
                    scrollTop: 0
                },
                'favorites': {
                    from: 0,
                    offset: 20,
                    ajaxBool: true,
                    scrollTop: 0
                },
            };

            if (!val || val == 'visitors') {
                tabObj.tabName = 'visitors';
                tabObj.interface = 'my_visitors';
                tabObj.condition = tabObj.condition.visitors;
            } else if (val == 'winkedMe') {
                tabObj.tabName = 'winkedMe';
                tabObj.interface = 'winkedme';
                tabObj.condition = tabObj.condition.winkedme;
            } else if (val == 'interestedInMe') {
                tabObj.tabName = 'interestedInMe';
                tabObj.interface = 'interested_in_me';
                tabObj.condition = tabObj.condition.interestedInMe;
            } else if (val == 'favorites') {
                tabObj.tabName = 'favorites';
                tabObj.interface = 'my_favors';
                tabObj.condition = tabObj.condition.favorites;
            }
            
        },

        bindEvt: function() {
            var tthis = this,
                dom = $('#' + mId);

            dom.find('.left').on('tap', function() {
                panel.toggle();
            });

            dom.find('.menuArea div').on('tap', function() {
                window.location.href = '#connections/whole/tab' + $(this).attr('name');
            });

            dom.find('.userList').on('tap', function(e) {
                var target = $(e.target),
                    curLi = target.closest('li'),
                    uid = curLi.attr('uid');
                if (uid) {
                    window.location.href = '#userProfile/whole/custom' + curLi.attr('username') + '&&' + uid;
                }
            });

        },

        ajaxUserList: function(tabName) {
            var tthis = this,
                _userList = $('#' + mId).find('.tabC_' + tabName).find('.userList');

            var ajaxObj = {
                url: seajs.data.vars.apiAccessUrl + tabObj.interface,
                type: 'POST',
                data: tabObj.condition,
                success: function(data) {
                    if (data) {
                        var had_see = data.had_see;
                        share.loadList(_userList, false);
                        if (tabName == 'favorites') {
                            had_see = data.res;
                        }
                        if(!had_see.length && !_userList.find('li').length){
                            _userList.html('<p class="noData">When someone visits your profile, they\'ll show up here.</p>');
                        }else{
                            _userList.append(tthis.templateL({ arr: had_see }));
                            _userList.lazyload({ center: true });
                        }
                    }
                }
            };
            $.ajax(share.ajaxControl(ajaxObj));

        }
    }
    module.exports = controller;
})
