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
                var obj = {
                    username: dom.find('input[name=username]').val(),
                    password: dom.find('input[name=password]').val(),
                    confirm_number: dom.find('input[name=validaNum]').val()
                };
                tthis.login(obj);
            });

        },
        
        refreshNum :function(){
            var dom = $('#' + mId),
                imgUrl = seajs.data.vars.apiUrl + 'show_captcha_url?username='+ dom.find('input[name=username]').val() + '&r='+Math.random();
            dom.find('.validation img').attr('src',imgUrl);
        },
        
        login: function(obj) {
            var tthis = this, 
                dom = $('#' + mId);
            $.ajax({
                url: seajs.data.vars.apiUrl + "login",
                type: 'POST',
                data: obj,
                success: function(data) {
                    if (data.errcode == 110 || data.errcode == 102) {
                        dom.find('.validation').show();
                        tthis.refreshNum();
                    }
                }

            });
            console.log(obj)
        }



    }
    module.exports = controller;
})
