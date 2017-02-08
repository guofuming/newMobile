;
(function($) {

    $.fn.lazyload = function(opt) {
        var dom,
            opts,
            lazyload,
            defaults = {
                priorityLoad: [0], //   先加载图片
                center: false //  是否设置margin居中图片
            };

        opts = $.extend({}, defaults, opt || {});
        dom = $(this);

        lazyload = {
            init: function() {
                this.center = opts.center;
                var tthis = this,
                    domImg = dom.find('img');

                if (opts.priorityLoad) {
                    if (typeof(opts.priorityLoad) != 'object') {
                        opts.priorityLoad = [opts.priorityLoad]
                    }
                    $.each(opts.priorityLoad, function(i) {
                        // console.log(opts.priorityLoad[i])
                        tthis.loadimg(domImg.eq(opts.priorityLoad[i]));
                    })
                }

                $.each(domImg, function(i) {
                    tthis.loadimg(domImg.eq(i));
                });
            },
            loadimg: function(domImg) {
                var tthis = this,
                    url = domImg.attr('url'),
                    newImg = new Image();
                    
                newImg.onload = function() {
                    domImg.attr('src', url);
                    if (tthis.center) {
                        tthis.imgCenter(domImg, this.width, this.height);
                    }
                }

                newImg.onerror = function() {
                    domImg.attr('src', 'img/imgerr.jpg');
                    var imgW = this.width,
                        imgH = this.height;
                    if (tthis.center) {
                        tthis.imgCenter(domImg, imgW, imgH);
                    }
                }

                newImg.src = url;
            },
            imgCenter: function(domImg, imgW, imgH) {
                var domPar = domImg.parent(),
                    maxW = domPar.width(),
                    maxH = domPar.height(),
                    mL = mT = 0,
                    cssW = cssH = 'auto',
                    boxMin = maxW,
                    imgMin,
                    rate = 1;

                if (imgW < imgH) imgMin = imgW;
                else imgMin = imgH;

                rate = 1 - (imgMin - boxMin) / imgMin;

                cssW = imgW * rate;
                cssH = imgH * rate;

                if (cssW < cssH) mT = -(cssH - cssW) / 2;
                else mL = -(cssW - cssH) / 2;

                domImg.css({
                    width: cssW + 'px',
                    height: cssH + 'px',
                    marginLeft: mL + 'px',
                    marginTop: mT + 'px',
                })
            }
        }
        lazyload.init();
    };
})($)
