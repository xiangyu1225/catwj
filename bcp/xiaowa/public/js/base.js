
var version = 'version=' + new Date().getTime();
//utm
var utmsource = shanGong.getParameters()['utm_source'] || "";
var utmmedium = shanGong.getParameters()['utm_medium'] || "";
var utmcampaign = shanGong.getParameters()['utm_campaign'] || "";
var utmcontent = shanGong.getParameters()['utm_content'] || "";
var utmterm = shanGong.getParameters()['utm_term'] || "";


var debug = true;
// 页面初始化 
var doc = document;
var winw = $(window).width(); //窗口宽
var winh = $(window).height();  //窗口高
shanGong.remInit(320,10); //全部显示适配
var baseURL = shanGong.getBaseURL(location.href);  //基本路径
var getParameters = shanGong.getParameters(location.href);  //参数
var baseImgURL = './public/images/';  //图片路径

// wx.ready(function() {
//     console.log(' wx ready ');
//     var wxTitle = '分享朋友全';
//     var wxDesc = 'GE医疗六城免费乳腺癌筛查义诊全面开启';
//     var wxUrl = baseURL;
//     var wxPic = baseURL + '/public/images/200200.jpg';
//     wx.onMenuShareTimeline({
//         title: '『抢先预约』免费高品质乳腺检查火热开放中！', // 分享标题
//         link: wxUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//         imgUrl: wxPic, // 分享图标
//         success: function() {
//             // 用户确认分享后执行的回调函数 // 朋友圈
//             sendBD('分享朋友圈');
//         },
//         cancel: function() {
//             // 用户取消分享后执行的回调函数
//         }
//     });

//     wx.onMenuShareAppMessage({
//         title: wxTitle, // 分享标题
//         desc: wxDesc, // 分享描述
//         link: wxUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//         imgUrl: wxPic, // 分享图标
//         type: '', // 分享类型,music、video或link，不填默认为link
//         dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
//         success: function() {
//             // 用户确认分享后执行的回调函数
//             sendBD('分享朋友');
//         },
//         cancel: function() {
//             // 用户取消分享后执行的回调函数
//         }
//     });
// });
$(window).scroll(function(){
    var h = $('.bg-box5').offset().top;
    var h2 = $('.bg-box6').offset().top;
    console.log( $('html').scrollTop());
    console.log(h);
        console.log(h2);
    if( ($('body').scrollTop()<( h2 -150 ) || $('html').scrollTop()<( h2 -50  )) && ($('body').scrollTop()>( h -200 ) || $('html').scrollTop()>( h -200  )) ) {
        $('.b5btn-box').addClass('on');
        $('.b6btn-box').removeClass('on');
        console.log('5');

    }
    if ( ($('body').scrollTop()>( h2 - 200 ) || $('html').scrollTop()>( h2 - 200  ) ) && ($('body').scrollTop()<( h2 + 400 ) || $('html').scrollTop()<( h2 + 400  )) ){
        console.log('6');
        $('.b6btn-box').addClass('on');
        $('.b5btn-box').removeClass('on');
    }
});

$(window).load(function() {
    FastClick.prototype.onTouchEnd = function(event) {
        /*加上这个*/
        if (event.target.hasAttribute("type") && event.target.getAttribute("type") == "number") { return false; }
        if (event.target.hasAttribute("type") && event.target.getAttribute("type") == "file") { return false; }
    }

    FastClick.attach(document.body); // 快速点击

    loadingLoad();

    pointerAni ();
    function pointerAni () {
        // var b3btnIndex= 0;
        // var b3btnLength = $('.b3btn-box .txtbtn').length;
        // setInterval(function(){
        //     if(!$('.b3btn-box').hasClass('on')){
        //         b3btnIndex= 0;
        //          return;
        //     }
        //     $('.b3btn-box .txtbtn').removeClass('on');
        //     $('.b3btn-box .txtbtn').eq(b3btnIndex).addClass('on');
        //     b3btnIndex++;
        //     if(b3btnIndex >=b3btnLength) b3btnIndex = 0;
        // }, 1600);

        var b5btnIndex= 0;
        var b5btnLength = $('.b5btn-box .txtbtn').length;
       
        setInterval(function(){
            if(!$('.b5btn-box').hasClass('on')) {
                 b5btnIndex= 0;
                 return;
            }
            $('.b5btn-box .txtbtn').removeClass('on');
            $('.b5btn-box .txtbtn').eq(b5btnIndex).addClass('on');
            b5btnIndex++;
            if(b5btnIndex >=b5btnLength) b5btnIndex = 0;
        }, 1600);



        var b6btnIndex= 0;
        var b6btnLength = $('.b6btn-box .txtbtn').length;
       
        setInterval(function(){
            if(!$('.b6btn-box').hasClass('on')) {
                 b6btnIndex= 0;
                 return;
            }
            $('.b6btn-box .txtbtn').removeClass('on');
            $('.b6btn-box .txtbtn').eq(b6btnIndex).addClass('on');
            b6btnIndex++;
            if(b6btnIndex >=b6btnLength) b6btnIndex = 0;
        }, 1600);

    }


}); //window load

