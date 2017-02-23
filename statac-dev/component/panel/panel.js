define(function(require, exports, module) {

    var controller,
        userInfo,
        mId = 'panel';

    $(window).on('resize', function() {
        // if(controller.status == 'hide'){

        // }else{
        controller.resetCss();
        // }
    })

    controller = {

        status: 'hide',
        render: function(tpl) {
            var userInfo = share.userInfo();
            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(tpl({ 'userInfo': userInfo, 'panelList': share.panelList }));
                this.bindEvt();
                $('#' + mId).find('.portrait').lazyload({ center: true });
            }
            this.hide();
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
                if (url == seajs.data.vars.curModule) {
                    tthis.hide();
                    return;
                }
                window.location.href = '#' + url + '/whole';
            });

            dom.find('.panel_cover').on('tap', function(e) {
                e.stopPropagation();
                e.preventDefault();
                tthis.toggle();
            });

            dom.find('li').on('tap', function() {
                var url = $(this).attr('url');
                // dom.find('li').removeClass('selected');
                // $(this).addClass('selected');
                if (url) {
                    if (url == seajs.data.vars.curModule) {
                        tthis.hide();
                        return;
                    }
                    window.location.href = '#' + url + '/whole';
                }
            });
        },

        resetCss: function() {
            var dom = $('#' + mId),
                domCur = $('#' + seajs.data.vars.curModule),
                winWidth = $(window).width();
            if (this.status == 'hide') {
                // $('.g-doc').css({'width':'100%'});
                dom.off('touchmove');
                // setTimeout(function(){
                // domCur.css({'overflow-x':'visible'});
                // domCur.children().css({'width':winWidth + 'px'});
                // },300);
            } else {
                dom.on('touchmove', function(e) {
                    var domli = dom.find('.panel_list li');
                    var sizeH = dom.find('.head').height() + domli.size() * domli.eq(0).height();
                    e.stopPropagation();
                    e.preventDefault();
                    // console.log($(window).height() ,sizeH)
                    // if($(window).height() >= sizeH){
                    //     e.stopPropagation();
                    //     e.preventDefault();
                    // }else{
                    // }
                });
                // || $(e.target).closest('li').length
                // domCur.css({'width': winWidth - dom.find('.panel_left').width() + 'px','overflow-x':'hidden'});
                // domCur.children().css({'width': winWidth + 'px'});
            }
        },

        cssTransition: function(width, val) {
            return 'width:' + width + '; transform: translateX(' + val + ');';
        },

        hide: function() {
            // transition: all .3s linear;
            var dom = $('#' + mId),
                curPage = $('#' + seajs.data.vars.curModule);
            this.status = 'hide';

            $('html').removeClass('panelShow');

            dom.find('li').removeClass('selected');
            dom.find('li.' + seajs.data.vars.curModule).addClass('selected');

            dom.find('.panel_cover').css({ 'display': 'none', 'opacity': '0' });

            this.resetCss();
        },

        show: function() {
            var dom = $('#' + mId);
            this.status = 'show';

            share.blur(seajs.data.vars.curModule);

            $('html').addClass('panelShow');

            dom.find('.panel_cover').show();

            setTimeout(function() {
                dom.find('.panel_cover').css({ 'display': 'block', 'opacity': '1' });
            }, 200);
            this.resetCss();
        },

        toggle: function() {
            this.status == 'hide' ? this.show() : this.hide();
        },

    }
    module.exports = controller;
})
