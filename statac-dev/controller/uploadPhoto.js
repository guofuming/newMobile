define(function(require, exports, module) {

    require('{component}popup/popup.css');

    var controller,
        albumType,
        userInfo,
        mId = 'uploadPhoto',
        popup = require('{component}popup/popup'),
        tplPanel = require('view/panel.tpl'),
        tpl = require('view/uploadPhoto.tpl');

    controller = {

        template: _.template(tpl),
        templatePanel: _.template(tplPanel),
        
        render: function(obj) {
            if(!share.checkPermissions(true)){ return; };
            
            if(obj.val == 'private'){
                albumType = 'private';
            }else{
                albumType = 'public';
            }
            
            userInfo = share.userInfo();

            if (share.isDom($('#' + mId))) {
                $('#' + mId).css('display', 'block');
            } else {
                $('body').append(this.template(userInfo));
                this.bindEvt();
            }
            popup.show({type:'1',text:'123asdafafdfsdfdf',wrapper:$('#' + mId).find('.g-bd')});
        },

        bindEvt: function() {
            var tthis= this,
                dom = $('#' + mId);
        	
            dom.find('.left').on('tap', function(){
                window.history.go(-1);
            });

            dom.find('.upgrade').on('tap' ,function(){
                window.location.href = '#upgrade/whole';
            });

            dom.find('.tab_content_photo .more').on('tap',function(){
                var type = $(this).parents('.album_box').attr('type');
                if(type == 'public_album'){
                    window.location.href = '#photoAlbum/whole';
                }else{
                    window.location.href = '#photoAlbum/whole/customprivate';
                }
            });

            dom.find('input[type=file]').on('change' ,function(){
                var val = $(this).val(),
                    files = $(this)[0].files[0];
                if(files && val){
                    var newFiles = new FileReader();
                    newFiles.onload = function(evt){
                        dom.find('.file_img_box img').attr({'src':this.result});
                        dom.find('.file_img_box').show();
                    }
                    newFiles.readAsDataURL(files);
                }
            });

            dom.find('.file_img_box i').on('tap' ,function(){
               tthis.clearFile();
            });

            dom.find('.u-btn').on('tap',function(){
                if(!dom.find('input[type=file]').val()){
                    return;
                };
                share.btnLoading($(this));
                tthis.ajaxUpload();
            })
        },
        
        clearFile:function(){
            $('#' + mId).find('input').val('');
            $('#' + mId).find('.file_img_box').hide();
        },

        ajaxUpload:function(){
            var tthis = this;
            var formObj = new FormData(),
                dom = $('#' + mId);
            
            if(dom.find('input[type=file]').val()){
                formObj.append('file', dom.find('input[type=file]')[0].files[0])
            }

            var _albumType = albumType == 'private' ? 11 : -1;

            formObj.append('album_type', _albumType);

            var ajaxObj = {
                url: seajs.data.vars.apiUrl + "common_upload_img",
                type: 'POST',
                data: formObj,
                contentType: false,    //不可缺
                processData: false,
                success: function(data) {
                    if(data.status_code == 0){
                        var _userInfo = share.userInfo();
                        if(albumType == 'private'){
                            _userInfo.private_pictures.push(data)
                        }else{
                            _userInfo.pictures.push(data)
                        }
                        share.cacheLoadUser(_userInfo);
                    }else{

                    }
                    share.btnLoading(dom.find('.u-btn'),false);
                    tthis.clearFile();
                }
            }
            $.ajax(share.ajaxControl(ajaxObj));
        },
    }
    module.exports = controller;
})
