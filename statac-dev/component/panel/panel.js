define(function(require, exports, module) {

    var controller,
        userInfo,
        mId = 'panel';

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

            dom.find('.panel_cover').on('tap', function() {
                tthis.toggle();
            });
        },

        resetCss:function(){
            var dom = $('#' + mId),
                domCur = $('#'+seajs.moduleUI),
                winWidth = $(window).width(),
                domWidth = dom.find('.panel_left').width();
            if(this.status == 'hide'){
                domCur.css({'width':'100%'});
                dom.off('touchmove');
                // domCur.children().css({'width':'100%'});
            }else{
                dom.on('touchmove',function(e){
                    e.stopPropagation();
                    e.preventDefault();
                });
                domCur.css({'width': winWidth - domWidth + 'px'});
                domCur.css({'overflow-x':'hidden'});
                domCur.children().css({'width': winWidth + 'px'});
            }

            

        },

        toggle:function(){
            var dom = $('#' + mId);
            if(this.status == 'hide'){
                this.status = 'show';
                $('html').addClass('panelShow');
                dom.find('.panel_cover').show();
                setTimeout(function(){
                    dom.find('.panel_cover').css({'display':'block','opacity':'1'});
                },200);
            }else{
                this.status = 'hide';
                $('html').removeClass('panelShow');
                dom.find('.panel_cover').css({'display':'none','opacity':'0'});
            }
            this.resetCss();
        }, 

    }
    module.exports = controller;
})
