define(function(require, exports, module) {

    var controller,
        userInfo,
        mId = 'upgrade',
        panel = require('{component}panel/panel'),
        tplPanel = require('view/panel.tpl'),
        tpl = require('view/upgrade.tpl');

    controller = {

        template: _.template(tpl),
        templatePanel: _.template(tplPanel),
        
        render: function(obj) {
            if(!share.checkPermissions(true)){ return; };
            
            var userInfo = share.userInfo();
            panel.render(this.templatePanel);

            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(this.template(userInfo));
                this.bindEvt();
            }
            // panel.toggle();
        },

        bindEvt: function() {
            var tthis= this;
        	var dom = $('#' + mId);
        	dom.find('.tab_title li').on('tap' ,function(){
                var index = $(this).index();
                tthis.tabSwitch(dom.find('.tab_wrapper'),index);
        	});

            dom.find('.left').on('tap', function(){
                panel.toggle();
            });

            dom.find('.optionLineBox').on('tap', function(){
                dom.find('.optionLineBox').removeClass('selected');
                $(this).addClass('selected');
            })

        },
    }
    module.exports = controller;
})
