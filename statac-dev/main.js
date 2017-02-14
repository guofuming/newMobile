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
        console.log('resize mian.js')
    	if(isPerform){
	    	isPerform = false;
    		setTimeout(function(){
	    		isPerform = true;
	    		share.setBodyHeight();
    		},300);
    	}
    })

    // $(window).scroll(function(){
    //     console.log('scroll mian.js')
    //     $(window).scrollTop(0);
       
    // })
})