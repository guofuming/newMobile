define(function(require, exports, module) {

    var controller,
        reRender = true,
        arrData,
        albumType,
        userInfo,
        userObj,
        hrefArr,
        mId = 'userProfile',
        // slideImg = require('{component}slideImg/slideImg'),
        // tplSlideImg = require('{component}slideImg/slideImg.tpl'),
        tpl = require('view/userProfile.tpl'),
        tplP = require('view/userProfilePhoto.tpl'),
        tplTab = require('view/userProfileTab.tpl');

    controller = {

        template: _.template(tpl),
        templateP: _.template(tplP),
        templateTab: _.template(tplTab),
        
        render: function(obj) {
            if(!share.checkPermissions(true)){ return; };
            share.reRender(mId, reRender);

            userInfo = share.userInfo();
            hrefArr = share.getHrefParameter(obj.val);

            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(this.template({userName:hrefArr[0]}));
                this.bindEvt();
            }
            this.ajaxUser();
        },

        ajaxAfter:function(){
            var dom = $('#' + mId);
            dom.find('.tab_wrapper').html(this.templateTab());
            dom.find('.userImgBox').html(this.templateP({userObj:userObj}));
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
