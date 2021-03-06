// var picurl ='http://1.cat673.sinaapp.com/';
//var picurl = 'http://img.mobileone.com.cn/';
var picurl = 'http://m.catwj.cn/resource/';
//var SITE_CAT_IMG = 'http://m.catwj.cn/resource/img/';

//var url1 = 'http://catbang.mobileone.com.cn/';
//var url2 = 'http://catwaji2g.mobileone.com.cn/';

var SITE_CATBANG = 'http://m.catwj.cn/catbang/';
//var SITE_CATBANG = 'http://m.catwj.cn/testIndex/40/catbang/';
var SITE_CATWAJI = 'http://m.catwj.cn/';

// 2017-9-19 test by jls
var server_URL = 'http://catwaji.skh5.cn/catbang/MobileApi';
var server_URL = 'http://www.catwj.cn/catbang/MobileApi';



//测试模式
window.isDebug = (window.location.href.indexOf("m.catwj.cn/sk-t-p") > 0) || (location.href.indexOf("localhost") > 0);

//if (window.isDebug) {
//    SITE_CATBANG = 'http://m.catwj.cn/sk-t-p-2/catbang/';
//    SITE_CATWAJI = 'http://m.catwj.cn/sk-t-p-2/';
//}

function localStorageCATClass() {
    this.isLocalStorageSupported = this.checkLocalStorageSupported();
    this.isSessionStorageSupported = this.checkSessionStorageSupported();
    this.isCookieSupported = this.checkCookieSupported();
}

localStorageCATClass.prototype._setCookieItem = function (key, value, exdays) {
    exdays = exdays || 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + exdays * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
};
localStorageCATClass.prototype._getCookieItem = function (key) {
    var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
};
localStorageCATClass.prototype._removeCookieItem = function (key) {
    this._setCookieItem(key, "", -1);
};
localStorageCATClass.prototype._clearCookie = function () {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split(";"); // 将多cookie切割为多个名/值对
    for (var i = 0; i < arrCookie.length; i++) { // 遍历cookie数组，处理每个cookie对
        var arr = arrCookie[i].split("=");
        if (arr.length > 0)
            this._removeCookieItem(arr[0]);
    }
};

localStorageCATClass.prototype.setItem = function (key, value) {
    if (this.isLocalStorageSupported) {
        return window.localStorage.setItem(key, value);
    } else if (this.isSessionStorageSupported) {
        return window.sessionStorage.setItem(key, value);
    } else if (this.isCookieSupported) {
        return this._setCookieItem(key, value);
    }
};

localStorageCATClass.prototype.getItem = function (key) {
    if (this.isLocalStorageSupported) {
        return window.localStorage.getItem(key);
    } else if (this.isSessionStorageSupported) {
        return window.sessionStorage.getItem(key);
    } else if (this.isCookieSupported) {
        return this._getCookieItem(key);
    }
};
localStorageCATClass.prototype.removeItem = function (key) {
    if (this.isLocalStorageSupported) {
        return window.localStorage.removeItem(key);
    } else if (this.isSessionStorageSupported) {
        return window.sessionStorage.removeItem(key);
    } else if (this.isCookieSupported) {
        return this._removeCookieItem(key);
    }
};

localStorageCATClass.prototype.clear = function () {
    if (this.isLocalStorageSupported) {
        return window.localStorage.clear();
    } else if (this.isSessionStorageSupported) {
        return window.sessionStorage.clear();
    } else if (this.isCookieSupported) {
        return this._clearCookie();
    }
};

localStorageCATClass.prototype.checkLocalStorageSupported = function () {
    try {
        if (window.localStorage) {
            localStorage.setItem("isLocalStorageNameSupported", "");
            localStorage.removeItem("isLocalStorageNameSupported");
            return true;
        } else {
            return false;
        }
    }
    catch (err) {
        return false
    }
};

localStorageCATClass.prototype.checkSessionStorageSupported = function () {
    try {
        if (window.sessionStorage) {
            sessionStorage.setItem("isSessionStorageSupported", "");
            sessionStorage.removeItem("isSessionStorageSupported");
            return true;
        } else {
            return false;
        }
    }
    catch (err) {
        return false
    }
};

localStorageCATClass.prototype.checkCookieSupported = function () {
    try {
        var value = "hello";
        this._setCookieItem("isSessionStorageSupported", value);
        return this._getCookieItem("isSessionStorageSupported") == value;
    }
    catch (err) {
        return false
    }
};

function remoteLogger(uid, phone, svcName, parameters, recommend, complteFunc) {
    $.ajax({
        'type': 'GET',
        'url': "http://h5.sktap.cn/app/cat/site/api/logs.php",
        'dataType': 'JSON',
        'data': {
            uid: uid || "",
            phone: phone,
            svcName: svcName,
            parameters: parameters || window.location.search,
            recommend: recommend || ""
        },
        success: function (data) {
            complteFunc && complteFunc(data);
        },
        error: function (data) {
            complteFunc && complteFunc(data);
        }
    })
}

var localStorageCAT = window.localStorageCAT = new localStorageCATClass();


var
    docW = document.documentElement.clientWidth,
    winH = window.innerHeight,
    winW = window.innerWidth,
    supportTouch = "ontouchend" in document,
    touchStartEvent = supportTouch ? "touchstart" : "mousedown",
    touchStopEvent = supportTouch ? "touchend" : "mouseup",
    touchMoveEvent = supportTouch ? "touchmove" : "mousemove",
    isIos = /(iPhone|iPad|iPod)/ig.test(navigator.userAgent),
    isAndroid = /(android)/ig.test(navigator.userAgent);

String.prototype.isMobileNo = function () {//是否是手机号
    return /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(this);

    // return this;
};

$.extend({
    getUrlPara: function (paraName) {
        var str = window.location.search.replace(/^\?/g, ""),
            dstr = str;
        //先解码，解码失败则替换&链接符号，保证内容能够解析
        //解码失败的情况极其少见，以后确认算法后可以优化代码
        try {
            dstr = decodeURI(str);
        } catch (e) {
            dstr = str.replace(/"%26"/g, "&");
        }
        return $.getParaFromString(dstr, paraName) || '';
    },
    //从字符串中捕获参数
    getParaFromString: function (str, paraName) {
        if ($.trim(str).length <= 0) return null;
        var ars = str.split('&'),
            obj = {};
        $.each(ars, function () {
            var ar = this.split('=');
            obj[ar[0]] = decodeURIComponent(ar[1]);
        });
        if (paraName === undefined) {
            return obj;
        } else {
            return obj[paraName] || '';
        }
    }
});

