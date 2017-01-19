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

            dom.find('button').on('tap', function() {
                var obj = {
                    username:dom.find('input[name=username]').val() || 'wells2015',
                    password:dom.find('input[name=password]').val() || '12345678'
                };
                tthis.login(obj);
            });

        },

        login: function(obj){

             $.ajax({

               url: "http://www.a.com/apis/login",

               data: obj,

               success: function(data){
                console.log(data)
               }

             });
                        
            console.log(obj)
        }



    }
    module.exports = controller;
})
