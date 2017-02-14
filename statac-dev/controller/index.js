define(function(require, exports, module) {

    var controller,
        mId = 'index',
        tpl = require('view/index.tpl');

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
        	var dom = $('#' + mId);
        	dom.find('.signup').on('tap' ,function(){
        		// window.location.href = '#signin';
        	});

            dom.find('.login').on('tap', function() {
        		window.location.href = '#signin/whole';
        	});

        }
    }
    module.exports = controller;
})