//预加载图片
function loadingLoad() {

    var pageImgObj = {
        load: baseImgURL + '1.gif',
        loadim0: baseImgURL + 'bg1.png',
        loadim1: baseImgURL + 'bg2.png',
        loadim2: baseImgURL + 'bg3.png',
        loadim3: baseImgURL + 'bg4.png',
        loadim4: baseImgURL + 'bg5.png',
        loadim5: baseImgURL + 'bg6.png',
        loadim6: baseImgURL + 'bg7.png',
        loadim7: baseImgURL + 'bg8.png',
        loadim8: baseImgURL + 'bg9.png',
        loadim9_1: baseImgURL + 'b1_1.png',
        loadim9_2: baseImgURL + 'b1_2.png',
        loadim9_3: baseImgURL + 'b1_3.png',
        loadim9_4: baseImgURL + 'b1_4.png',
        loadim9_5: baseImgURL + 'b1_5.png',

        loadim10: baseImgURL + 'b2_1.png',
        loadim10: baseImgURL + 'b2_2.png',
        loadim10: baseImgURL + 'b2_3.png',
        loadim10: baseImgURL + 'b2_4.png',
        loadim11: baseImgURL + 'b3_1.png',
        loadim11: baseImgURL + 'b3_2.png',
        loadim11: baseImgURL + 'b3_3.png',
        loadim12: baseImgURL + 'left.png',
        loadim13: baseImgURL + 'right.png',
        loadim14: baseImgURL + 't1.png',
        loadim15: baseImgURL + 't2.png',
        loadim16: baseImgURL + 't3.png',
        loadim17: baseImgURL + 't4.png',
        loadim18: baseImgURL + 't5.png',
        loadim19: baseImgURL + 't6.png',
        loadim20: baseImgURL + 't7.png',
        loadim21: baseImgURL + 't8.png',
        loadim22: baseImgURL + 't9.png',
        loadim23: baseImgURL + 't10.png',
        loadim24: baseImgURL + 't11.png',
        loadim25: baseImgURL + 'm1.png',
        loadim26: baseImgURL + 'm2.png',
        loadim27: baseImgURL + 'm3.png',
        loadim28: baseImgURL + 'm4.png',
        loadim29: baseImgURL + 'm5.png',
        loadim30: baseImgURL + 'm6.png',
        loadim31: baseImgURL + 'm7.png',

        loadim32: baseImgURL + 'pointer.png',

    }

    shanGong.preloadimagesOBJ(pageImgObj, function(newimagesobj) {
        
       document.getElementById('loading').style.display = 'none';

    }, function(loadedimages, length) {
        loadingNum = Math.floor(loadedimages / length * 100) + '';
    });

    $('.bg-box1 .btn').click(function(){
    	var h = $('.bg-box1').height();
    	$('body,html').stop().animate({'scrollTop': h});
    })
    $('.xunjia-btn').click(function(){
    	var h =  $('.bg-box8').offset().top;
    	$('body,html').stop().animate({'scrollTop': h});
    })


   var swiperBanner = null;
    //按钮弹框事件
    $('#dialogBigImag .close-btn').click(function(){
        $('#dialogBigImag').removeClass('on');
    });
    $('.txtbtn').click(function(){
    	var n = $(this).attr('data-nu');
        if(n == 12) {
            $('#dialogBigImag').addClass('on');
            if(!swiperBanner) {
                swiperBanner = new Swiper( '.default-banner', {});
                $('.swiper-left').click(function(){
                    swiperBanner.slidePrev();
                });
                $('.swiper-right').click(function(){
                    swiperBanner.slideNext();
                });                
            }
            return;
        }


    	$('#dialogTxt>div>img').attr('src', baseImgURL + 't' + n + '.png');
    	$('#dialogTxt').addClass('on');
    });

    $('#dialogTxt .close-btn').click(function(){
    	$('#dialogTxt').removeClass('on');
    });

    $('#dialogTxt').on('touchmove', function(e){
        e = e || event;
        e.preventDefault();
    })

    $('.bg-box8 .ys').click(function(){
    	$(this).toggleClass('on');
    })



    var canSubBool = true;
    $('.bg-box8 .sub').click(function(){

        if(!canSubBool) return;

        var nam = $.trim($('.bg-box8 .nam').val());
        var pho = $.trim($('.bg-box8 .tel').val());

        if (nam == '') {
            addAlertFix('请输入姓名');
            return;
        };
        if (pho == '') {
            addAlertFix('请输入电话');
            return;
        };

        if (!shanGong.checkMobile(pho)) {
            addAlertFix('请输入正确电话');
            return;
        };

        if (!$('.ys').hasClass('on')) {
            addAlertFix('请勾选个人隐私声明');
            return;
        }

        $('#dialogWaiting').addClass('on');
        canSubBool = false;

        $.ajax({
            // url: 'http://llh-test.skh5.cn/bcp/dataapi.php?debug=true',
            url: 'http://llh-test.skh5.cn/bcp/dataapi.php',
            type: 'POST',
            data: {
                Name: nam,
                Mobile: pho,
                DataSource: 'BCP-Peak-Selling-Season-Campaign',
                DataSourceCode: 'CB0054',
                UTM_SOURCE:  utmsource,
                UTM_MEDIUM: utmmedium,
                UTM_CONTENT: utmcontent,
                UTM_TERM: utmterm,
                UTM_CAMPAIGN: utmcampaign,

                ExcavatorSize: 10,
                ExcavatorModel: '307 E2',

            },
            success: function (data) {

                console.log(data);
                data = JSON.parse(data);

                if(data.status==true){
                    gleGA( '首页', '提交')
                    addAlertFix('提交成功',function(){}, true); 
                }else{
                    addAlertFix('提交失败，请重新提交'); 
                }

                $('#dialogWaiting').removeClass('on');
                canSubBool = true;

            },
            error: function (err) {
                $('#dialogWaiting').removeClass('on');
                addAlertFix('网络超时', function(){
                    canSubBool = true;
                });

            }


        });    




    })
        //关闭声明
    $('.btn-close').click(function() {
        $('#dialogShengMing').removeClass('on');
    });
    $('.bg-box8 .yd').click(function() {
        $('#dialogShengMing').addClass('on');
   		 $('#wrapper2').css('height', $('#dialogShengMing .private-box-bg').height() - $('#dialogShengMing .private-box-bg .title').height());
    });

        var headerScroll = new iScroll('wrapper2', {
            hScrollbar: false,
            vScrollbar: false,
            hScroll: false,
            vScroll: true,
            hideScrollbar: false,
            y: 0,
            checkDOMChanges: true,
            onScrollEnd: function(e) {

            },
        });




    //视频
    $('#dialorMedia .close').click(function() {
        var vod = $('#dialorMedia video')[0];
        vod.pause();
        $('#dialorMedia video')[0].src = '';
        $('#dialorMedia').removeClass('on');
    })
        $('.bg-box7 .btn').click(function(){
        	console.log('click');
	        
	        $('#dialorMedia video').attr('src', $(this).attr('data-src'));
	        $('#dialorMedia video')[0].play();
	        $('#dialorMedia').addClass('on');

        });


}


//弹框
function addAlertFix(str, callback, autoclse) {
    var timer = null
    $('#dialogAlert').addClass('on');
    $('#dialogAlert p span').html(str);
    $('#dialogAlert p a')[0].onclick = function() {
        $('#dialogAlert').removeClass('on');
        clearTimeout(timer);
        callback && callback();
    }
    if (autoclse) {
        timer = setTimeout(function() {
            $('#dialogAlert').removeClass('on');
        }, 3000);
    }
}
