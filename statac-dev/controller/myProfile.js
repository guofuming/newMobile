define(function(require, exports, module) {

    var controller,
        mId = 'myProfile',
        tpl = require('view/myProfile.tpl');

    controller = {

        template: _.template(tpl),
        
        render: function(obj) {
            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(this.template());
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
