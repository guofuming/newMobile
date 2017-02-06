define(function(require, exports, module) {

    var panel = require('{component}panel/panel');

    var routers = Backbone.Router.extend({

        initialize: function(options) {
            var tthis = this;
            this.route(/.*/, "all", function() { tthis.routeUrl('index', 'whole'); });
            this.route(":name/:type", "modules", function(name, type) { tthis.routeUrl(name, type); });
            this.route(":name/:type/custom:val", "modulesC", function(name, type, val) { tthis.routeUrl(name, type, val); });
            this.route(":name/:type/tab:num", "modulesT", function(name, type, num) { tthis.routeUrl(name, type, num); });
        },
        routeUrl: function(name, type, val, params) {
            var obj = {
                name: name,
                type: type,
                val: val,
                params: params || {}
            };
            this.loadPage(obj);
        },

        loadPage: function(obj) {
            var url = siteUrl + 'statac-dev/controller/'+obj.name;
            share.loadPage($('body'));
            require.async(url, function(module) {
                if (module) {
                    $('.g-doc').hide();
                    seajs.lastModule = seajs.curModule;
                    seajs.curModule = obj.name;
                    module.render(obj);
                    share.loadPage($('body'),false);
                    panel.hide();
                    if(seajs.lastModule){
                        share.blur(seajs.lastModule);
                    }
                } else {
                    console.log('Loading failed. Please refresh and try again!');
                    window.location.href = '#page404/whole'; 
                }
            });
        }

    });

    module.exports = routers;
});
