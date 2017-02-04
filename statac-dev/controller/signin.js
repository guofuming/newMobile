define(function(require, exports, module) {

    var controller,
        mId = 'signin',
        tpl = require('view/signin.tpl');

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
            var tthis = this,
                dom = $('#' + mId);

            dom.find('.back').on('tap', function() {
                window.history.go(-1);
            });

            dom.find('input[name=username]').val('wells2015');
            dom.find('input[name=password]').val('12345678');

            dom.find('button').on('tap', function() {
                tthis.login();
            });

            dom.find('input[name=validaNum]').on('keyup', function(e) {
                if(e.keyCode == 13){
                    tthis.login();
                }
            });

        },
        
        refreshNum :function(){
            // console.log('refreshNum')
            var dom = $('#' + mId),
                domValidation = $('#' + mId).find('.validation'),
                imgUrl = seajs.data.vars.apiUrl + 'show_captcha_url?username='+ dom.find('input[name=username]').val() + '&r='+Math.random();
            domValidation.show();
            domValidation.find('.img_box').addClass('loading');
            domValidation.find('img').attr('src',seajs.data.vars.resources + 'img/max_loading.gif');
            share.imgLoad(imgUrl,function(){
                domValidation.find('.img_box').removeClass('loading');
                domValidation.find('img').attr('src',imgUrl);
            });
        },
        
        login: function() {
            var tthis = this, 
                dom = $('#' + mId);

            share.btnLoading(dom.find('button'));
            
            var obj = {
                username: dom.find('input[name=username]').val(),
                password: dom.find('input[name=password]').val(),
                confirm_number: dom.find('input[name=validaNum]').val()
            };

            var ajaxObj = {
                url: seajs.data.vars.apiUrl + "login",
                type: 'POST',
                data: obj,
                success: function(data) {
                    console.log(data);
                    if(data.errcode == undefined){
                        share.cacheLoadUser(data);
                        window.location.href = '#myProfile/whole';
                    }
                    if (data.errcode == 110 || data.errcode == 102) {
                        tthis.refreshNum();
                    }
                    share.btnLoading(dom.find('.btn_loading'),false);
                }
            }
            $.ajax(share.ajaxControl(ajaxObj));
        }



    }
    module.exports = controller;
})
