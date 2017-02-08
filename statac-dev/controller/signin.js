define(function(require, exports, module) {

    var controller,
        mId = 'signin',
        tpl = require('view/signin.tpl');

    controller = {

        template: _.template(tpl),

        render: function(obj) {
            if(!share.checkPermissions(false)){ return; };
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

            dom.find('.left').on('tap', function() {
                window.location.href = '#index';
            });

            dom.find('input[name=username]').val('wells2015');
            dom.find('input[name=password]').val('12345678');

            dom.find('button').on('tap', function() {
                tthis.login();
            });

            dom.find('.img_box').on('tap', function() {
                tthis.refreshNum();
            });

            dom.find('input[name=validaNum]').on('keyup', function(e) {
                if(e.keyCode == 13){
                    share.blur(mId);
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
            domValidation.find('.img_box').empty();
            share.imgLoad(imgUrl,function(img){
                domValidation.find('.img_box').removeClass('loading');
                domValidation.find('.img_box').html(img);
            });
        },
        
        login: function() {
            var tthis = this, 
                dom = $('#' + mId);

            dom.find('.err').empty();

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
                    if(data.errcode == undefined){
                        util.setCookie('session_id',data.session_id);
                        seajs.data.vars.apiAccessUrl = seajs.data.vars.apiUrl + 's' + data.session_id + '/';
                        share.cacheLoadUser(data);
                        window.location.href = '#myProfile/whole';
                    }else if (data.errcode == 110 || data.errcode == 102) {
                        tthis.refreshNum();
                        dom.find('.err').text(data.errmsg);
                    }
                    share.btnLoading(dom.find('.btn_loading'),false);
                }
            }
            $.ajax(share.ajaxControl(ajaxObj));
        }



    }
    module.exports = controller;
})
