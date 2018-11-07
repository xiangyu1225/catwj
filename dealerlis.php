<?php
$data = false;
try {
    $data = json_decode(file_get_contents("http://h5.sktap.cn/app/cat/site/api/getagentlist.php"));
} catch (Exception $e) {
    $data = false;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="content-language" content="en"/>
    <meta name="keywords" content="">
    <meta name="description" content=""/>
    <meta name="baidu-site-verification" content="r8wCLAAtGn"/>
    <!--<meta http-equiv="X-Frame-Options" content="DENY">-->
    <meta content="telephone=no" name="format-detection">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>【卡特挖掘机经销商信息】大全_查询-CAT（卡特）官网</title>
    <meta name="Keywords" content="经销商查询，代理商查询，卡特官网"/>
    <meta name="Description" content="登录卡特官网您可以轻松查询获取您所在城市的代理商相关信息。"/>
    <link rel="stylesheet" href="css/style.css?11">
    <script>
        //适配问题 解决双击缩放问题
        (function (i, s, o, g, r, a, m) {
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.name = "viewport";
            a.content = 'width=device-width, initial-scale=' + g + ', minimum-scale=' + g + ', maximum-scale=' + g + ', user-scalable=no';
            m.parentNode.insertBefore(a, m);
        })(window, document, 'meta', window.screen.width / 640);
    </script>
    <script language=javascript>
        <!--
        window.onerror = function () {
            return true;
        };
        // -->
    </script>
    <script>
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-64991844-1', 'auto');
        ga('send', 'pageview');

    </script>
    <script src="js/core.js"></script>
    <!-- <script src="http://cdn.jazzad.cn/catwaji/catwaji_m.js"></script> -->

</head>
<body class="dealerPage" style="display:block;">
<header>
    <img src="img/back.png" alt="" class="back" data-noback="1">
    <img src="img/logo.png" alt="" class="logo">


    <div class="top-right">
        <img src="img/search.png" alt="" class="search">
        <img src="img/top-menu.png" alt="" class="top-menu">
        <img src="img/top-menu-1.png" alt="" class="top-menu-1">
    </div>
</header>
<div class="main">

    <!-- <div class="banner" style="position: relative;width: 640px;height: 128px;"> -->
        <!-- <img src="img/product/product-home-banner_2017_9_7.png" id="banner1"/> -->
        <!-- <img  id="banner1" class="jls2017919" src="http://m.catwj.cn/img/product/product-home-banner_2017_9_19.jpg" alt=""> -->
        <!-- <img  id="banner1" class="jls2017927" src="http://m.catwj.cn/img/product/product-home-banner_2017_9_27.jpg" alt=""> -->
<!--         <a href="http://m.catwj.cn/advantage.html?utm_source=catwj%5Fm%5Fhp&utm_medium=owned&utm_content=180306%5F01%5F372&utm_campaign=1803%5Fwap 
        ">
            <img  id="banner1" class="jls2017927" src="http://m.catwj.cn/img/product/product-home-banner_2018_03_07.jpg" alt=""> 
        </a>   
    </div> -->


    <div class="picBox">
        <div id='mySwipeO' class='swipe'>
            <div class='swipe-wrap'>
                <div class="swipe-item">
                    <a href="http://m.catwj.cn/advantage.html?utm_source=catwj%5Fm%5Fhp&utm_medium=owned&utm_content=180306%5F01%5F372&utm_campaign=1803%5Fwap">
                    <img  id="banner1" class="jls2017927" src="http://m.catwj.cn/img/product/product-home-banner_2018_03_07.jpg" alt=""> 
                </a>
                </div>
                <div class="swipe-item">
                    <a href="http://m.catwj.cn/ngh/?utm_source=catwj%5Fm%5Flunbo&utm_medium=owned&utm_content=180504%5F03%5Fnghcam&utm_campaign=1803%5Fwap">
                    <img  id="banner2" class="jls2017927" src="http://m.catwj.cn/img/product/product-home-banner_2018_05_04.png" alt=""> 
                </a>
                </div>
            </div>
        </div>
        <div class="point"></div>
    </div>



    <div class="searchBox">
        <input type="text" placeholder="请输入城市名称" id="filterName">
        <img src="img/search1.png" alt="" class="btn-search2">
    </div>
    <div id="part1" class="agentList list">
        <?php if ($data && count($data->list) > 0) {
            for ($i = 0;
                 $i < count($data->list);
                 $i++) {
                $item = $data->list[$i];
                ?>

                <a href="dealer_<?php echo $item->tbid; ?>.html" class="item">
                    <img src="http://m.catwj.cn/resource/img/agentlist/<?php echo $item->cattype ?>.png" alt=""
                         class="logo">

                    <p class="text">
                        <strong><?php echo $item->title ?></strong>
                    </p>
                    <img src="img/btn-detail.png" alt="" class="detail">
                </a>
            <?php }
        } ?>
    </div>
</div>
<footer>
    <div class="footer-menu">
        <img src="img/bottom2.png" alt="">
        <a href="/" id="page-home"></a>
        <a href="small-excavator.html" id="page-product"></a>
        <a href="javascript:;" class="link-catbang" id="page-catbang"></a>
        <a href="news/" id="page-news"></a>
    </div>
    <img src="img/footer.png" alt="">
</footer>


<div class="pop pop-search hide">
    <div class="content">
        <div class="title">
            筛选最适合你的挖机<i class="arrow"></i>
        </div>
        <div class="selectBox">
            <div class="select">
                <select name="" id="type">
                    <option value="">aaa</option>
                    <option value="">bbb</option>
                </select>
            </div>
            <div class="select">
                <select name="" id="type">
                    <option value="">aaa</option>
                    <option value="">bbb</option>
                </select>
            </div>
            <div class="select">
                <select name="" id="type">
                    <option value="">aaa</option>
                    <option value="">bbb</option>
                </select>
            </div>
        </div>
        <div class="inputBox">
            <p>填写您的个人信息，我们会专人服务（选填)：</p>
            <label for="">
                姓名：
                <input type="text" id="name">
            </label>
            <label for="">
                电话：
                <input type="text" id="mobile">
            </label>
        </div>
        <div class="bottom">
            <input type="button" value="提交">
        </div>
    </div>
