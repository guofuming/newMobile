define(function(require, exports, module) {

    var controller,
        mId = 'connections',
        // slideImg = require('{component}slideImg/slideImg'),
        // tplSlideImg = require('{component}slideImg/slideImg.tpl'),
        tpl = require('view/connections.tpl');

    controller = {

        template: _.template(tpl),
        
        render: function(obj) {
            if(!share.checkPermissions(true)){ return; };

            userInfo = share.userInfo();

            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(this.template());
                this.bindEvt();
            }
        },

        bindEvt: function() {
            var tthis= this,
                dom = $('#' + mId);

            dom.find('.left').on('tap', function(){
                window.history.go(-1);
            });
        	
            dom.find('.tab_wrapper').on('tap' ,function(e){
                var target = $(e.target);
                var currentL = target.closest('li');
                if(currentL.hasClass('f-flex-auto')){
                    var index = currentL.index();
                    share.tabSwitch(dom.find('.tab_wrapper'),index);
                }
        	});
        },

        ajaxUser:function(){
            var tthis= this;
            share.loadPage($('body'));
            var ajaxObj = {
                url: seajs.data.vars.apiAccessUrl + "user_profile",
                type: 'POST',
                data: { username:hrefArr[0], prof_id:hrefArr[1] },
                success: function(data) {
                    userObj = data;
                    share.loadPage($('body'),false);
                    if(data.errcode == undefined){
                        tthis.ajaxAfter();
                    }else if(data.errcode == 121 || data.errcode == 125){
                        $('#' + mId).find('.g-bd').html(data.errmsg);
                    }
                }
            };
            $.ajax(share.ajaxControl(ajaxObj));

        }
    }
    module.exports = controller;
})
