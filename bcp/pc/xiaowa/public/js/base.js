
console.log('base js');

//utm
var utmsource = shanGong.getParameters()['utm_source'] || "";
var utmmedium = shanGong.getParameters()['utm_medium'] || "";
var utmcampaign = shanGong.getParameters()['utm_campaign'] || "";
var utmcontent = shanGong.getParameters()['utm_content'] || "";
var utmterm = shanGong.getParameters()['utm_term'] || "";

$(function(){

	$('#box1Next').click(function(){
		//第一页跳转锚
		$('body,html').stop().animate({'scrollTop': '401'});
	});

	//第二页点击按钮
    $('.box2-btn-box .btn,.box3-btn-box .btn,.box4-btn-box .btn').hover(function(){
        if(!$(this).parent().parent().hasClass('on')) $(this).addClass('ani-scale-btn');
        
    }, function(){
        $(this).removeClass('ani-scale-btn');
    });


    //点击按钮事件
    var swiperBanner = null;
    $('.box2-btn-box .btn,.box3-btn-box .btn,.box4-btn-box .btn').click(function(){
        $(this).parent().parent().toggleClass('on');
        if($(this).parent().parent().hasClass('on')){
            $(this).parent().parent().siblings().removeClass('on');

        }else{
            
        }

        if(!swiperBanner && $('.box2-btn5').hasClass('on') ) {
              swiperBanner = new Swiper( '.default-banner', {});
            $('.box2-left').click(function(){
                swiperBanner.slidePrev();
            });
            $('.box2-right').click(function(){
                swiperBanner.slideNext();
            });  
        }
    });
    //关闭按钮
    $('.box2-btn-box .close-btn,.box3-btn-box .close-btn,.box4-btn-box .close-btn').click(function(){
        $(this).parent().parent().removeClass('on');
    });


	$('.ys ').click(function(){
		$(this).toggleClass('on');
	});

	$('.yd').click(function(){
		$('.private-dialog').addClass('on');
	});	
	$('.btn-close').click(function(){
		$('.private-dialog').removeClass('on');
	});


	    //隐私声明弹框
    var winh = $(window).height();
    if (winh > 650) {
        $('.private-dialog .page-inner').css('margin-top', (winh - 650) / 2 + 'px');
    } else {
        $('#wrapper>div').css('padding-bottom', (700 - winh) + 'px');
    }

    $('.goxunjia').click(function(){
        var h = $('.bg-box6').height();
        var bh = $('.inner').height();
        $('body,html').stop().animate({'scrollTop': bh - h});

    })

    var headerScroll = new iScroll('wrapper', {
        hScrollbar: false,
        vScrollbar: false,
        hScroll: false,
        vScroll: true,
        // bounce: false,
        hideScrollbar: false,
        y: 0,
        checkDOMChanges: true,
        onScrollEnd: function(e) {

        },
    });

    $('.vodbox .btn').click(function(){
        var src = $(this).attr('data-src');
        $('#dialogVideo').addClass('on');
        $('#dialogVideo video').attr('src', src);
        $('#dialogVideo video')[0].play();
    });

    $('#dialogVideo .close-btn').click(function(){
    	$('#dialogVideo video')[0].pause();
        $('#dialogVideo').removeClass('on');
    	$('#dialogVideo video').attr('src', '');
    });

    var canSubBool = true;

    //提交按钮
    $('.sub').click(function() {
        
        if(!canSubBool) return;
        
        var phone = $.trim($('.tel').val());
        var name = $.trim($('.nam').val());
        var isPhone;
        var yuedu = $('.ys').hasClass('on');

        if (name == '' || name == null) {
            alertFix('请输入姓名', function() {}, true);
            return;
        }
        if (phone == '' || phone == null) {
            alertFix('请输入电话', function() {}, true);
            return;
        }
        isPhone = checkMobile(phone);
        if (!isPhone) {
            alertFix('请输入正确的电话', function() {}, true);
            return;
        }
        if (!yuedu) {
            alertFix('请勾选个人隐私声明', function() {}, true);
            return;
        }
        console.log('通过验证');
        $('#waiting').addClass('on');
        canSubBool = false;
    
        $.ajax({
            // url: 'http://llh-test.skh5.cn/bcp/dataapi.php?debug=true',
            url: 'http://llh-test.skh5.cn/bcp/dataapi.php',
            type: 'POST',
            data: {
                Name: name,
                Mobile: phone,
                DataSource: 'BCP-Peak-Selling-Season-Campaign',
                DataSourceCode: 'CB0053',
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
                   gleGA( '首页', '提交');

                   alertFix('提交成功',function(){}, true); 
                }else{
                    alertFix('提交失败，请重新提交'); 
                }

                $('#waiting').removeClass('on');
                canSubBool = true;

            },
            error: function (err) {
               $('#waiting').removeClass('on');
                alertFix('网络超时', function(){
                    canSubBool = true;
                });

            }
        });     

    });

});


//手机号码验证
function checkMobile(str, callback) { // 验证手机号正则
    var re = /^1[3|4|5|7|8][0-9]{9}$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

//弹框

function alertFix(str, callback, autoclose) {
    $('#waiting').removeClass('on');
    var timer = null
    $('.pageFormPop').show();
    $('.pageFormPop .words').html(str);
    $('.pageFormPop a')[0].onclick = function() {
        $('.pageFormPop').hide();
        clearTimeout(timer);
        callback && callback();
    };
    if (autoclose) {
        timer = setTimeout(function() {
            $('.pageFormPop').hide();
        }, 3000);
    }
}