</div>
<script>
    var REWRITE_QUERY_STORAGE = <?php echo json_encode($_GET) ?>;
</script>

<script src="js/jquery.js"></script>
<script src="js/swipe.js?3"></script>
<script src="js/data.js?3"></script>
<script src="js/index.js?2016031002"></script>
<script>!!core && core.init('getAgentList')</script>
<script>!!core && core.init('dealerPage')</script>
<noscript>
    <iframe src="//www.googletagmanager.com/ns.html?id=GTM-NLPC7S"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<script>(function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(), event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
            '//www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-NLPC7S');



    $('.point').html('<i class="on"></i><i></i>');
    console.log('mySwipeO');
    var swipe = $('#mySwipeO');
    var swipeItems = swipe.find(".swipe-item");
    swipeItems.click(function() {
        var index = $(swipeItems).index(this);
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商',
            'action': '点击按钮',
            'label': '代理商_点击按钮_Banner' + (index + 1)
        });
    });
    var topPic = $('.picBox'),
        count = $('.swipe-wrap').find('img').length,
        index = 0;
    // pure JS
    var elem = document.getElementById('mySwipeO');
    window.mySwipe = Swipe(elem, {
        startSlide: 0,
        auto: 4000,
        continuous: false,
        callback: function(curIndex, element) {
            index = curIndex;

            topPic.find('.point i').eq(index).addClass('on').siblings().removeClass('on');

            console.log(index);
            if (index == 0) {
                dataLayer && dataLayer.push({
                    'event': 'event',
                    'category': '代理商',
                    'action': '滑动',
                    'label': '代理商_滑动_Banner1'
                });
            } else if (index == 1) {
                dataLayer && dataLayer.push({
                    'event': 'event',
                    'category': '代理商',
                    'action': '滑动',
                    'label': '代理商_滑动_Banner2'
                });
            } else if (index == 2) {
                dataLayer && dataLayer.push({
                    'event': 'event',
                    'category': '代理商',
                    'action': '滑动',
                    'label': '代理商_滑动_Banner3'
                });
            } else if (index == 3) {
                dataLayer && dataLayer.push({
                    'event': 'event',
                    'category': '代理商',
                    'action': '滑动',
                    'label': '代理商_滑动_Banner4'
                });
            } else if (index == 4) {
                dataLayer && dataLayer.push({
                    'event': 'event',
                    'category': '代理商',
                    'action': '滑动',
                    'label': '代理商_滑动_Banner5'
                });
            }

        }
    });

    $("#banner1").on("click", function() {
        // window.location = "http://m.catwj.cn/catbang/ktb1.html?t=14&utm_source=catwaji_m&utm_medium=owned&utm_content=170607_3_link_bigidea&utm_campaign=1706_URL_03";
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商列表页',
            'action': '点击按钮',
            'label': '代理商列表页_点击按钮_Banner1'
        });

        //    var link = "http://hero2016.mobileone.com.cn/mobile/?utm_source=catwaji%5Fm%5Fbanner&utm_medium=owned&utm_content=161019%5F58%5Fcathero&utm_campaign=1610%5Fwap";
        //    增加活动 2016年03月29日 该活动链接后自动补充手机参数
        //    if (core.userInfo.mobile && core.userInfo.mobile != "") {
        //        link += '&mobile=' + core.userInfo.mobile;
        //    }
        //    window.location = link;
    });
    $("#banner2").on("click", function() {
        // window.location = "http://m.catwj.cn/catbang/ktb1.html?t=14&utm_source=catwaji_m&utm_medium=owned&utm_content=170607_3_link_bigidea&utm_campaign=1706_URL_03";
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商列表页',
            'action': '点击按钮',
            'label': '代理商列表页_点击按钮_Banner2'
        });

        //    var link = "http://hero2016.mobileone.com.cn/mobile/?utm_source=catwaji%5Fm%5Fbanner&utm_medium=owned&utm_content=161019%5F58%5Fcathero&utm_campaign=1610%5Fwap";
        //    增加活动 2016年03月29日 该活动链接后自动补充手机参数
        //    if (core.userInfo.mobile && core.userInfo.mobile != "") {
        //        link += '&mobile=' + core.userInfo.mobile;
        //    }
        //    window.location = link;
    });







    for (var j = 11; j < 100; j++) {
        var text_title = $(".text").eq(j);
        if (j > 10 && j < 20 || j > 29 && j < 57 || j > 76 && j < 97) {
            text_title.css("padding-top", "34px");
        }
    }

    //    $(function () {
    //        $("#filterName").keyup(function () {
    //            $(".agentList .item")
    //                .hide()
    //                .filter(":contains('" + ( $(this).val() ) + "')")
    //                .show();
    //        })
    //    })
    $(function () {
        $(".btn-search2").click(function () {
            dataLayer && dataLayer.push({
                'event': 'event',
                'category': '代理商列表页',
                'action': '点击按钮',
                'label': '代理商列表页_点击按钮_代理商搜索'
            });
            $(".agentList .item")
                .hide()
                .filter(":contains('" + ( $("#filterName").val() ) + "')")
                .show();
        });
    });
    $("#filterName").keyup(function () {
        if ($(this).val() == "") {
            $(".agentList .item").show();
        }
    });


    $("#page-home").on("click", function () {
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商列表页',
            'action': '点击按钮',
            'label': '代理商列表页_点击按钮_首页'
        });
    });
    $("#page-product").on("click", function () {
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商列表页',
            'action': '点击按钮',
            'label': '代理商列表页_点击按钮_产品'
        });
    });
    $("#page-catbang").on("click", function () {
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商列表页',
            'action': '点击按钮',
            'label': '代理商列表页_点击按钮_卡特帮'
        });
    });
    $("#page-news").on("click", function () {
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商列表页',
            'action': '点击按钮',
            'label': '代理商列表页_点击按钮_产品快讯'
        });
    });
    $(".search").on("click", function () {
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商列表页',
            'action': '点击按钮',
            'label': '代理商列表页_点击按钮_搜索'
        });
    });
    $(".top-menu").on("click", function () {
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商列表页',
            'action': '点击按钮',
            'label': '代理商列表页_点击按钮_菜单'
        });
    });
    $(".back").on("click", function () {
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商列表页',
            'action': '点击按钮',
            'label': '代理商列表页_点击按钮_返回'
        });
    });


</script>
</body>
</html>
