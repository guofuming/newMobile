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
            var tthis= this;
        	var dom = $('#' + mId);
        	dom.find('.tab_title li').on('tap' ,function(){
                var index = $(this).index();
                tthis.tabSwitch(dom.find('.tab_wrapper'),index);
        	});

            dom.find('.left').on('tap', function(){
                panel.toggle();
            });

        },

        formData:function(data){
            var obj = {};
            obj.info = data.account;
            obj.pictures = data.pictures;
            obj.private_pictures = data.private_pictures;
            return obj;
        },

        tabSwitch:function(dom,index){
            var domTitle = dom.find('.tab_title');
            var domContent = dom.find('.tab_content_box');
            domTitle.find('li').removeClass('selected');
            domTitle.find('li').eq(index).addClass('selected');
            domContent.find('.tab_content').hide();
            domContent.find('.tab_content').eq(index).show().addClass('selected');
        }
    }
    module.exports = controller;
})
