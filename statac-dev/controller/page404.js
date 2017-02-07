define(function(require, exports, module) {

    var controller,
        mId = 'page404',
        panel = require('{component}panel/panel'),
        tplPanel = require('view/panel.tpl'),
        tpl = require('view/page404.tpl'),

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
        },

        bindEvt: function() {
            var tthis = this,
                dom = $('#' + mId);

            dom.find('.left').on('tap', function(){
                panel.toggle();
            });

            dom.find('p').on('tap', function(){
                if(seajs.data.vars.lastModule){
                    window.location.href = '#'+ seajs.data.vars.lastModule +'/whole';
                }
            });

           

        },

    }
    module.exports = controller;
})
