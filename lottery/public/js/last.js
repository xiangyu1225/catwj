var version = 'version=' + new Date().getTime();
var debug = true;

var serverURL = 'http://llh-test.skh5.cn';
var baseURL = window.location.href.indexOf('?') == -1 ? window.location.href : window.location.href.substring(0, window.location.href.indexOf('?'));
baseURL = baseURL.indexOf('.html') == -1 ? baseURL :  baseURL.replace('/'+baseURL.split('/').pop(), '');
baseURL = baseURL.replace(/\/$/, '');

console.log(baseURL+'/public/images/200200.png');

//处理微信授权
// 获取地址栏参数
var callurl = encodeURIComponent(window.location.href);
var userInfor = new Object();
var searchUrl = decodeURI(window.location.search);
searchUrl = searchUrl.replace(/amp;/g, ''); //微信将 & 转意 &amp;删除多余字符
if (searchUrl.indexOf("?") != -1) { //判断是否存在，如果返回-1，则表明不存在-->
    var str = searchUrl.substr(1); //从第1个字符开始截取-->
    var strs = str.split("&"); //表示以“&’”为分隔符进行分隔，返回的是一个数组-->
    for (var i = 0; i < strs.length; i++) {
        userInfor[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
}


// (function(){
//     var sr = !!userInfor.sr ? '?sr=' + userInfor.sr : '';
//      if(localStorage.hassub == '1'){
//         localStorage.hassub = '0'
//         window.location = 'http://llh-test.skh5.cn/bices/get_wx.php?toget=wxchatauth&callback_url=' + baseURL;
//     }   

// }());

// localStorage.hassub = '0';


//微信授权判断
// if (!userInfor.token) {
//     window.location = 'http://llh-test.skh5.cn/bices/get_wx.php?toget=wxchatauth&callback_url=' + callurl;
// } else {
//     console.log(userInfor.token);
// }

// 页面初始化 
var doc = document;
var winw = $(window).width();
var winh = $(window).height();
var chooseStr = ''; //选择的产品
var chooseStrTitle = ''; //选择的产品
var screenBool = '';
var pageManage = new SQ();
pageManage.remInit();
$(window).resize(function() {
    pageManage.remInit();
});

var isWeiXinBool = pageManage.isWeiXin();
// if(isWeiXinBool){
//     wx.ready(function(){

//          wxShare();
//     });
// }else{

// window.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb30cb4d8bd6956d6&redirect_uri=http%3A%2F%2Fmonitor.una-ad.com%2FOAuth%2Fcallback_v2&response_type=code&scope=snsapi_base&state=f28Hb41ew2e18FzZeqE2BIebE18812Zb&connect_redirect=1#wechat_redirect';
    
// }



$(window).load(load);


//页面读取
function load() {
    $('.dialog').css({ 'width': winw + 'px', 'height': winh + 'px' });
    $('.page1').css({ 'width': winw + 'px', 'height': winh + 'px' });
    $('.page2').css({ 'width': winw + 'px', 'height': winh + 'px' });
    $('#dialogShengm').css({ 'width': winw + 'px', 'height': winh + 'px' });

    // if (userInfor.code == 0) {
    //     $('.imag13').show();
    // } else {
    //     $('.imag12').show();

    // }

    // if(userInfor.tinfo == '明天11:00开始抽奖') {}
    // if(userInfor.tinfo == '明天14:00开始抽奖') {}
    // if(userInfor.tinfo == '明天16:00开始抽奖') {}
// if(!!userInfor.tinfo){

//  if(userInfor.tinfo.indexOf('11')!=-1) {
//         $('#timeText').html('11:00开始');
//         $('.imag4p1 div').css('background-image', 'url(./public/images/page1/4.png)')
//     }
//     if(userInfor.tinfo.indexOf('14')!=-1) {
//         $('#timeText').html('14:00开始');
//         $('.imag4p1 div').css('background-image', 'url(./public/images/page1/t14.png)')
//     }
//     if(userInfor.tinfo.indexOf('16')!=-1) {
//         $('#timeText').html('16:00开始');
//         $('.imag4p1 div').css('background-image', 'url(./public/images/page1/t16.png)')
//     }
// }
   
    loadingLoad(); //预加载 loading    
    FastClick.prototype.onTouchEnd = function(event) {
        /*加上这个*/
        if (event.target.hasAttribute("type") && event.target.getAttribute("type") == "number") { return false; }
        if (event.target.hasAttribute("type") && event.target.getAttribute("type") == "file") { return false; }
    }
    FastClick.attach(document.body); // 快速点击


    // $('.dialog .close').click(function() {
    //     $(this).parent().removeClass('on');
    // });
    // $('.page1 .top .guiz').click(function() {
    //     $('#dialogGuiZe').addClass('on');
    // });
    // $('.page1 .card .btn').click(function() {
    //     var num = $(this).attr('data-valu');
    //     chooseStrTitle = $(this).attr('data-title');
    //     chooseStr = num;
    //     $(this).addClass('on');
    //     $(this).siblings().removeClass('on');
    // });

    // $('.page1 .shengm').click(function() {
    //     $(this).toggleClass('on');
    // });
    // $('.page1 .yuedu').click(function() {
    //     $('#dialogShengm').show();
    //     var myScroll = new iScroll('shemingMain', {
    //         hScrollbar: false,
    //         vScrollbar: false,
    //         hScroll: false,
    //         vScroll: true,
    //         bounce: false,
    //         lockDirection: true,
    //     }); //滑动区域 

    // });
    // $('#dialogShengm .goback').click(function() {
    //     $('#dialogShengm').hide();
    // });
    // $('#dialogShengm .close').click(function() {
    //     $('#dialogShengm').hide();
    // });
    // $('#page2 .close').click(function() {
    //     $('#page2').hide();
    //     $('#page1').show();
    // });

// var canP1SUb = true;
//     // 抽奖
//     $('#p1Sub').click(function() {
//         var tel = $('.page1 .phone input').val();


//         if (chooseStr == '') {
//             alert('请选择明星产品');
//             return;
//         }

//         if (tel == '') {
//             alert('请填写电话号');
//             return;
//         }
//         if (!$('.shengm').hasClass('on')) {
//             alert('请阅读并勾选隐私声明');
//             return;
//         }

//         canP1SUb = false;

//         dataLayer && dataLayer.push({ 'event': 'event','category': '抽奖页','action': '点击按钮','label': '抽奖页_点击按钮_提交' + chooseStrTitle });
//         //报名接口
//         $.ajax({
//             url: serverURL + '/bices/add.php',
//             data: {
//                 token: userInfor.token,
//                 tel: tel,
//                 product: chooseStr,
//             },
//             type: 'POST',
//             success: function(data) {
//                 if (data.status == true) {
//                     console.log(data);

//                     localStorage.hassub ='1';
//                     // alert(localStorage.hassub);

//                     $('#page1').hide();
//                     $('#page2').show();
//                     $('.imag12').show();
//                     // data = {
//                     //     code: "2S52aMllBaiW",
//                     //     msg: "明天11:00开始抽奖",
//                     //     tel: "15904414274",
//                     // }

//                     $('#catCode').html(data.data.code);
//                 } else {
//                     alert(data.msg);
//                     canP1SUb = true;
//                 }

//             },
//             error: function(data) {
//                 dialogOn('提交失败，请稍后重新提交');
//                 canP1SUb = true;
//             }
//         });

//     });
}

//预加载图片
function loadingLoad() { //loading
    var loading = document.getElementById('loading');
    var loadingLength = 0;
    var imgArrLoading = [
        './public/images/1.gif',
    ];
    pageManage.preloadimages(imgArrLoading, function(newimages) {
        if (debug) console.log(newimages);
        $('body').css('visibility', 'visible').addClass('show');;
        mainLoad();
    }, function(loadedimages, length) {});
}

// 主要内容预加载
//预加载图片
function mainLoad() { //main
    var imgArrLoading = [
        './public/images/page1/1.png',
        './public/images/page1/2.png',
        './public/images/page1/3.png',
        './public/images/page1/4.png',
        './public/images/page1/5.png',
        './public/images/page1/6.png',
        './public/images/page1/7.png',
        './public/images/page1/8.png',
        './public/images/page1/9.png',
        './public/images/page1/10.png',
        './public/images/page1/11.png',
        './public/images/page1/12.png',
        './public/images/page1/13.png',
        './public/images/page1/t14.png',
        './public/images/page1/t16.png',
        './public/images/page1/200200.png',

    ];
    pageManage.preloadimages(imgArrLoading, function(newimages) {
        if (debug) console.log(newimages);
        $('body').addClass('show');
        $('.page1').show();
            // if (userInfor.code == 0 || !userInfor.code) {
            //    $('.page1').show();
            // } else {
            //     $('.page2').show();
            //     $('.imag13').show();
            //     $('#catCode').html(userInfor.code);
            // }

        setTimeout(function() {
            loading.style.display = 'none';
        }, 400);

    }, function(loadedimages, length) {
        //time out
        // loadingLength = Math.floor(loadedimages / length * 100).toString();
        // $('#loading .progress').css('width', (20 + loadingLength * 62 / 100) + '%');
    });
}

//分享方法
function wxShare() {
    var wxTitleMessage = 'Cat BICES 现场抽奖';
    var wxTitleLine = 'Cat BICES 现场抽奖，立即参与，现场开大奖！';
    var wxPic = baseURL+'/public/images/200200.png';
    var wxDesc = '立即点击参与抽奖，现场开奖，惊喜好礼等你来！';  
    var wxUrl = baseURL;

    wx.onMenuShareTimeline({
        title: wxTitleLine, // 分享标题
        link: wxUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: wxPic, // 分享图标
        success: function() {
            // 用户确认分享后执行的回调函数 // 朋友圈
            // sendBD('分享朋友圈');
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareAppMessage({
        title: wxTitleMessage, // 分享标题
        desc: wxDesc, // 分享描述
        link: wxUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: wxPic, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
            // 用户确认分享后执行的回调函数
            // sendBD('分享朋友');
            // alert(serverURL);
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });

};