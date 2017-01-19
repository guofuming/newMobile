define(function(require, exports, module) {

    var controller,
        mId = 'signin',
        tpl = require('view/signin.tpl');

    controller = {

        template: _.template(tpl),
        
        render: function(obj) {
            console.log(share.isDom($('#' + mId)))
            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(this.template());
                this.bindEvt();
            }
        },

        bindEvt: function() {
        	var dom = $('#' + mId);

            dom.find('.back').on('tap', function() {
                // window.history.go(-1);
                console.log('bb')
                // window.location.href = '#index/whole'
        	});

            // dom.find('button').on('tap', function() {
            //     console.log('button')
            // });

            dom.find('button').tap(function() {
                console.log('button')
            });
        }
    }
    module.exports = controller;
})
