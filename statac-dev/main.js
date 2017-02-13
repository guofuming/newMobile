define(function(require, exports, module) {
    require('resources/css/layout.css');
    require('{component}lazyload/lazyload');
    require('{component}slideImg/slideImg');

    var router = require('router.js');
    window.routerObj = new router;
    Backbone.history.start();
    

    if(!window.location.hash){
    	window.location.href = '#index/whole';
    }

    var isPerform = true;
    $(window).resize(function(){
    	if(isPerform){
	    	isPerform = false;
    		setTimeout(function(){
	    		isPerform = true;
	    		share.setBodyHeight();
    		},300);
    	}
    })
})