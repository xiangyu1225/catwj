$(document).ready(advantage_logonstatus());

function advantage_logonstatus() {
    $(".DLink.DLink_1").hide();
    $(".DLink.DLink_2").hide();
    $(".DLink.DLink_3").hide();
    $(".DLink.DLink_4").hide();
    var p = GetQueryString("mobile");
    if (p != "" && p != null) {
        $("#hidphone").val(p);
        var data2 = "phone=" + p;
        $.post("/Interface/Login?sj=" + Math.random(), data2, function (dat2) {
            $(".DLink.DLink_1").hide();
            $(".DLink.DLink_2").hide();
            $(".DLink.DLink_3").show();
            $(".DLink.DLink_4").show();
            $("#spanname360").html(dat2.uname);
            $("#txtname360").val(dat2.uname);
            $("#txtphone360").val(dat2.Phone);
            $("#hidphone").val(dat2.Phone);
        });
    } else {
        //判断用户登录状态
        var data = "";
        $.post("/Interface/getLoginStatus?sj=" + Math.random(), data, function (dat) {
            //var obj = $.parseJSON(dat);
            if (dat != null && dat != '') {
                if (dat.login == "0") {
                    $(".DLink.DLink_1").show();
                    $(".DLink.DLink_2").show();
                    $(".DLink.DLink_3").hide();
                    $(".DLink.DLink_4").hide();
                }
                else {
                    $("#hidphone").val(dat.phone);
                    $("#txtname360").val(dat.uname);
                    $("#txtphone360").val(dat.phone);
                    $(".DLink.DLink_1").hide();
                    $(".DLink.DLink_2").hide();
                    $(".DLink.DLink_3").show();
                    $(".DLink.DLink_4").show();
                    $("#spanname360").html(dat.uname);
                }
            }
        });
    }
}

