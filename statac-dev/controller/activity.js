define(function(require, exports, module) {

    var controller, ajaxPage, scrollAjax,
        mId = 'activity',
        panel = require('{component}panel/panel'),
        tplPanel = require('view/panel.tpl'),
        tpl = require('view/activity.tpl'),
        tplLi = require('view/activityLi.tpl'),

    controller = {

        template: _.template(tpl),
        templateLi: _.template(tplLi),
        templatePanel: _.template(tplPanel),

        render: function(obj) {
            if(!share.checkPermissions(true)){ return; };
            panel.render(this.templatePanel);

            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                this.initVar();
                $('body').append(this.template());
                this.bindEvt();
            }
            this.ajaxList();
        },

        initVar:function(){
            ajaxPage = {
                page_num : 0,
                offset : 10,
                activity_time : '3d'
            };
            scrollAjax = true;
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

            dom.find('.g-bd').on('scroll',function(){
                var bdH = $(this).find('div:eq(0)').height();
                if($(this).scrollTop() >= (bdH -  $(this).height())){
                    tthis.ajaxList();
                }
            });
        },

        ajaxList:function(){
            var tthis = this;
            if(!scrollAjax){ return; }

            scrollAjax = false;
            share.loadList($('#' + mId).find('.date_list'));
            var ajaxObj = {
                url: seajs.data.vars.apiAccessUrl + "activity",
                type: 'POST',
                data: ajaxPage,
                success: function(data) {
                    share.loadList($('#' + mId).find('.date_list'),false);
                    if(data.errcode == undefined){
                        scrollAjax = true;
                        ajaxPage.page_num++;
                        $('#'+ mId).find('.dataList').append(tthis.templateLi({arr:data.res}));
                        share.loadList($('#' + mId).find('.g-bd'),false);
                    }else{
                        console.log(data.errmsg);
                    }
                }
            };
            $.ajax(share.ajaxControl(ajaxObj));
        }
    }
    module.exports = controller;
})
