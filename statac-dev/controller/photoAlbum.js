define(function(require, exports, module) {

    var controller,
        reRender = true,
        arrData,
        albumType,
        userInfo,
        mId = 'photoAlbum',
        slideImg = require('{component}slideImg/slideImg'),
        tplSlideImg = require('{component}slideImg/slideImg.tpl'),
        tpl = require('view/photoAlbum.tpl');

    controller = {

        template: _.template(tpl),
        templateSlideImg: _.template(tplSlideImg),
        
        render: function(obj) {
            if(!share.checkPermissions(true)){ return; };
            userInfo = share.userInfo();

            if(obj.val === undefined || obj.val == 'public'){
                title = 'Public album';
                arrData = userInfo.pictures;
                albumType == 'public';
            }else{
                title = ' Private album';
                arrData = userInfo.private_pictures;
                albumType == 'private';
            }

            if (share.isDom($('#' + mId)) && !reRender) {
                $('#' + mId).css('display', 'block');
            } else {
                $('#' + mId).remove();
                $('body').append(this.template({arr:arrData,title:title}));
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
        	
            dom.find('.tab_title li').on('tap' ,function(){
                var index = $(this).index();
                share.tabSwitch(dom.find('.tab_wrapper'),index);
        	});

            dom.find('.upgrade').on('tap' ,function(){
                window.location.href = '#upgrade/whole';
            });

            dom.find('.album_box dd').on('tap' ,function(){
                console.log(userInfo.pictures)
                
            });

            dom.find('.data_list').on('tap',function(e){
                // var e.
                var targetDom = $(e.target);
                var curDomD = targetDom.closest('dd');

                if(curDomD.length){
                    $('body').append(tthis.templateSlideImg({arr:arrData}));
                    slideImg.init({index:curDomD.index()-1});
                    slideImg.dom.lazyload();
                }

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
