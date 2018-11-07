<?php
$data = false;
try {
   if (isset($_GET["catid"])) {
        $catid = $_GET["catid"];
        $url = "http://h5.sktap.cn/app/cat/site/api/getproductdetails.php?id=$catid";
        if ($catid >= 150) {
            $url = "http://58.87.95.215:8090/json/$catid.json";
        }
        $data = json_decode(file_get_contents($url));
        if ($data && $data->title) {
        } else {
            $data = false;
        }
    }    
} catch (Exception $e) {
    $data = false;
}
$title = $data ? str_replace(PHP_EOL, '', $data->title) : "";
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="content-language" content="en"/>
    <meta name="baidu-site-verification" content="r8wCLAAtGn"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title><?php echo $title; ?>-CAT（卡特）官网</title>
    <meta name="Keywords"
          Content="<?php echo $title; ?>，卡特<?php echo $title; ?>，卡特<?php echo $title; ?>价格，卡特<?php echo $title; ?>配置，卡特<?php echo $title; ?>图片">
    <meta name="Description"
          Content="CAT（卡特）官网为您介绍卡特<?php echo $title; ?>信息，包括卡特<?php echo $title; ?>价格，卡特<?php echo $title; ?>图片，卡特<?php echo $title; ?>代理商等，了解【卡特<?php echo $title; ?>】更多信息，请登录卡特挖掘机官网">
    <link rel="stylesheet" href="css/style.css?12">
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
    <script>


        var corTimer = setInterval(function(){
            if(!!window.core) {
                clearInterval(corTimer);
                if(core.userInfo.UserID) {
                    var id = location.href.split('_')[1].split('.')[0];
                    window.location.href = 'http://m.catwj.cn/product-detail.html?id='+id+'&utm_source=wechat%5Fm&utm_medium=owned&utm_content=middle&utm_campaign=1803%5FURL%5F02';
                }
            }
        }, 100)
    </script>
</head>
<body class="registerPage">
<header>
    <img src="img/back.png" alt="" class="back">
    <img src="img/logo.png" alt="" class="logo">


    <div class="top-right">
        <img src="img/search.png" alt="" class="search">
        <img src="img/top-menu.png" alt="" class="top-menu">
        <img src="img/top-menu-1.png" alt="" class="top-menu-1">
    </div>

</header>
<div class="main">
    <div class="login-panel" style="margin-top: -13px;">
        <h1>注册</h1>
        <?php if ($data) { ?>
            <table class="product">
                <tr>
                    <th colspan="4"><?php echo $data->title; ?></th>
                </tr>
                <tr>
                    <td><img src="<?php echo $data->picUrl; ?>" alt=""></td>
                    <td><span> 净功率<br><?php echo $data->power; ?></span></td>
                    <td><span> 铲斗容量<br><?php echo $data->volume; ?></span></td>
                    <td><span> 工作重量<br><?php echo $data->quality; ?></span></td>
                </tr>
                <tr>
                    <td colspan="4" class="youshi" style="background-color: #bbb;padding:10px 14px"><strong>●
                            产品优势——</strong><em><?php echo $data->youshi; ?></em></td>
                </tr>
            </table>
        <?php } ?>
        <h3 style="padding:4px 0px 10px">尊敬的用户：</h3>

        <p style="font-size: 26px;">轻松两步，分分钟获取Cat挖掘机权威介绍，更多视频为您揭晓产品细节和同行使用心得，还有产品手册下载，更可询价哦！</p>

        <div class="inputBox">
            <span>姓 名：</span>
            <input type="text" class="name">
        </div>

        <div class="inputBox">
            <span>电 话：</span>
            <input type="tel" name="mobile" class="mobile" maxlength="11">
            <br><br>

            <p>如果您已经有账号，请<a href="login.html" style="color: red;" class="link-login">直接登录 ></a></p>
            <br><br>
        </div>
        <img src="img/register/btn.png" alt="" class="btn-doRegister">

    </div>


</div>
<footer style="display: none">
    <div class="footer-menu">
        <img src="img/bottom.png" alt="">
        <a href="/"></a>
        <a href="small-excavator.html"></a>
        <a href="javascript:;" class="link-catbang"></a>
        <a href="news/"></a>
    </div>
    <img src="img/footer.png" alt="">
</footer>


<script>
    var REWRITE_QUERY_STORAGE = <?php echo json_encode($_GET) ?>;
</script>

<script src="js/jquery.js"></script>
<script src="js/data.js?2"></script>
<script src="js/index.js?20180824"></script>
<script>!!core && core.init('registerPage')</script>

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

    var interval_dataLayer = setInterval(function () {
        if (dataLayer) {
            dataLayer && dataLayer.push({'event': 'event', 'category': '首页', 'action': '页面完成', 'label': '首页_页面完成'});
            clearInterval(interval_dataLayer);

        }
    }, 300);
   $(".back").on("click", function () {
       dataLayer && dataLayer.push({
           'event': 'event',
           'category': '注册页',
           'action': '点击按钮',
           'label': '注册页_点击按钮_返回'
       });
   });
   $(".link-login").on("click", function () {
       dataLayer && dataLayer.push({
           'event': 'event',
           'category': '注册页',
           'action': '点击按钮',
           'label': '注册页_点击按钮_登录'
       });
   });
$(".btn-doRegister").on("click", function () {
    dataLayer && dataLayer.push({
        'event': 'event',
        'category': '注册页',
        'action': '点击按钮',
        'label': '注册页_点击按钮_注册'
    });
});


 // 2018 by jls  start 
var catDateType = <?php echo $data->type; ?>;
var catDateTitle = '<?php echo $data->title; ?>';
var ExcavatorSize  = '';

switch(catDateType){
    case 1:
        catDateType='小型机';
        ExcavatorSize = 10;
        break;
    case 2:
        catDateType='中型机';
        ExcavatorSize = 20;
        break;
    case 3:
        catDateType='大型机';
        ExcavatorSize = 30;
        break;
    case 4:
        catDateType='轮挖';
        ExcavatorSize = 40;
        break;
    case 5:
        catDateType='装载机';
        ExcavatorSize = 110;
        break;
}
$(function(){
    $('.btn-doRegister').attr('data-excavatorsize', ExcavatorSize).attr('data-excavatormodel', $.trim(catDateTitle.replace(/[\u4E00-\u9FA5]/g, '').replace(/®/g, '').replace(/_/g, '').replace('Cat', '').replace(/&nbsp;/g, '')));
})
 // 2018 by jls  end 

</script>
</body>

</html>
