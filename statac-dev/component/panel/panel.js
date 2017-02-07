define(function(require, exports, module) {

    var controller,
        userInfo,
        mId = 'panel';

    $(window).on('resize',function(){
        // if(controller.status == 'hide'){

        // }else{
            controller.resetCss();
        // }
    })

    controller = {

        status : 'hide',
        render: function(tpl) {
            var userInfo = share.userInfo();
            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(tpl({'userInfo':userInfo,'panelList':share.panelList}));
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
                var url = 'myProfile';
                if(url == seajs.data.varscurModule){
                    tthis.hide();
                    return;
                }
                window.location.href = '#'+ url +'/whole';
            });

            dom.find('.panel_cover').on('tap', function() {
                tthis.toggle();
            });

            dom.find('li').on('tap', function() {
                var url = $(this).attr('url');
                // dom.find('li').removeClass('selected');
                // $(this).addClass('selected');
                if(url){
                    if(url == seajs.data.varscurModule){
                        tthis.hide();
                        return;
                    }
                    window.location.href = '#'+ url +'/whole';
                }
            });
        },

        resetCss:function(){
            var dom = $('#' + mId),
                domCur = $('#'+seajs.data.varscurModule),
                winWidth = $(window).width();
            if(this.status == 'hide'){
                $('.g-doc').css({'width':'100%'});
                dom.off('touchmove');
                setTimeout(function(){
                    domCur.css({'overflow-x':'visible'});
                    domCur.children().css({'width':'100%'});
                },200);
            }else{
                dom.on('touchmove',function(e){
                    e.stopPropagation();
                    e.preventDefault();
                });
                domCur.css({'width': winWidth - dom.find('.panel_left').width() + 'px','overflow-x':'hidden'});
                domCur.children().css({'width': winWidth + 'px'});
            }
        },

        hide:function(){
            // transition: all .3s linear;
            this.status = 'hide';

            $('#' + mId).find('li').removeClass('selected');
            $('#' + mId).find('li.' + seajs.data.varscurModule).addClass('selected');

            $('#'+ seajs.data.varscurModule).show();
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
            },200);
            this.resetCss();
        },

        toggle:function(){
            this.status == 'hide' ? this.show() : this.hide();
        }, 

    }
    module.exports = controller;
})
