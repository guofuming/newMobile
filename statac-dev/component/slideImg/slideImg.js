define(function(require, exports, module) {

    var mId = 'slideImg', dom, opts, touch,
        isMove = false,
        defaults = {
            index: 0,
            size: null,
            maxTouch: 0.6,
            jumpTouch: 0.2
        };

    var controller = {
        init: function(opt) {
            opts = $.extend({}, defaults, opt || {});
            dom = $('#'+ mId);
            this.dom = dom;
            
            touch = { l1: 0, l2: 0 };
            opts.width = window.innerWidth;
            opts.height = window.innerHeight;
            opts.size = dom.find('li').size();

            this.initCss();
            this.bindEvt();
        },
        bindEvt: function() {
            var tthis = this;

            $(window).on('resize.Cslide', function(event) {
                opts.width = window.innerWidth;
                opts.height = window.innerHeight;
                tthis.initCss();
            });

            dom.on('touchstart', function(e) {
                clearInterval(tthis.intervalA);
                touch.x1 = e.touches[0].pageX;
            }).on('touchmove', function(e) {
                e.preventDefault();
                e.stopPropagation();
                isMove = true;
                // l1 历史移动位置, l2 现在移动位置
                touch.l2 = e.touches[0].pageX - touch.x1;
                touch.l2 >= opts.width * opts.maxTouch && (touch.l2 = opts.width * opts.maxTouch);
                touch.l2 <= -opts.width * opts.maxTouch && (touch.l2 = -opts.width * opts.maxTouch);

                tthis.cssSlate(touch.l1 + touch.l2);
            }).on('touchend', function(e) {
                tthis.touchEnd();
                !isMove && tthis.close();
                isMove = false;
            })
        },

        close: function() {
            $(window).off('resize.Cslide');
            dom.remove();
        },

        touchEnd: function() {
            var propottion = -(touch.l2 / opts.width);
            if (isMove) {
                propottion <= -opts.jumpTouch && (--opts.index);
                propottion >= opts.jumpTouch && (++opts.index);

                opts.index <= 0 && (opts.index = 0);
                opts.index >= dom.find('li').size() - 1 && (opts.index = dom.find('li').size() - 1);

                this.cssSlate(-opts.index * opts.width, 0, 300);
                this.setIndex();
            }
        },

        setIndex: function() {
            touch.l1 = opts.index * -opts.width;
            dom.attr('index', opts.index);
            dom.find('.number').text(opts.index + 1 + '/' + opts.size);
        },

        cssSlate: function(x, y, time) {
            var x = x || 0,
                y = y || 0,
                time = (time || 0) + 'ms',
                style = '-webkit-transition: ' + time + ' ease; -moz-transition: ' + time + ' ease; -webkit-transform:translate(' + x + 'px,' + y + 'px); -moz-transform:translate(' + x + 'px,' + y + 'px); ';
            dom.find('ul').attr('style', style);
        },

        initCss: function() {
            dom.attr({ 'index': opts.index });
            dom.find('.number').text(opts.index + 1 + '/' + opts.size);
            this.cssSlate(-opts.index * opts.width);
            touch.l1 = -opts.index * opts.width;
        },
    }

    module.exports = controller;
});

