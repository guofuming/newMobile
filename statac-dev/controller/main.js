define(function(require, exports, module) {

    require('../resources/css/layout.css');


    require('../component/zepto/zepto.js');
    var tpl = require('../view/index.tpl');

    
    $('body').append(tpl);
})