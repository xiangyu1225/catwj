<?php
$data = false;
$address = "";
$title = "";
$diqu = "";
try {
    if (isset($_GET["id"])) {
        $id = $_GET["id"];
        $data = json_decode(file_get_contents("http://58.87.95.215:8090/DV/querylistbyid?id=$id"));
//        $data = json_decode(file_get_contents("http://h5.sktap.cn/app/cat/site/api/getagentbyid.php?id=$id"));
	if ($data && $data->data) {
            $title = $data->data->title;
            $address = $data->data->address;
            $diqu = $data->data->diqu;
        } else {
            $data = false;
        }
    }
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
    <title><?php echo $title; ?>-CAT（卡特）官网</title>
    <meta name="Keywords"
          content="<?php echo $title; ?>,卡特挖掘机<?php echo $diqu; ?>经销商查询，卡特挖掘机<?php echo $diqu; ?>经销商联系方式, 卡特挖掘机<?php echo $diqu; ?>代理商查询">
    <meta name="Description"
          content="<?php echo $title; ?>,卡特挖掘机<?php echo $diqu; ?>代理查询。登录卡特官网您可以轻松查询获取您所在城市的代理商相关信息。">
    <link rel="stylesheet" href="css/style.css?11">
    <style>
        body, html {
            width: 100%;
            height: 100%;
            margin: 0;
            font-family: "微软雅黑";
            padding: 0;
            margin: 0;
        }

        #allmap {
            width: 100%;
            height: 400px;
        }

        p {
            margin-left: 5px;
            font-size: 14px;
        }
        p strong{
            font-size: 24px;
            font-weight: bold;
        }
    </style>
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
    <script type="text/javascript"
            src="http://api.map.baidu.com/api?type=quick&ak=tFhV2wotx8qydT8SltGaTH0e&v=1.0"></script>
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
<body class="dealer_Page" style="display:block;">
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
    <div class="header-text"></div>
    <div id="allmap"></div>
    <div class="agent-name"><?php echo $title; ?></div>
    <div class="location-text"><?php echo $address; ?></div>
    <div class="call-icon">
        <img src="img/agent/call.png" alt="">
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
<script src="js/data.js?3"></script>
<script src="js/index.js?2016031002"></script>

<script>!!core && core.init('getAgentList')</script>
<script>!!core && core.init('dealer_Page')</script>
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

    $("#banner1").on("click", function () {
        window.location="http://m.catwj.cn/fuel.html?utm_source=catwaji%5Fm%5Fdaili&utm_medium=owned&utm_content=170303%5F16%5Ffuel&utm_campaign=1703%5Fwap";
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商',
            'action': '点击',
            'label': '代理商页_点击按钮_Banner'
        });

//        var link = "http://www.catwj.cn/advantage.html?utm_source=catwaji_m&utm_medium=owned&utm_content=16032542&utm_campaign=1603_Cat360";
//        增加活动 2016年03月29日 该活动链接后自动补充手机参数
//        if (core.userInfo.mobile && core.userInfo.mobile != "") {
//            link += '&mobile=' + core.userInfo.mobile;
//        }
//        window.location = link;
    });
    $("#page-home").on("click", function () {
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商详情页',
            'action': '点击按钮',
            'label': '代理商详情页_点击按钮_首页'
        });
    });
    $("#page-product").on("click", function () {
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商详情页',
            'action': '点击按钮',
            'label': '代理商详情页_点击按钮_产品'
        });
    });
    $("#page-catbang").on("click", function () {
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商详情页',
            'action': '点击按钮',
            'label': '代理商详情页_点击按钮_卡特帮'
        });
    });
    $("#page-news").on("click", function () {
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商详情页',
            'action': '点击按钮',
            'label': '代理商详情页_点击按钮_产品快讯'
        });
    });
    $(".search").on("click", function () {
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商详情页',
            'action': '点击按钮',
            'label': '代理商详情页_点击按钮_搜索'
        });
    });
    $(".top-menu").on("click", function () {
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商详情页',
            'action': '点击按钮',
            'label': '代理商详情页_点击按钮_菜单'
        });
    });
    $(".back").on("click", function () {
        dataLayer && dataLayer.push({
            'event': 'event',
            'category': '代理商详情页',
            'action': '点击按钮',
            'label': '代理商详情页_点击按钮_返回'
        });
    });

    function getLocation(address, callback) {
        var url = "http://api.map.baidu.com/geocoder/v2/?address="
            + encodeURIComponent(address)
            + "&output=json&ak=tFhV2wotx8qydT8SltGaTH0e&callback=showLocation";
        $.ajax({
            type: "get",
            async: false,
            url: url,
            dataType: "jsonp",
            jsonpCallback: "showLocation",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success: function (json) {
                if (json && "result" in json && "location" in json.result) {
                    callback && callback(json.result.location);
                } else {
                    callback && callback(null);
                }
            },
            error: function () {
                callback && callback(null)
            }
        });
    }

    window.locaton_address = '<?php echo $address;?>';

    getLocation(window.locaton_address.substring(3), function (location) {
        if (!(location == null)) {
            console.log(location.lat, location.lng);
            if (location.lat != "" && location.lng != "") {
                map.clearOverlays();
                var new_point = new BMap.Point(location.lng, location.lat);
                var marker = new BMap.Marker(new_point);  // 创建标注
                map.addOverlay(marker);              // 将标注添加到地图中
                map.panTo(new_point);
            }
        } else {
            console.log("error")
        }
    });

    // 百度地图API功能
    var map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(116.331398, 39.897445), 11);
    map.enableScrollWheelZoom(true);

</script>
</body>

</html>
