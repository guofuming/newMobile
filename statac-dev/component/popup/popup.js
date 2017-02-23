define(function(require, exports, module) {

    var controller,
        userInfo,
        mId = 'popup',
        wrapper = '<div id="popup"></div>';

    $(window).on('resize', function() {
        // if(controller.status == 'hide'){

        // }else{
        // controller.resetCss();
        // }
    });

    controller = {

        bindEvt: function() {
            var tthis = this,
                dom = $('#' + mId);

            dom.find('.tab_title li').on('tap', function() {
                var index = $(this).index();
                tthis.tabSwitch(dom.find('.tab_wrapper'), index);
            });

        },

        resetCss: function() {
            var dom = $('#' + mId);
        },

        hide: function() {
            // transition: all .3s linear;
            var dom = $('#' + mId);

        },

        init: function(opt) {
            $('#' + mId).remove();

            if (opt.type == 'error' || opt.type == 'success') {
                this.prompt(opt);
            }

            this.bindEvt();
        },

        bindEvt: function(){
            var dom = $('#' + mId);

            dom.find('.close').on('tap', function() {
               dom.remove();
            });

        },

        prompt: function(opt) {
            var dom = $(wrapper),
                str = '<div class=' + opt.type + '>' +
                '<div class="tip">' + opt.text + '</div><div class="close">x</div>' +
                '</div>';

            dom.append(str);
            opt.wrapper.append(dom);


            setTimeout(function(){
                dom.remove();
            },3000)
        },

        show: function(opt) {

            this.init(opt);
        },
    }
    module.exports = controller;
})
