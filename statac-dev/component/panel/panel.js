define(function(require, exports, module) {

    var controller,
        userInfo,
        mId = 'panel';

    $(window).on('resize',function(){
        if(controller.status != 'hide'){
            controller.resetCss();
        }
    })

    controller = {

        status : 'hide',
        render: function(tpl) {
            var userInfo = share.userInfo();
            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(tpl(userInfo));
                this.bindEvt();
            }
        },
        bindEvt: function() {
            var tthis = this,
                dom = $('#' + mId);
            dom.find('.tab_title li').on('tap', function() {
                var index = $(this).index();
                tthis.tabSwitch(dom.find('.tab_wrapper'), index);
            });

            dom.find('.portrait').on('tap', function() {
                window.location.href = '#myProfile/whole';
            });

            dom.find('.panel_cover').on('tap', function() {
                tthis.toggle();
            });

            dom.find('.upgrade').on('tap', function() {
                window.location.href = '#upgrade/whole';
            });
        },

        resetCss:function(){
            var dom = $('#' + mId),
                domCur = $('#'+seajs.moduleUI),
                winWidth = $(window).width(),
                domWidth = dom.find('.panel_left').width();
            if(this.status == 'hide'){
                $('.g-doc').css({'width':'100%'});
                dom.off('touchmove');
                setTimeout(function(){
                    domCur.css({'overflow-x':'visible'});
                },200);
                // domCur.children().css({'width':'100%'});
            }else{
                dom.on('touchmove',function(e){
                    e.stopPropagation();
                    e.preventDefault();
                });
                domCur.css({'width': winWidth - domWidth + 'px','overflow-x':'hidden'});
                domCur.children().css({'width': winWidth + 'px'});
            }
        },
        hide:function(){
            $('#'+ seajs.moduleUI).show();
            this.status = 'hide';
            $('html').removeClass('panelShow');
            $('#' + mId).find('.panel_cover').css({'display':'none','opacity':'0'});
            this.resetCss();
        },
        show:function(){
            var dom = $('#' + mId);
            this.status = 'show';
            $('html').addClass('panelShow');
            dom.find('.panel_cover').show();
            setTimeout(function(){
                dom.find('.panel_cover').css({'display':'block','opacity':'1'});
            },300);
            this.resetCss();
        },
        toggle:function(){
            if(this.status == 'hide'){
                this.show();
            }else{
                this.hide();
            }
        }, 

    }
    module.exports = controller;
})
