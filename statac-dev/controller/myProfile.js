define(function(require, exports, module) {

    var controller,
        userInfo,
        mId = 'myProfile',
        panel = require('{component}panel/panel'),
        tplPanel = require('view/panel.tpl'),
        tpl = require('view/myProfile.tpl');

    controller = {

        template: _.template(tpl),
        templatePanel: _.template(tplPanel),
        
        render: function(obj) {
            if(!share.checkPermissions()){ return; };

            var userInfo = share.userInfo();
            panel.render(this.templatePanel);

            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(this.template(userInfo));
                this.bindEvt();
            }
        },

        bindEvt: function() {
            var tthis= this,
                dom = $('#' + mId);
        	dom.find('.tab_title li').on('tap' ,function(){
                var index = $(this).index();
                share.tabSwitch(dom.find('.tab_wrapper'),index);
        	});

            dom.find('.left').on('tap', function(){
                panel.toggle();
            });

            dom.find('.upgrade').on('tap' ,function(){
                window.location.href = '#upgrade/whole';
            });
        },

        formData:function(data){
            var obj = {};
            obj.info = data.account;
            obj.pictures = data.pictures;
            obj.private_pictures = data.private_pictures;
            return obj;
        },
    }
    module.exports = controller;
})
