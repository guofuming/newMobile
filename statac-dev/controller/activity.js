define(function(require, exports, module) {

    var controller,
        ajaxPage = {
            page_num : 0,
            offset : 20,
            activity_time : '3d'
        },
        mId = 'activity',
        panel = require('{component}panel/panel'),
        tplPanel = require('view/panel.tpl'),
        tpl = require('view/activity.tpl'),

    controller = {

        template: _.template(tpl),
        templatePanel: _.template(tplPanel),

        render: function(obj) {
            if(!share.checkPermissions()){ return; };
            panel.render(this.templatePanel);

            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(this.template());
                this.bindEvt();
            }
            this.ajaxList();
        },

        bindEvt: function() {
            var tthis = this,
                dom = $('#' + mId);

            dom.find('.left').on('tap', function(){
                panel.toggle();
            });

            dom.find('.goUpgrade').on('tap', function(){
                window.location.href = '#upgrade/whole';
            });

            dom.find('.logout').on('tap', function(){
                window.location.href = '#index/whole';
            });

        },

        ajaxList:function(){
            // page_num=0&offset=20&activity_time=2d
            console.log(seajs.data.vars.apiAccessUrl)
            var ajaxObj = {
                url: seajs.data.vars.apiAccessUrl + "activity",
                type: 'POST',
                data: ajaxPage,
                success: function(data) {
                    console.log(data);
                }
            }
            $.ajax(share.ajaxControl(ajaxObj));

        }

    }
    module.exports = controller;
})
