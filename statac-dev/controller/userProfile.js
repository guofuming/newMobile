define(function(require, exports, module) {

    var controller,
        reRender = true,
        arrData,
        albumType,
        userInfo,
        hrefArr,
        mId = 'userProfile',
        // slideImg = require('{component}slideImg/slideImg'),
        // tplSlideImg = require('{component}slideImg/slideImg.tpl'),
        tpl = require('view/userProfile.tpl'),
        tplA = require('view/userProfileA.tpl');

    controller = {

        template: _.template(tpl),
        templateA: _.template(tplA),
        
        render: function(obj) {
            if(!share.checkPermissions(true)){ return; };
            userInfo = share.userInfo();
            
            hrefArr = share.getHrefParameter(obj.val);

            this.ajaxUser();

            if (share.isDom($('#' + mId)) && !reRender) {
                $('#' + mId).css('display', 'block');
            } else {
                $('#' + mId).remove();
                $('body').append(this.template({arr:arrData,userName:hrefArr[0]}));
                this.bindEvt();
            }
            this.ajaxAfter();
        },
        ajaxAfter:function(){
            var dom = $('#' + mId);
            dom.find('.g-bd').append(this.templateA());

        },
        bindEvt: function() {
            var tthis= this,
                dom = $('#' + mId);

            dom.find('.left').on('tap', function(){
                window.history.go(-1);
            });
        	
            dom.find('.tab_title li').on('tap' ,function(){
                var index = $(this).index();
                share.tabSwitch(dom.find('.tab_wrapper'),index);
        	});
        },

        ajaxUser:function(){

            var ajaxObj = {
                url: seajs.data.vars.apiAccessUrl + "user_profile",
                type: 'POST',
                data: { username:hrefArr[0], prof_id:hrefArr[1] },
                success: function(data) {
                        console.log(data)
                    if(data.errcode == undefined){

                    }else{
                    }
                }
            };
            $.ajax(share.ajaxControl(ajaxObj));

        }
    }
    module.exports = controller;
})
