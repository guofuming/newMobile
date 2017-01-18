define(function(require, exports, module) {

    var controller;
    var tpl = require('view/index.tpl');
    controller = {
        render: function() {
            $('body').append(tpl);

        }
    }
    module.exports = controller;
})
