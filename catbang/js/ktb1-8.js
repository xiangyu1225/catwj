String.prototype.isMobileNo = function () {//是否是手机号
    return /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(this);
};
window.queryString = function (item) {
    var svalue = window.location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
    return svalue ? svalue[1] : "";
};

var viewport = function () {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    };
};

//禁止鼠标滚轮
function scrollFunc(e) {
    e.preventDefault && e.preventDefault(); //FF
    e.cancelBubble = true;//IE
    return false;
}

/*注册事件*/
if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}
//W3C
window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome


$(window).ready(function () {
    $(".phase8-btn-link").click(function () {
        window.location = "http://www.catwj.cn/npi950gc/default.aspx?utm_source=catwaji_m&utm_medium=owned&utm_content=15122813&utm_campaign=950GC_2015";
    });
    var phase8_dialog_message = $(".phase8-dialog-message");

    var phase8_dialog_success = $(".phase8-dialog-success");

    phase8_dialog_message.on("touchmove", function (e) {
        e.preventDefault();
    });

    $(".phase8-btn-try").click(function () {
        var s = 1;
        if (viewport().width != 640) {
            s = viewport().width / 640;
        }
        phase8_dialog_message.css(
            {
                top: 0//$(window).scrollTop() / s
            }
        ).show();
        //alert(viewport().height);
        //alert($(window).scrollTop());
        phase8_dialog_message.find(".body").css({top: ( viewport().height / s - 675) / 2}).show();

        $(window).addClass("noscroll");
        $(document.body).addClass("noscroll");
    });
    function closeDialog() {
        phase8_dialog_message.hide();
        phase8_dialog_success.hide();
        $(window).removeClass("noscroll");
        $(document.body).removeClass("noscroll");
    }

    phase8_dialog_message.find(".btn-close").click(function () {
        closeDialog();
    });
    phase8_dialog_message.find(".btn-cancel").click(function () {
        closeDialog();
    });
    phase8_dialog_success.find(".btn-ok").click(function () {
        closeDialog();
    });
    phase8_dialog_success.find(".btn-close").click(function () {
        closeDialog();
    });
    phase8_dialog_message.find(".phone").val(queryString("phone"));
    phase8_dialog_message.find(".btn-submit").click(function () {
        var phone = phase8_dialog_message.find(".phone").val();
        var name = phase8_dialog_message.find(".name").val();
        if (phone == "" || !phone.isMobileNo()) {
            alert("请输入正确的手机号!");
            return;
        }
        if (name == "") {
            alert("请输入您的名字!");
            return;
        }
        //phase8_dialog_success.show();
        //return;
        phase8_dialog_message.find(".data-loading").show();
        var utm_source = "catwaji_m";//queryString("utm_source");
        var utm_medium = "owned";//queryString("utm_medium");
        var utm_content = "15122813";//queryString("utm_content");
        var utm_campaign = "950GC_2015";//queryString("utm_campaign");
        var utm_term = "";//queryString("utm_term");
        //$.ajax({
        //    type: "GET",
        //    url: "http://www.catwj.cn/ajax/Connect2015.aspx",
        //    dataType: "json",
        //    data: {
        //        rnd: Math.random() * 10000,
        //        phone: phone,
        //        name: name,
        //        source: "CATWAJI-950GC-2016-WAP-LP",
        //        utm_source: decodeURIComponent(utm_source),
        //        utm_medium: decodeURIComponent(utm_medium),
        //        utm_content: decodeURIComponent(utm_content),
        //        utm_campaign: decodeURIComponent(utm_campaign),
        //        utm_term: decodeURIComponent(utm_term)
        //    },
        //    success: function (data) {
        //        if (data.Ret == 0) {
        //            phase8_dialog_message.find(".body").hide();
        //            phase8_dialog_message.find(".data-loading").hide();
        //            phase8_dialog_success.show();
        //        } else {
        //            alert("提交失败！");
        //            phase8_dialog_message.find(".data-loading").hide();
        //        }
        //    }, error: function () {
        //        alert("网络异常，请稍后重试！");
        //        phase8_dialog_message.find(".data-loading").hide();
        //    }
        //});
        CATAPI.checkPhoneIsResiter(phone, function (data) {
            if (data.statusCode == 200) {
                var phoneExists = data.phoneExists;
                if (!phoneExists) {
                    //手机号未注册 先注册在提交
                    CATAPI.Resiter(phone, name, utm_source, utm_medium, utm_campaign, utm_content, utm_term, function (data3) {
                        if (data3.statusCode == 200) {
                            //注册成功 提交
                            CATAPI.TestDriver950(phone, name, phoneExists ? 1 : 0, function (data4) {
                                if (data4.statusCode == 200) {
                                    phase8_dialog_message.find(".body").hide();
                                    phase8_dialog_message.find(".data-loading").hide();
                                    phase8_dialog_success.show();
                                } else {
                                    alert("提交失败！");
                                    phase8_dialog_message.find(".data-loading").hide();
                                }
                            });
                        } else {
                            alert("提交失败！");
                            phase8_dialog_message.find(".data-loading").hide();
                        }
                    });
                } else {
                    //手机号已注册 那么直接提交
                    CATAPI.TestDriver950(phone, name, phoneExists ? 1 : 0, function (data2) {
                        if (data2.statusCode == 200) {
                            phase8_dialog_message.find(".body").hide();
                            phase8_dialog_message.find(".data-loading").hide();
                            phase8_dialog_success.show();
                        } else {
                            alert("提交失败！");
                            phase8_dialog_message.find(".data-loading").hide();
                        }
                    });
                }
            } else {
                alert("提交失败！");
                phase8_dialog_message.find(".data-loading").hide();
            }
        });
    });


    //阅读全文
    var phase8_dialog_quanwen = $(".phase8-dialog-quanwen");
    //阅读全文 文本滚动
    var myScroll = new IScroll("#phase8-dialog-quanwen-scroller");

    //禁止底部页面的滚动
    phase8_dialog_quanwen.on("touchmove", function (e) {
        e.preventDefault();
    });
    //禁止底部页面的滚动
    phase8_dialog_quanwen.on("mousemove", function (e) {
        e.preventDefault();
    });

    $(".phase8-btn-view").click(function () {
        var s = 1;
        if (viewport().width != 640) {
            s = viewport().width / 640;
        }
        phase8_dialog_quanwen.css(
            {
                top: 0//$(window).scrollTop() / s
            }
        ).show();
        //console.log($(window).height());
        var winH = $(window).height() / s;
        if (winH < 963) {
            phase8_dialog_quanwen.find(".body").css({
                top: "0px",
                webkitTransform: "scale(" + winH / 963 + ")",
                webkitTransformOrigin: "50% 0%"
            });
        } else {
            phase8_dialog_quanwen.find(".body").css("-webkit-transform", "scale(1)").css({top: (winH - 963) / 2}).show();
        }
        $(window).addClass("noscroll");
        $(document.body).addClass("noscroll");
        phase8_dialog_quanwen.show();
        myScroll.refresh();
    });
    phase8_dialog_quanwen.find(".btn-close").on("touchend", function () {
        phase8_dialog_quanwen.hide();
        $(window).removeClass("noscroll");
        $(document.body).removeClass("noscroll");
    });

});