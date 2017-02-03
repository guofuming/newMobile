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
        },

        toggle:function(){
            var dom = $('#' + mId);
            if(this.status == 'show'){
                this.status = 'hide';
                dom.removeClass('show');
                dom.find('.panel_cover').hide();
                $('#' +  seajs.moduleUI).removeClass('show');
            }else{
                this.status = 'show';
                dom.addClass('show');
                dom.find('.panel_cover').show();
                $('#' +  seajs.moduleUI).addClass('show');
            }
        }

    }
    module.exports = controller;
})