//flg = 1 优利注册
//flg = 2 产品了解详情
//flg = 3 产品我要询价
//flg = 4 手机端导航注册
function callpopup(flg, pid, pt) {
    var data = "";
    var backurl = "";
    var mpid = "";
    var murl = "http://m.catwaji.com";
    switch (pid) {
        case "134": mpid = "7"; break;
        case "113": mpid = "28"; break;
        case "118": mpid = "9"; break;
        case "125": mpid = "19"; break;
    }
    //判断用户登录状态
    $.post("/Interface/getLoginStatus?sj=" + Math.random(), data, function (dat) {
        //var obj = $.parseJSON(dat);
        if (dat != null && dat != '') {
            switch (dat.login) {
                case "0":   //未登录
                    if (thisBrowser == "pc") {
                        //当前浏览器是pc
                        backurl = "/product_" + pid + ".html";
                        switch (flg) {
                            case 1: goForm(); break;//优利注册
                            case 2:
                                woyaoxunjia('1', '2', '0', pid, pt, backurl);
                                break;//产品了解详情
                            case 3:
                                woyaoxunjia('2', '2', '0', pid, pt, backurl);
                                break;//产品我要询价
                            case 4: mobiPageChange('.Page_3'); break;//手机端导航注册
                        }
                    } else {
                        //当前是手机
                        switch (flg) {
                            case 1: goForm(); break;//优利注册
                            case 2: window.location.href = murl + '/register.html?catid=' + mpid; break;//产品了解详情
                            case 3: window.location.href = murl + '/register.html?catid=' + mpid; break;//产品我要询价
                            case 4: mobiPageChange('.Page_3'); break;//手机端导航注册
                        }
                    }
                    break;
                case "1": //已登录
                    if (thisBrowser == "pc") {
                        //当前浏览器是pc
                        backurl = "/product_" + pid + ".html";
                        switch (flg) {
                            case 1: FormLineChange(); break;//优利注册
                            case 2: woyaoxunjia('1', '2', '1', pid, pt, backurl); break;//产品了解详情
                            case 3: woyaoxunjia('2', '2', '1', pid, pt, backurl); break;//产品我要询价
                            case 4: window.location.href = backurl; break;//手机端导航注册
                        }
                    } else {
                        //当前是手机
                        switch (flg) {
                            case 1: FormLineChange(); break;//优利注册
                            case 2: window.location.href = murl + '/product-detail.html?id=' + mpid + "&mobile=" + $("#hidphone").val(); break;//产品了解详情
                            case 3: window.location.href = murl + '/product-detail.html?id=' + mpid + "&mobile=" + $("#hidphone").val(); break;//产品了解详情
                                //case 3: window.location.href = murl + '/xunjia.html?pid=' + mpid + "&mobile=" + $("#hidphone").val(); break;//产品我要询价
                            case 4: window.location.href = backurl; break;//手机端导航注册
                        }
                    }
                    break;
            }
        }
    });
}
function AdvantageReg() {
    var source = "";
    // if (thisBrowser == "mobile") {
    //     source = "CATWAJI-360-ADVANTAGE-WAP";
    // } else {
    //     source = "CATWAJI-360-ADVANTAGE-PC";
    // }
    source = "CATWAJI-360-ADVANTAGE-PC";
            var phone = $.trim($('.active-setion11-tel').val());
            var name = $.trim($('.active-setion11-name').val());
            var isPhone;
            var yuedu = $('.yuedu').hasClass('on');

            if (name == '' || name == null) {
                alert('请输入姓名');
                return;
            }
            if (phone == '' || phone == null) {
                alert('请输入电话');
                return;
            }
            isPhone = shanGong.checkMobile(phone);
            if (!isPhone) {
                alert('请输入正确的电话');
                return;
            }
            if (!yuedu) {
                alert('请勾选个人隐私声明');
                return;
            }


    var src = GetQueryString("utm_source");
    var mdm = GetQueryString("utm_medium");
    var cpn = GetQueryString("utm_campaign");
    var ctt = GetQueryString("utm_content");
    var tem = GetQueryString("utm_term");

    var data = "name=" + escape(name) + "&phone=" + phone + "&source=" + source + "&utmsource=" + src + "&utmmedium=" + mdm + "&utmcampaign=" + cpn + "&utmcontent=" + ctt + "&utmterm=" + escape(tem);
    $.post("/Interface/Add_360Advantage?sj=" + Math.random(), data, function (dat) {
        canTijiao = true;

        $('.active-setion11-tel').val('');
        $('.active-setion11-name').val('');

        console.log(dat);
        if (dat != null && dat != '') {
            switch (dat.ErrorCode) {
                case 0:

                    alert("注册成功<br>欢迎您继续访问，了解Cat360 °全程安心服务");
                   
                    $("#hidphone").val(phone);
                    $("#spanname360").html(name);
                    $(".DLink.DLink_1").hide();
                    $(".DLink.DLink_2").hide();
                    $(".DLink.DLink_3").show();
                    $(".DLink.DLink_4").show();
                    $("#hidLoginStatus").val("1");
                    $(".userLogin").html("<a href='javascript:;'>您好：" + name + "</a><span>|</span><a href='javascript:;' onclick=\"Logout();SetIndTrack('退出-退出成功', 'Success');\">退出</a>");
                    dataLayer.push({ 'event': 'event', 'cat': '360注册', 'act': '注册成功', 'lbl': '' });
                    break;
                case 1:
                    
                    alert("注册成功<br>欢迎您继续访问，了解Cat360 °全程安心服务");
                    $("#spanname360").html(name);
                    $(".DLink.DLink_1").hide();
                    $(".DLink.DLink_2").hide();
                    $(".DLink.DLink_3").show();
                    $(".DLink.DLink_4").show();
                    $("#hidphone").val(phone);
                    $("#hidLoginStatus").val("1");
                    $(".userLogin").html("<a href='javascript:;'>您好：" + name + "</a><span>|</span><a href='javascript:;' onclick=\"Logout();SetIndTrack('退出-退出成功', 'Success');\">退出</a>");
                    dataLayer.push({ 'event': 'event', 'cat': '360注册', 'act': '注册成功', 'lbl': '' });
                    break;
                case 2:
                    FormPopShow('请正确填写手机号码！');
                    break;
            }
        }
    });
}
function AdvantageMobileReg() {
    var uname = $("#txtname360_m2").val();
    var phone = $("#txtphone360_m2").val();
    var SourceCode = "CATWAJI-WAP";
    var model = "";
    var paytime = "";
    var message = "";
    var regoption = "";
    var contact = "on";
    var component = "0";

    if (phone == '' || phone.length < 1) {
        sendError('请输入您的手机号码！');
        return false;
    }
    if (uname == '' || uname.length < 1) {
        sendError('请输入您的姓名！');
        return false;
    }

    var data = "source=" + SourceCode + "&name=" + escape(uname) + "&phone=" + phone;
    data += "&buytime=" + paytime + "&model=" + model + "&contact=" + contact + "&message=" + message + "&components=" + component;
    data += "&utmsrc=" + source + "&utmmdm=" + medium + "&utmcpn=" + campaign + "&utmctt=" + content + "&utmtrm=" + term;

    $.post("/Interface/Regist?sj=" + Math.random(), data, function (dat) {
        if (dat != null && dat != '') {
            if (dat.success == '1') {
                sendError('输入的手机号码格式不正确！');
                return false;
            }
            else if (dat.success == '2') {
                var data2 = "phone=" + phone;
                $.post("/Interface/Login?sj=" + Math.random(), data2, function (dat2) {
                    mobiPageChange('.Page_1');
                    $(".DLink.DLink_1").hide();
                    $(".DLink.DLink_2").hide();
                    $(".DLink.DLink_3").show();
                    $(".DLink.DLink_4").show();
                    $("#txtname360").val(dat2.uname);
                    $("#txtphone360").val(dat2.Phone);
                    $("#spanname360").html(dat2.uname);
                    $("#hidphone").val(phone);
                });

            }
            else if (dat.success == '3') {
                sendError('服务器忙请稍候再试！');
                return false;
            }
            else if (dat.success == "0") {
                mobiPageChange('.Page_1');
                $(".DLink.DLink_1").hide();
                $(".DLink.DLink_2").hide();
                $(".DLink.DLink_3").show();
                $(".DLink.DLink_4").show();
                $("#txtname360").val(uname);
                $("#txtphone360").val(phone);
                $("#spanname360").html(uname);
                $("#hidphone").val(phone);
                dataLayer.push({ 'event': 'event', 'cat': '注册表单', 'act': '注册成功', 'lbl': '' });
            }
            else {
                sendError('服务器未响应,请稍候再试！');
                return false;
            }
        }
    }, 'Json');
}
function AdvantageCheckPhoneExits(str) {

    //var ab = /^(13[0-9]|14[0-7]|15[0-9]|18[0-9])\d{8}$/;
    var ab = /^[1]+[0-9]+\d{9}$/;

    if (ab.test(str) == false) {
        sendError('请正确填写手机号码！');
        return false;
    }
    if (str == '' || str == null) {
        sendError('请正确填写手机号码！');
        return;
    }
    $.post("/Interface/phoneExits?sj=" + Math.random(), { phone: str }, function (txt) {

        if (txt != '') {
            if (txt.success == '1') {

                sendError('手机号码已存在，请直接登录！');
                return false;
            }
            else if (txt.success == '0') {
            }
        }
        else {
            sendError('手机号码不能为空');

        }
    }, 'Json');
}
function AdvantageMobileLogin() {
    var phoneNo = $("#txtphone360_m1").val();
    var data = "phone=" + phoneNo;
    if (phoneNo != null && phoneNo != '') {
        $.post("/Interface/Login?sj=" + Math.random(), data, function (dat) {
            if (dat != '') {
                if (dat.success == '1') {
                    sendError('格式错误,请重新输入手机号码');
                } else if (dat.success == '2') {
                    sendError('服务器忙,请稍候重试');
                }
                else if (dat.success == '3') {

                    mobiPageChange('.Page_1');
                    $("#spanname360").html(dat.uname);
                    $(".DLink.DLink_1").hide();
                    $(".DLink.DLink_2").hide();
                    $(".DLink.DLink_3").show();
                    $(".DLink.DLink_4").show();
                    $("#hidphone").val(phoneNo);
                    $("#txtname360").val(dat.uname);
                    $("#txtphone360").val(phoneNo);

                }
                else if (dat.success == '4') {

                    sendError('用户不存在，请注册一个新帐户');
                }
                else {
                    sendError('格式错误,请重新输入手机号码');
                }
            }
        }, 'Json');
    } else { sendError('请输入手机号码'); }
}

function AdvantageMobileLogout() {
    $("#hidphone").val("");
    $(".DLink.DLink_1").show();
    $(".DLink.DLink_2").show();
    $(".DLink.DLink_3").hide();
    $(".DLink.DLink_4").hide();
    $.post('/Interface/Logout', {}, function (data2) {
        window.location.href = '/advantage.html';
    });
}
function gotomobil(url) {
    window.location.href = url + "?mobile=" + $("#hidphone").val();
}