define(function(require, exports, module) {

    var controller,
        mId = 'setting',
        panel = require('{component}panel/panel'),
        tplPanel = require('view/panel.tpl'),
        tpl = require('view/setting.tpl'),

    controller = {

        template: _.template(tpl),
        templatePanel: _.template(tplPanel),

        render: function(obj) {
            if(!share.checkPermissions(true)){ return; };
            panel.render(this.templatePanel);

            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(this.template());
                this.bindEvt();
            }
        },

        bindEvt: function() {
            var tthis = this,
                dom = $('#' + mId);

            dom.find('.left').on('tap', function(){
                panel.toggle();
            });

            dom.find('.goUpgrade').on('tap', function(){
                window.location.href = '#upgrade/whole';
            });

            dom.find('.logout').on('tap', function(){
                if(confirm('确定要退出登陆？')){
                    share.logout();
                }
            });

        },

    }
    module.exports = controller;
})
