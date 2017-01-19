define(function(require, exports, module) {

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
            $('.g-doc').hide();
            require.async(url, function(module) {
                if (module) {
                    seajs.moduleUI = obj.name;
                    module.render(obj);
                    share.loadPage($('body'),false);
                } else {
                    // alert('Loading failed. Please refresh and try again!');
                    console.log('Loading failed. Please refresh and try again!');
                }
            });
        }

    });

    module.exports = routers;
});
