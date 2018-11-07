/**
 * Created by sktap on 16/6/29.
 */
$(function () {
    var _this = this;
    //阅读全文
    _this.configureScale = $("#dialog-configure-scale2");
    _this.configureScaleBody = _this.configureScale.find(".dialog-body");

    $(".phase13-6").on("click", function () {
        _this.configureScale.show();
        $('body').css('overflow','hidden');
        dataLayer && dataLayer.push({ 'event': 'event','category': '专家讲产品十三期详情页','action': '点击按钮','label': '专家讲产品十三期详情页_点击按钮_图片'});

    });
    var obj = document.querySelector("#dialog-configure-scale-body2");
    var mc = new Hammer.Manager(obj, {});
    mc.add(new Hammer.Pinch({threshold: 0}));
    mc.add(new Hammer.Pan({threshold: 0, pointers: 0}));


    var lastScale = 1;
    var currentScale = 1;
    var currentValueX = 1;
    var currentValueY = 1;
    var lastValueX = 1;
    var lastValueY = 1;

    mc.on("pinchstart", function (ev) {
        lastScale = currentScale;
        ev.preventDefault && ev.preventDefault();
    });

    mc.on("pinchmove", function (ev) {
        ev.preventDefault && ev.preventDefault();
        currentScale = lastScale * ev.scale;
        TweenMax.set(_this.configureScaleBody, {scale: currentScale, transformOrigin: 50 % 50 % 0});
    });


    mc.on("panstart", function onPan(ev) {
        lastValueX = currentValueX;
        lastValueY = currentValueY;
        ev.preventDefault && ev.preventDefault();
        TweenMax.set(_this.configureScaleBody, {x: currentValueX, y: currentValueY});
    });
    mc.on("panmove", function onPan(ev) {
        ev.preventDefault && ev.preventDefault();
        currentValueX = lastValueX + ev.deltaX;
        currentValueY = lastValueY + ev.deltaY;
        TweenMax.set(_this.configureScaleBody, {x: currentValueX, y: currentValueY});
    });
    _this.configureScale.on("click", function (ev) {
        _this.configureScale.hide();
        $('body').css('overflow','visible');
    });
    //var mc = new Hammer(_this.configureScale.get(0));
    //mc.on("tap", function (ev) {
    //    _this.configureScale.hide();
    //});




});