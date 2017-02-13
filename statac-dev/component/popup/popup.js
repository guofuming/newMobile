define(function(require, exports, module) {

    var controller,
        userInfo,
        mId = 'popup',
        wrapper = '<div id="popup"></div>';

    $(window).on('resize',function(){
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

        resetCss:function(){
            var dom = $('#' + mId);
        },

        hide:function(){
            // transition: all .3s linear;
            var dom = $('#' + mId);

        },

        show:function(opt){
            var dom = $(wrapper);
            var str = '<div class="popup_tip">'+opt.text+'</div>'
            dom.append(str);
            opt.wrapper.append(dom);
        }, 

    }
    module.exports = controller;
})
