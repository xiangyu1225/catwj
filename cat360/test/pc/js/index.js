
 var canTijiao = true;
$(function() {

        $('.active-setion11-tel').val('');
        $('.active-setion11-name').val('');

    $('.page-end,.button1,.button2,.button3').click(function() {
        var t = $('.center6').offset().top;
        $('html,body').scrollTop(t);
    });


    $('.duihao').click(function() {
        $(this).toggleClass('on');
    });

   
    //提交按钮
    $('.tijiao').click(function() {

            if(!canTijiao) return;
           

        //     var phone = $.trim($('.active-setion11-tel').val());
        //     var name = $.trim($('.active-setion11-name').val());
        //     var isPhone;
        //     var yuedu = $('.yuedu').hasClass('on');

        //     if (name == '' || name == null) {
        //         alert('请输入姓名', function() {}, true);
        //         return;
        //     }
        //     if (phone == '' || phone == null) {
        //         alert('请输入电话', function() {}, true);
        //         return;
        //     }
        //     isPhone = shanGong.checkMobile(phone);
        //     if (!isPhone) {
        //         alert('请输入正确的电话', function() {}, true);
        //         return;
        //     }
        //     if (!yuedu) {
        //         alert('请勾选个人隐私声明', function() {}, true);
        //         return;
        //     }

        //     canTijiao = false;

        // });

        AdvantageReg();
    });

    $('.bofang').click(function(){
        $('#dialogVod').addClass('on');
        $('#dialogVod video')[0].play();
    });

     $('#dialogVod .close').click(function(){
        $('#dialogVod').removeClass('on');
         $('#dialogVod video')[0].pause();
     });



    //隐私声明弹框
    var winh = $(window).height();
    if (winh > 650) {
        $('.private-dialog .page-inner').css('margin-top', (winh - 650) / 2 + 'px');
    } else {
        $('#wrapper>div').css('padding-bottom', (700 - winh) + 'px');
    }

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

    $('.btn-close ').click(function() {
        $('.private-dialog').removeClass('on');
    });
    $('.yinsi').click(function() {
        $('.private-dialog').addClass('on');
    });
    $('.private-dialog').on('mousewheel', function(e) {
        e.preventDefault();

    });
     
     $('.pageFormPop .PopInner .X').click(function(){
        $('.pageFormPop').hide();
         $('.pageFormPop .btn').hide();
     });

})

//弹框

function alert(str, callback, autoclose) {
    $('#waiting').removeClass('on');
    var timer = null
    $('.pageFormPop').show();
    $('.pageFormPop .words').html(str);
    $('.pageFormPop a')[0].onclick = function() {
        $('.pageFormPop').hide();
        clearTimeout(timer);
        callback && callback();
    };
    if (!!autoclose) {
        timer = setTimeout(function() {
            $('.pageFormPop').hide();
        }, 3000);
    }
}