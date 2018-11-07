/**
 * Created by sktap on 16/6/29.
 */
$(function () {
    var _this = this;
    //阅读全文
    _this.dialog_box_bg = $(".dialog-box-bg");
    _this.stage = $("#wrapper");
    //var btnScale = dialog_box_bg.find(".btnScale");

    //阅读全文 文本滚动
    //var myScroll = new IScroll("#phase11-dialog-quanwen-scroller");

    this.scroller = new sktap.scroller(_this.stage,
        {
            direction: "v",//方向 v纵向 h横向
            bounce: 0,//回弹的距离 0没有回弹效果 必须大于0
            onScroll: function (x, y) { //滚动改变回调函数
            }
        });

    $(".phase11-btn-blue").on("click", function () {
        _this.dialog_box_bg.show();

    });
    $(".phase11-btn-red").on("click", function () {
        window.location = "http://cataccugrade.mobileone.com.cn/?utm_source=wap%5Fm&utm_medium=owned&utm_content=accugrade%5F01&utm_campaign=1603%5Fwap";
    });
    $(".phase11-btn-gray").on("click", function () {
        window.location = "http://m.catwj.cn/connect.html";
    });
    _this.dialog_box_bg.find(".btn-close").on("click", function () {
        _this.dialog_box_bg.hide();
    });

    _this.configureScale1 = $("#dialog-configure-scale1");
    _this.configureScale1Body = _this.configureScale1.find(".dialog-body");
    _this.stage.on("click", function () {
        _this.configureScale1.show();
    });

    var obj = document.querySelector("#dialog-configure-scale-body");
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
        TweenMax.set(_this.configureScale1Body, {scale: currentScale, transformOrigin: 50 % 50 % 0});
    });


    mc.on("panstart", function onPan(ev) {
        lastValueX = currentValueX;
        lastValueY = currentValueY;
        ev.preventDefault && ev.preventDefault();
        TweenMax.set(_this.configureScale1Body, {x: currentValueX, y: currentValueY});
    });
    mc.on("panmove", function onPan(ev) {
        ev.preventDefault && ev.preventDefault();
        currentValueX = lastValueX + ev.deltaX;
        currentValueY = lastValueY + ev.deltaY;
        TweenMax.set(_this.configureScale1Body, {x: currentValueX, y: currentValueY});
    });
    _this.configureScale1.on("click", function (ev) {
        _this.configureScale1.hide();
    });
    //var mc = new Hammer(_this.configureScale1.get(0));
    //mc.on("tap", function (ev) {
    //    _this.configureScale1.hide();
    //});


    var player1 = document.getElementById('player1');
    $('.phase11-btn-video1').on('click', function () {

        $('.playerBox1').show();
        $('body1').css({'overflow': 'hidden'})
        player1.play();

        if ($(this).hasClass('part1')) {
            dataLayer && dataLayer.push({
                'event': 'event',
                'category': '卡特智能页',
                'action': '点击',
                'label': '卡特智能页_点击按钮_坡度视频'
            });
        } else {
            dataLayer && dataLayer.push({
                'event': 'event',
                'category': '卡特智能页',
                'action': '点击',
                'label': '卡特智能页_点击按钮_智讯视频'
            });
        }

    });
    var player2 = document.getElementById('player2');
    $('.phase11-btn-video2').on('click', function () {

        $('.playerBox2').show();
        $('body').css({'overflow': 'hidden'})
        player2.play();

        if ($(this).hasClass('part1')) {
            dataLayer && dataLayer.push({
                'event': 'event',
                'category': '卡特智能页',
                'action': '点击',
                'label': '卡特智能页_点击按钮_坡度视频'
            });
        } else {
            dataLayer && dataLayer.push({
                'event': 'event',
                'category': '卡特智能页',
                'action': '点击',
                'label': '卡特智能页_点击按钮_智讯视频'
            });
        }

    });
    var player3 = document.getElementById('player3');
    $('.phase11-btn-video3').on('click', function () {

        $('.playerBox3').show();
        $('body').css({'overflow': 'hidden'})
        player3.play();

        if ($(this).hasClass('part1')) {
            dataLayer && dataLayer.push({
                'event': 'event',
                'category': '卡特智能页',
                'action': '点击',
                'label': '卡特智能页_点击按钮_坡度视频'
            });
        } else {
            dataLayer && dataLayer.push({
                'event': 'event',
                'category': '卡特智能页',
                'action': '点击',
                'label': '卡特智能页_点击按钮_智讯视频'
            });
        }

    });
    var player4 = document.getElementById('player4');
    $('.phase11-btn-video4').on('click', function () {

        $('.playerBox4').show();
        $('body').css({'overflow': 'hidden'})
        player4.play();

        if ($(this).hasClass('part1')) {
            dataLayer && dataLayer.push({
                'event': 'event',
                'category': '卡特智能页',
                'action': '点击',
                'label': '卡特智能页_点击按钮_坡度视频'
            });
        } else {
            dataLayer && dataLayer.push({
                'event': 'event',
                'category': '卡特智能页',
                'action': '点击',
                'label': '卡特智能页_点击按钮_智讯视频'
            });
        }

    });

    $('.playerBox1').on('click', function (e) {
        var target = e.target,
            $target = $(target);

        if ($target.closest('video').length) {
            if (player1.paused) {
                player1.play();
            } else {
                player1.pause();
            }
        } else {
            player1.pause();
            $('.playerBox1').hide();
            $('body').css({'overflow': ''})
        }
    });
    $('.playerBox2').on('click', function (e) {
        var target = e.target,
            $target = $(target);

        if ($target.closest('video').length) {
            if (player2.paused) {
                player2.play();
            } else {
                player2.pause();
            }
        } else {
            player2.pause();
            $('.playerBox2').hide();
            $('body').css({'overflow': ''})
        }
    });
    $('.playerBox3').on('click', function (e) {
        var target = e.target,
            $target = $(target);

        if ($target.closest('video').length) {
            if (player3.paused) {
                player3.play();
            } else {
                player3.pause();
            }
        } else {
            player3.pause();
            $('.playerBox3').hide();
            $('body').css({'overflow': ''})
        }
    });
    $('.playerBox4').on('click', function (e) {
        var target = e.target,
            $target = $(target);

        if ($target.closest('video').length) {
            if (player4.paused) {
                player4.play();
            } else {
                player4.pause();
            }
        } else {
            player4.pause();
            $('.playerBox4').hide();
            $('body').css({'overflow': ''})
        }
    });


});