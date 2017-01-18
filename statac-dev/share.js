define(function(require, exports, module) {

    var share = {};


    share.isDom = function(dom){
        var bool = dom.length > 0 ? true : false;
        return bool;
    };
    
    share.loadPage = function(dom,bool){
        var html = "<div id='loading'>" + 
                        "<div class='u-load'></div>" +
                        "<div class='u-loadBg'></div>" +
                    "</div>";
        $('#loading').remove();
        if(bool || bool === undefined){
            dom.append(html);
        }
    }

    module.exports = share;
});
