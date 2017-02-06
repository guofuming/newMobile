define(function(require, exports, module) {
    require('resources/css/layout.css');

    var router = require('router.js');
    window.routerObj = new router;
    Backbone.history.start();
    
    seajs.data.vars.apiAccessUrl = seajs.data.vars.apiUrl + 's' + share.getStorage('session_id') + '/';

})