(function (window, $) {
    var test = 0;// for test
    var url = 'http://www.catwj.cn'

    window.onresize = function () {
        document.body.style.zoom = docW / 640;
        document.body.style.display = 'block';
        document.body.style.opacity = 1;
        // document.body.style.width=window.innerWidth;
    }
    window.onload = function () {
        document.body.style.zoom = docW / 640;
        document.body.style.display = 'block';
        document.body.style.opacity = 1;
        // document.body.style.width=window.innerWidth;
    }

    var Core = {
        dataHandle: {
            //产品系列:
            getProductList: function () {
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/GetProductList?t=' + Date.now(),
                    'dataType': 'JSON',
                    'success': function (data) {
                        if (data) {
                            core.productList = data;

                            if ($('.pop-ask').length) {
                                var pop = $('.pop-ask'), h = ['<option value="">请选择</option>'];
                                for (var key in data) {
                                    h.push('<option value="' + key + '">' + data[key] + '</option>');
                                }

                                pop.find('.select-productType select').html(h.join(''))
                            }
                            ;
                        }
                        ;
                    },
                    'error': function (msg, data) {
                        if (test) {
                            data = {
                                "1": "小型挖掘机",
                                "2": "中型挖掘机",
                                "3": "大型挖掘机",
                                "4": "轮式挖掘机",
                                "5": "装载机",
                                "6": "Cat智能",
                                "7": "二手机",
                                "8": "工装"
                            };
                        }
                        ;

                    }
                })
            },
            /*
             *问题列表/搜索
             *@param 
             *@type 1:点击more，否则为点击搜索
             */
            getQuestionList: function (params, type) {
                var loading = core.showLoading();
                params.pagesize = 20;
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/QuestionList?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': params,
                    'success': function (data) {
                        func(data, params, type);
                    },
                    'error': function (msg) {
                        var data;
                        if (test) {
                            data = test_questionList;
                            func(data, params, type);
                        }
                        ;

                    }

                })

                var func = function (data, params, type) {
                    loading.remove();
                    if (!data || !data.List) return;
                    core.questionList_count = data.Count || 0;

                    if (core.questionList_count == 0) {
                        $('.searchNotice').html('抱歉，没有相关信息').show();
                        $('.questList').html('');
                        return;
                    }
                    ;
                    $('.searchNotice').html('共找到' + params.searchVal + '关键词<i>' + core.questionList_count + '</i>条').show();


                    // var len = data.List.length;
                    // if (len>0) {};
                    var list_data = data.List,
                        item = '<div class="item"><p class="ellipsis">{userName}: {title}</p><p class="p2">{Que_CreateTime} <span><i class="ico-note"></i>答复({Que_CommentNum})</span></p><a href="javascript:;" qid={ques_id} class="link link-detail" c_num={Que_CollectNum} p_num={Que_PraiseNum}></a></div>', html = [];
                    for (var i = 0, j = list_data.length; i < j; i++) {
                        var d = list_data[i]
                        var t = item.replace('{title}', d.Que_Title)
                            .replace('{ques_id}', d.Que_Id)
                            .replace('{Que_CommentNum}', d.Que_CommentNum)
                            .replace('{userName}', d.Que_CreateUserName)
                            .replace('{Que_CollectNum}', d.Que_CollectNum)
                            .replace('{Que_PraiseNum}', d.Que_PraiseNum)

                        var time = d.Que_CreateTime.match(/\d+/gi);
                        if (time.length) {
                            time = new Date(parseInt(time[0]));
                            var time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
                            t = t.replace('{Que_CreateTime}', time)
                        } else {
                            t = t.replace('{Que_CreateTime}', '')
                        }

                        html.push(t)
                    }
                    //点击more
                    if (type == 1) {
                        $('.questList').find('.more').before(html.join(''));
                    } else {
                        //点击搜索
                        $('.questList').html(html.join(''));

                        if (core.questionList_count > params.pagesize) {
                            $('.questList').append('<div class="more"><i></i>查看更多</div>')
                        }
                        ;
                    }
                }
            },
            //问题详情
            getQuestionDetail: function (params) {
                params.userId = core.userInfo.userid
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/QuestionDetail?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': params,
                    'success': function (data) {
                        func(data);
                    },
                    'error': function (msg) {
                        var data;
                        if (test) {
                            data = test_questionDetail;
                            func(data);
                        }
                        ;

                    }
                })
                var func = function (data) {
                    if (!data || !data.List) {
                        return
                    }
                    ;

                    var tmpl = '<div class="item"><img src="img/portrait.png" alt=""><div class="txt2"><span style="display:none;">{Ans_CreataUserName} 来评论：</span><p>{Ans_CreataUserName}: {Ans_Content}</p><span>{date}</span></div><a href="javascript:;" ansId="{Ans_Id}" quesId={Ans_QuestionId} uid="{Ans_CreateUserId}" class="reply" nm={Ans_CreataUserName}></a></div>',
                        html = [];
                    var expertObj = null;//专家解答  
                    var queList = data.QueList[0];
                    for (var i = 0; i < data.List.length; i++) {
                        var item = data.List[i];
                        if (!expertObj && item.Ans_IsExpert == 'Y') {
                            expertObj = item;
                            continue;
                        }
                        ;
                        var tt = tmpl.replace(/{Ans_CreataUserName}/gi, item.Ans_CreataUserName).replace('{Ans_Content}', item.Ans_Content).replace('{Ans_Id}', item.Ans_Id).replace('{Ans_QuestionId}', item.Ans_QuestionId).replace('{Ans_CreateUserId}', item.Ans_CreateUserId);

                        // var time = item.Ans_CreateTime.match(/\d+/gi);
                        // 	if (time.length) {
                        // 		var time = parseInt(time[0]),
                        // 		timeSpan = Date.now() - time,//1412312412234
                        // 		one_h=3600000,
                        // 		one_m = 60000,
                        // 		str = '';
                        // 	if (timeSpan<=one_m) {
                        // 		str= '1分钟内';
                        // 	}else if (timeSpan > one_m && timeSpan <=one_h) {
                        // 		str = Math.floor(timeSpan/one_m)+'分钟前';
                        // 	}else if(timeSpan>one_h && timeSpan<=one_h*24){
                        // 		str = Math.floor(timeSpan/one_h)+'小时前';
                        // 	}else{
                        // 		// var t = new Date(time);
                        // 		// str=t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()+' '+t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
                        // 		var one_d = one_h*24;
                        // 		str = Math.floor(timeSpan/one_d)+'天前';
                        // 	}
                        // 	tt = tt.replace('{date}',str);
                        // }else{
                        // 	tt = tt.replace('{date}','');
                        // }
                        var time = item.Ans_CreateTime.match(/\d+/gi);
                        if (time.length) {
                            time = new Date(parseInt(time[0]));
                            time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
                            tt = tt.replace('{date}', time)
                        } else {
                            tt = tt.replace('{date}', '')
                        }


                        html.push(tt)
                    }
                    if ($('.pop-experts-answer').length) {
                        var pop = $('.pop-experts-answer');
                        if (expertObj) {//专家解答
                            var nm = expertObj.Ans_CreataUserName, pic = '';
                            if (nm.indexOf('比尔老师') >= 0) {
                                pic = '1.jpg';
                            } else if (nm.indexOf('陈老师') >= 0) {
                                pic = '2.jpg'
                            } else if (nm.indexOf('韩老师') >= 0) {
                                pic = '3.jpg'
                            } else if (nm.indexOf('牛老师') >= 0) {
                                pic = '4.jpg'
                            } else if (nm.indexOf('Peter（皮特）老师') >= 0) {
                                pic = '5.jpg'
                            } else if (nm.indexOf('王老师') >= 0) {
                                pic = '6.jpg'
                            }
                            nm = nm.substring(0, nm.indexOf('老师') + 2)

                            pop.find('.portrait img').attr('src', 'img/portrait/' + pic);
                            pop.find('.portrait span').text(nm);
                            pop.find('.txt div').append(expertObj.Ans_Content);
                            pop.find('.content .portrait').show();
                            pop.find('.content .txt').show();
                        }
                        ;
                        pop.find('.title p').text(queList.Que_CreateUserName + ':' + queList.Que_Title);
                        var time = queList.Que_CreateTime.match(/\d+/gi);
                        if (time.length) {
                            time = new Date(parseInt(time[0]));
                            time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
                        } else {
                            time = '';
                        }
                        pop.find('.date').append(time);
                        pop.find('.comment').append('答复(' + queList.Que_CommentNum + ')');
                        pop.find('.good em').append(queList.Que_PraiseNum || 0);
                        pop.find('.star em').append(queList.Que_CollectNum || 0);
                        if (data.Praise == 'Y') {
                            pop.find('.good').addClass('on')
                        }
                        ;
                        if (data.Collect == 'Y') {
                            pop.find('.star').addClass('on')
                        }
                        ;

                        pop.find('.other').show();
                        if (html.length) {
                            pop.find('.more').show();
                            pop.find('.answerBox div').html(html.join(''));
                        }
                        ;
                    }
                    ;
                }
            },
            //4、发言:专家点评/全部回答
            getActivitiesDetail: function (params, type) {
                var loading = core.showLoading();
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/ActivitiesDetail?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': params,
                    'success': function (data) {
                        func(data, params, type);
                    },
                    'error': function (msg) {
                        var data;
                        if (test) {
                            data = test_activitiesDetail;
                            func(data, params);
                        }
                        ;

                    }
                })
                var func = function (data, params, type) {
                    loading.remove();
                    if (!data || !data.List) {
                        return
                    }
                    ;
                    if (params.ans_IsExpert == 'Y') {//专家
                        core.getActivitiesDetail_y_count = data.Count || 0;

                        var tmpl = '<div class="item"><img src="img/portrait.png" class="port" alt=""><div class="txt"><span class="c60">{Ans_CreataUserName}老师</span><p class="ellipsis0">{Ans_Content}</p></div><a href="javascript:;" class="link" ansId={Ans_Id} quesId={Ans_QuestionId} uid={Ans_CreateUserId}>我要评论</a></div>', html = [];
                        for (var i = 0; i < data.List.length; i++) {
                            var item = data.List[i];
                            var t = tmpl.replace('{Ans_CreataUserName}', item.Ans_CreataUserName).replace('{Ans_Content}', item.Ans_Content).replace('{Ans_QuestionId}', item.Ans_QuestionId).replace('{Ans_Id}', item.Ans_Id).replace('{Ans_CreateUserId}', item.Ans_CreateUserId);
                            html.push(t);
                        }

                        $('li[rel="#ans1"]').text('专家点评（' + data.List.length + '）');

                        if (type == 1) {//点击more
                            $('#ans1').find('.more').before(html.join(''));
                        } else {
                            $('#ans1').html(html.join(''));
                            if (core.getActivitiesDetail_y_count > params.pagesize) {
                                $('#ans1').append('<div class="more"><i></i>查看更多</div>')
                            }
                            ;
                        }
                    } else {
                        core.getActivitiesDetail_n_count = data.Count || 0;

                        var tmpl = '<div class="item"><img src="img/portrait.png" class="port" alt=""><div class="txt"><span style="display:inline-block;padding-top:16px;">{Ans_CreataUserName}老师</span><p class="ellipsis0">{Ans_Content}</p><span>{date}</span></div><a href="javascript:;" class="link" ansId={Ans_Id} quesId={Ans_QuestionId} uid={Ans_CreateUserId}>我要评论</a></div>', html = [];
                        for (var i = 0; i < data.List.length; i++) {
                            var item = data.List[i];
                            var t = tmpl.replace('{Ans_CreataUserName}', item.Ans_CreataUserName).replace('{Ans_Content}', item.Ans_Content).replace('{Ans_QuestionId}', item.Ans_QuestionId).replace('{Ans_Id}', item.Ans_Id).replace('{Ans_CreateUserId}', item.Ans_CreateUserId);

                            var time = item.Ans_CreateTime.match(/\d+/gi);
                            if (time.length) {
                                var time = parseInt(time[0]),
                                    timeSpan = Date.now() - time,//1412312412234
                                    one_h = 3600000,
                                    one_m = 60000,
                                    str = '';

                                if (timeSpan <= one_m) {
                                    str = '1分钟内';
                                } else if (timeSpan > one_m && timeSpan <= one_h) {
                                    str = Math.floor(timeSpan / one_m) + '分钟前';
                                } else if (timeSpan > one_h && timeSpan <= one_h * 24) {
                                    str = Math.floor(timeSpan / one_h) + '小时前';
                                } else {
                                    var one_d = one_h * 24;
                                    str = Math.floor(timeSpan / one_d) + '天前';
                                }
                                t = t.replace('{date}', str);
                            } else {
                                t = t.replace('{date}', '');
                            }

                            html.push(t);
                        }
                        $('li[rel="#ans2"]').text('全部回答（' + data.List.length + '）');

                        if (type == 1) {//点击more
                            $('#ans2').find('.more').before(html.join(''));
                        } else {
                            $('#ans2').html(html.join(''));
                            if (core.getActivitiesDetail_n_count > params.pagesize) {
                                $('#ans2').append('<div class="more"><i></i>查看更多</div>')
                            }
                            ;
                        }
                    }
                }
            },
            // 5、提交问题
            add_Bang_UserQuestion: function (params) {
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/Add_Bang_UserQuestion?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': params,
                    'success': function (data) {
                    },
                    'error': function (msg) {
                    }
                })
            },
            // 6、回复接口 
            add_Bang_UserQuestionComment: function (params) {
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/Add_Bang_UserQuestionComment?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': params,
                    'success': function (data) {
                    },
                    'error': function (msg, data) {
                    }
                })
            },
            //7、用户登录
            login: function (mobile, cb) {
                var loginUrl = server_URL + '/CatbangLogon?t=' + Date.now();
                if (window.isDebug) {
                    loginUrl = 'http://catsitenew.onestaging.com/catbang/MobileApi/CatbangLogon?t=' + Date.now();
                }
                $.ajax({
                    'type': 'POST',
                    //'url': 'http://www.catwj.cn/catbang/MobileApi/CatbangLogon?t=' + Date.now(),
                    'url': loginUrl,
                    'dataType': 'JSON',
                    'data': {'mobile': mobile},
                    'success': function (data) {
                        remoteLogger("", mobile, "CatbangLogon", window.location.search, JSON.stringify(data), function () {
                            //alert("");
                            func(data);
                        });
                    },
                    'error': function (msg) {
                        remoteLogger("", mobile, "CatbangLogon", window.location.search, "error", function () {
                            var data;
                            if (test) {
                                data = test_catbangLogon;
                                func(test_catbangLogon)
                            }
                        });
                    }
                })
                var func = function (data) {
                    core.showPop();

                    if (!data) return;

                    if (data.userType == 0) {
                        var pop = core.showPop('<div class="pop pop-success hide"><div class="body"><i class="close"></i><div class="content"><p class="one-line">您还未注册，请先注册！</p><div class="btn-ok btn-login"><img src="img/pop/btn-ok.png" alt=""></div></div></div></div>', {
                            'onok': function () {
                                core.register();
                            }
                        });
                        localStorageCAT.setItem('userInfo', '');
                        return;
                    }
                    ;

                    if (data.ErrorCode != 0) {
                        // alert(data.ErrorDetail)
                    } else {
                        core.mobile = data.phone;

                        $('.top-login').addClass('top-logined').text(data.userName)
                        $('.top-loginout').show()

                        //userType：0 新用户，1 卡特挖机用户，2 CLUB用户 ，3卡特帮用户
                        var regInfo = JSON.parse(localStorageCAT.getItem('regInfo') || '{}');

                        //与注册时填写的信息合并
                        if (data.userid == regInfo.userid) {
                            $.extend(data, regInfo)
                        }
                        ;
                        data.area = (data.provinceName + data.cityName) || '';
                        data.phone = data.Phone;
                        data.email = data.Email;
                        data.province = data.Province;
                        data.city = data.City;


                        core.userInfo = data;
                        localStorageCAT.setItem('userInfo', JSON.stringify(data));

                        if (data.userType != 0) {
                            if (cb) {
                                cb(data);
                            } else {
                                window.location.reload();
                            }
                        } else {//新用户
                            core.fillInfo(cb);
                        }
                    }
                }
            },
            // 8、fa 短信验证码
            sendMsg: function (mobile) {
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/SendMsg?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': {'mobilenumber': mobile, 'reset': 1},
                    'success': function (data) {
                        if (!data) {
                            return;
                        }
                        ;
                        var msg = '';
                        switch (data.ErrorCode) {
                            case 0://success
                                break;
                            case -1://fail
                                msg = '注册失败，请重新注册';
                                alert(msg);
                                core.register();
                                break;
                            case -2://error
                                msg = '服务器忙，请稍后注册'
                                alert(msg);
                                break;
                            case 1://已注册
                                msg = '该手机号已注册，请直接登录';
                                alert(msg);
                                core.login();
                                break;
                            case 2://
                                msg = '您已是卡特帮会员，请完善个人信息';
                                alert(msg);
                                core.fillInfo();
                                break;
                        }
                    },
                    'error': function (msg, data) {
                    }
                })
            },
            // 9、验证短信验证码
            checkCode: function (code, mobile) {
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/CheckCode?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': {'getcode': code, 'mobilenumber': mobile, 'reset': 0},
                    'success': function (data) {
                        if (!data) return;
                        if (data.ErrorCode != 0) {
                            alert('验证失败，请确认输入是否正确');
                        } else {
                            core.mobile = mobile;
                            core.fillInfo();
                        }
                    },
                    'error': function (msg) {
                        if (test) {
                            core.mobile = mobile;
                            core.fillInfo();//完善信息
                        }
                        ;
                    }
                })
            },
            // 10、注册，完善信息
            register: function (params, cb) {
                var regUrl = server_URL + '/CatBangRegister?t=' + Date.now();
                if (window.isDebug) {
                    regUrl = 'http://catsitenew.onestaging.com/catbang/MobileApi/CatBangRegister?t=' + Date.now();
                }
                $.ajax({
                    'type': 'POST',
                    //'url': 'http://www.catwj.cn/catbang/MobileApi/CatBangRegister?t=' + Date.now(),
                    'url': regUrl,
                    'dataType': 'JSON',
                    'data': params,
                    'success': function (data) {
                        remoteLogger("", params.mobile, "CatBangRegister", window.location.search, JSON.stringify(data), function () {
                            func(data, params);
                        });

                    },
                    'error': function (msg) {
                        remoteLogger("", params.mobile, "CatBangRegister", window.location.search, "error", function () {
                            func(data, params);
                        });
                    }
                });
                var func = function (data, params) {
                    if (!data) {
                        return;
                    }
                    if (data.ErrorCode != 0) {
                        alert(data.ErrorDetail)
                        return;
                    }
                    var htmlTmpl = '<div class="pop pop-success hide">' +
                        '<div class="body">' +
                        '<i class="close"></i>' +
                        '<div class="content">' +
                        '<img src="img/pop/success.png" alt="" class="suc">' +
                        '<p>恭喜您成为卡特帮会员！</p>' +
                        '<div class="btn-ok btn-login">' +
                        '<img src="img/pop/btn-ok.png" alt="">' +
                        '</div></div></div></div>';
                    var pop = core.showPop(htmlTmpl);
                    //存储注册填写的信息，如果注册公共，登录后会合并

                    params.userid = data.userid;
                    localStorageCAT.setItem('regInfo', JSON.stringify(params));

                    // 	//与缓存中的 登录信息合并
                    // var userInfo = JSON.parse(localStorageCAT.getItem('userInfo')||'{}');
                    // if (userInfo.userid == data.userid) {
                    // 	$.extend(userInfo,params)
                    // };
                    // if (userInfo.proviceid) {
                    // 	userInfo.province = userInfo.proviceid;
                    // };
                    // if (userInfo.cityid) {
                    // 	userInfo.city = userInfo.cityid;
                    // };

                    // userInfo.wTB = userInfo.wantToBuy;
                    // userInfo.area = (userInfo.provinceName+userInfo.cityName)||'';

                    // localStorageCAT.setItem('userInfo',JSON.stringify(userInfo));
                    // window.location.reload();

                    core.dataHandle.login(params.mobile)

                }
            },
            // 11、我提交的问题 type:1 为点击查看跟多，否则为页面首次加载
            myQuestionList: function (params, type) {
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/MyQuestionList?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': params,
                    'success': function (data) {
                        func(data, type)
                    },
                    'error': function (msg) {
                        var data;
                        if (test) {
                            data = test_myQuestionList;
                            func(data, type)
                        }
                        ;

                    }
                })

                var func = function (data, type) {
                    if (!data || !data.List || !data.List.length) return;
                    core.myQuestionList_count = data.Count || 0;

                    var tmpl = '<div class="item"><p class="ellipsis">{Que_Title}</p><p class="p2">{Que_CreateTime} <span><i class="ico-note"></i>答复({Que_CommentNum})</span></p><a href="javascript:;" qid="{Que_Id}" class="link"><img src="img/zhizhao/ans1.png" alt=""></a></div>'
                    html = [];
                    for (var i = 0; i < data.List.length; i++) {
                        var item = data.List[i];
                        var t = tmpl.replace(/{Que_Title}/gi, item.Que_Title).replace('{Que_Id}', item.Que_Id).replace('{Que_CommentNum}', item.Que_CommentNum).replace('{Que_CollectNum}', item.Que_CollectNum).replace('{Que_PraiseNum}', item.Que_PraiseNum);

                        var time = item.Que_CreateTime.match(/\d+/gi);
                        if (time.length) {
                            time = new Date(parseInt(time[0]));
                            var time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
                            t = t.replace('{Que_CreateTime}', time)
                        } else {
                            t = t.replace('{Que_CreateTime}', '')
                        }


                        html.push(t);

                    }

                    if (type != 1) {//页面初次加载
                        $('#part1').html(html.join(''))
                        if (data.Count > params.pagesize) {
                            $('#part1').append('<div class="more"><i></i>查看更多</div>')
                        }
                        ;
                    } else {
                        $('#part1 .more').before(html.join(''))
                    }
                }
            },
            // 12、我提交的评论 
            myCommentList: function (params, type) {
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/MyCommentList?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': params,
                    'success': function (data) {
                        func(data, type)
                    },
                    'error': function (msg) {
                        var data;
                        if (test) {
                            data = test_myCommentList;
                            func(data, type)
                        }
                        ;
                    }
                })
                var func = function (data, type) {
                    if (!data || !data.List || !data.List.length) return;
                    core.myCommentList_count = data.Count || 0;

                    var tmpl = '<div class="item"><p>{Ans_Content}</p><p class="p2">{Ans_CreateTime} </p><a href="javascript:;" qid="{Que_Id}" class="link hide"><img src="img/zhizhao/ans1.png" alt="" quesid={Ans_QuestionId} andId="{Ans_Id}"></a></div>'
                    html = [];
                    for (var i = 0; i < data.List.length; i++) {
                        var item = data.List[i];
                        var t = tmpl.replace('{Ans_Content}', item.Ans_Content).replace('{Ans_QuestionId}', item.Ans_QuestionId).replace('{Ans_Id}', item.Ans_Id).replace('{Que_Id}', item.Ans_QuestionId).replace('{Que_CollectNum}', item.Que_CollectNum || '').replace('{Que_PraiseNum}', item.Que_PraiseNum || '').replace('{Que_Title}', item.Que_Title || '');
                        if (item.Ans_IsExpert == 'T1') {//你问我答
                            t = t.replace('{type}', '2')
                        } else if (item.Ans_IsExpert == 'T2') {//发言有礼
                            t = t.replace('{type}', '3')
                        }

                        var time = item.Ans_CreateTime.match(/\d+/gi);
                        if (time.length) {
                            time = new Date(parseInt(time[0]));
                            var time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
                            t = t.replace('{Ans_CreateTime}', time)
                        } else {
                            t = t.replace('{Ans_CreateTime}', '')
                        }

                        html.push(t);

                    }

                    if (type != 1) {//页面初次加载
                        $('#part2').html(html.join(''))
                        if (data.Count > params.pagesize) {
                            $('#part2').append('<div class="more"><i></i>查看更多</div>')
                        }
                        ;
                    } else {
                        $('#part2 .more').before(html.join(''))
                    }
                }
            },
            //13、我收到的评论
            myCommentGetList: function (params, type) {
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/MyCommentGetList?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': params,
                    'success': function (data) {
                        func(data, type)
                    },
                    'error': function (msg) {
                        var data;
                        if (test) {
                            data = test_myCommentGetList;
                            func(data, type)
                        }
                        ;
                    }
                })
                var func = function (data, type) {
                    if (!data || !data.List || !data.List.length) return;
                    core.myCommentGetList_count = data.Count || 0;

                    var tmpl = '<div class="item"><p>{Ans_Content}</p><p class="p2">{Ans_CreateTime} </p><a href="javascript:;" qid="{Que_Id}" class="link hide"><img src="img/zhizhao/ans1.png" alt="" quesid={Ans_QuestionId} andId="{Ans_Id}"></a></div>'
                    html = [];
                    for (var i = 0; i < data.List.length; i++) {
                        var item = data.List[i];
                        var t = tmpl.replace('{Ans_Content}', item.Ans_Content).replace('{Ans_QuestionId}', item.Ans_QuestionId).replace('{Ans_Id}', item.Ans_Id).replace('{Que_Id}', item.Ans_QuestionId).replace('{Que_CollectNum}', item.Que_CollectNum || '').replace('{Que_PraiseNum}', item.Que_PraiseNum || '').replace('{Que_Title}', item.Que_Title || '');
                        if (item.Ans_IsExpert == 'T1') {//你问我答
                            t = t.replace('{type}', '2')
                        } else if (item.Ans_IsExpert == 'T2') {//发言有礼
                            t = t.replace('{type}', '3')
                        }

                        var time = item.Ans_CreateTime.match(/\d+/gi);
                        if (time.length) {
                            time = new Date(parseInt(time[0]));
                            var time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
                            t = t.replace('{Ans_CreateTime}', time)
                        } else {
                            t = t.replace('{Ans_CreateTime}', '')
                        }

                        html.push(t);

                    }

                    if (type != 1) {//页面初次加载
                        $('#part3').html(html.join(''))
                        if (data.Count > params.pagesize) {
                            $('#part3').append('<div class="more"><i></i>查看更多</div>')
                        }
                        ;
                    } else {
                        $('#part3 .more').before(html.join(''))
                    }
                }
            },
            // 14、我收藏的问题  
            myCollectionList: function (params, type) {
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/MyCollectionList?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': params,
                    'success': function (data) {
                        func(data, type)
                    },
                    'error': function (msg) {
                        var data;
                        if (test) {
                            data = test_myCollectionList;
                            func(data, type)
                        }
                        ;
                    }
                })
                var func = function (data, type) {
                    if (!data || !data.List || !data.List.length) return;
                    core.myCollectionList_count = data.Count || 0;

                    var tmpl = '<div class="item"><p>{Que_Title}</p><p class="p2">{Que_CreateTime} <span><i class="ico-note"></i>答复({Que_CommentNum})</span></p><a href="javascript:;" qid="{Que_Id}" class="link"><img src="img/zhizhao/ans.png" alt=""></a></div>'
                    html = [];
                    for (var i = 0; i < data.List.length; i++) {
                        var item = data.List[i];
                        var t = tmpl.replace('{Que_Title}', item.Que_Title).replace('{Que_Id}', item.Que_Id).replace('{UserId}', item.UserId).replace('{Que_CommentNum}', item.Que_CommentNum);


                        var time = item.Que_CreateTime.match(/\d+/gi);
                        if (time.length) {
                            time = new Date(parseInt(time[0]));
                            var time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
                            t = t.replace('{Que_CreateTime}', time)
                        } else {
                            t = t.replace('{Que_CreateTime}', '')
                        }


                        html.push(t);

                    }

                    if (type != 1) {//页面初次加载
                        $('#part1').html(html.join(''))
                        if (data.Count > params.pagesize) {
                            $('#part1').append('<div class="more"><i></i>查看更多</div>')
                        }
                        ;
                    } else {
                        $('#part1 .more').before(html.join(''))
                    }
                }
            },
            // 15、增加赞，收藏（查询修改）
            update_Num: function (params) {
                $.ajax({
                    'type': 'GET',
                    'url': server_URL + '/Update_Num?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': params,
                    'success': function (data) {
                        // data = {'ErrorCode' : 0, 'ErrorDetail' : "成功", 'Status' : "A" , 'Count' :100 };
                        if (data && data.ErrorCode == 0) {

                        }
                        ;
                    },
                    'error': function (msg, data) {

                    }
                })
            },
            //16、省列表
            getProvince: function (cb) {
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/GetProvince?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': {},
                    'success': function (data) {
                        func(data)
                    },
                    'error': function (msg) {
                        var data;
                        if (test) {
                            data = test_getProvince;
                            func(data)
                        }
                        ;

                    }
                })
                var func = function (data) {
                    if (data && data.List && data.List.length) {
                        localStorageCAT.setItem('province', JSON.stringify(data.List))

                        if (core.userInfo.ErrorCode == 0) {
                            var p = data.List;
                            for (var i = 0; i < p.length; i++) {
                                if (p[i].A_Id == +core.userInfo.province) {
                                    core.userInfo.provinceName = p[i].A_Name;
                                }
                                ;
                            }
                        }
                        ;

                        core.userInfo.area = (core.userInfo.provinceName + core.userInfo.cityName) || '';
                        localStorageCAT.setItem('userInfo', JSON.stringify(core.userInfo))

                        !!cb && cb(data.List);
                    }
                    ;
                }
            },
            //17、市列表
            getCity: function (provinceid, cb) {
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/GetCity?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': {'provinceid': provinceid},
                    'success': function (data) {
                        func(data)
                    },
                    'error': function (msg) {
                        var data
                        if (test) {
                            data = test_getCity;
                            func(data)
                        }
                        ;
                    }
                })
                var func = function (data) {
                    if (data && data.List && data.List.length) {
                        var
                            pop = $('.pop-fillInfo'),
                            html = [];
                        if (pop.length) {
                            for (var i = 0; i < data.List.length; i++) {
                                var item = data.List[i];
                                if (item.A_Id == +core.userInfo.city) {
                                    html.push('<option selected value="' + item.A_Id + '">' + item.A_Name + '</option>')
                                } else {
                                    html.push('<option value="' + item.A_Id + '">' + item.A_Name + '</option>')
                                }
                            }
                            pop.find('.select-city select').html(html.join(''));
                        }
                        ;

                        if (core.userInfo.ErrorCode == 0) {
                            var p = data.List;
                            for (var i = 0; i < p.length; i++) {
                                if (p[i].A_Id == +core.userInfo.city) {
                                    core.userInfo.cityName = p[i].A_Name;
                                }
                                ;
                            }
                        }
                        ;

                        core.userInfo.area = (core.userInfo.provinceName + core.userInfo.cityName) || '';

                        localStorageCAT.setItem('userInfo', JSON.stringify(core.userInfo))

                        !!cb && cb();
                    }
                    ;
                }
            },
            //18、修改个人资料
            update_Profile: function (params) {
                $.ajax({
                    'type': 'POST',
                    'url': server_URL + '/Update_Profile?t=' + Date.now(),
                    'dataType': 'JSON',
                    'data': params,
                    'success': function (data) {
                        func(data)
                    },
                    'error': function (msg) {
                        func(data)
                    }
                })
                var func = function (data) {
                    if (!data) {
                        return
                    }
                    ;
                    //与缓存中的 登录信息合并
                    var userInfo = JSON.parse(localStorageCAT.getItem('userInfo') || '{}');
                    if (userInfo.userid == params.userid) {
                        $.extend(userInfo, params)
                    }
                    ;
                    userInfo.province = userInfo.province;
                    userInfo.area = (userInfo.provinceName + userInfo.cityName) || '';

                    localStorageCAT.setItem('userInfo', JSON.stringify(userInfo));

                    window.location.reload();
                }
            },
            //收藏文章,自定义接口 ,跨域
            collect_article: function (params, callback) {
                $.ajax({
                    'type': 'GET',
                    'url': 'http://h5.sktap.cn/app/cat/catbang/api/collect.php?t=' + Date.now(),
                    // 'url':'http://localhost/catbang/php/collect.php',
                    'dataType': 'jsonp',
                    'jsonp': "jsoncallback",
                    'data': params,
                    'success': function (data) {
                        //console.log(data);
                        callback && callback(data);
                    },
                    'error': function () {
                    }
                })
            }
        },
        showLoading: function () {
            if (!$('.loading').length) {
                $('body').append('<div class="loading"><i></i></div>');
            }
            ;

            return $('.loading');
        },
        // 显示弹窗  pop_zhizhao
        showPop: function (htmlTmpl, opts, noClose) {
            var winST = $(window).scrollTop();

            function pop_remove() {
                $('.pop').remove();
                $('.main').css({'height': 'auto', 'overflow': ''})
                // $('.main')[0].style.cssText='';
                $(window).scrollTop(winST)
            }

            if (!htmlTmpl) {
                pop_remove()
                return;
            }
            ;
            var opts = opts || {};
            // $(document).scrollTop(0);

            if (!noClose) {
                pop_remove()
            }
            ;
            $('body').append(htmlTmpl);
            var pop = $('.pop');


            pop.find('.select-province select').change(function (e) {
                core.dataHandle.getCity(this.value)
            })

            pop.find('.close').on(touchStartEvent, function (e) {
                e.preventDefault()
                var self = $(this)
                setTimeout(function () {
                    pop_remove()
                }, 200);
                !!opts.onclose && opts.onclose();
            })
            pop.find('.btn-ok').on('click', function (e) {
                pop_remove()
                !!opts.onclose && opts.onclose();
                !!opts.onok && opts.onok();
            })
            pop.click(function (e) {
                if (!$(e.target).closest('.body').length) {
                    pop_remove()

                    !!opts.onclose && opts.onclose();
                }
                ;
            })
            pop.show();

            // pop.height(pop.find('.body').outerHeight()+200)

            var body = pop.find('.body'),
                bodyH = body.outerHeight(),
                t = (winH - bodyH) / 2 + 30;

            var a = Math.max(winH, bodyH)
            if (opts.noFixed) {
                $('.main').css({'height': winH + 'px', 'overflow': 'hidden'})
                pop.css({'overflow-y': 'auto'})
                body.css({'position': 'absolute', 'top': 30})
            } else {
                t = t <= 0 ? '20px' : t;
                body.css({'top': t})
            }

            if (opts.top) {
                body.css({'top': opts.top})
            }
            ;
            if (opts.touchmoveTarget) {
                pop.on(touchMoveEvent, function (e) {
                    var body = $(e.target).closest('.body');
                    if (!body.length) {
                        e.preventDefault();
                    }
                    ;
                })
                //touchMoveEvent
                var y = 0, y1 = 0, mt = 0,
                    obj1 = pop.find('.answerBox'),
                    h1 = 0,
                    h2 = 0;
                obj1.on(touchStartEvent, function (e) {
                    var target = e.target;

                    h1 = obj1.outerHeight(),
                        h2 = pop.find('.answerBox>div').outerHeight();

                    y = y1 = e.originalEvent.targetTouches[0].pageY

                    mt = parseInt(pop.find('.answerBox>div').css('margin-top')) || 0;
                })
                obj1.on(touchMoveEvent, function (e) {
                    y1 = e.originalEvent.targetTouches[0].pageY
                    var t = mt + (y1 - y) * 5;

                    if (t >= 0) {
                        pop.find('.answerBox>div').css({'margin-top': 0})
                    } else if ((-t) + h1 < h2) {
                        pop.find('.answerBox>div').css({'margin-top': t})
                    }
                })

                var y_ = 0, y_1 = 0, mt_ = 0,
                    obj2 = pop.find('.content .txt'),
                    h1_ = 0,
                    h2_ = 0;

                obj2.on(touchStartEvent, function (e) {
                    var target = e.target

                    h1_ = obj2.outerHeight(),
                        h2_ = obj2.find('.t').outerHeight()

                    y_ = y_1 = e.originalEvent.targetTouches[0].pageY

                    mt_ = parseInt(obj2.find('.t').css('margin-top')) || 0;

                })
                obj2.on(touchMoveEvent, function (e) {
                    y_1 = e.originalEvent.targetTouches[0].pageY
                    var t = mt_ + (y_1 - y_);

                    if (t >= 0) {
                        obj2.find('.t').css({'margin-top': 0})
                    } else if ((-t) + h1_ < h2_) {
                        obj2.find('.t').css({'margin-top': t})
                    }
                })


                var y3 = 0, y4 = 0, mt3 = 0,
                    obj3 = pop.find('.title'),
                    h3 = 0,
                    h4 = 0;
                obj3.on(touchStartEvent, function (e) {
                    var target = e.target;

                    h3 = obj3.outerHeight(),
                        h4 = pop.find('.title p').outerHeight();

                    y3 = y4 = e.originalEvent.targetTouches[0].pageY

                    mt3 = parseInt(pop.find('.title p').css('margin-top')) || 0;
                })
                obj3.on(touchMoveEvent, function (e) {
                    y4 = e.originalEvent.targetTouches[0].pageY
                    var t = mt3 + (y4 - y3) * 5;

                    if (t >= 0) {
                        pop.find('.title p').css({'margin-top': 0})
                    } else if ((-t) + h3 < h4) {
                        pop.find('.title p').css({'margin-top': t})
                    }
                })


            } else {
                pop.on(touchMoveEvent, function (e) {
                    e.preventDefault();
                })
            }

            $(window).on('resize', function () {
                $('.pop-experts-answer').scrollTop(1000)
            })

            return pop;
        },
        login: function (cb) {
            var htmlTmpl = '<div class="pop pop-login hide">' +
                '<div class="body">' +
                '<i class="close"></i>' +
                '<div class="title">' +
                '<img src="' + SITE_CATBANG + 'img/pop/title1.png" alt="">' +
                '</div>' +
                '<div class="content">' +
                '<div class="inputBox">' +
                '<span>手机号码:</span>' +
                '<input type="number" class="mobile" maxlength="11">' +
                '</div>' +
                '<p class="notice">请填写您当时注册的手机号</p>' +
                '<div class="btn-confirm btn-login">' +
                '<img src="' + SITE_CATBANG + 'img/pop/btn-login.png" alt="">' +
                '</div>' +
                '<p class="bottom">如果您还未注册本站，请<img class="link" src="' + SITE_CATBANG + 'img/pop/link1.png" alt=""></p>' +
                '</div>' +
                '</div>' +
                '</div>';

            var pop = core.showPop(htmlTmpl);
            pop.find('.close').on('click', function () {
                dataLayer.push({'event': 'event', 'category': '所有页面', 'action': '点击按钮', 'label': '会员登录_点击按钮_关闭'});
            })
            //pop.find('input').focus();
            pop.find('.btn-confirm').click(function (e) {
                var mobile = pop.find('.mobile').val();
                if (!mobile.isMobileNo()) {
                    alert('请输入正确的手机号');
                    return;
                }
                dataLayer.push({'event': 'event', 'category': '所有页面', 'action': '点击按钮', 'label': '会员登录_点击按钮_登录'});

                core.dataHandle.login(mobile, cb);
            })
            //register
            pop.find('.link').click(function (e) {
                core.register();

                dataLayer.push({'event': 'event', 'category': '所有页面', 'action': '点击按钮', 'label': '会员登录_点击按钮_注册先}'});

            })
        },
        checkLogin: function () {
            var userInfo = core.userInfo;
            if (userInfo.ErrorCode != 0) {
                core.login();
            } else {
                //用户身份：0 新用户，1 卡特挖机用户，2 CLUB用户 ，3卡特帮用户
                if (userInfo.userType != 3) {
                    core.fillInfo();
                }
            }
        },
        register: function () {
            var htmlTmpl = '<div class="pop pop-register hide">' +
                '<div class="body">' +
                '<i class="close"></i>' +
                '<div class="title">' +
                '<img src="' + SITE_CATBANG + 'img/pop/title2.png" alt="">' +
                '</div>' +
                '<div class="content">' +
                '<p class="top-txt">欢迎来到Cat挖机查询中心,完成注册即可咨询价格查询更多信息</p>' +
                '<div class="inputBox">' +
                '<span class="label">手机号码:</span>' +
                '<input type="text" class="mobile" maxlength="11">' +
                '<img src="' + SITE_CATBANG + 'img/pop/btn-code.png" alt="" class="btn-checkCode">' +
                '<img src="' + SITE_CATBANG + 'img/pop/btn-code-gray.png" alt="" class="btn-checkCode hide">' +
                '</div>' +
                '<div class="inputBox">' +
                '<span class="label">验&nbsp;&nbsp;证&nbsp;&nbsp;码:</span>' +
                '<input type="text" class="code" maxlength="6">' +
                '<span class="time hide">59秒</span>' +
                '</div>' +
                '<div class="btn-confirm btn-login">' +
                '<img src="' + SITE_CATBANG + 'img/pop/btn-ok.png" alt="">' +
                '</div>' +
                '<p class="bottom">如果您已注册，请<img class="link" src="' + SITE_CATBANG + 'img/pop/link2.png" alt=""></p>' +
                '</div>' +
                '</div>' +
                '</div>';

            var pop = core.showPop(htmlTmpl);

            if (core.leftTime) {
                pop.find('.btn-checkCode').hide().next().show();
                pop.find('.time').show().text(core.leftTime + '秒');
                core.leftTimeInterval = setInterval(function () {
                    core.leftTime--;
                    pop.find('.time').text(core.leftTime + '秒')

                    if (core.leftTime <= 0) {
                        clearInterval(core.leftTimeInterval);
                        pop.find('.btn-checkCode').show().next().hide();
                        pop.find('.time').hide();
                    }
                    ;
                }, 1000);
            }

            //发送验证码
            pop.find('.btn-checkCode').click(function (e) {
                if (core.leftTime > 0) return;

                var mobile = pop.find('.mobile').val();
                if (!mobile.isMobileNo()) {
                    alert('请输入正确的手机号')
                    return;
                }
                ;

                $(this).hide().next().show();
                core.dataHandle.sendMsg(mobile);

                if (!core.leftTime) {
                    core.leftTime = 60
                }
                ;
                pop.find('.time').show().text(core.leftTime + '秒')
                core.leftTimeInterval = setInterval(function () {
                    core.leftTime--;
                    pop.find('.time').text(core.leftTime + '秒')

                    if (core.leftTime <= 0) {
                        clearInterval(core.leftTimeInterval);
                        pop.find('.btn-checkCode').show().next().hide();
                        pop.find('.time').hide();
                    }
                    ;
                }, 1000);
            })
            //确定
            pop.find('.btn-confirm').click(function (e) {
                var mobile = pop.find('.mobile').val();
                if (!mobile.isMobileNo()) {
                    alert('请输入正确的手机号')
                    return;
                }
                ;
                var code = pop.find('.code').val();
                if (code.length < 4 || /[^\d+]/gi.test(mobile)) {
                    alert('请输入正确的验证码')
                    return;
                }
                core.dataHandle.checkCode(code, mobile);
            })
            //login
            pop.find('.link').click(function (e) {
                core.login();
            })
        },
        //完善信息
        fillInfo: function (cb) {
            var htmlTmpl = '<div class="pop pop-fillInfo hide">' +
                '<div class="body ">' +
                '<i class="close"></i>' +
                '<div class="title">' +
                '<img src="img/pop/title3.png" alt="">' +
                '</div>' +
                '<div class="content">' +
                '<div class="inputBox">' +
                '<span>手机号码:</span>' +
                '<input type="text" class="mobile" value="{mobile}">' +
                '</div>' +
                '<div class="inputBox">' +
                '<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>' +
                '<input type="text" class="name">' +
                '</div>' +
                '<div class="inputBox">' +
                '<span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</span>' +
                '<input type="text" class="email">' +
                '</div>' +
                '<div class="inputBox inputBox-select">' +
                '<span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区:</span>' +
                '<div class="select select-province"><select><option>省</option></select></div>' +
                '</div>' +
                '<div class="inputBox inputBox-select">' +
                '<span style="display:inline-block;width:80px;"></span>' +
                '<div class="select select-city"><select><option>市</option></select></div>' +
                '</div>' +
                '<div class="question">' +
                '<p>*您是否有意向购买Cat？</p>' +
                '<label for="ques1_y"><input type="radio" name="ques1" id="ques1_y" value="y">有</label>' +
                '<label for="ques1_n"><input type="radio" name="ques1" id="ques1_n" value="n" class="checked" checked="checked">没有</label>' +
                '<p>*您是否购买过Cat？</p>' +
                '<label for="ques2_y"><input type="radio" name="ques2" id="ques2_y" value="y">买过</label>' +
                '<label for="ques2_n"><input type="radio" name="ques2" id="ques2_n" value="n" class="checked" checked="checked">没买过</label>' +
                '<p>*您是否使用过Cat？</p>' +
                '<label for="ques3_y"><input type="radio" name="ques3" id="ques3_y" value="y">用过</label>' +
                '<label for="ques3_n"><input type="radio" name="ques3" id="ques3_n" value="n" class="checked" checked="checked">没用过</label>' +
                '<p>*您是否订阅卡特帮资讯？</p>' +
                '<label for="ques4_y"><input type="radio" name="ques4" id="ques4_y" value="y">有</label>' +
                '<label for="ques4_n"><input type="radio" name="ques4" id="ques4_n" value="n" class="checked" checked="checked">没</label>' +
                '</div>' +
                '<div class="btn-confirm btn-login">' +
                '<img src="img/pop/btn-sub.png" alt="">' +
                '</div></div>' +
                    // '<div class="select-box select-box-province hide"><ul class="province"></ul></div>'+
                    // '<div class="select-box select-box-city hide" style="top:524px;"><ul class="city"></ul></div>'+
                '</div></div>';

            htmlTmpl = htmlTmpl.replace('{mobile}', core.mobile);

            var pop = core.showPop(htmlTmpl, {'touchmoveTarget': '.body', 'noFixed': '1'});

            var province = JSON.parse(localStorageCAT.getItem('province') || '[]');
            if (!province.length) {
                core.dataHandle.getProvince(function (province) {
                    var html = [];
                    for (var i = 0; i < province.length; i++) {
                        var item = province[i];
                        html.push('<option value="' + item.A_Id + '">' + item.A_Name + '</option>')
                    }
                    $('.pop-fillInfo').find('.select-province select').html(html.join(''));
                });
            } else {
                var html = [];
                for (var i = 0; i < province.length; i++) {
                    var item = province[i];
                    html.push('<option value="' + item.A_Id + '">' + item.A_Name + '</option>')
                }
                pop.find('.select-province select').html(html.join(''));
            }

            pop.find('.question').click(function (e) {
                var target = e.target,
                    label = $(target).closest('label');
                if (!label.length) return;
                var nm = label.find('input').attr('name');
                pop.find('[type="radio"][name="' + nm + '"]').removeClass('checked')[0].checked = false;
                label.find('input').addClass('checked')[0].checked = true;
            })
            pop.find('.btn-confirm').click(function (e) {
                var reg_email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                var name = pop.find('.name').val();
                if (!name) {
                    alert('请正确输入姓名')
                    return;
                }
                ;
                var email = pop.find('.email').val();
                if (!reg_email.test(email)) {
                    alert('请正确输入邮箱')
                    return;
                }
                ;
                var province = pop.find('.select-province select').val();
                if (!province) {
                    alert('请选择省份');
                    return;
                }
                ;
                var city = pop.find('.select-city select').val();
                if (!city) {
                    alert('请选择市区');
                    return;
                }
                ;


                var params = {
                    'mobile': pop.find('.mobile').val(),
                    'username': name,
                    'proviceid': province,
                    'cityid': city,
                    'email': email,
                    'wantToBuy': 'N',
                    'bought': 'N',
                    'used': 'N',
                    'subscribe': 'N',
                    'utmsource': '',
                    'utmmedium': '',
                    'utmcontent': '',
                    'utmcampaign': '',
                    'utmterm': '',
                    'gaid': ''
                };
                pop.find('.question [type="radio"]').each(function (k, v) {
                    if (v.checked) {
                        if (k == 0) {
                            params.wantToBuy = 'Y';
                        } else if (k == 2) {
                            params.bought = 'Y';
                        } else if (k == 4) {
                            params.used = 'Y';
                        } else if (k == 6) {
                            params.subscribe = 'Y';
                        }
                    }
                    ;
                })

                params.provinceName = pop.find('.select-province select option[value="' + province + '"]').text()
                params.cityName = pop.find('.select-city select option[value="' + city + '"]').text()

                core.dataHandle.register(params, cb);
            })

        },
        //修改个人资料
        updateInfo: function () {
            var htmlTmpl = '<div class="pop pop-fillInfo hide">' +
                '<div class="body ">' +
                '<i class="close"></i>' +
                '<div class="title">' +
                '<img src="img/pop/title5.png" alt="">' +
                '</div>' +
                '<div class="content">' +
                '<div class="inputBox">' +
                '<span>用户姓名:</span>' +
                    // '<span class="username">&nbsp;&nbsp;{username}</span>'+
                '<input type="text" class="username" value="{username}">' +
                '</div>' +
                '<div class="inputBox">' +
                '<span>注册手机:</span>' +
                    // '<span class="mobile">&nbsp;&nbsp;{mobile}</span>'+
                '<input type="text" class="mobile" value="{mobile}">' +
                '</div>' +
                '<div class="inputBox">' +
                '<span>电子邮箱:</span>' +
                '<input type="text" class="email" value="{email}">' +
                '</div>' +
                '<div class="inputBox inputBox-select">' +
                '<span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区:</span>' +
                '<div class="select select-province"><select><option>省</option></select></div>' +
                '</div>' +
                '<div class="inputBox inputBox-select">' +
                '<span style="display:inline-block;width:80px;"></span>' +
                '<div class="select select-city"><select><option>市</option></select></div>' +
                '</div>' +
                '<div class="question">' +
                '<p>*您是否有意向购买Cat？</p>' +
                '<label for="ques1_y"><input type="radio" name="ques1" id="ques1_y" value="y">有</label>' +
                '<label for="ques1_n"><input type="radio" name="ques1" id="ques1_n" value="n" class="checked" checked="checked">没有</label>' +
                '<p>*您是否购买过Cat？</p>' +
                '<label for="ques2_y"><input type="radio" name="ques2" id="ques2_y" value="y">买过</label>' +
                '<label for="ques2_n"><input type="radio" name="ques2" id="ques2_n" value="n" class="checked" checked="checked">没买过</label>' +
                '<p>*您是否使用过Cat？</p>' +
                '<label for="ques3_y"><input type="radio" name="ques3" id="ques3_y" value="y">用过</label>' +
                '<label for="ques3_n"><input type="radio" name="ques3" id="ques3_n" value="n" class="checked" checked="checked">没用过</label>' +
                '<p>*您是否订阅卡特帮资讯？</p>' +
                '<label for="ques4_y"><input type="radio" name="ques4" id="ques4_y" value="y">有</label>' +
                '<label for="ques4_n"><input type="radio" name="ques4" id="ques4_n" value="n" class="checked" checked="checked">没</label>' +
                '</div>' +
                '<div class="btn-confirm btn-login">' +
                '<img src="img/pop/btn-sub.png" alt="">' +
                '</div></div>' +
                    // '<div class="select-box select-box-province hide" style="top:482px;"><ul class="province"></ul></div>'+
                    // '<div class="select-box select-box-city hide" style="top:582px;"><ul class="city"></ul></div>'+
                '</div></div>';

            var userInfo = core.userInfo;
            htmlTmpl = htmlTmpl.replace('{username}', userInfo.userName || '')
                .replace('{mobile}', userInfo.phone || '')
                .replace('{email}', userInfo.email || '');

            var pop = core.showPop(htmlTmpl, {'touchmoveTarget': '.body', 'noFixed': '1'});

            if (userInfo.wTB == 'Y') {
                pop.find('#ques1_y').addClass('checked')[0].checked = true;
                pop.find('#ques1_n').removeClass('checked')[0].checked = false;
            } else {
                pop.find('#ques1_y').removeClass('checked')[0].checked = false;
                pop.find('#ques1_n').addClass('checked')[0].checked = true;
            }
            if (userInfo.bought == 'Y') {
                pop.find('#ques2_y').addClass('checked')[0].checked = true;
                pop.find('#ques2_n').removeClass('checked')[0].checked = false;
            } else {
                pop.find('#ques2_y').removeClass('checked')[0].checked = false;
                pop.find('#ques2_n').addClass('checked')[0].checked = true;
            }
            if (userInfo.used == 'Y') {
                pop.find('#ques3_y').addClass('checked')[0].checked = true;
                pop.find('#ques3_n').removeClass('checked')[0].checked = false;
            } else {
                pop.find('#ques3_y').removeClass('checked')[0].checked = false;
                pop.find('#ques3_n').addClass('checked')[0].checked = true;
            }
            if (userInfo.subscribe == 'Y') {
                pop.find('#ques4_y').addClass('checked')[0].checked = true;
                pop.find('#ques4_n').removeClass('checked')[0].checked = false;
            } else {
                pop.find('#ques4_y').removeClass('checked')[0].checked = false;
                pop.find('#ques4_n').addClass('checked')[0].checked = true;
            }

            if (userInfo.province) {
                core.dataHandle.getCity(userInfo.province);
            }
            ;

            var province = JSON.parse(localStorageCAT.getItem('province') || '[]');
            if (!province.length) {
                core.dataHandle.getProvince(function (province) {
                    var html = [''];
                    for (var i = 0; i < province.length; i++) {
                        var item = province[i];
                        if (item.A_id == +userInfo.province) {
                            html.push('<option selected value="' + item.A_Id + '">' + item.A_Name + '</option>')
                        } else {
                            html.push('<option value="' + item.A_Id + '">' + item.A_Name + '</option>')
                        }
                    }
                    $('.pop-fillInfo').find('.select-province select').html(html.join(''));
                });
            } else {
                var html = [];
                for (var i = 0; i < province.length; i++) {
                    var item = province[i];
                    if (item.A_Id == +userInfo.province) {
                        html.push('<option selected value="' + item.A_Id + '">' + item.A_Name + '</option>')
                    } else {
                        html.push('<option value="' + item.A_Id + '">' + item.A_Name + '</option>')
                    }
                }
                pop.find('.select-province select').html(html.join(''));
            }
            if (userInfo.city && pop.find('.city option').length == 1) {
                // pop.find('.select-city select').html('<option selected value="'+userInfo.city+'">'+userInfo.cityName+'</option>')
            }
            ;
            // pop.find('.select-province select').on('change',function(e){
            // 	core.dataHandle.getCity(this.value);
            // })
            pop.find('.question').click(function (e) {
                var target = e.target,
                    label = $(target).closest('label');
                if (!label.length) return;
                var nm = label.find('input').attr('name');
                pop.find('[type="radio"][name="' + nm + '"]').removeClass('checked')[0].checked = false;
                label.find('input').addClass('checked')[0].checked = true;
            })
            pop.find('.btn-confirm').click(function (e) {
                var reg_email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

                var email = pop.find('.email').val();
                if (!reg_email.test(email)) {
                    alert('请正确输入邮箱')
                    return;
                }
                ;
                var province = pop.find('.select-province select').val();
                if (!province) {
                    alert('请选择省份');
                    return;
                }
                ;
                var city = pop.find('.select-city select').val();
                if (!city) {
                    alert('请选择市区');
                    return;
                }
                ;


                var params = {
                    'userid': userInfo.userid,
                    'email': email,
                    'province': province,
                    'city': city,
                    'wTB': 'N',
                    'bought': 'N',
                    'used': 'N',
                    'subscribe': 'N'
                };
                pop.find('.question [type="radio"]').each(function (k, v) {
                    if (v.checked) {
                        if (k == 0) {
                            params.wTB = 'Y';
                        } else if (k == 2) {
                            params.bought = 'Y';
                        } else if (k == 4) {
                            params.used = 'Y';
                        } else if (k == 6) {
                            params.subscribe = 'Y';
                        }
                    }
                    ;
                })

                params.provinceName = pop.find('.select-province select option[value="' + province + '"]').text()

                params.cityName = pop.find('.select-city select option[value="' + city + '"]').text()

                core.dataHandle.update_Profile(params);
            })

        },
        //检查微信浏览器
        is_weixinBrowser: false,
        check_weixin: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (/micromessenger/i.test(ua)) { //检查微信客户端浏览器
                core.is_weixinBrowser = true;
            }
            document.addEventListener('WeixinJSBridgeReady', function () {
                //如果执行到这块的代码,就说明是在微信内部浏览器内打开的.(ios里有)
                core.is_weixinBrowser = true;
            })
        },
        factory: function (type) {
            this.userInfo = JSON.parse(localStorageCAT.getItem('userInfo') || '{}');

            if (this.userInfo.ErrorCode == 0) {
                core.mobile = this.userInfo.phone;
                var name = this.userInfo.userName;

                $('.top-login').addClass('top-logined').text(name)
                $('.top-loginout').show()
            }
            ;
            core.check_weixin();

            //homePage|searchPage
            var func_name = 'init_' + type;
            !!this[func_name] && this[func_name]()
        },
        init_homePage: function () {
            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')
                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="' + SITE_CATWAJI + '/p_2g01.html">首页</a></li><li><a href="javascript:;" style="color:#999;">卡特帮</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;

            })

            $('.link-user').click(function (e) {
                if (core.userInfo.ErrorCode != 0) {
                    e.preventDefault();
                    core.login(function () {
                        window.location.href = 'userinfo.html';
                    });
                }
                ;
            })

            $('.box a').on('click', function () {
                var index = $(this).index();

                if (index == 0) {
                    dataLayer.push({'event': 'event', 'category': '首页', 'action': '点击按钮', 'label': '首页_点击按钮_推荐'});
                } else if (index == 1) {
                    dataLayer.push({'event': 'event', 'category': '首页', 'action': '点击按钮', 'label': '首页_点击按钮_专家讲产品'});
                } else if (index == 2) {
                    dataLayer.push({'event': 'event', 'category': '首页', 'action': '点击按钮', 'label': '首页_点击按钮_大家来支招'});
                } else if (index == 3) {
                    dataLayer.push({'event': 'event', 'category': '首页', 'action': '点击按钮', 'label': '首页_点击按钮_最新活动'});
                } else if (index == 4) {
                    dataLayer.push({'event': 'event', 'category': '首页', 'action': '点击按钮', 'label': '首页_点击按钮_个人中心'});
                }
            })

            //var url = "http://hero2016.mobileone.com.cn/mobile/?utm_source=catwaji%5Fm%5Fcatbang&utm_medium=owned&utm_content=161019%5F59%5Fcathero&utm_campaign=1610%5Fwap";
            //增加按钮控制
            //$("#ktxd").on("click", function () {
            //    if (core.userInfo.phone) {
            //        window.location = url + "&mobile=" + core.userInfo.phone;
            //    } else {
            //        window.location = url;
            //    }
            //});
        },
        init_searchPage: function () {
            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')

                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="' + SITE_CATWAJI + 'p_2g01.html">首页</a></li><li><a href="' + SITE_CATBANG + 'index.html">卡特帮</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;

            })

            var kw = $.getUrlPara('kw') || '',
                params = {
                    'searchVal': kw,
                    'pageindex': 0
                };
            if ($.trim(kw)) {
                $('.top-kw').val(kw);
                params.pageindex++;
                core.dataHandle.getQuestionList(params);
            }
            ;

            $('.questList').on(touchStopEvent, '.more', function (e) {
                e.preventDefault();

                params.searchVal = $('.top-kw').val();
                params.pageindex++;
                core.dataHandle.getQuestionList(params, 1);

                if (core.questionList_count) {
                    var total = core.questionList_count;
                    if (total == 0 || params.pageindex * params.pagesize >= total) {
                        $(this).hide();
                    }
                }
                ;
            })

            //查看详情
            $(document).on(touchStopEvent, '.link-detail', function (e) {
                e.preventDefault();
                if (core.userInfo.ErrorCode != 0) {
                    core.login();
                    return false;
                }

                pop_zhizhao($(this).attr('qid'));
            })
        },
        //
        init_ktbPage: function () {
            var core = Core;

            var tab = +($.getUrlPara('tab') || '1');
            $('.tab').find('li').eq(tab - 1).addClass('on').siblings().removeClass('on')
            $('#part' + (tab)).show().siblings('.tab-part').hide();


            var topPic = $('.topPic'),
                count = $('.swipe-wrap').find('img').length;
           //alert(count);
            var index = +$.getUrlPara('t');
            if (!index || index > count) {
                index = count;
            }

            ;
            $(".phase12-btn-red").on("click", function () {
                window.location = "http://m.catwj.cn/large-excavator.html";
            });
            $(".phase12-btn-gray").on("click", function () {
                window.location = "http://hero2016.mobileone.com.cn/mobile";
            });

            $(".phase13-1").on("click", function () {
                window.location = "http://m.catwj.cn/catbang/ktb1-detail.php?id=40";
            });
            $(".phase13-2").on("click", function () {
                dataLayer && dataLayer.push({ 'event': 'event','category': '专家讲产品十三期详情页','action': '点击按钮','label': '专家讲产品十三期详情页_点击按钮_快来注册吧1'});

                window.location = "http://m.catwj.cn/fuel.html?utm_source=catbang%5Fm%5Fwen&utm_medium=owned&utm_content=170303%5F53%5Ffuel&utm_campaign=1703%5Fwap";
            });
            $(".phase13-3").on("click", function () {
                window.location = "http://m.catwj.cn/news/261.html?from=groupmessage&isappinstalled=0";
            });
            //$(".phase13-4").on("click", function () {
            //    window.location = "http://m.catwj.cn/news/261.html?from=groupmessage&isappinstalled=0";
            //});
            $(".phase13-5").on("click", function () {
                dataLayer && dataLayer.push({ 'event': 'event','category': '专家讲产品十三期详情页','action': '点击按钮','label': '专家讲产品十三期详情页_点击按钮_快来注册吧2'});

                window.location = "http://m.catwj.cn/fuel.html?utm_source=catbang%5Fm%5Fwen&utm_medium=owned&utm_content=170303%5F53%5Ffuel&utm_campaign=1703%5Fwap";
            });
            $(".phase13-7").on("click", function () {
                dataLayer && dataLayer.push({ 'event': 'event','category': '专家讲产品十三期详情页','action': '点击按钮','label': '专家讲产品十三期详情页_点击按钮_了解详情'});
                window.location = "http://m.catwj.cn/fuel.html?utm_source=catbang%5Fm%5Fwen&utm_medium=owned&utm_content=170303%5F53%5Ffuel&utm_campaign=1703%5Fwap";
            });




            // topPic.find('.picBox').css({'margin-left':-(index-1)*640})
            topPic.find('.point i').eq(index - 1).addClass('on').siblings().removeClass('on')
            $('.phase' + (index)).show().siblings().hide();

            // fixed by jls in 2017-06-27
            $('.phase').css('visibility','hidden');
            $('.phase' + (index)).css('visibility','visible');
           
            var phaseTimer = setInterval(function(){
                var phaseReadyNum = 0;
                $('.phase').each(function(index, el) {
                   if( $(this).attr('data-ready')=='ready'){
                       $(this).css('visibility','visible');
                        phaseReadyNum++;
                       if(phaseReadyNum == $('.phase').length){
                            console.log('phaseReadyNum'+phaseReadyNum);
                            clearInterval(phaseTimer);
                       }                        
                       return true;
                   } 
                   var isReady = true;
                   $(this).find('img').each(function(index, el) {
                       if(isReady == false) return false;
                       if(this.complete==false || $(this).attr('src') == undefined){
                           isReady = false; 
                       }
                   });
                   isReady = isReady　? 'ready' :  '';
                   $(this).attr('data-ready',isReady);
                });
            },100);

            $('.phase' + (index)).find('img').each(function(){
                $(this).attr('src',$(this).attr('data-src'));
            });

            if((index-1)>=1){
                $('.phase' + (index)).prev().find('img').each(function(){
                    $(this).attr('src',$(this).attr('data-src'));
                });                
            };

            if((index+1)<= $('.phase').length){
                $('.phase' + (index)).next().find('img').each(function(){
                    $(this).attr('src',$(this).attr('data-src'));
                });  
            }
            console.log('length'+$('.phase').length);// fixed by jls in 2017-06-27  end
            

            if (index == 1) {
                topPic.find('.prev').hide();
                topPic.find('.noPrev').show();
                topPic.find('.next').show();
                topPic.find('.noNext').hide();
            } else if (index == count) {
                topPic.find('.prev').show();
                topPic.find('.noPrev').hide();
                topPic.find('.next').hide();
                topPic.find('.noNext').show();
            } else {
                topPic.find('.prev').show();
                topPic.find('.noPrev').hide();
                topPic.find('.next').show();
                topPic.find('.noNext').hide();
            }
            if (count == 1) {
                topPic.find('.noPrev').show()
                topPic.find('.noNext').show()
            }
            ;

            // pure JS
            var elem = document.getElementById('mySwipe');
            window.mySwipe = Swipe(elem, {
                startSlide: index - 1,
                continuous: false,
                callback: function (curIndex, element) {
                    index = curIndex;
                    topPic.find('.point i').eq(index).addClass('on').siblings().removeClass('on');
                    $('.phase' + (index + 1)).show().siblings().hide();
                    // fixed by jls in 2017-06-27
                    if((index-1)>=0){
                        $('.phase' + (index)).prev().find('img').each(function(){
                            $(this).attr('src',$(this).attr('data-src'));
                        });                
                    };
                    if((index+1)< $('.phase').length){
                        $('.phase' + (index)).next().find('img').each(function(){
                            $(this).attr('src',$(this).attr('data-src'));  
                        });  
                    }  // fixed by jls in 2017-06-27  end

                    if (index == 0) {
                        topPic.find('.prev').hide();
                        topPic.find('.noPrev').show();
                        topPic.find('.next').show();
                        topPic.find('.noNext').hide();
                    } else if (index == count - 1) {
                        topPic.find('.prev').show();
                        topPic.find('.noPrev').hide();
                        topPic.find('.next').hide();
                        topPic.find('.noNext').show();
                    } else {
                        topPic.find('.prev').show();
                        topPic.find('.noPrev').hide();
                        topPic.find('.next').show();
                        topPic.find('.noNext').hide();
                    }
                }
            });

            topPic.find('.prev').on('click', function () {
                mySwipe.prev()
            })
            topPic.find('.next').on('click', function () {
                mySwipe.next()
            })

            $('.back').click(function (e) {
                if (location.href.indexOf('ktb1.html') >= 0) {
                    window.location.href = 'ktb.html?tab=1';
                    return;
                }
                ;

                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')

                    if ($('.tab').find('li').eq(1).hasClass('on')) {
                        $('header').append('<ul class="menu-list menu-list-back"><li><a href="' + SITE_CATWAJI + 'p_2g01.html">首页</a></li><li><a href="' + SITE_CATBANG + 'index.html">卡特帮</a></li><li><a href="javascript:;" style="color:#999;">用户讲心得</a></li></ul>');
                    } else {
                        $('header').append('<ul class="menu-list menu-list-back"><li><a href="' + SITE_CATWAJI + 'p_2g01.html">首页</a></li><li><a href="' + SITE_CATBANG + 'index.html">卡特帮</a></li><li><a href="javascript:;" style="color:#999;">专家讲产品</a></li></ul>');
                    }
                } else {
                    $(this).removeClass('back-on')
                }

                return false;

            })


            var collects = JSON.parse(localStorageCAT.getItem('collect') || '{}');
            $('.phase').each(function (k, v) {
                var btn_fav = $(v).find(".btn-fav");
                var curCollectId = btn_fav.attr('collectid');

                if (collects[curCollectId]) {
                    for (var i = 0; i < btn_fav.length; i++) {
                        btn_fav.eq(i).find('img').eq(0).hide();
                        btn_fav.eq(i).find('img').eq(1).show();
                        btn_fav.eq(i).addClass('on')
                    }
                }
            })

            var askPrice = JSON.parse(localStorageCAT.getItem('askPrice') || '{}');
            $('.btn-ask-price').each(function (k, v) {
                var id = $(v).attr('askid');
                if (askPrice[id]) {
                    $(v).find('img').eq(0).hide();
                    $(v).find('img').eq(1).show();
                    $(v).addClass('on');
                }
                ;

            })
            //我要询价
            $(document).on(touchStopEvent, '.btn-ask-price', function (e) {
                e.preventDefault();

                dataLayer.push({'event': 'event', 'category': '专家讲产品页', 'action': '点击按钮', 'label': '专家小课堂_点击按钮_我要询价'});

                if (core.userInfo.ErrorCode != 0) {
                    core.login(function () {
                    });
                    return;
                }
                ;

                var id = $(this).attr('askid');
                if ($(this).hasClass('on')) {
                    $(this).find('img').eq(0).show();
                    $(this).find('img').eq(1).hide();
                    $(this).removeClass('on');

                    askPrice[id] = 0;
                } else {
                    $(this).find('img').eq(0).hide();
                    $(this).find('img').eq(1).show();
                    $(this).addClass('on');
                    askPrice[id] = 1;

                    var pop = core.showPop('<div class="pop pop-success hide"><div class="body"><i class="close"></i><div class="content"><p class="one-line">询价成功！</p><div class="btn-ok btn-login"><img src="img/pop/btn-ok.png" alt=""></div></div></div></div>');
                }
                localStorageCAT.setItem('askPrice', JSON.stringify(askPrice));
            })
            //查看详情
            $('.btn-fav').on(touchStopEvent, function (e) {
                e.preventDefault();

                var collectid = $(this).attr('collectid');
                var url = '';
                if (collectid == '1') {
                    dataLayer.push({
                        'event': 'event',
                        'category': '专家讲产品页',
                        'action': '点击按钮',
                        'label': '专家小课堂_点击按钮_查看详情'
                    });

                    url = 'http://catwaji2g.mobileone.com.cn/p_largescale_12.html?mobile=' + core.userInfo.phone;
                    window.location.href = url;
                } else if (collectid == '3') {
                    dataLayer.push({
                        'event': 'event',
                        'category': '专家讲产品页',
                        'action': '点击按钮',
                        'label': '专家小课堂_点击按钮_查看详情'
                    });

                    url = 'http://catwaji2g.mobileone.com.cn/product-list.html';
                    window.location.href = url;
                } else {
                    //收藏
                    dataLayer.push({
                        'event': 'event',
                        'category': '专家讲产品页',
                        'action': '点击按钮',
                        'label': '专家小课堂_点击按钮_我要收藏'
                    });

                    if (core.userInfo.ErrorCode != 0) {
                        core.login();
                        return;
                    }
                    var btn_fav = $(this).closest('.phase').find('.btn-fav');
                    if ($(this).hasClass('on')) {
                        for (var i = 0; i < btn_fav.length; i++) {
                            btn_fav.eq(i).find('img').eq(0).show();
                            btn_fav.eq(i).find('img').eq(1).hide();
                            btn_fav.eq(i).removeClass('on')
                        }
                        collects[collectid] = '';

                        core.dataHandle.collect_article({'type': 'del', 'id': collectid});
                    } else {
                        for (var i = 0; i < btn_fav.length; i++) {
                            btn_fav.eq(i).find('img').eq(0).hide();
                            btn_fav.eq(i).find('img').eq(1).show();
                            btn_fav.eq(i).addClass('on')
                        }

                        collects[collectid] = '1';

                        var title = '第二期';
                        if (collectid == 4) {
                            title = '第四期'
                        } else if (collectid == 5) {
                            title = '第五期'
                        } else if (collectid == 6) {
                            title = '第六期'
                        } else if (collectid == 7) {
                            title = '第七期'
                        } else if (collectid == 10) {
                            title = '第十期'
                        }
                        //var content = $(this).closest('.product').parent().html();
                        var params = {
                            'type': 'add',
                            'id': collectid,
                            'title': encodeURIComponent(title),
                            'content': '',
                            'userid': core.userInfo.userid
                        };
                        core.dataHandle.collect_article(params);
                    }
                    localStorageCAT.setItem('collect', JSON.stringify(collects));
                }
            })
            $('#part1').find('a').on(touchStopEvent, function (e) {
                dataLayer.push({'event': 'event', 'category': '专家讲产品页', 'action': '点击按钮', 'label': '专家讲产品_点击按钮_了解详情'});

                dataLayer.push({'event': 'event', 'category': '专家讲产品页', 'action': '点击按钮', 'label': '专家讲产品_点击按钮_KV'});
            });

            $('#part2').find('.link').on(touchStopEvent, function (e) {
                dataLayer.push({'event': 'event', 'category': '专家讲产品页', 'action': '点击按钮', 'label': '用户讲心得_点击按钮_了解详情'});
            });

            $('.tab').on(touchStopEvent, function (e) {
                var li = $(e.target).closest('li');
                if (li.index() == 0) {
                    dataLayer.push({
                        'event': 'event',
                        'category': '专家讲产品页',
                        'action': '点击按钮',
                        'label': '专家讲产品_点击按钮_专家小课堂'
                    });
                } else {
                    dataLayer.push({
                        'event': 'event',
                        'category': '专家讲产品页',
                        'action': '点击按钮',
                        'label': '专家讲产品_点击按钮_用户讲心得'
                    });
                }
                dataLayer.push({'event': 'event', 'category': '专家讲产品页', 'action': '点击按钮', 'label': '专家讲产品_点击按钮_KV'});
            })
        },
        init_ktb1DetailPage: function () {
            $('.back').click(function () {
                location.href = 'ktb1.html?tab=2';
            })
        },
        init_ktbDetailPage: function () {
            $('.back').click(function () {
                location.href = 'ktb1.html?tab=2';
            })
        },
        init_zhizhaoPage: function () {

            //获取产品系列，然后缓存
            core.dataHandle.getProductList();

            var tab = +($.getUrlPara('tab') || '1');
            $('.tab1').find('li').eq(tab - 1).addClass('on').siblings().removeClass('on')
            $('#part' + (tab)).show().siblings('.tab-part').hide();


            //问答
            var params = {'searchVal': '', 'pageindex': 1};
            core.dataHandle.getQuestionList(params);

            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')

                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="' + SITE_CATWAJI + 'p_2g01.html">首页</a></li><li><a href="' + SITE_CATBANG + 'index.html">卡特帮</a></li><li><a href="javascript:;" style="color:#999;">大家来提问</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }
                dataLayer.push({'event': 'event', 'category': '大家来提问页', 'action': '点击按钮', 'label': '专家讲产品页_点击按钮_返回'});

                return false;

            })

            $('.tab1').click(function (e) {
                var li = $(e.target).closest('li');
                if (!li.length) return;
                if (li.index() == 0) {
                    $('.ask-fixed').hide();

                    dataLayer.push({
                        'event': 'event',
                        'category': '大家来提问页',
                        'action': '点击按钮',
                        'label': '大家来提问_点击按钮_你问我答'
                    });
                } else {
                    $('.ask-fixed').show();

                    dataLayer.push({
                        'event': 'event',
                        'category': '大家来提问页',
                        'action': '点击按钮',
                        'label': '大家来提问_点击按钮_精华问答'
                    });
                }

            })

            //查看更多
            $('#part1').on(touchStopEvent, '.more', function (e) {
                e.preventDefault();

                params.pageindex++;
                core.dataHandle.getQuestionList(params, 1);

                if (core.questionList_count) {
                    var total = core.questionList_count;
                    if (total == 0 || params.pageindex * params.pagesize >= total) {
                        $(this).hide();
                    }
                }
                ;
            })

            //查看答案 弹窗 touchStopEvent
            $('#part1').on('click', '.link', function (e) {
                e.preventDefault();
                if (core.userInfo.ErrorCode != 0) {
                    core.login();
                    return false;
                    ;
                } else {
                    core.link_detail = $(this);
                    pop_zhizhao($(this).attr('qid'));
                }

                dataLayer.push({'event': 'event', 'category': '大家来提问页', 'action': '点击按钮', 'label': '大家来提问_点击按钮_查看答案'});

                return false;
            })

            //你问我答 主页 的‘提交问题’
            var htmlTmpl = $('#tmpl-ques').html();
            $('#tmpl-ques').remove();
            $('.btn-ques,.input-ques').on('click', function (e) {
                e.preventDefault();

                dataLayer.push({
                    'event': 'event',
                    'category': '大家来提问页',
                    'action': '点击按钮',
                    'label': '提问页_点击按钮_我要提问icon'
                });
                dataLayer.push({'event': 'event', 'category': '所有页面', 'action': '点击按钮', 'label': '提问页_点击按钮_我要提问icon'});

                if (core.userInfo.ErrorCode != 0) {
                    core.login(function () {
                        pop_ques();
                    });
                    return;
                }
                ;
                // var txt = $(this).parent().prev().val();
                // if (txt.length>20) {
                // 	alert('您输入的文字超过了20字！')
                // 	$(this).parent().prev().focus();
                // 	return;
                // };
                pop_ques()
            })

            function pop_ques() {
                var h = ['<option value="">请选择</option>'];
                if (core.productList) {
                    for (var key in core.productList) {
                        h.push('<option value="' + key + '">' + core.productList[key] + '</option>');
                    }
                }
                ;

                var pop = core.showPop(htmlTmpl);
                pop.find('.select-productType select').html(h.join(''))
                pop.find('.select-productType select').on('change', function () {
                    taLayer.push({
                        'event': 'event',
                        'category': '大家来提问页',
                        'action': '点击按钮',
                        'label': '大家来提问_点击按钮_选择挖机提交问题'
                    });
                })
                pop.find('textarea').focus();
                pop.find('.btn-login').click(function (e) {
                    var p = $(this).parent();
                    var productType = $(this).parent().parent().find('.select-productType select').val();
                    if (!productType) {
                        p.find('.notice').removeClass('hide2');
                        return;
                    }
                    ;
                    p.find('.notice').addClass('hide2');

                    var v = p.find('textarea').val();
                    if (!v) {
                        alert('请输入您的问题');
                        return;
                    }
                    ;

                    var params = {
                        'title': v,
                        'producttype': productType,
                        'qtype': '',
                        'expertId': '',
                        'ExpertName': '',
                        'userID': core.userInfo.userid
                    };
                    core.dataHandle.add_Bang_UserQuestion(params);


                    dataLayer.push({
                        'event': 'event',
                        'category': '大家来提问页',
                        'action': '点击按钮',
                        'label': '大家来提问_点击按钮_提交问题'
                    });

                    dataLayer.push({
                        'event': 'event',
                        'category': '大家来提问页',
                        'action': '点击按钮',
                        'label': '大家来提问_点击按钮_问题成功提交'
                    });

                    var pop = core.showPop('<div class="pop pop-success hide"><div class="body "><i class="close"></i><div class="content"><p class="one-line">你的提问已成功提交！</p><div class="btn-login btn-ok"><img src="img/pop/btn-ok.png" alt=""></div></div></div></div> ', {
                        'onclose': function () {
                            window.location.reload();
                        }
                    });

                    $('#part1').find('.input-ques').val('')
                })
            }

            var html = '';
            for (var i = 0; i < jinghua_ques.length; i++) {
                if (i == 0) {
                    html += '<div class="item">' +
                        '<p>2014年卡特帮精彩问答第一期<br><strong>Cat®（卡特）液压挖掘机320D系列2</strong></p>' +
                        '<img src="img/zhizhao/arrow1.png" alt="" class="arrow1">' +
                        '<img src="img/zhizhao/arrow2.png" alt="" class="arrow2">' +
                        '<div class="groupBox hide">';
                } else if (i == 1) {
                    html += '<div class="item">' +
                        '<p>2014年卡特帮精彩问答第二期<br><strong>Cat®（卡特）轮式挖掘机</strong></p>' +
                        '<img src="img/zhizhao/arrow1.png" alt="" class="arrow1">' +
                        '<img src="img/zhizhao/arrow2.png" alt="" class="arrow2">' +
                        '<div class="groupBox hide">';
                } else if (i == 2) {
                    html += '<div class="item">' +
                        '<p>2014年卡特帮精彩问答第三期<br><strong>Cat®（卡特）认证二手设备问题合集</strong></p>' +
                        '<img src="img/zhizhao/arrow1.png" alt="" class="arrow1">' +
                        '<img src="img/zhizhao/arrow2.png" alt="" class="arrow2">' +
                        '<div class="groupBox hide">';
                }
                ;

                for (var j = 0; j < jinghua_ques[i].length; j++) {
                    html += '<div class="box" ques="' + i + '" ans="' + j + '"><i>' + (j + 1) + '</i>' +
                        '<p>' + jinghua_ques[i][j].title + '</p>' +
                        '<img src="img/zhizhao/ans.png" alt="" class="link">' +
                        '</div>';
                }

                html += '</div></div>'
            }

            $('#part2').append(html)

            $('#part2').find('.item').on('click', function (e) {
                var gb = $(this).find('.groupBox');
                $(this).siblings().find('.groupBox').addClass('hide')
                $(this).siblings().find('.arrow1').show().next().hide();

                if (gb.hasClass('hide')) {
                    gb.removeClass("hide")
                    $(this).find('.arrow1').hide().next().show();
                } else {
                    gb.addClass("hide")
                    $(this).find('.arrow1').show().next().hide();
                }
            })

            $('#part2').find('.box').on('click', function (e) {
                var target = e.target,
                    $target = $(target);
                window.location.href = 'jinghua-detail.html?ques=' + $(this).attr('ques') + '&ans=' + $(this).attr('ans')

                return false;
            })

            var type = $.getUrlPara('t'),
                ques_id = $.getUrlPara('qid'),
                share_num = $.getUrlPara('p_num'),
                collect_num = $.getUrlPara('c_num'),
                title = $.getUrlPara('title');
            if (ques_id) {
                if (type == 1 || type == 2) {
                    pop_zhizhao(ques_id);
                } else if (type == 3) {
                    var li1 = $('.tab1 li').eq(0),
                        li2 = $('.tab1 li').eq(1);

                    li1.removeClass('on')
                    $(li1.attr('rel')).hide();

                    li2.addClass('on');
                    $(li2.attr('rel')).show();
                }
                ;
            }
            ;

        },
        init_jinghua_detail: function () {
            var ques = parseInt($.getUrlPara('ques') || '0'),
                ans = parseInt($.getUrlPara('ans') || '0');

            var ans = jinghua_ques[ques][ans];

            $('.teacher' + ques).show();
            $('.top-banner p').html(ans.title);
            $('.txt').html(ans.ans);

            $('.back').click(function () {
                window.location.href = 'zhizhao.html?tab=2'
            })
        },
        init_userInfoPage: function () {
            if (core.userInfo.ErrorCode != 0) {
                window.location.href = 'index.html';
                return;
            }
            ;

            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')

                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="' + SITE_CATWAJI + 'p_2g01.html">首页</a></li><li><a href="' + SITE_CATBANG + 'index.html">卡特帮</a></li><li><a href="javascript:;" style="color:#999;">个人中心</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;

            })


            var txt = $('.info .txt').html();
            var userInfo = core.userInfo;

            txt = txt.replace('{username}', userInfo.userName || '').replace('{mobile}', userInfo.phone || '').replace('{email}', userInfo.email || '').replace('{area}', userInfo.area || '')
            $('.info .txt').html(txt);

            //修改个人资料
            $('.btn-edit img').click(function (e) {
                core.updateInfo();

                dataLayer.push({'event': 'event', 'category': '个人中心页', 'action': '点击按钮', 'label': '个人中心_点击按钮_修改个人资料'});
            })

            $('.btn-ques').on('click', function () {
                dataLayer.push({'event': 'event', 'category': '个人中心页', 'action': '点击按钮', 'label': '个人中心_点击按钮_我的提问'});
            })
            $('.btn-fav').on('click', function () {
                dataLayer.push({'event': 'event', 'category': '个人中心页', 'action': '点击按钮', 'label': '个人中心_点击按钮_我的收藏'});
            })
            $('.btn-home').on('click', function () {
                dataLayer.push({'event': 'event', 'category': '个人中心页', 'action': '点击按钮', 'label': '个人中心_点击按钮_返回首页'});
            })

        },
        init_userInfoPage_ques: function () {
            // if (core.userInfo.ErrorCode != 0) {
            // 	core.login(function(){
            // 		window.location.href='index.html';
            // 	});
            // 	return;
            // };
            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')

                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="' + SITE_CATWAJI + 'p_2g01.html">首页</a></li><li><a href="' + SITE_CATBANG + 'index.html">卡特帮</a></li><li><a href="' + SITE_CATBANG + 'userinfo.html">个人中心</a></li><li><a href="javascript:;" style="color:#999;">我的提问</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;

            })

            var tab = localStorageCAT.getItem('tab');
            if (tab == '2') {
                $('[rel="#part2"]').addClass('on').siblings().removeClass('on');
                $('#part2').show().siblings('.part').hide();
            } else if (tab == '3') {
                $('[rel="#part3"]').addClass('on').siblings().removeClass('on');
                $('#part3').show().siblings('.part').hide();
            }
            ;

            var userInfo = core.userInfo;

            var params_MyQuestionList = {'userid': userInfo.userid, 'pagesize': 20, 'pageindex': 1};
            core.dataHandle.myQuestionList(params_MyQuestionList);

            var params_MyCommentList = {'userid': userInfo.userid, 'pagesize': 20, 'pageindex': 1};
            core.dataHandle.myCommentList(params_MyCommentList);

            var params_MyCommentGetList = {'userid': userInfo.userid, 'pagesize': 20, 'pageindex': 1};
            core.dataHandle.myCommentGetList(params_MyCommentGetList);

            $('.tab li').on('click', function () {
                var index = $(this).index();
                console.log(index);

                if (index == 0) {
                    dataLayer.push({
                        'event': 'event',
                        'category': '个人中心页',
                        'action': '点击按钮',
                        'label': '我的提问_点击按钮_我提交的问题'
                    });
                } else if (index == 1) {
                    dataLayer.push({
                        'event': 'event',
                        'category': '个人中心页',
                        'action': '点击按钮',
                        'label': '我的提问_点击按钮_我提交的评论'
                    });
                } else if (index == 2) {
                    dataLayer.push({
                        'event': 'event',
                        'category': '个人中心页',
                        'action': '点击按钮',
                        'label': '我的提问_点击按钮_我收到的评论'
                    });
                }
                ;
            })
            //查看更多
            $(document).on(touchStopEvent, '.more', function (e) {
                var target = e.targt,
                    part = $(this).closest('.part');

                if (part.hasClass('part1')) {
                    params_MyQuestionList.pageindex++;
                    core.dataHandle.myQuestionList(params_MyQuestionList, 1);

                    if (core.myQuestionList_count) {
                        var total = core.myQuestionList_count;
                        if (total == 0 || params_MyQuestionList.pageindex * params_MyQuestionList.pagesize >= total) {
                            $(this).hide();
                        }
                    }
                } else if (part.hasClass('part2')) {
                    params_MyCommentList.pageindex++;
                    core.dataHandle.myCommentList(params_MyCommentList, 1);

                    if (core.myCommentList_count) {
                        var total = core.myCommentList_count;
                        if (total == 0 || params_MyCommentList.pageindex * params_MyCommentList.pagesize >= total) {
                            $(this).hide();
                        }
                    }
                    ;
                } else if (part.hasClass('part3')) {
                    params_MyCommentGetList.pageindex++;
                    core.dataHandle.myCommentGetList(params_MyCommentGetList, 1);

                    if (core.myCommentGetList_count) {
                        var total = core.myQuestionList_count;
                        if (total == 0 || params_MyCommentGetList.pageindex * params_MyCommentGetList.pagesize >= total) {
                            $(this).hide();
                        }
                    }
                    ;
                }
                ;
            })

            $('#part1').on('click', '.link', function (e) {
                var qid = $(this).attr('qid');

                dataLayer.push({'event': 'event', 'category': '个人中心页', 'action': '点击按钮', 'label': '我提交的问题_点击按钮_查看答案'});

                pop_zhizhao(qid, function () {
                    localStorageCAT.setItem('tab', '1')
                    window.location.reload();
                });
            })

            $('#part2').on('click', '.link', function (e) {
                var qid = $(this).attr('qid');
                console.log(qid);
                dataLayer.push({'event': 'event', 'category': '个人中心页', 'action': '点击按钮', 'label': '我提交的评论_点击按钮_查看答案'});

                pop_zhizhao(qid, function () {
                    localStorageCAT.setItem('tab', '2')
                    window.location.reload();
                });
            })


            $('#part3').on('click', '.link', function (e) {
                var qid = $(this).attr('qid');
                console.log(qid);
                dataLayer.push({'event': 'event', 'category': '个人中心页', 'action': '点击按钮', 'label': '我收到的评论_点击按钮_查看答案'});

                pop_zhizhao(qid, function () {
                    localStorageCAT.setItem('tab', '3')
                    window.location.reload();
                });
            })
        },
        init_userInfoPage_fav: function () {
            if (core.userInfo.ErrorCode != 0) {
                core.login(function () {
                    window.location.href = 'index.html';
                });
                return;
            }
            var userInfo = core.userInfo;

            var titles = {
                "1": {title: "Cat新款大型挖机"},
                "2": {title: "别忘了，关掉你的发动机"},
                "3": {title: "为什么说Cat336D2 GC是为客户而生"},
                "4": {title: "好机手，带来好生意"},
                "5": {title: "Cat科技“智”夺商机"},
                "6": {title: "选择适合设备"},
                "7": {title: "工地布局好，干活更高效"},
                "8": {title: "只超性能，不超预算"},
                "9": {title: "旺季来袭 盈利升级"},
                "10": {title: "低油耗，回本快，Cat设备超值选！"}
            };

            var collects = {};
            core.dataHandle.collect_article({
                'type': 'query',
                'id': 0,
                'userid': core.userInfo.userid
            }, function (data) {
                var htmls = [];
                if (data && data.list) {
                    $.each(data.list, function (i, e) {
                        collects[e.id] = "1";
                        htmls.push('<div class="item" style="height: 120px;">');
                        htmls.push('<img src="img/portrait2.png" class="port" />');
                        htmls.push('<p>');
                        htmls.push(titles[e.id].title);
                        htmls.push('</p>');
                        htmls.push('<a href="ktb1.html?t=');
                        htmls.push(e.id);
                        htmls.push('" class="link"><img src="img/zhizhao/ans.png" alt=""></a>');
                        htmls.push('</div>');
                    });
                }
                localStorageCAT.setItem('collect', JSON.stringify(collects));
                $('#part2').html(htmls.join(''));
            });

            //var collect = JSON.parse(localStorageCAT.getItem('collect') || '{}');
            //if (collect['1']) {
            //    $('#part2').find('.item-ktb').show();
            //}
            //if (collect['2']) {
            //    $('#part2').find('.item-ktb2').show();
            //}

            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')

                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="' + SITE_CATWAJI + 'p_2g01.html">首页</a></li><li><a href="' + SITE_CATBANG + 'index.html">卡特帮</a></li><li><a href="' + SITE_CATBANG + 'userinfo.html">个人中心</a></li><li><a href="javascript:;" style="color:#999;">我的收藏</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;

            })
            var params_MyCollectionList = {'userid': userInfo.userid, 'pagesize': 20, 'pageindex': 1};
            core.dataHandle.myCollectionList(params_MyCollectionList);

            //查看更多
            $(document).on(touchStopEvent, '.more', function (e) {
                var target = e.targt,
                    part = $(this).closest('.part');

                if (part.hasClass('part1')) {
                    params_MyCollectionList.pageindex++;
                    core.dataHandle.myCollectionList(params_MyCollectionList, 1);

                    if (core.myCollectionList_count) {
                        var total = core.myCollectionList_count;
                        if (total == 0 || params_MyCollectionList.pageindex * params_MyCollectionList.pagesize >= total) {
                            $(this).hide();
                        }
                    }

                }
                ;
            })


            $('#part1').on('click', '.link', function (e) {
                var qid = $(this).attr('qid');
                pop_zhizhao(qid, function () {
                    // localStorageCAT.setItem('tab','3')
                    window.location.reload();
                });
            })

        }
    };
    window.core = Core;

    //查看答案的模板
    var tmpl_ans = $('#tmpl-ans').html();
    $('#tmpl-ans').remove();
    //支招的弹窗 
    function pop_zhizhao(ques_id, cb) {
        var htmlTmpl = tmpl_ans;

        var pop = core.showPop(htmlTmpl, {'touchmoveTarget': '.body', 'noFixed': 1, 'top': '40px'});

        var params = {'que_Id': ques_id, 'pagesize': 100, 'pageindex': 1};
        core.dataHandle.getQuestionDetail(params);

        pop.find('.good,.star').click(function (e) {
            var $this = $(this);
            var n = +$this.find('em').text();
            if ($this.hasClass('on') && n > 0) {
                $this.removeClass('on');
                $this.find('em').text(n - 1);
            } else {
                $this.addClass('on')
                $this.find('em').text(n + 1);
            }
            var t = 1;//good;
            if ($this.hasClass('star')) {
                t = 3
                dataLayer.push({'event': 'event', 'category': '大家来提问页', 'action': '点击按钮', 'label': '查看答案_点击按钮_收藏'});
            } else {
                dataLayer.push({'event': 'event', 'category': '大家来提问页', 'action': '点击按钮', 'label': '查看答案_点击按钮_点赞'});
            }
            var params = {'userid': core.userInfo.userid, 'qid': ques_id, 'type': t};
            core.dataHandle.update_Num(params);

            if ($(this)) {
            }
            ;
        })
        pop.find('.share').click(function (e) {
            if (core.is_weixinBrowser) {
                core.showPop('<div class="pop pop-share hide"><img src="img/share1.png?1" alt=""></div>', {}, true);
            } else {
                core.showPop('<div class="pop pop-share hide"><div class="body"><i class="close"></i><img src="img/share2.jpg" alt=""></div></div>', {}, true);
            }
            dataLayer.push({'event': 'event', 'category': '大家来提问页', 'action': '点击按钮', 'label': '查看答案_点击按钮_转发'});
        })
        //回复  
        pop.on('click', '.reply', function (e) {
            e.preventDefault();

            pop.find('.inputBox textarea').focus();

            pop.find('.btn-zhizhao').attr('ansid', $(this).attr('ansid'))

            var nm = $(this).attr('nm');

            var s = core.userInfo.userName + ' 回复 ' + nm + ' 说：';
            pop.find('.inputBox textarea').val(s).data('s', s)

            dataLayer.push({'event': 'event', 'category': '大家来提问页', 'action': '点击按钮', 'label': '查看答案_点击按钮_回复'});

            return false;


            // var params = {'content':txt,'questionId':ques_id,'replayAnsId':'','userId':''};
            // core.dataHandle.add_Bang_UserQuestionComment(params);
        })
        pop.find('.more').click(function (e) {
            var a = pop.find('.answerBox');
            if (!a.hasClass('open')) {
                a.addClass('open').show();
                $(this).find('i').css({
                    '-webkit-transform': 'rotate(180deg)',
                    'transform': 'rotate(180deg)'
                })
            } else {
                a.removeClass('open').hide();
                $(this).find('i')[0].style.cssText = '';
            }

            var h = pop.outerHeight() - pop.find('.inputBox').outerHeight() - pop.find('.title').outerHeight() - pop.find('.content').outerHeight() - pop.find('.more').outerHeight() - 150

            pop.find('.answerBox').css({'max-height': h + 'px'})

            dataLayer.push({'event': 'event', 'category': '大家来提问页', 'action': '点击按钮', 'label': '查看答案_点击按钮_查看全部回答'});

        })
        //我要支招
        pop.find('.inputBox textarea').on('keydown', function (e) {
            if (e.keyCode == 8) {
                if (this.value == $(this).data('s')) {
                    this.value = '';
                    // return false;
                }
                ;
            }
            ;

            $(this).focus();
        })
        pop.find('.btn-zhizhao').click(function (e) {
            e.preventDefault()
            if (core.userInfo.ErrorCode != 0) {
                core.login();
                return;
            }
            ;

            var input = $(this).prev(),
                txt = input.val();
            if (!txt) {
                alert('内容不能为空')
                return;
            }
            ;

            var s = input.data('s');
            if (txt.indexOf(s) == 0) {
                txt = txt.substring(s.length)
            }
            ;

            var params = {
                'content': txt,
                'questionId': ques_id,
                'replayAnsId': $(this).attr('ansid') || 0,
                'userid': core.userInfo.userid
            };
            core.dataHandle.add_Bang_UserQuestionComment(params);


            if (!cb) {
                cb = function () {
                    window.location.reload();
                }
            }
            ;
            var pop = core.showPop('<div class="pop pop-success hide"><div class="body "><i class="close"></i><div class="content"><p class="one-line">提交成功！</p><div class="btn-login btn-ok"><img src="img/pop/btn-ok.png" alt=""></div></div></div></div> ', {'onok': cb})


            if (core.link_detail.length) {
                core.link_detail.closest('.item').addClass('on').siblings().removeClass('on')
                core.link_detail = null;
            }
            ;

            dataLayer.push({'event': 'event', 'category': '大家来提问页', 'action': '点击按钮', 'label': '查看答案_点击按钮_提交'});
        })
    }


    //page js
    $(function () {
        // var main_h  =document.documentElement.clientHeight-$('.header').outerHeight()-$('.footer').outerHeight()
        // $('.main').css({'min-height':main_h});

        //by qingyangmoke
        //$(window).on('resize', function (e) {
        //    if (winW != window.innerWidth) {
        //        window.location.reload();
        //    }
        //    ;
        //})


        if (isIos) {
            document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className + ' ios';
        }
        ;
        //从首页跳转过来
        var mn = $.getUrlPara('mobile') || '';
        if (!!mn) {
            core.dataHandle.login(mn, function () {
            });
        }
        ;


        $('.footer').click(function (e) {
            var target = e.target;
            if (core.userInfo.ErrorCode == 0 && target.nodeName.toLowerCase() == 'a') {
                target.href += '?mobile=' + core.userInfo.phone;
            }
            ;

        })

        $('a[href=""]').click(function (e) {
            e.preventDefault();
        })

        //右上角菜单按钮
        $('.top-menu').on('click', function () {
            $(this).hide().next().show();

            $('.menu-list').remove();
            $('.back-on').removeClass('back-on')
            if (core.userInfo.ErrorCode == 0) {//已登录	
                $('header').append('<ul class="menu-list"><li><a href="" class="user"><img src="img/btn-name.png" alt="" class="btn-name"><em>' + core.userInfo.userName + '</em></a><img src="img/btn-logout.png" alt="" class="btn-logout"></li><li><a href="userinfo.html" class="link-catbang-user"><img src="img/btn-userInfo.png" alt=""></a></li>' +
                    '<li><a href="http://www.catwj.cn/advantage.html?utm_source=catwaji_m&amp;utm_medium=owned&amp;utm_content=16032541&amp;utm_campaign=1603_Cat360?tbid=7"  class="item"><img src="img/360-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-360"><strong>360°全程安心</strong><br><span >立即点击了解详情&gt;&gt;</span></p></a></li>' +
                    '<li style="display:none"><a href="../fuel.html" class="item"><img src="img/fuel-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-fuel"><strong>油耗保障服务</strong></p></a></li>' +
                    '<li><a href="http://m.catwj.cn/catbang/ktb1.html?t=11" class="item"><img src="img/zhineng-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-zhineng"><strong>Cat®（卡特）智能</strong></p></a></li>' +
                    '<li><a href="../dealer.html?#7" class="item"><img src="img/dealer-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-dealer"><strong>代理商查询</strong></p></a></li>' +
                    '<li><a href="../p_2g01.html" class="item"><img src="img/home-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-home"><strong>首 页</strong></p></a></li>' +
                    '</ul>');
            } else {//未登录
                $('header').append('<ul class="menu-list"><li><a class="btn-login" href="javascript:;"><img src="img/btn-login.png" alt=""></a></li><li><a href="javascript:;" class="btn-register"><img src="img/btn-register.png" alt=""></a></li>' +
                    '<li><a href="http://www.catwj.cn/advantage.html?utm_source=catwaji_m&amp;utm_medium=owned&amp;utm_content=16032541&amp;utm_campaign=1603_Cat360?tbid=7"  class="item"><img src="img/360-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-360"><strong>360°全程安心</strong><br><span >立即点击了解详情&gt;&gt;</span></p></a></li>' +
                    '<li style="display:none"><a href="../fuel.html" class="item"><img src="img/fuel-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-fuel"><strong>油耗保障服务</strong></p></a></li>' +
                    '<li><a href="http://m.catwj.cn/catbang/ktb1.html?t=11" class="item"><img src="img/zhineng-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-zhineng"><strong>Cat®（卡特）智能</strong></p></a></li>' +
                    '<li><a href="../dealer.html?#7" class="item"><img src="img/dealer-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-dealer"><strong>代理商查询</strong></p></a></li>' +
                    '<li><a href="../p_2g01.html" class="item"><img src="img/home-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-home"><strong>首 页</strong></p></a></li>' +
                    '</ul>');
            }

        });

        $('.top-menu-1').on('click', function () {
            $(this).hide().prev().show();
            $('.menu-list').remove();
        })

        //头部的注销按钮
        $('header').on('click', '.btn-logout', function (e) {
            e.preventDefault();
            localStorageCAT.removeItem('userInfo');
            window.location.href = "index.html";
        })
        //头部的登录按钮
        $('header').on('click', '.btn-login', function (e) {
            e.preventDefault();

            dataLayer.push({'event': 'event', 'category': '所有页面', 'action': '点击按钮', 'label': '首页_点击按钮_登录'});

            // core.fillInfo();return;
            if (core.userInfo.ErrorCode == 0) {
                window.location.href = 'userinfo.html';
            } else {
                core.login();
            }
        })
        $('header').on('click', '.btn-register', function (e) {
            core.register();
        })
        $('header').on('click', '.link-catbang-user', function (e) {
            if (core.userInfo.ErrorCode != 0) {
                e.preventDefault();
                core.login(function () {
                    window.location.href = 'userinfo.html';
                });
            }
            ;
        })


        //头部的返回按钮
        $('.back').click(function (e) {
            dataLayer.push({'event': 'event', 'category': '所有页面', 'action': '点击按钮', 'label': '首页_点击按钮_返回'});

            if ($(this).data('noback')) {
                return;
            }
            ;

            if ($(this).attr('to')) {
                window.location.href = $(this).attr('to');
                return;
            }
            var r = document.referrer;
            if (r) {
                window.location.href = r;
            } else {
                dataLayer.push({'event': 'event', 'category': '所有页面', 'action': '点击按钮', 'label': '首页_点击按钮_logo返回首页'});

                window.location.href = 'index.html';
            }
        })

        //公共搜索
        $('.top-search').click(function (e) {
            $('.search').find('input').focus();
        })
        $('.btn-search').click(function (e) {
            e.preventDefault();

            dataLayer.push({'event': 'event', 'category': '所有页面', 'action': '点击按钮', 'label': '首页_点击按钮_搜索'});

            var kw = $(this).prev().val() || '';
            if (!kw) {
                alert('请输入问答！');
                return;
            }
            ;
            if ($('.searchPage').length) {
                var params = {
                    'searchVal': kw,
                    'pageindex': 1
                };
                core.dataHandle.getQuestionList(params);
            } else {
                window.location.href = 'search.html?kw=' + kw;
            }
        })
        $(document).on('click', function (e) {
            var $target = $(e.target);
            if ($target.closest('.menu-list').length == 0 && $target.closest('.top-menu').length == 0 && $target.closest('.back').length == 0) {
                $('.top-menu-1').hide().prev().show();
                $('.menu-list').remove();
                $('.back-on').removeClass('back-on');
            }
            ;
        }).on(touchMoveEvent, function (e) {
            $('.top-menu-1').hide().prev().show();
            $('.menu-list').remove();
            $('.back-on').removeClass('back-on');
        })

        //tab切话
        $('.tab').on('click', function (e) {
            if ($(this).hasClass('tab-0')) {
                return false;
            }
            ;
            var target = e.target,
                li = $(target).closest('li');
            if (li.length) {
                li.addClass('on').siblings().removeClass('on');
                $(li.attr('rel')).show().siblings('.tab-part').hide();
            }
            ;

            e.preventDefault();
        })


        if (!localStorageCAT.getItem('province')) {
            core.dataHandle.getProvince();
        } else if (core.userInfo.ErrorCode == 0) {
            var p = JSON.parse(localStorageCAT.getItem('province') || '[]');
            for (var i = 0; i < p.length; i++) {
                if (p[i].A_Id == +core.userInfo.province) {
                    core.userInfo.provinceName = p[i].A_Name;
                    break;
                }
                ;
            }

            core.userInfo.area = (core.userInfo.provinceName + core.userInfo.cityName) || '';
            localStorageCAT.setItem('userInfo', JSON.stringify(core.userInfo))

            core.dataHandle.getCity(core.userInfo.province);
        }


    })


})(window, jQuery)