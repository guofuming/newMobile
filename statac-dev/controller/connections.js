define(function(require, exports, module) {

    var controller,
        condition,
        mId = 'connections',
        // slideImg = require('{component}slideImg/slideImg'),
        // tplSlideImg = require('{component}slideImg/slideImg.tpl'),
        panel = require('{component}panel/panel'),
        tpl = require('view/connections.tpl'),
        tplL = require('view/userLi.tpl'),
        tplPanel = require('view/panel.tpl');


    controller = {

        template: _.template(tpl),
        templateL: _.template(tplL),
        templatePanel: _.template(tplPanel),

        render: function(obj) {
            if (!share.checkPermissions(true)) {
                return; };
            panel.render(this.templatePanel);

            userInfo = share.userInfo();

            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(this.template());
                this.bindEvt();
            }
            this.resetData();
            this.switchTab(0)
        },

        switchTab: function(index) {
            index = index || 0;
            var _content = $('#' + mId).find('.tab_content');
            var _menu = $('#' + mId).find('.menuArea');

            _menu.find('div').removeClass('on');
            _menu.find('div').eq(index).addClass('on');

            _content.find('.userList').empty();

            share.loadList(_content.eq(index).find('.userList'));
            this.ajaxUserList(index);
        },

        resetData: function() {
            condition = {
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
        },

        bindEvt: function() {
            var tthis = this,
                dom = $('#' + mId);

            dom.find('.left').on('tap', function() {
                panel.toggle();
            });

            dom.find('.menuArea div').on('tap', function() {
                tthis.switchTab($(this).index());
            });

            dom.find('.userList').on('tap', function(e) {
                var target = $(e.target),
                    curLi = target.closest('li'),
                    uid = curLi.attr('uid');
                if(uid){
                    window.location.href = '#userProfile/whole/custom'+curLi.attr('username')+'&&'+uid;
                }
            });

        },

        ajaxUserList: function(index) {
            var tthis = this, inter, _condition;

            var _userList = $('#' + mId).find('.tab_content').eq(index).find('.userList');

            switch (index) {
                case 0:
                    inter = "my_visitors";
                    _condition = condition.visitors;
                    break;
                case 1:
                    inter = "winkedme";
                    _condition = condition.winkedme;
                    break;
                case 2:
                    inter = "interested_in_me";
                    _condition = condition.interestedInMe;
                    break;
                case 3:
                    inter = "my_favors";
                    _condition = condition.favorites;
                    break;
            };

            var ajaxObj = {
                url: seajs.data.vars.apiAccessUrl + inter,
                type: 'POST',
                data: _condition,
                success: function(data) {
                    var had_see =  data.had_see;
                    if (data) {
                        share.loadList(_userList, false);
                        if(index == 3){
                            had_see = data.res;  
                        }
                        _userList.append(tthis.templateL({ arr: had_see}));

                        _userList.lazyload({center:true});
                    }
                }
            };
            $.ajax(share.ajaxControl(ajaxObj));

        }
    }
    module.exports = controller;
})
