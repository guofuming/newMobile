define(function(require, exports, module) {

    var controller,
        userInfo,
        mId = 'feedback',
        // slideImg = require('{component}slideImg/slideImg'),
        // tplSlideImg = require('{component}slideImg/slideImg.tpl'),
        tpl = require('view/feedback.tpl'),
        tplPanel = require('view/panel.tpl'),
        panel = require('{component}panel/panel');

    controller = {

        template: _.template(tpl),
        templatePanel: _.template(tplPanel),
        
        render: function(obj) {
            if(!share.checkPermissions(true)){ return; };
            panel.render(this.templatePanel);

            userInfo = share.userInfo();
            hrefArr = share.getHrefParameter(obj.val);

            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(this.template());
                this.bindEvt();
            }
        },

        bindEvt: function() {
            var tthis= this,
                dom = $('#' + mId);

            dom.find('.left').on('tap', function(){
                panel.toggle();
            });
        	
            dom.find('.u-btn').on('tap' ,function(e){
                var selectDom = dom.find('select'),
                    textareaDom = dom.find('textarea'),
                    fileDom = dom.find('input[type=file]'),
                    dataObj = new FormData();
                if(selectDom.val() && textareaDom.val() && fileDom.val()){
                    dataObj.append('subject', selectDom.val());
                    dataObj.append('text', textareaDom.val());
                    
                    if(fileDom.val()){
                        dataObj.append('file0', fileDom[0].files[0]);
                    }
                    
                    tthis.ajaxFeedback(dataObj);
                }else{
                    console.log('false')
                }
        	});

            dom.find('input[type=file]').on('change' ,function(e){
                var files = $(this)[0].files[0];
                if($(this).val()){
                    var newFiles = new FileReader();
                    newFiles.onload = function(){
                        console.log(newFiles)
                        dom.find('.upload_files_show').html('<img src="'+this.result+'" alt="" />')
                    }
                    newFiles.readAsDataURL(files);
                }
            });
        },

        ajaxFeedback:function(dataObj){
            // feedback
            var dom = $('#' + mId);
            var ajaxObj = {
                url: seajs.data.vars.apiAccessUrl + "feedback",
                type: 'POST',
                data: dataObj,
                contentType: false,    //不可缺
                processData: false,
                success: function(data) {
                    console.log(data);
                }
            };
            $.ajax(share.ajaxControl(ajaxObj));
        }
    }
    module.exports = controller;
})
