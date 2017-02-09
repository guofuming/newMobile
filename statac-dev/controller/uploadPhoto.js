define(function(require, exports, module) {

    var controller,
        userInfo,
        mId = 'uploadPhoto',
        tplPanel = require('view/panel.tpl'),
        tpl = require('view/uploadPhoto.tpl');

    controller = {

        template: _.template(tpl),
        templatePanel: _.template(tplPanel),
        
        render: function(obj) {
            if(!share.checkPermissions(true)){ return; };
            
            userInfo = share.userInfo();

            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(this.template(userInfo));
                this.bindEvt();
                $('#' + mId).find('.g-bd').lazyload({center:true});
            }
        },

        bindEvt: function() {
            var tthis= this,
                dom = $('#' + mId);
        	
            dom.find('.left').on('tap', function(){
                window.history.go(-1);
            });

            dom.find('.upgrade').on('tap' ,function(){
                window.location.href = '#upgrade/whole';
            });

            dom.find('.tab_content_photo .more').on('tap',function(){
                var type = $(this).parents('.album_box').attr('type');
                if(type == 'public_album'){
                    window.location.href = '#photoAlbum/whole';
                }else{
                    window.location.href = '#photoAlbum/whole/customprivate';
                }
            });

            dom.find('.album_box dd').on('tap' ,function(){
                var arr,
                    type = $(this).parents('.album_box').attr('type');
                if(type == 'public_album'){
                    arrData = userInfo.pictures;
                }else{
                    arrData = userInfo.private_pictures;
                };

                $('body').append(tthis.templateSlideImg({arr:arrData}));
                slideImg.init({index:$(this).index()-1});
                slideImg.dom.lazyload();
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
