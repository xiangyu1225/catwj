<?php
/*
 * VERSION: 0.0.0.0
 * DATE: 16/4/1
 * Requires 
 * @author: 清扬陌客, qingyangmoke@qq.com
 */
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta charset="utf-8" />
    <meta name="keywords" content="">
    <meta name="description" content="" />
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta name="baidu-site-verification" content="r8wCLAAtGn" />
    <meta content="telephone=no" name="format-detection">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <title>卡特帮-卡特挖掘机知识交流平台，帮您解答各种设备问题</title>
    <link rel="stylesheet" href="css/style.css?121">
    <style>
        .ios .ktb-detailPage .box .top-pic p {
            font-size: 16px;
            padding: 10px 0;
            line-height: 34px;
        }

        .ktb-detailPage .box .top-pic span {
            float: right;
            color: #000;
            font-weight: bold;
            margin-right: 18px;
        }

        .ktb-detailPage .box .top-pic p {
            color: #000;
            font-weight: bold;
        }

        .ios .ktb-detailPage .box span {
            font-size: 16px
        }
        #course-header {
            font-size: 22px;
            text-align: center;
            line-height: 40px;
            font-weight: bold;
        }
        .playerBox {
            position: fixed;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            z-index: 10000
        }

        .playerBox video {
            width: 100%;
            /*height: 500px;*/
            margin-top: 15%;
        }

    </style>
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

        ga('create', 'UA-64991844-2', 'auto');
        ga('send', 'pageview');
    </script>
    <script src="http://cdn.jazzad.cn/catwaji/catwaji_m.js"></script>
    <script src="js/jquery.js"></script>
    <script src="js/usercourse.js"></script>
</head>

<body class="ktb-detailPage">
    <header>
        <img src="img/back.png" alt="" class="back" data-noback="1">
        <img src="img/logo.png" alt="">

        <div class="top-right">
            <img src="img/search.png" alt="" class="top-search">
            <img src="img/top-menu.png" alt="" class="top-menu">
            <img src="img/top-menu-1.png" alt="" class="top-menu-1">
        </div>
    </header>
    <div class="main">
        <div class="top-banner">
            <img src="img/top-pic5.png" alt="">
        </div>
        <div class="search">
            <input type="text" placeholder="请输入您想了解的信息" class="kw">
            <a href="" class="btn-search"></a>
        </div>
        <div class="box">

            <?php
                $id = "0";
                if (isset($_REQUEST["id"])) {
                    $id = $_REQUEST["id"];
                }
                echo file_get_contents("ktb-details/$id.html");
            ?>

            <!--  -->
        
        </div>
    </div>

    <footer>
        <div class="footer-menu">
            <img src="img/bottom3.png" alt="">
            <a href="/"></a>
            <a href="../small-excavator.html"></a>
            <a href="../catbang"></a>
            <a href="http://m.catwj.cn/news/"></a>
        </div>
        <img src="img/footer.png" alt="">
    </footer>

    <div class="playerBox playerBox" style="display:none;">
        <video id="player" preload="metadata" controls="controls">
            您的浏览器不支持 video 标签。
        </video>
    </div>

    <!-- <div class="pop hide">
    <div class="body success">
        <i class="close"></i>
        <div class="content">
            <p>询价成功！</p>
            <div class="btn-login">
                <img src="img/pop/btn-ok.png" alt="">
            </div>
        </div>
    </div>
</div>-->
    <!-- <a href="zhizhao.html" class="ask-fixed"><img src="img/ask.png" alt=""></a> -->
    <script src="js/jquery.js"></script>
    <script src="js/index.js?22"></script>
    <script>!!core && core.factory('ktbDetailPage')</script>

    <!-- Google Tag Manager -->
    <noscript>
        <iframe src="//www.googletagmanager.com/ns.html?id=GTM-N6KR6R" height="0" width="0" style="display:none;visibility:hidden"></iframe>
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
                })(window, document, 'script', 'dataLayer', 'GTM-N6KR6R');</script>
    <!-- End Google Tag Manager -->
</body>

</html>