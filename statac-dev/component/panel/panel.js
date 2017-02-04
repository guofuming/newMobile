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

        toggle:function(){
            var dom = $('#' + mId);

            if(this.status == 'show'){
                this.status = 'hide';
                dom.removeClass('show');
                $('#' +  seajs.moduleUI).removeClass('show');
                dom.find('.panel_cover').css({'display':'none','opacity':'0'});
            }else{
                this.status = 'show';
                dom.addClass('show');
                $('#' +  seajs.moduleUI).addClass('show');
                dom.find('.panel_cover').show();
                setTimeout(function(){
                    dom.find('.panel_cover').css({'display':'block','opacity':'1'});
                },200)
            }
        }

    }
    module.exports = controller;
})
