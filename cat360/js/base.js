
shanGong.remInitShowAll(320, 546);
$(function(){
	$('.page-end').click(function(){
		var t = $('.center6').offset().top;
		$('body,html').scrollTop(t);
	})

	$('.bofang').click(function(){
		$('#dialorMedia').addClass('on');

		$('#dialorMedia video')[0].play();
	});

    $('.duihao').click(function(){
        $(this).toggleClass('on');
    });

	$('#dialorMedia .close').click(function(){
		$('#dialorMedia').removeClass('on');
		$('#dialorMedia video')[0].play();
	});

    $('#dialogAlert a ').click(function(){
         $('#dialogAlert').removeClass('on');
         $('#dialogAlert .btn').hide();
    });

	$('.tijiao').click(function(){
		if(!cantijiao) return;

        var nam = $.trim($('.user-name').val());
        var pho = $.trim($('.user-phone').val());

        if (nam == '') {
            alert('请输入姓名');
            return;
        };
        if (pho == '') {
            alert('请输入电话');
            return;
        };

        if (!shanGong.checkMobile(pho)) {
            alert('请输入正确电话');
            return;
        };

        if (!$('.yuedu').hasClass('on')) {
            alert('请勾选个人隐私声明');
            return;
        }
        $('.user-name').val('');
        $('.user-phone').val('');
		cantijiao = false;
        dataLayer && dataLayer.push({ 'event': 'event','category': '360landingpage','action': '点击按钮','label': '360landingpage_点击按钮_注册提交'});
        core.dataHandle.register(pho, nam);

	})


    //关闭声明
    $('.btn-close').click(function() {
        $('#dialogShengMing').removeClass('on');
    });
    $('.yinsi').click(function() {
        $('#dialogShengMing').addClass('on');
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


})




