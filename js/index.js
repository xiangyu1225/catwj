!(function (window, $) {

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

    var localStorageCAT = window.localStorageCAT = new localStorageCATClass();


    window.queryString = function (item) {
        var svalue = window.location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : "";
    };

    var test = 0;// for test
    var webBaseURL = 'http://m.catwj.cn/'; //注意，正式地址需要改， 2018-01-25
    //var picurl = 'http://h5.sktap.cn/app/cat/site/';
    //var SITE_API_URL = "http://h5.sktap.cn/app/cat/site/api_test/";

    //var SITE_CAT_IMG = 'http://img.mobileone.com.cn/';
    var SITE_CAT_IMG = 'http://m.catwj.cn//resource/';
    // var SITE_API_URL = "http://h5.sktap.cn/app/cat/site/api/";
    var SITE_API_URL = "http://gcim.goldfish88.net/api/";

    //var SITE_CATBANG = 'http://catbang.mobileone.com.cn';
    //var SITE_CATBANG = 'http://m.catwj.cn//testIndex/40/catbang';
    // var SITE_CATBANG = 'http://h5.sktap.cn/app/testjls/mcatwajiv4/catbang';  //测试地址

    var SITE_CATBANG = 'http://m.catwj.cn//catbang';  //线上地址


    //var url2 = 'http://catwaji2g.mobileone.com.cn/';
//测试服务器接口地址
 // var  testLogin = 'http://llh-test.skh5.cn/catmobile/login.php?debug=true';
 // 12 12 项目测试接口地址
 // var  testLogin = 'http://llh-test.skh5.cn/catmobile/login_test.php';
 var  testLogin = 'http://m.catwj.cn/api/login_test.php';
 
//正式接口地址
  // var  testLogin = 'http://llh-test.skh5.cn/catmobile/login.php';



    //测试模式
    window.isDebug = (window.location.href.indexOf("m.catwj.cn//sk-t-p") > 0) || (location.href.indexOf("localhost") > 0);

    //if (window.isDebug) {
    //    SITE_CATBANG = 'http://m.catwj.cn//sk-t-p-2/catbang/';
    //}

    window.onload = function () {
        document.body.style.zoom = winW / 640;
        document.body.style.display = 'block';
    };

    var docW = document.documentElement.clientWidth,
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
    };
    $.extend({
        getUrlPara: function (paraName) {
            if (window.REWRITE_QUERY_STORAGE && paraName in window.REWRITE_QUERY_STORAGE) {
                return window.REWRITE_QUERY_STORAGE[paraName];
            }
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
    $.cookie = function (key, value, options) {
        if (arguments.length > 1 && (value === null || typeof value !== "object")) {
            options = $.extend({}, options);
            if (value === null) {
                options.expires = -1;
            }
            if (typeof options.expires === 'number') {
                var hours = options.expires, t = options.expires = new Date();
                t.setHours(t.getHours() + hours);
            }
            return (document.cookie = [
                encodeURIComponent(key), '=',
                options.raw ? String(value) : encodeURIComponent(String(value)),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }
        // key and possibly options given, get cookie...
        options = value || {};
        var result, decode = options.raw ? function (s) {
            return s;
        } : decodeURIComponent;
        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
    };
    var Core = {
        dataHandle: {
            getIndexPicScroll: function () {
                $.ajax({
                    'type': 'get',
                    'dataType': 'json',
                    'url': SITE_API_URL + 'gethomepics.php',
                    'success': function (data) {
                        if (data && data.ErrorCode == 0) {
                            //手动添加一个 by 清扬陌客 2016年03月10日 增加一个活动
                            //var query = "";
                            //if (Core.userInfo.mobile && Core.userInfo.mobile != "") {
                            //    query = '?mobile=' + Core.userInfo.mobile;
                            //}
                            //if (window.isDebug) {
                            //    data.list.splice(0, 0, {
                            //        "id": "0",
                            //        "picUrl": "img/homekv/hkv0.jpg",
                            //        "link": "http://catsitenew.onestaging.com/advantage.html",
                            //        "sort": "0"
                            //    });
                            //}
                            func(data.list);
                        }
                    },
                    'error': function () {
                        if (test) {
                            func(test_indexPicList.list)
                        }
                    }
                });

                var func = function (list) {
                    var swipe = $('.swipe-wrap'),
                        arr1 = [], arr2 = [];
                    // for (var i = 0; i < list.length; i++) {
                    //     var item = list[i];
                    //     //增加活动 2016年03月10日 该活动链接后自动补充手机参数
                    //     if (item.link == "http://catsitenew.onestaging.com/fuel.html"
                    //         || item.link.indexOf("http://www.catwj.cn/fuel.html") > -1) {
                    //         if (Core.userInfo.mobile && Core.userInfo.mobile != "") {
                    //             if (item.link.indexOf("?") > 0) {
                    //                 item.link = item.link + '&mobile=' + Core.userInfo.mobile;
                    //             } else {
                    //                 item.link = item.link + '?mobile=' + Core.userInfo.mobile;
                    //             }
                    //         }
                    //     }
                    //     arr1.push('<div class="swipe-item"><a href="' + item.link + '"><img src="' + SITE_CAT_IMG + item.picUrl + '" alt=""></a></div>')

                    //     if (i == 0) {
                    //         arr2.push('<i class="on"></i>')
                    //     } else {
                    //         arr2.push('<i></i>')
                    //     }
                    // }
                    // swipe.html(arr1.join(''))
                    // $('.point').html(arr2.join(''))
                    $('.point').html('<i class="on"></i><i></i>');
                    var swipeItems = swipe.find(".swipe-item");
                    swipeItems.click(function () {
                        var index = $(swipeItems).index(this);
                        dataLayer && dataLayer.push({
                            'event': 'event',
                            'category': '首页',
                            'action': '点击按钮',
                            'label': '首页_点击按钮_Banner' + (index + 1)
                        });
                    });
                    var topPic = $('.picBox'),
                        count = $('.swipe-wrap').find('img').length,
                        index = 0;
                    // pure JS
                    var elem = document.getElementById('mySwipe');
                    window.mySwipe = Swipe(elem, {
                        startSlide: 0,
                        continuous: false,
                        auto: 4000,
                        callback: function (curIndex, element) {
                            index = curIndex;

                            topPic.find('.point i').eq(index).addClass('on').siblings().removeClass('on');

                            console.log(index);
                            if (index == 0) {
                                dataLayer && dataLayer.push({
                                    'event': 'event',
                                    'category': '首页',
                                    'action': '滑动',
                                    'label': '首页_滑动_Banner1'
                                });
                            } else if (index == 1) {
                                dataLayer && dataLayer.push({
                                    'event': 'event',
                                    'category': '首页',
                                    'action': '滑动',
                                    'label': '首页_滑动_Banner2'
                                });
                            } else if (index == 2) {
                                dataLayer && dataLayer.push({
                                    'event': 'event',
                                    'category': '首页',
                                    'action': '滑动',
                                    'label': '首页_滑动_Banner3'
                                });
                            } else if (index == 3) {
                                dataLayer && dataLayer.push({
                                    'event': 'event',
                                    'category': '首页',
                                    'action': '滑动',
                                    'label': '首页_滑动_Banner4'
                                });
                            } else if (index == 4) {
                                dataLayer && dataLayer.push({
                                    'event': 'event',
                                    'category': '首页',
                                    'action': '滑动',
                                    'label': '首页_滑动_Banner5'
                                });
                            }

                        }
                    });
                }
            },
            getIndexProductList: function () {
                //$.ajax({
                //    'type': 'get',
                //    'dataType': 'json',
                //    'url': SITE_API_URL + 'gethomelist.php',
                //    'success': function (data) {
                //        if (data && data.ErrorCode == 0) {
                //            func(data.list)
                //        }
                //        ;
                //    },
                //    'error': function () {
                //        if (test) {
                //            func(test_indexTypeList.list)
                //        }
                //        ;
                //    }
                //})
                //
                //var func = function (list) {
                //    var productList = $('.productList'),
                //        html = [],
                //        tmpl = '<a href="{link}" class="item"><img src="{picUrl}"  style="width:105px; height: 93px;" alt="" class="pic"><p><strong>{title}</strong><br><span>{desc}</span></p><img src="img/arrow.png" class="arrow" alt=""></a>';
                //
                //    for (var i = 0; i < list.length; i++) {
                //        var item = list[i];
                //        var s = tmpl.replace('{id}', item.id)
                //            .replace('{picUrl}', SITE_CAT_IMG + item.picUrl || '')
                //            .replace('{title}', item.title || '')
                //            .replace('{desc}', item.desc || '')
                //
                //        if (!item.link) {
                //            s = s.replace('{link}', 'javascript:;')
                //        } else {
                //            item.link = item.link + '?tbid=' + item.id;// (i + 1);
                //            //增加活动 2016年03月29日 该活动链接后自动补充手机参数
                //            if (item.link == "http://catsitenew.onestaging.com/advantage.html"
                //                || item.link.indexOf("http://www.catwj.cn/advantage.html") > -1) {
                //                if (Core.userInfo.mobile && Core.userInfo.mobile != "") {
                //                    if (item.link.indexOf("?") > 0) {
                //                        item.link = item.link + '&mobile=' + Core.userInfo.mobile;
                //                    } else {
                //                        item.link = item.link + '?mobile=' + Core.userInfo.mobile;
                //                    }
                //                }
                //            }
                //            s = s.replace('{link}', item.link);
                //        }
                //
                //        html.push(s);
                //    }
                //
                //    productList.html(html.join(''))
                //}
            },
            getSearchKeyWords: function () {
                $.ajax({
                    'type': 'get',
                    'dataType': 'json',
                    'url': SITE_API_URL + 'getkeywords.php',
                    'success': function (data) {
                        if (data && data.ErrorCode == 0) {
                            func(data.list)
                        }
                        ;
                    },
                    'error': function () {
                        if (test) {
                            func(test_keyword.list)
                        }
                        ;
                    }
                })

                var func = function (list) {
                    var keyBox = $('.keyBox'),
                        arr1 = [];
                    for (var i = 0; i < list.length; i++) {
                        arr1.push('<li>' + list[i] + '</li>')
                    }
                    keyBox.html(arr1.join(''))

                }
            },
            getProductList: function (params) {
                //var loading = core.showLoading();
                $.ajax({
                    'type': 'get',
                    'dataType': 'json',
                    'url': SITE_API_URL + 'getproductslist.php',
                    'data': params,
                    'success': function (data) {
                        if (data && data.ErrorCode == 0) {
                            func(data.list)
                        }
                        ;
                    },
                    'error': function () {
                        if (test) {
                            func(test_productList.list)
                        }
                        ;
                    }
                });


                var func = function (list) {
                    //loading.remove();

                    var core = Core;

                    var html = ['<option value="">请选择型号</option>'];
                    if ($('.calculatePage').length) {
                        for (var i = 0; i < list.length; i++) {
                            var item = list[i];
                            html.push('<option value="' + item.id + '">' + item.title + '</option>')
                        }

                        $('#version').html(html.join(''));
                    } else {
                        $('.keyBox').hide();
                        var ids = '';
                        var productList = $('.productList'),
                            arr1 = [],
                            tmpl = '<a href="product-detail.html?id={id}" catid="{id}" class="item"><img src="{picUrl}" alt="" class="pic"><p><strong>{title}</strong></p><img src="img/btn-detail.png" alt="" class="detail"></a>';
                        for (var i = 0; i < list.length; i++) {
                            var item = list[i];
                            var s = tmpl.replace(/{id}/gi, item.id)
                                .replace('{title}', item.title)
                                .replace('{picUrl}', SITE_CAT_IMG + item.picUrl)
                            arr1.push(s)
                            ids += ',' + item.id;
                        }

                        productList.find('.noData').remove();

                        if (params.type >= 0) {
                            $('#part' + params.type).html(arr1.join(''));

                            if (arr1.length == 0) {
                                $('#part' + params.type).html('<p class="noData">抱歉，没有相关信息</p>')
                            }
                        } else {
                            productList.html(arr1.join(''));

                            if (arr1.length == 0) {
                                productList.html('<p class="noData">抱歉，没有相关信息</p>')
                            }
                        }
                        $('.tab').removeClass('hide')


                        if (location.href.indexOf('search.html') >= 0) {
                            core.dataHandle.getZhuanjiaList(ids.substring(1));
                            core.dataHandle.getZhengyanList(ids.substring(1));
                        }
                        ;
                    }
                }
            },

            getProductDetail: function (params, success) {
                var url = SITE_API_URL + 'getproductdetails.php';
        if (params.id >= 150) {
            url = 'http://58.87.95.215:8090/json/' + params.id + '.json'
        }
            $.ajax({
                    'type': 'get',
                    'dataType': 'json',
                    'url': url,
                    'data': params,
                    'success': function (data) {
                        if (data && data.ErrorCode == 0) {
                            func(data);
                            if (success) {
                                success(data);
                            }
                        }
                     
                    },
                    'error': function () {
                        if (test) {
                            // func(test_productList.list)
                        }
                    }
                });


                var func = function (data) {
                    if ($('.loginPage').length || $('.registerPage').length) {
                        var product = $('.product');
                        var str = product.html();

                        str = str.replace('{title}', data.title || '');
                        str = str.replace('{picUrl}', data.picUrl || '');
                        str = str.replace('{volume}', data.volume || '');
                        str = str.replace('{power}', data.power || '');
                        str = str.replace('{quality}', data.quality || '');
                        str = str.replace('{youshi}', data.youshi || '');

                        product.html(str).removeClass('hide');
                    } else if ($('.cartconnectPage').length) {
                        if (data.recommend && data.recommend.length) {
                            var htmlStr1 = '<a href="product-detail.html?id={id}" class="item">' +
                                ' <img src="{picUrl}" alt="">' +
                                ' <p>' +
                                '   <strong>{title}</strong>' +
                                ' </p>' +
                                ' <img src="img/detail/xunjiahei.png" alt="" class="detail">' +
                                '</a>', arr1 = [];
                            for (var i = 0; i < data.recommend.length; i++) {
                                var o = data.recommend[i],
                                    t = htmlStr1.replace('{link}', o.link)
                                        .replace('{id}', o.id)
                                        .replace('{picUrl}', SITE_CAT_IMG + o.picUrl)
                                        .replace('{title}', o.title)
                                arr1.push(t)
                            }
                            $('.recommendBox').append(arr1.join('')).removeClass('hide').prev().removeClass('hide');
                        }
                    } else {
                        document.title = '卡特' + data.title + ' - CAT（卡特）官网';
                        $('.title').find('span').text(data.title);
                        var catDateType = parseInt(data.type);
                        switch(catDateType){
                            case 1:
                                catDateType='小型机';
                                break;
                            case 2:
                                catDateType='中型机';
                                break;
                            case 3:
                                catDateType='大型机';
                                break;
                            case 4:
                                catDateType='轮挖';
                                break;
                            case 5:
                                catDateType='装载机';
                                break;
                        }

                        $('.title').attr('data-typetitle', catDateType+'_'+data.title);

                        var swipe = $('#mySwipe'),
                            arr1 = [], arr2 = [];
                        for (var i = 0; i < data.picList.length; i++) {
                            arr1.push('<div><img src="' + SITE_CAT_IMG + data.picList[i] + '" alt=""></div>')

                            if (i == 0) {
                                arr2.push('<i class="on"></i>')
                            } else {
                                arr2.push('<i></i>')
                            }
                        }
                        swipe.find('.swipe-wrap').html(arr1.join(''))
                        $('.point1').html(arr2.join(''))

                        var topPic = $('.picBox'),
                            count = swipe.find('.swipe-wrap').find('img').length,
                            index = 0;
                        // pure JS
                        var elem = document.getElementById('mySwipe');

                        if (count <= 1) {
                            topPic.find('.prev').hide();
                            topPic.find('.next').hide();
                            topPic.find('.point').hide();
                        }
                        ;
                        window.mySwipe = Swipe(elem, {
                            startSlide: 0,
                            continuous: true,
                            callback: function (curIndex, element) {
                                index = curIndex;

                                topPic.find('.point i').eq(index).addClass('on').siblings().removeClass('on');
                                // if (index == 0) {
                                //     topPic.find('.prev').removeClass('on')
                                //     topPic.find('.next').addClass('on')
                                // } else if (index == count - 1) {
                                //     topPic.find('.prev').addClass('on')
                                //     topPic.find('.next').removeClass('on')
                                // } else {
                                //     topPic.find('.prev').addClass('on')
                                //     topPic.find('.next').addClass('on')
                                // }
                                topPic.find('.prev').addClass('on')
                                topPic.find('.next').addClass('on')
                            }
                        });


                        topPic.find('.prev').on('click', function () {
                            mySwipe.prev()
                        })
                        topPic.find('.next').on('click', function () {
                            mySwipe.next()
                        })


                        var str = $('.txt').html();
                        str = str.replace('{volume}', data.volume || '');
                        str = str.replace('{power}', data.power || '');
                        str = str.replace('{quality}', data.quality || '');

                        var s = '', catSmart = data.catSmart.join(',');

                        console.log(catSmart);
                        if (catSmart.indexOf('1') >= 0) {
                            s += '<a href="connect.html"><img src="img/detail/link1.png" alt="" style="width:187px;margin-right:10px;"></a>';
                        }
                        if (catSmart.indexOf('2') >= 0) {
                            s += '<a href="connect.html?tab=2"><img src="img/detail/link2.png" alt="" style="width:152px;"></a>';
                        }
                        str = str.replace('{catSmart}', s);

                        str = str.replace('{simpleComment}', data.simpleComment || '');


                        var suitable_arr = ['石方工程', '土方工程', '公路建设', '管道建设', '废料处理', '园林绿化', '农田改造', '采石和集料', '击碎路面和基岩', '能源设施建设', '铁路/隧道建设', '搬运', '开矿', '挖地基', '挖沟渠']
                        var s = '';
                        for (var i = 0; i < data.suitable.length; i++) {
                            var item = data.suitable[i];
                            s += '<label><img src="img/detail/' + item + '.png" alt=""><br>' + suitable_arr[item - 1] + '</label>'
                        }
                        str = str.replace('{suitable}', s);
                        $('.txt').html(str);

                        var ele_engine = $('[name="engine"]')
                        for (var i = 0; i < data.engine.length; i++) {
                            if (data.engine[i]) {
                                ele_engine.find('tr').eq(i + 1).find('td').eq(1).text(data.engine[i]);
                            } else {
                                ele_engine.find('tr').eq(i + 1).hide();
                            }
                        }
                        var ele_hydraulicSystem = $('[name="hydraulicSystem"]')
                        for (var i = 0; i < data.hydraulicSystem.length; i++) {
                            if (data.hydraulicSystem[i]) {
                                ele_hydraulicSystem.find('tr').eq(i + 1).find('td').eq(1).text(data.hydraulicSystem[i]);
                            } else {
                                ele_hydraulicSystem.find('tr').eq(i + 1).hide();
                            }
                        }
                        var ele_drive = $('[name="drive"]')
                        for (var i = 0; i < data.drive.length; i++) {
                            if (data.drive[i]) {
                                ele_drive.find('tr').eq(i + 1).find('td').eq(1).text(data.drive[i]);
                            } else {
                                ele_drive.find('tr').eq(i + 1).hide();
                            }
                        }
                        var ele_qualityList = $('[name="qualityList"]')
                        for (var i = 0; i < data.qualityList.length; i++) {
                            console.log(data.qualityList[i]);
                            if (data.qualityList[i]) {
                                ele_qualityList.find('tr').eq(i + 1).find('td').eq(1).text(data.qualityList[i]);
                            } else {
                                ele_qualityList.find('tr').eq(i + 1).hide();
                            }
                        }
                        var ele_maintain = $('[name="maintain"]')
                        for (var i = 0; i < data.maintain.length; i++) {
                            if (data.maintain[i]) {
                                ele_maintain.find('tr').eq(i + 1).find('td').eq(1).text(data.maintain[i]);
                            } else {
                                ele_maintain.find('tr').eq(i + 1).hide();
                            }
                        }

                        // $('.link-ask').attr('href','xunjia.html?pid='+params.id)
                        console.log('新增接口');

                        if (data.expertList && data.expertList.length) {
                            var htmlStr2 = '<a href="{link}" class="item">' +
                                ' <img src="{picUrl}" alt="">' +
                                ' <p>' +
                                '   <strong>{title}</strong><br>' +
                                '   <span>{desc}</span>' +
                                ' </p>' +
                                ' <img src="img/btn-detail.png" alt="" class="detail">' +
                                '</a>', arr2 = [];
                            for (var i = 0; i < data.expertList.length; i++) {
                                var o = data.expertList[i],
                                    t = htmlStr2.replace('{link}', o.link)
                                        .replace('{picUrl}', SITE_CAT_IMG + o.picUrl)
                                        .replace('{title}', o.title)
                                        .replace('{desc}', o.desc);
                                arr2.push(t)
                            }

                            //2018-03-09 by jls
                                for(var k in productDetailDate) {
                                    if( k ==  params.id){
                                        $('#cat360Btn').show();
                                        var dialogCat360html = '<p class="anxin360-h4">Cat<sup>®</sup>（卡特）360°全程安心服务</p>';
                                        for( var kk in productDetailDate[k]['text'] ){
                                            dialogCat360html += '<p class="anxin360-txt1"><span>●</span><span>' + productDetailDate[k]['text'][kk] + '</span></p>';
                                        }
                                        $('.anxin360-main').html(dialogCat360html);
                                    }
                                }

                            //$('.zhuanjiaBox').prev().removeClass('hide');
                            //$('.zhuanjiaBox').html(arr2.join('')).removeClass('hide');
                            //$('.zhuanjiaBox >a').attr('href', 'http://m.catwj.cn/ngh/?utm_source=catwj%5Fm%5Fxiangqing&utm_medium=owned&utm_content=180504%5F02%5Fnghcam&utm_campaign=1803%5Fwap');
                             //2018-05-04 by jls
                            // http://m.catwj.cn/ngh/


                        }


                        if (data.recommend && data.recommend.length) {
                            var htmlStr1 = '<a href="product-detail.html?id={id}" class="item">' +
                                ' <img src="{picUrl}" alt="">' +
                                ' <p>' +
                                '   <strong>{title}</strong>' +
                                ' </p>' +
                                ' <img src="img/detail/xunjiahei.png" alt="" class="detail">' +
                                '</a>', arr1 = [];
                            for (var i = 0; i < data.recommend.length; i++) {
                                var o = data.recommend[i],
                                    t = htmlStr1.replace('{link}', o.link)
                                        .replace('{id}', o.id)
                                        .replace('{picUrl}', SITE_CAT_IMG + o.picUrl)
                                        .replace('{title}', o.title)
                                arr1.push(t)
                            }
                            $('.recommendBox').html(arr1.join('')).removeClass('hide').prev().removeClass('hide');

                        }
                        ;

                        if (data.extTools.length) {
                            var desc = data.extTools[0].desc.split(',');
                            if (desc.length) {
                                var swipe2 = $('#mySwipe2'),

                                    arr1 = [], arr2 = [];
                                for (var i = 0; i < desc.length; i++) {
                                    var item = desc[i];
                                    arr1.push('<div><img src="img/detail/tools/' + item + '.jpg" alt=""></div>')

                                    if (i == 0) {
                                        arr2.push('<i class="on"></i>')
                                    } else {
                                        arr2.push('<i></i>')
                                    }
                                }

                                swipe2.parent().prev().removeClass('hide');
                                swipe2.find('.swipe-wrap').html(arr1.join('')).removeClass('hide');

                                $('.point2').html(arr2.join(''))

                                var mySwipe2 = $('.mySwipe2'),
                                    count2 = swipe2.find('.swipe-wrap').find('img').length,
                                    index2 = 0;
                                // pure JS
                                if (count2 <= 1) {
                                    mySwipe2.find('.prev').hide();
                                    mySwipe2.find('.next').hide();
                                    mySwipe2.find('.point').hide();
                                };
                                var elem = document.getElementById('mySwipe2');
                                window.mySwipe_obj = Swipe(elem, {
                                    startSlide: 0,
                                    continuous: true,
                                    callback: function (curIndex, element) {
                                        index2 = curIndex;

                                        mySwipe2.find('.point i').eq(index2).addClass('on').siblings().removeClass('on');

                                        // if (index2 == 0) {
                                        //     mySwipe2.find('.prev').removeClass('on')
                                        //     mySwipe2.find('.next').addClass('on')
                                        // } else if (index2 == count2 - 1) {
                                        //     mySwipe2.find('.prev').addClass('on')
                                        //     mySwipe2.find('.next').removeClass('on')
                                        // } else {
                                            mySwipe2.find('.prev').addClass('on')
                                            mySwipe2.find('.next').addClass('on')
                                        // }

                                    }
                                });


                                mySwipe2.find('.prev').on('click', function () {
                                    mySwipe_obj.prev()
                                })
                                mySwipe2.find('.next').on('click', function () {
                                    mySwipe_obj.next()
                                })

                            }
                            ;
                        }
                        ;
                    }
                }
            },
            getCatconnectRecommend: function (typeid) {
                $.ajax({
                    'type': 'get',
                    'dataType': 'json',
                    'url': SITE_API_URL + 'getcatagentrecommends.php',
                    'data': {'typeid': typeid},
                    'success': function (data) {
                        if (data && data.ErrorCode == 0) {
                            func(data)
                        }
                    },
                    'error': function () {
                        if (test) {
                            func(test_catagentrecommends)
                        }
                    }
                });


                var func = function (data) {
                    console.log(data.list);
                    if (data.list && data.list.length) {
                        var htmlStr1 = '<a href="product-detail.html?id={id}" class="item">' +
                            ' <img src="{picUrl}" alt="">' +
                            ' <p>' +
                            '   <strong>{title}</strong>' +
                            ' </p>' +
                            ' <img src="img/detail/xunjiahei.png" alt="" class="detail">' +
                            '</a>', arr1 = [];
                        for (var i = 0; i < data.list.length; i++) {
                            var o = data.list[i],
                                t = htmlStr1.replace('{link}', o.link)
                                    .replace('{id}', o.id)
                                    .replace('{picUrl}', SITE_CAT_IMG + o.picUrl)
                                    .replace('{title}', o.title)
                            arr1.push(t)
                        }
                        $('.recommendBox').html(arr1.join('')).removeClass('hide').prev().removeClass('hide');
                        var pageTitle = "";
                        //alert(typeid);
                        if (typeid == 1) {
                            pageTitle = "卡特智能坡度故事1详情页";
                        } else if (typeid == 2) {
                            pageTitle = "卡特智能坡度故事2详情页";
                        } else if (typeid == 11) {
                            pageTitle = "卡特智能智讯故事1详情页";
                        } else if (typeid == 12) {
                            pageTitle = "卡特智能智讯故事2详情页";
                        }

                        $('.recommendBox').find(".item").on('click', function () {
                            var recommend_product = $(this).text().trim();
                            dataLayer && dataLayer.push({
                                'event': 'event',
                                'category': pageTitle,
                                'action': '点击按钮',
                                'label': pageTitle + '_点击按钮_' + recommend_product
                            });
                        })

                        $('.search-link').removeClass('hide')
                    }
                }
            },
            getZhuanjiaList: function (ids) {
                $.ajax({
                    'type': 'get',
                    'dataType': 'json',
                    'url': SITE_API_URL + 'getexpertlist.php',//?id=17
                    'data': {'id': ids || ''},
                    'success': function (data) {
                        if (data && data.ErrorCode == 0) {
                            func(data.list)
                        }
                    },
                    'error': function () {
                        if (test) {
                            func(test_zhuanjiaList.list)
                        }
                    }
                });

                var func = function (list) {
                    var zhuanjiaList = $('.zhuanjiaList'),
                        arr1 = [],
                        tmpl = '<a href="{link}" class="item"><img src="{picUrl}" alt="" class="pic"><p><strong>{title}</strong><br><span>{desc}</span></p><img src="img/btn-detail.png" alt="" class="detail"></a>';
                    for (var i = 0; i < list.length; i++) {
                        var item = list[i];
                        var s = tmpl.replace('{id}', item.id)
                            .replace('{title}', item.title)
                            .replace('{desc}', item.desc)
                            .replace('{link}', item.link)
                            .replace('{picUrl}', SITE_CAT_IMG + item.picUrl)
                        arr1.push(s)
                    }
                    zhuanjiaList.html(arr1.join(''))

                    if (list.length == 0) {
                        zhuanjiaList.html('<p class="noData">抱歉，没有相关信息</p>')
                    }
                }
            },
            getZhengyanList: function (ids) {
                $.ajax({
                    'type': 'get',
                    'dataType': 'json',
                    'url': SITE_API_URL + 'getusermsg.php',//?id=18
                    'data': {'id': ids},
                    'success': function (data) {
                        if (data && data.ErrorCode == 0) {
                            func(data.list)
                        }
                    },
                    'error': function () {
                        if (test) {
                            func(test_zhengyanList.list)
                        }
                    }
                });

                var func = function (list) {
                    var zhengyanList = $('.zhengyanList'),
                        arr1 = [],
                        tmpl = '<a href="{link}" class="item"><p><strong>{title}</strong><br><span>{desc}</span></p><img src="img/btn-detail.png" alt="" class="detail"></a>';
                    for (var i = 0; i < list.length; i++) {
                        var item = list[i];
                        var s = tmpl.replace('{id}', item.id)
                            .replace('{title}', item.title)
                            .replace('{desc}', item.desc)
                            .replace('{link}', item.link)
                            .replace('{picUrl}', SITE_CAT_IMG + item.picUrl)
                        arr1.push(s)
                    }
                    zhengyanList.html(arr1.join(''));

                    if (list.length == 0) {
                        zhengyanList.html('<p class="noData">抱歉，没有相关信息</p>');
                    }
                }
            },
            //getAgentList: function (params) {
            //    $.ajax({
            //        'type': 'get',
            //        'dataType': 'json',
            //        'url': SITE_API_URL + 'getagentlist.php',
            //        'data': params,
            //        'success': function (data) {
            //            if (data && data.ErrorCode == 0) {
            //                func(data)
            //            }
            //        },
            //        'error': function () {
            //            if (test) {
            //                func(test_catagentrecommends)
            //            }
            //        }
            //    });
            //
            //
            //    var func = function (data) {
            //        var temp = [];
            //        console.log(data.list);
            //        //alert(data.list[0].address)
            //        if (data.list && data.list.length) {
            //            var htmlStr1 = '<a href="dealer_.html?id={tbid}&from=dealer" class="item">' +
            //                ' <img src="{cattype}" alt="" class="logo">' +
            //                ' <p class="text">' +
            //                '   <strong>{title}</strong>' +
            //                ' </p>' +
            //                ' <img src="img/btn-detail.png" alt="" class="detail">' +
            //                '</a>', arr1 = [];
            //
            //            for (var i = 0; i < data.list.length; i++) {
            //                var o = data.list[i],
            //                    t = htmlStr1.replace('{link}', o.link)
            //                        .replace('{tbid}', o.tbid)
            //                        .replace('{cattype}', SITE_CAT_IMG + "img/agentlist/" + o.cattype + ".png")
            //                        .replace('{title}', o.title);
            //                arr1.push(t)
            //            }
            //            $('.agentList').html(arr1.join(''));
            //            for (var j = 11; j < 100; j++) {
            //                var text_title = $(".text").eq(j);
            //                if (j > 10 && j < 20 || j > 29 && j < 57 || j > 76 && j < 97) {
            //                    text_title.css("padding-top", "34px");
            //                }
            //            }
            //
            //
            //        }
            //    }
            //},

            login: function (mobile) {
                var core = Core;
                var loading = core.showLoading();
                var params = {
                    // 'debug': window.isDebug,
                    'action': 'login',
                    'mobile': mobile,
                    'utmSource': $.cookie('utmSource'),
                    'utmMedium': $.cookie('utmMedium'),
                    'utmCampaign': $.cookie('utmCampaign'),
                    'utmContent': $.cookie('utmContent'),
                    'utmTerm': $.cookie('utmTerm'),
                    'DataSource': $.cookie('DataSource'),
                };
                $.ajax({
                    'type': 'get',
                    'dataType': 'json',
                    'url': testLogin,
                    'data': params,
                    'success': function (data) {
                        func(data)
                    },
                    'error': function (e) {
                        if (test) {
                            func(test_userInfo)
                        }
                    }
                });

                var func = function (data) {
                    loading.remove();
                    var core = Core;
                    if (data.Success == 'Y') {
                        core.mobile = mobile;
                        data.mobile = mobile;

                        if (window.zhuge) {
                            //注册成功/登录成功(含自动登录)调用
                            zhuge.identify(mobile, {name: data.Name});
                        }

                        core.userInfo = data;
                        localStorageCAT.setItem('userInfo2', JSON.stringify(data));

                        if (window.location.href.indexOf("product-detail.html") > 0) {
                            return;
                        }

                        //挖机ID
                        var catid = $.getUrlPara('catid') || '';
                        //跳转页面
                        var isXunjia = localStorageCAT.getItem('isXunjia');
                        if (isXunjia == '1') {
                            localStorageCAT.setItem('isXunjia', '')
                            window.location.href = 'xunjia.html';
                        } else if (isXunjia == '2') {
                            localStorageCAT.setItem('isXunjia', '')
                            window.location.href = 'xunjia2.html';
                        }
                        else if (catid && catid != "") { //by 清扬陌客 2015年12月30日 产品详情页过来的 登陆后跳回
                            window.location.href = 'product-detail.html?id=' + catid;
                        } else {
                            window.location.href = 'p_2g01.html';
                        }

                    } else {//未注册
                        if (data.ErrMessage.indexOf('不存在') >= 0) {
                            alert('您输入的手机号码不存在，请重新输入。')
                        } else {
                            alert('登录失败')
                            //data.ErrMessage
                        }
                    }

                }

                // func(test_userInfo)//todo:
            }, login_auto: function (mobile, callback) { //by 清扬陌客 2015年12月18日 自动登陆 不进行跳转
                var core = Core;

                var loading = core.showLoading();
                var params = {
                    // 'debug': window.isDebug,
                    'action': 'login',
                    'mobile': mobile,
                    'utmSource': $.getUrlPara('utm_source') || "",
                    'utmMedium': $.getUrlPara('utm_medium') || "",
                    'utmCampaign': $.getUrlPara('utm_campaign') || "",
                    'utmContent': $.getUrlPara('utm_content') || "",
                    'utmTerm': $.getUrlPara('utm_term') || "",
                    'DataSource': $.cookie('DataSource') || "",
                };
                $.ajax({
                    'type': 'get',
                    'dataType': 'json',
                    'url': testLogin,
                    'data': params,
                    'success': function (data) {
                        loading.remove();
                        if (data.Success == 'Y') {
                            core.mobile = mobile;
                            data.mobile = mobile;
                            core.userInfo = data;
                            localStorageCAT.setItem('userInfo2', JSON.stringify(data));

                            //引入诸葛统计 2016年03月10日 by @清扬陌客
                            if (window.zhuge) {
                                //注册成功/登录成功(含自动登录)调用
                                zhuge.identify(mobile, {name: data.Name});
                            }

                            callback && callback({
                                statusCode: 200
                            });
                        } else {//未注册
                            //if (data.ErrMessage.indexOf('不存在') >= 0) {
                            //    alert('您输入的手机号码不存在，请重新输入。')
                            //} else {
                            //    alert('手机号登录失败');
                            //}
                            callback && callback({
                                statusCode: 404
                            });
                        }
                    }
                });
            },
            register: function (mobile, userName) {
                var core = Core;
                var loading = core.showLoading();
                var ExcavatorSize = $('.btn-doRegister').attr('data-excavatorsize') || '';
                var ExcavatorModel = $('.btn-doRegister').attr('data-excavatormodel') || '';

                if(ExcavatorSize=='') ExcavatorModel ='';
                if(ExcavatorModel=='') ExcavatorSize ='';

                var params = {
                    // 'debug': window.isDebug,
                    'action': 'register',
                    'mobile': mobile,
                    'userName': userName,
                    'utmSource': $.cookie('utmSource'),
                    'utmMedium': $.cookie('utmMedium'),
                    'utmCampaign': $.cookie('utmCampaign'),
                    'utmContent': $.cookie('utmContent'),
                    'utmTerm': $.cookie('utmTerm'),

                    'DataSource': $.cookie('DataSource'),  //20171222 by jls

                    'ExcavatorSize': ExcavatorSize,
                    'ExcavatorModel': ExcavatorModel, //2018 by jls
                }

                $.ajax({
                    'type': 'get',
                    'dataType': 'json',
                    'url': testLogin,
                    // 'url':'php/login.php',
                    'data': params,
                    'success': function (data) {
                        func(data);

                    },
                    'error': function () {
                        if (test) {
                            func(test_reg)
                        }
                    }
                })

                var func = function (data) {
                    loading.remove();
                    var core = Core;
                    if (data.Success == 'Y') {
                        core.dataHandle.login(mobile);
                        //引入诸葛统计 2016年03月10日 by @清扬陌客
                        if (window.zhuge) {
                            zhuge.track('注册成功');
                        }
                    } else {//已注册
                        //引入诸葛统计 2016年03月10日 by @清扬陌客
                        if (window.zhuge) {
                            zhuge.track('注册失败', {'失败原因': data.ErrMessage});
                        }
                        if (data.ErrMessage.indexOf('已经存在') >= 0) {
                            alert('您输入的手机号码已经存在，请直接登录。');
                            var catid = $.getUrlPara('catid') || '';
                            if (catid && catid != "") {
                                window.location.href = 'login.html?catid=' + catid;
                            } else {
                                window.location.href = 'login.html';
                            }
                        } else {
                            alert('注册失败');
                            //data.ErrMessage
                        }
                    }
                }
            },
            xunjia: function () {
                var core = Core;
                var loading = core.showLoading();

                var ExcavatorSize =  $.getUrlPara('ExcavatorSize');
                console.log(ExcavatorSize);
                var catDateTitle =  $.trim($.getUrlPara('catDateTitle').replace(/[\u4E00-\u9FA5]/g, '').replace(/®/g, '').replace(/_/g, '').replace('Cat', '').replace(/&nbsp;/g, ''));
                console.log(catDateTitle);

                var params = {
                    // 'debug': window.isDebug,
                    'action': 'ask',
                    'UserID': core.userInfo.UserID,
                    'utmSource': $.cookie('utmSource'),
                    'utmMedium': $.cookie('utmMedium'),
                    'utmCampaign': $.cookie('utmCampaign'),
                    'utmContent': $.cookie('utmContent'),
                    'utmTerm': $.cookie('utmTerm'),
                    'DataSource': $.cookie('DataSource'),
                    'ExcavatorSize': ExcavatorSize,
                    'ExcavatorModel': catDateTitle,
                };
                $.ajax({
                    'type': 'get',
                    'dataType': 'json',
                    'url': testLogin,
                    // 'url':'php/login.php',
                    'data': params,
                    'success': function (data) {
                        func(data)
                    },
                    'error': function () {
                        if (test) {
                            func()
                        }
                    }
                });

                var func = function (data) {
                    loading.remove();
                    if (data.Success == 'Y') {
                        $('.ask-panel').addClass('hide');
                        $('.ask-success').removeClass('hide');
                    } else {
                    }
                }
            }
        },
        //var loading = core.showLoading();
        //loading.remove();
        showLoading: function () {
            if (!$('.loading').length) {
                $('body').append('<div class="loading"><i></i></div>');
            }
            ;

            return $('.loading');
        },
        checkLogin: function () {

            core.userInfo = JSON.parse(localStorageCAT.getItem('userInfo2') || '{}');
            if (core.userInfo.UserID) {
                core.login();
            } else {

            }
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
        init: function (type) {
            this.userInfo = JSON.parse(localStorageCAT.getItem('userInfo2') || '{}');

            if (this.userInfo.ErrorCode == 0) {
                core.mobile = this.userInfo.phone;
                var name = this.userInfo.userName;

                $('.top-login').addClass('top-logined').text(name)
                $('.top-loginout').show()
            }
            ;
            core.check_weixin();

            //homePage|searchPage
            !!this[type] && this[type]()
        },
        loginPage: function () {
            var core = Core;

            // var catid = localStorageCAT.getItem('catid-detail');
            // localStorageCAT.setItem('catid-detail','')
            var catid = $.getUrlPara('catid') || '';
            if (catid) {
                core.dataHandle.getProductDetail({'id': catid});

                $('.link-register').attr('href', 'register.html?catid=' + catid)
            }
            ;

            // core.dataHandle.getProductDetail({'id':18});

            $('.btn-doLogin').on('click', function () {
                var mn = $('.mobile').val();
                if (!mn || !mn.isMobileNo()) {
                    alert('请正确输入手机号')
                    return;
                }
                ;

                core.dataHandle.login(mn);


                //dataLayer && dataLayer.push({
                //    'event': 'event',
                //    'category': '登录注册页',
                //    'action': '点击',
                //    'label': '登录注册页_点击按钮_提交登录'
                //});
            })

            // var r = document.referrer||'p_2g01.html';
            // if (r.indexOf('register.html')<0) {
            //  localStorageCAT.setItem('fromPage',r)
            // };
        },
        registerPage: function () {
            var core = Core;

            //注册页隐藏底部菜单 和 顶部按钮
            $('.footer-menu').hide();
            $('.top-right').hide();

            $('.btn-doRegister').css("margin-top", "-40px");

            $(".inputBox input").css("padding-left", "100px");

            // var catid = localStorageCAT.getItem('catid-detail');
            // localStorageCAT.setItem('catid-detail','')
            var catid = $.getUrlPara('catid') || '';

            var ExcavatorSize  = '';

            if (catid) {
                core.dataHandle.getProductDetail({'id': catid}, function (data) {
                    var s = '小型机';
                        ExcavatorSize = 10;
                    if (data.type == 2) {
                        s = '中型机';
                        ExcavatorSize = 20;
                    } else if (data.type == 3) {
                        s = '大型机';
                        ExcavatorSize = 30;
                    } else if (data.type == 4) {
                        s = '轮挖';
                        ExcavatorSize = 40;
                    } else if (data.type == 5) {
                        s = '装载机';
                        ExcavatorSize = 110;
                    }


                    //引入诸葛统计 2016年03月10日
                    if (window.zhuge) {
                        zhuge.track('进入_注册页(详情)', {
                            '站内来源': document.referrer,
                            '产品类别': s,
                            '名称': data.title
                        });
                    }
                });
                $('.link-login').attr('href', 'login.html?catid=' + catid)
                // $('#fromProduct').show();
            } else {
                //引入诸葛统计 2016年03月10日
                if (window.zhuge) {
                    zhuge.track('进入_注册页(无详情)', {'站内来源': document.referrer});
                }
                // $('#fromDirect').show();
            }

            // core.dataHandle.getProductDetail({'id':18});

            $('.btn-doRegister').on('click', function () {

                var catDateTitle = $.trim($('.product th').html().replace(/[\u4E00-\u9FA5]/g, '').replace(/®/g, '').replace(/_/g, '').replace('Cat', '').replace(/&nbsp;/g, ''));
                $('.btn-doRegister').attr('data-excavatorsize', ExcavatorSize).attr('data-excavatormodel', catDateTitle.replace(/{title}/g, ''));
                var mn = $('.mobile').val(),
                    name = $('.name').val();
                // if ($('#yinsi').data().val != 1) {
                //     $('#yinsierror').show();
                //     return;
                // }
                if (!name) {
                    alert('请输入姓名')
                    return;
                }
                if (!mn || !mn.isMobileNo()) {
                    alert('请正确输入手机号')
                    return;
                }

                core.dataHandle.register(mn, name);

                //dataLayer && dataLayer.push({
                //    'event': 'event',
                //    'category': '登录注册页',
                //    'action': '点击',
                //    'label': '登录注册页_点击按钮_提交注册'
                //});

            });
            // var r = document.referrer||'p_2g01.html';
            // if (r.indexOf('login.html')<0) {
            //  localStorageCAT.setItem('fromPage',r)
            // };
        },
        dealerPage: function () {

            var core = Core;
            //var type = 1;
            //core.dataHandle.getAgentList();
            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on');
                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="p_2g01.html">首页</a></li><li><a href="javascript:;" style="color:#999;">代理商列表</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;
            });
            $(".item").on("click", function () {
                var item_text = $(this).text().trim();
                dataLayer && dataLayer.push({
                    'event': 'event',
                    'category': '代理商列表页',
                    'action': '点击按钮',
                    'label': '代理商列表页_点击按钮_' + item_text
                });
            });
        },
        dealer_Page: function () {

            var core = Core;
            $(".call-icon").click(function () {
                var dealer_text = $('.agent-name').text().trim();
                console.log($('.agent-name').text());
                dataLayer && dataLayer.push({
                    'event': 'event',
                    'category': '代理商详情页',
                    'action': '点击按钮',
                    'label': '代理商详情页_点击按钮_请代理商联系我_' + dealer_text
                });
                localStorageCAT.setItem('xunjia-back', window.location);
                if (!core.userInfo.UserID) {
                    localStorageCAT.setItem('isXunjia', '2');
                    window.location.href = "register.html";
                } else {
                    window.location.href = "xunjia2.html";
                }
            });
            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')
                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="p_2g01.html">首页</a></li><li><a href="dealer.html">代理商列表</a></li><li><a href="javascript:;" style="color:#999;">' + $('.agent-name').text() + '</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;
            })

        },
        homePage: function () {
            var core = Core;

            core.dataHandle.getIndexPicScroll();

            //core.dataHandle.getIndexProductList();

            $('.productList').on('click', 'a', function (e) {
                var index = $(this).index();
                index = index - 1;
                if (index == -1) {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '首页',
                        'action': '点击按钮',
                        'label': '首页_点击按钮_小型机列表'
                    });
                } else if (index == 0) {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '首页',
                        'action': '点击按钮',
                        'label': '首页_点击按钮_中型机列表'
                    });
                } else if (index == 1) {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '首页',
                        'action': '点击按钮',
                        'label': '首页_点击按钮_大型机列表'
                    });
                } else if (index == 2) {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '首页',
                        'action': '点击按钮',
                        'label': '首页_点击按钮_轮挖列表'
                    });
                } else if (index == 3) {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '首页',
                        'action': '点击按钮',
                        'label': '首页_点击按钮_装载机列表'
                    });
                }

                //else if (index == 5) {
                //    dataLayer && dataLayer.push({
                //        'event': 'event',
                //        'category': '首页',
                //        'action': '点击按钮',
                //        'label': '首页_点击按钮_智能入口'
                //    });
                //} else if (index == 6) {
                //    dataLayer && dataLayer.push({
                //        'event': 'event',
                //        'category': '首页',
                //        'action': '点击按钮',
                //        'label': '首页_点击按钮_代理商入口'
                //    });
                //}

                if (this.href.indexOf('tbid=6') >= 0) {
                    e.preventDefault();

                    // console.log(this.href);

                    window.location.href = 'connect.html';

                    return false;
                }
                ;

            });

            //引入诸葛统计 2016年03月10日 by @清扬陌客
            if (window.zhuge) {
                zhuge.track('查看_首页', {'站内来源': document.referrer});
            }
        },
        searchPage: function () {
            var core = Core;

            core.dataHandle.getSearchKeyWords();

            var key = $.getUrlPara('key') || '';
            if (key) {
                core.dataHandle.getProductList({'key': encodeURIComponent(key), 'type': '-1'})
            }

            // var loading = core.showLoading();
            // loading.remove();

            $('.btn-search').on('click', function () {
                var key = $(this).prev().val();
                if (!key) {
                    alert('请输入关键词');
                    return;
                }

                //dataLayer && dataLayer.push({
                //    'event': 'event',
                //    'category': '搜索页',
                //    'action': '点击',
                //    'label': '搜索页_点击按钮_搜索'
                //});

                core.dataHandle.getProductList({'key': encodeURIComponent(key), 'type': '-1'})

            });

            $('.keyBox').on('click', function (e) {
                var target = e.target,
                    li = $(target).closest('li');
                if (li.length) {
                    var key = li.text();
                    $('.searchBox').find('input').val(key);
                    core.dataHandle.getProductList({'key': encodeURIComponent(key), 'type': '-1'})
                }
            });

            $('.tab').on('click', function (e) {
                var tag_a = $(e.target).closest('a');
                if (tag_a.length) {
                    type = tag_a[0].hash.substring(1);
                    if (type == '1') {
                    } else if (type == '2') {

                    } else if (type == '3') {

                    }

                    type = +type;
                    $(this).find('img').eq(type - 1).removeClass('hide').siblings('img').addClass('hide');
                }
            });

            // $('.productList').click(function(e){
            //  var ele_a = $(e.target).closest('a');
            //  if (ele_a.length) {
            //    if (!core.userInfo.UserID) {
            //      localStorageCAT.setItem('catid-detail',ele_a.attr('catid'));
            //      window.location.href='login.html?catid='+ele_a.attr('catid');
            //      return false;
            //    };
            //  };
            // })
        },
        productListPage: function () {
            var core = Core;

            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    var type = $('.tab').find('a.on')[0].hash.substring(1);
                    var s = '小型机列表';
                    if (type == 2) {
                        s = '中型机列表';
                    } else if (type == 3) {
                        s = '大型机列表';
                    } else if (type == 4) {
                        s = '轮挖列表';
                    } else if (type == 5) {
                        s = '装载机列表';
                    }

                    $(this).addClass('back-on')
                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="p_2g01.html">首页</a></li><li><a href="javascript:;" style="color:#999;">' + s + '</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }


                //dataLayer && dataLayer.push({
                //    'event': 'event',
                //    'category': '小型机列表页',
                //    'action': '点击',
                //    'label': '小型机列表页_点击按钮_返回'
                //});
                return false;
            });

            var type = $.getUrlPara('tbid') || 1,//type id
                type_txt = '小型机列表';
            tab = $('.tab');

            func_setTab(type);

            //core.dataHandle.getProductList({'type': type});
            var url_text = "";
            tab.on('click', 'a', function (e) {
                var url_param = ($(this).attr("val"));
                //alert(url_param)
                //url_param = document.location.hash;
                console.log(url_param);

                if (url_param == "#1") {
                    url_text = "小型机列表页"
                } else if (url_param == "#2") {
                    url_text = "中型机列表页"
                } else if (url_param == "#3") {
                    url_text = "大型机列表页"
                } else if (url_param == "#4") {
                    url_text = "轮挖机列表页"
                } else if (url_param == "#5") {
                    url_text = "装载机列表页"
                }

                if (e.target.nodeName.toLowerCase() == 'a') {
                    //type = e.target.hash.substring(1);
                    type = ($(this).attr("val").substring(1));
                    //alert(type);
                    //console.log(type);
                    type = +type;

                    if (type == 1) {
                        dataLayer && dataLayer.push({
                            'event': 'event',
                            'category': url_text,
                            'action': '点击按钮',
                            'label': url_text + '_点击按钮_小型机'
                        });
                        type_txt = '小型机列表';
                    } else if (type == 2) {
                        dataLayer && dataLayer.push({
                            'event': 'event',
                            'category': url_text,
                            'action': '点击按钮',
                            'label': url_text + '_点击按钮_中型机'
                        });
                        //type_txt = '中型列表';
                        type_txt = '中型机列表';

                    } else if (type == 3) {
                        dataLayer && dataLayer.push({
                            'event': 'event',
                            'category': url_text,
                            'action': '点击按钮',
                            'label': url_text + '_点击按钮_大型机'
                        });
                        //type_txt = '大型';
                        type_txt = '大型机列表';

                    } else if (type == 4) {
                        dataLayer && dataLayer.push({
                            'event': 'event',
                            'category': url_text,
                            'action': '点击按钮',
                            'label': url_text + '_点击按钮_轮挖'
                        });
                        type_txt = '轮挖列表';

                    } else if (type == 5) {
                        dataLayer && dataLayer.push({
                            'event': 'event',
                            'category': url_text,
                            'action': '点击按钮',
                            'label': url_text + '_点击按钮_装载机'
                        });
                        //type_txt = '装载机';
                        type_txt = '装载机列表';
                    }

                    var s = func_setTab(type);

                    if (!$('#part' + type).find('.item').length) {
                        core.dataHandle.getProductList({'type': type});
                    }

                    //引入诸葛统计 2016年03月10日 by @清扬陌客
                    if (window.zhuge) {
                        zhuge.track('查看_小型机列表页', {'站内来源': document.referrer, '产品类别': type_txt});
                    }
                }
            });

            function func_setTab(type) {

                var tab = $('.tab');
                var s = '小型机';
                if (type == '1') {
                } else if (type == '2') {
                    s = '中型机';
                } else if (type == '3') {
                    s = '大型机';
                } else if (type == '4') {
                    s = '轮挖';
                } else if (type == '5') {
                    s = '装载机';
                }
                //document.title = '【卡特小型挖掘机】卡特' + s + '机价格_型号_图片_代理商-CAT（卡特）官网';
                tab.find('a[href="#' + type + '"]').addClass('on');
                var rel = tab.find('a[href="#' + type + '"]').attr('rel');

                $(rel).removeClass('hide').siblings('.tab-part').addClass('hide')

                s += '列表';
                localStorageCAT.setItem('product-type', s + '-' + type);

                return s;
            }


            $('.productList').click(function (e) {
                var ele_a = $(e.target).closest('a');
                if (ele_a.length) {
                    var txt = ele_a.find('strong').text();
                    var fromPageData = ($(this).attr("val"));
                    //var fromPageData = document.location.hash;
                    if (fromPageData == "#1") {
                        dataLayer && dataLayer.push({
                            'event': 'event',
                            'category': '小型机列表页',
                            'action': '点击按钮',
                            'label': '小型机列表页' + '_点击按钮_' + txt
                        });
                    } else if (fromPageData == "#2") {
                        dataLayer && dataLayer.push({
                            'event': 'event',
                            'category': '中型机列表页',
                            'action': '点击按钮',
                            'label': '中型机列表页' + '_点击按钮_' + txt
                        });
                    } else if (fromPageData == "#3") {
                        dataLayer && dataLayer.push({
                            'event': 'event',
                            'category': '大型机列表页',
                            'action': '点击按钮',
                            'label': '大型机列表页' + '_点击按钮_' + txt
                        });
                    } else if (fromPageData == "#4") {
                        dataLayer && dataLayer.push({
                            'event': 'event',
                            'category': '轮挖机列表页',
                            'action': '点击按钮',
                            'label': '轮挖机列表页' + '_点击按钮_' + txt
                        });
                    } else if (fromPageData == "#5") {
                        dataLayer && dataLayer.push({
                            'event': 'event',
                            'category': '装载机列表页',
                            'action': '点击按钮',
                            'label': '装载机列表页' + '_点击按钮_' + txt
                        });
                    }
                    //else if (fromPageData == "#7") {
                    //    dataLayer && dataLayer.push({
                    //        'event': 'event',
                    //        'category': '代理商列表页',
                    //        'action': '点击按钮',
                    //        'label': '代理商列表页' + '_点击按钮_' + txt
                    //    });
                    //} else {
                    //    dataLayer && dataLayer.push({
                    //        'event': 'event',
                    //        'category': '优力',
                    //        'action': '点击按钮',
                    //        'label': '优力' + '_点击按钮_' + txt
                    //    });
                    //}


                    if (!core.userInfo.UserID) {
                        window.location.href = "register_" + ele_a.attr('catid') + ".html";
                    } else {
                        localStorageCAT.setItem('catid-detail', ele_a.attr('catid'));
                        // window.location.href='login.html?catid='+ele_a.attr('catid');
                        //window.location.href = 'register.html?catid=' + ele_a.attr('catid');
                        //window.location.href = "register_" + ele_a.attr('catid') + ".html";
                        window.location.href = "product-detail.html?id=" + ele_a.attr('catid');

                        return false;
                    }
                    ;


                    //
                    //var txt = ele_a.find('strong').text();
                    //txt = txt.match(/[0-9a-zA-Z ]+/);
                    //if (txt.length) {
                    //    txt = txt[0];
                    //} else {
                    //    txt = '';
                    //}

                    //console.log(type_txt, txt);
                }
            });
            //引入诸葛统计 2016年03月10日 by @清扬陌客
            if (window.zhuge) {
                zhuge.track('查看_小型机列表页', {'站内来源': document.referrer, '产品类别': type_txt});
            }
        },
        smallExcavator: function () {
            var core = Core;
            var type = 1;
            //core.dataHandle.getProductList({'type': type});


        },
        middleExcavator: function () {
            var core = Core;
            var type = 2;
            func_setTab(type);
            //core.dataHandle.getProductList({'type': type});
            function func_setTab(type) {

                var tab = $('.tab');
                var s = '小型机';
                if (type == '1') {
                } else if (type == '2') {
                    s = '中型机';
                } else if (type == '3') {
                    s = '大型机';
                } else if (type == '4') {
                    s = '轮挖';
                } else if (type == '5') {
                    s = '装载机';
                }
                //document.title = '【卡特小型挖掘机】卡特' + s + '机价格_型号_图片_代理商-CAT（卡特）官网';
                tab.find('a[href="#' + type + '"]').addClass('on');
                var rel = tab.find('a[href="#' + type + '"]').attr('rel');

                $(rel).removeClass('hide').siblings('.tab-part').addClass('hide')

                s += '列表';
                localStorageCAT.setItem('product-type', s + '-' + type);

                return s;
            }


        },
        largeExcavator: function () {
            var core = Core;
            var type = 3;
            func_setTab(type);
            //core.dataHandle.getProductList({'type': type});
            function func_setTab(type) {

                var tab = $('.tab');
                var s = '小型机';
                if (type == '1') {
                } else if (type == '2') {
                    s = '中型机';
                } else if (type == '3') {
                    s = '大型机';
                } else if (type == '4') {
                    s = '轮挖';
                } else if (type == '5') {
                    s = '装载机';
                }
                //document.title = '【卡特小型挖掘机】卡特' + s + '机价格_型号_图片_代理商-CAT（卡特）官网';
                tab.find('a[href="#' + type + '"]').addClass('on');
                var rel = tab.find('a[href="#' + type + '"]').attr('rel');

                $(rel).removeClass('hide').siblings('.tab-part').addClass('hide')

                s += '列表';
                localStorageCAT.setItem('product-type', s + '-' + type);

                return s;
            }

        },
        lunExcavator: function () {
            var core = Core;
            var type = 4;
            func_setTab(type);
            //core.dataHandle.getProductList({'type': type});
            function func_setTab(type) {

                var tab = $('.tab');
                var s = '小型机';
                if (type == '1') {
                } else if (type == '2') {
                    s = '中型机';
                } else if (type == '3') {
                    s = '大型机';
                } else if (type == '4') {
                    s = '轮挖';
                } else if (type == '5') {
                    s = '装载机';
                }
                //document.title = '【卡特小型挖掘机】卡特' + s + '机价格_型号_图片_代理商-CAT（卡特）官网';
                tab.find('a[href="#' + type + '"]').addClass('on');
                var rel = tab.find('a[href="#' + type + '"]').attr('rel');

                $(rel).removeClass('hide').siblings('.tab-part').addClass('hide')

                s += '列表';
                localStorageCAT.setItem('product-type', s + '-' + type);

                return s;
            }

        },
        loaderExcavator: function () {
            var core = Core;
            var type = 5;
            func_setTab(type);
            //core.dataHandle.getProductList({'type': type});
            function func_setTab(type) {

                var tab = $('.tab');
                var s = '小型机';
                if (type == '1') {
                } else if (type == '2') {
                    s = '中型机';
                } else if (type == '3') {
                    s = '大型机';
                } else if (type == '4') {
                    s = '轮挖';
                } else if (type == '5') {
                    s = '装载机';
                }
                //document.title = '【卡特小型挖掘机】卡特' + s + '机价格_型号_图片_代理商-CAT（卡特）官网';
                tab.find('a[href="#' + type + '"]').addClass('on');
                var rel = tab.find('a[href="#' + type + '"]').attr('rel');

                $(rel).removeClass('hide').siblings('.tab-part').addClass('hide')

                s += '列表';
                localStorageCAT.setItem('product-type', s + '-' + type);

                return s;
            }

        },

        productDetailPage: function () {
            
            var core = Core;

            var catid = $.getUrlPara('id') || '';
            //从澳美页面跳转过来 by song 2015年12月30日
            var phone = $.getUrlPara('phone') || '';
            if (phone == "") {
                phone = $.getUrlPara('mobile') || '';
            }
            if (!!phone) {
                core.dataHandle.login_auto(phone, function (data) {
                    if (data.statusCode != 200) {
                        alert('手机号登录失败');
                        localStorageCAT.setItem('catid-detail', catid);
                        window.location.href = 'register.html?catid=' + catid;
                    }
                });
            } else {
                if (!core.userInfo.UserID) {
                    localStorageCAT.setItem('catid-detail', catid);
                    window.location.href = 'register.html?catid=' + catid;
                    return false;
                }
            }


            var id = $.getUrlPara('id') || '';
            core.dataHandle.getProductDetail({'id': id});


            var fromStr = (localStorageCAT.getItem('product-type') || '').split('-');
            var from = fromStr[0],
                type = fromStr[1];
            var r = "";
            var ExcavatorSize  = '';



            if (type == 1) {
                r = 'small-excavator.html?#' + type;
                ExcavatorSize = 10;

            } else if (type == 2) {
                r = 'middle-excavator.html?#=' + type;
                ExcavatorSize = 20;

            } else if (type == 3) {
                r = 'large-excavator.html?#=' + type;
                ExcavatorSize = 30;

            } else if (type == 4) {
                r = 'lun-excavator.html?#=' + type;
                ExcavatorSize = 40;

            } else if (type == 5) {
                r = 'loader-excavator.html?#=' + type;
                ExcavatorSize = 110;

            }

            $('.link-ask').on('click', function () {
                var str = '('+$('.title').attr('data-typetitle')+')';
                console.log(str);
                 dataLayer && dataLayer.push({
                    'event': 'event',
                    'category': '产品详情页',
                    'action': '点击按钮',
                    'label': '产品详情页_点击按钮_我要询价'+str
                });                


                 if( !!ExcavatorSize && !!$('.title').attr("data-typetitle") ) {
                    window.location.href = 'xunjia.html?pid=' + id+'&ExcavatorSize=' + ExcavatorSize + '&catDateTitle=' + $.trim($('.title').attr("data-typetitle").replace(/[\u4E00-\u9FA5]/g, '').replace(/®/g, '').replace(/_/g, '').replace('Cat', '').replace(/&nbsp;/g, ''));
                }else{
                    window.location.href = 'xunjia.html?pid=' + id;
                }
               
            });

            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')
                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="p_2g01.html">首页</a></li><li><a href="' + r + '">' + from + '</a></li><li><a href="javascript:;" style="color:#999;">' + $('.title').text() + '</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;
            });
        },
        connectPage: function () {
            var core = Core;

            var type = $.getUrlPara('tab'),
                tab = $('.tab');

            if (type) {
                tab.find('a[href="#' + type + '"]').addClass('on');
                tab.find('img[tab="' + type + '"]').removeClass('hide').siblings('img').addClass('hide');
                var rel = tab.find('a[href="#' + type + '"]').attr('rel');

                $(rel).removeClass('hide').siblings('.tab-part').addClass('hide')
            }
            ;
            tab.on('click', function (e) {
                var tag_a = $(e.target).closest('a');
                if (tag_a.length) {
                    type = tag_a[0].hash.substring(1);

                    type = +type;

                    console.log(type);
                    if (type == 1) {
                        dataLayer && dataLayer.push({
                            'event': 'event',
                            'category': '卡特智能页',
                            'action': '点击按钮',
                            'label': '卡特智能页_点击按钮_Tab坡度'
                        });
                    } else if (type == 2) {
                        dataLayer && dataLayer.push({
                            'event': 'event',
                            'category': '卡特智能页',
                            'action': '点击按钮',
                            'label': '卡特智能页_点击按钮_Tab智讯'
                        });
                    }
                    ;

                    tab.find('a[href="#' + type + '"]').addClass('on');
                    tab.find('img[tab="' + type + '"]').removeClass('hide').siblings('img').addClass('hide');
                    var rel = tab.find('a[href="#' + type + '"]').attr('rel');

                    $(rel).removeClass('hide').siblings('.tab-part').addClass('hide')

                }
                ;
            })

            $('.btn-ask').on('click', function () {
                if ($(this).hasClass('btn-ask1')) {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '卡特智能页',
                        'action': '点击按钮',
                        'label': '卡特智能页_点击按钮_坡度询价'
                    });
                } else {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '卡特智能页',
                        'action': '点击按钮',
                        'label': '卡特智能页_点击按钮_智讯询价'
                    });
                }


                window.location.href = 'xunjia.html';
            });

            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')
                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="p_2g01.html">首页</a></li><li><a href="javascript:;" style="color:#999;">卡特智能页</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;
            })

            var player1 = document.getElementById('player1');
            $('.play1').on('click', function () {

                $('.playerBox1').show();
                $('body').css({'overflow': 'hidden'})
                player1.play();

                if ($(this).hasClass('part1')) {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '卡特智能页',
                        'action': '点击按钮',
                        'label': '卡特智能页_点击按钮_坡度视频'
                    });
                } else {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '卡特智能页',
                        'action': '点击按钮',
                        'label': '卡特智能页_点击按钮_智讯视频'
                    });
                }

            });
            var player2 = document.getElementById('player2');
            $('.play2').on('click', function () {

                $('.playerBox2').show();
                $('body').css({'overflow': 'hidden'})
                player2.play();

                if ($(this).hasClass('part1')) {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '卡特智能页',
                        'action': '点击按钮',
                        'label': '卡特智能页_点击按钮_坡度视频'
                    });
                } else {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '卡特智能页',
                        'action': '点击按钮',
                        'label': '卡特智能页_点击按钮_智讯视频'
                    });
                }

            });
            // $('#player').on('click',function(){
            //   console.log(111);
            //   player.pause();
            // })
            $('.playerBox1').on('click', function (e) {
                var target = e.target,
                    $target = $(target);

                if ($target.closest('video').length) {
                    if (player1.paused) {
                        player1.play();
                    } else {
                        player1.pause();
                    }
                } else {
                    player1.pause();
                    $('.playerBox1').hide();
                    $('body').css({'overflow': ''})
                }
            });
            $('.playerBox2').on('click', function (e) {
                var target = e.target,
                    $target = $(target);

                if ($target.closest('video').length) {
                    if (player2.paused) {
                        player2.play();
                    } else {
                        player2.pause();
                    }
                } else {
                    player2.pause();
                    $('.playerBox2').hide();
                    $('body').css({'overflow': ''})
                }
            });
            $('.link-more').on('click', function () {
                var href = $(this).attr('href');
                // console.log(href);return false;
                if (href.indexOf('1') >= 0) {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '卡特智能页',
                        'action': '点击按钮',
                        'label': '卡特智能页_点击按钮_坡度故事1'
                    });
                } else if (href.indexOf('2') >= 0) {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '卡特智能页',
                        'action': '点击按钮',
                        'label': '卡特智能页_点击按钮_坡度故事2'
                    });
                } else if (href.indexOf('3') >= 0) {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '卡特智能页',
                        'action': '点击按钮',
                        'label': '卡特智能页_点击按钮_智讯故事1'
                    });
                } else if (href.indexOf('4') >= 0) {
                    dataLayer && dataLayer.push({
                        'event': 'event',
                        'category': '卡特智能页',
                        'action': '点击按钮',
                        'label': '卡特智能页_点击按钮_智讯故事2'
                    });
                }
                ;

                if (!core.userInfo.UserID) {
                    window.location.href = 'login.html';
                    return false;
                }
                ;
            })

            $('.link-calculate').on('click', function () {
                dataLayer && dataLayer.push({
                    'event': 'event',
                    'category': '卡特智能页',
                    'action': '点击按钮',
                    'label': '卡特智能页_点击按钮_计算器'
                });
            })
        },

        advantage: function () {
            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')
                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="p_2g01.html">首页</a></li><li><a href="javascript:;" style="color:#999;">油耗保障服务</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;
            });
        },
        connect1Page: function () {
            var core = Core;
            core.dataHandle.getCatconnectRecommend(1);
            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')
                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="p_2g01.html">首页</a></li><li><a href="connect.html">卡特智能页</a></li><li><a href="javascript:;" style="color:#999;">用户证言</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;
            })

        },
        connect2Page: function () {
            var core = Core;
            core.dataHandle.getCatconnectRecommend(2);

            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on');
                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="p_2g01.html">首页</a></li><li><a href="connect.html">卡特智能页</a></li><li><a href="javascript:;" style="color:#999;">用户证言</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;
            })
        },
        connect3Page: function () {
            var core = Core;
            core.dataHandle.getCatconnectRecommend(11);

            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')
                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="p_2g01.html">首页</a></li><li><a href="connect.html">卡特智能页</a></li><li><a href="javascript:;" style="color:#999;">用户证言</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;
            })
        },
        connect4Page: function () {
            var core = Core;
            core.dataHandle.getCatconnectRecommend(12);

            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')
                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="p_2g01.html">首页</a></li><li><a href="connect.html">卡特智能页</a></li><li><a href="javascript:;" style="color:#999;">用户证言</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;
            })
        },
        zhengxinPage: function () {

        },
        zhuanjiaPage: function () {

        },
        xunjiaPage: function () {
            var core = Core;

            var pid = $.getUrlPara('pid') || '';

            var r = document.referrer;
            if (r.indexOf('p_2g01.html') >= 0 || r.indexOf('product-detail.html') >= 0 || r.indexOf('connect.html') >= 0) {
                localStorageCAT.setItem('xunjia-back', r)
            }
            ;

            if (core.userInfo.UserID) {
                core.dataHandle.xunjia();

                $('.btn-ok').on('click', function () {
                    window.location.href = localStorageCAT.getItem('xunjia-back') || 'p_2g01.html';
                })

            } else {
                localStorageCAT.setItem('isXunjia', '1');
                if (queryString("from") == "home") {
                    window.location.href = 'register.html';
                } else {
                    window.location.href = 'login.html';
                }
                // $('.ask-panel').removeClass('hide');

                // $('.btn-xunjia').on('click',function(){

                //  var name = $('.name').val(),
                //    mobile = $('.mobile').val();

                //  if (!name) {
                //    alert('请输入姓名')
                //    return ;
                //  };
                //  if (!mobile) {
                //    alert('请正确输入手机号')
                //    return;
                //  };


                //  core.dataHandle.xunjia(mobile,name);
                // })


            }

        },
        xunjiaPage2: function () {
            var core = Core;

            var pid = $.getUrlPara('pid') || '';

            //var r = document.referrer;
            //if (r.indexOf('dealer_.html') >= 0) {
            //    localStorageCAT.setItem('xunjia-back', r)
            //}
            //;

            if (core.userInfo.UserID) {
                core.dataHandle.xunjia();

                $('.btn-ok').on('click', function () {
                    window.location.href = localStorageCAT.getItem('xunjia-back') || 'dealer_.html';
                })

            } else {
                localStorageCAT.setItem('isXunjia', '2');
                if (queryString("dealer") == "dealer") {
                    window.location.href = 'register.html';
                } else {
                    window.location.href = 'login.html';
                }
                // $('.ask-panel').removeClass('hide');

                // $('.btn-xunjia').on('click',function(){

                //  var name = $('.name').val(),
                //    mobile = $('.mobile').val();

                //  if (!name) {
                //    alert('请输入姓名')
                //    return ;
                //  };
                //  if (!mobile) {
                //    alert('请正确输入手机号')
                //    return;
                //  };


                //  core.dataHandle.xunjia(mobile,name);
                // })


            }

        },
        calculatePage: function () {
            var core = Core;

            $('.option .title2').on('click', function () {
                var p = $(this).parent();
                if (p.hasClass('open')) {
                    p.removeClass('open').css({'height': '70px'})
                } else {
                    p.addClass('open').css({'height': 'auto'})
                }
            })

            $('#type').on('change', function () {
                var type = this.value;

                // core.dataHandle.getProductList({'type':type});

                var version = $('#version'),
                    htmls = ['<option value="">请选择型号</option>']
                if (type == "1") {//小型挖掘机
                    htmls.push('<option value="1">312D2 GC</option>');
                } else if (type == "2") {//中型挖掘机
                    htmls.push('<option value="2">320D2/320D2L</option>');
                    htmls.push('<option value="3">320D2 GC</option>');
                    htmls.push('<option value="4">323D2 L</option>');
                    htmls.push('<option value="5">329D2/329D2L</option>');
                    htmls.push('<option value="6">329D/329D L</option>');
                } else if (type == "3") {//大型挖掘机
                    htmls.push('<option value="7">336D2 GC</option>');
                    htmls.push('<option value="8">336D2 XE</option>');
                    htmls.push('<option value="9">336D2</option>');
                } else if (type == "4") {//轮挖
                } else if (type == "5") {//装载机
                }

                version.html(htmls.join(''))

            })

            $('.back').click(function (e) {
                $('.menu-list').remove();
                $('.top-menu-1').hide().prev().show();
                if (!$(this).hasClass('back-on')) {
                    $(this).addClass('back-on')
                    $('header').append('<ul class="menu-list menu-list-back"><li><a href="p_2g01.html">首页</a></li><li><a href="connect.html">卡特智能页</a></li><li><a href="javascript:;" style="color:#999;">精明一算</a></li></ul>');
                } else {
                    $(this).removeClass('back-on')
                }

                return false;
            })

            var pop = $('.pop');

            $('.txt > img').on('click', function () {
                var p = $(this).parent()
                p.addClass('checked').siblings().removeClass('checked')

                if (p.next('.input').length) {
                    p.next('.input').find('input').removeAttr('readonly')
                } else {
                    p.prev('.input').find('input').attr('readonly', '')
                }
            });

            $('#input1').on("input", function () {
                var input1 = parseFloat($('#input1').val());
                if (input1 > 100) {
                    input1 = 100;
                    $('#input1').val(100)
                } else if (input1 < 0) {
                    input1 = 0;
                    $('#input1').val(0)
                }
                $('#input2').val(100 - parseFloat(input1));
            });

            $('#input2').on("input", function () {
                var input2 = parseFloat($('#input2').val());
                if (input2 > 100) {
                    input2 = 100;
                    $('#input2').val(100)
                } else if (input2 < 0) {
                    input2 = 0;
                    $('#input2').val(0)
                }
                $('#input1').val(100 - parseFloat(input2));
            });

            $('.pic-sub').on('click', function () {
                var type = $('#type').val();
                if (!type) {
                    alert('请选择机型')
                    return false;
                }

                var version = $('#version').val();
                if (!version) {
                    alert('请选择型号')
                    return false;
                }

                //开始计算
                var ProdModel = $('#version').find('option:selected').text();

                //by 清扬陌客 加入对机型的判断
                var rModel = "";
                var MTarget = new Array();

                var allModel = new Array('312', '320', '323', '329', '336');
                var flg = [
                    [143, 11.3, 17, 690000],
                    [208, 25.3, 28, 1100000],
                    [250, 27, 30, 1250000],
                    [352, 35, 31, 1600000],
                    [407, 42, 36, 1860000]
                ];
                for (var i = 0; i < allModel.length; i++) {
                    if (ProdModel.indexOf(allModel[i]) != -1) {
                        rModel = allModel[i];
                        MTarget = flg[i];
                    }
                }

                console.log(MTarget)


                var input1 = +$('#input1').val();
                var input2 = +$('#input2').val();
                if (!input1 || !input2) {
                    alert('请正确输入使用的工况')
                    return false;
                }

                if (input1 + input2 != 100) {
                    alert('使用的工况总和应为100%')
                    return false;
                }

                var C14 = parseFloat(input1) / 100;
                var D14 = parseFloat(input2) / 100;

                var input3 = +$('#input3').val();
                if (!input3) {
                    alert('请输入年平均工作小时数')
                    return false;
                }

                var C24 = parseFloat(input3);

                var input4 = +$('#input4').val();
                var input5 = +$('#input5').val();
                var C11 = 0;
                if (!input4 && !input5) {
                    alert('请输入您的工程项目结算金额')
                    return false;
                }
                if ($("#input4-radio").hasClass("checked")) {
                    if (!input4) {
                        alert('请输入您的工程项目结算金额')
                        return false;
                    }
                    C11 = input4;
                } else {
                    if (!input5) {
                        alert('请输入您的工程项目结算金额')
                        return false;
                    }
                    C11 = input5;
                }
                //console.log(C11);
                //C11 = input4 || input5;

                if (!$('.option5').find('.checked').length) {
                    alert('请选择您是否雇用测量员或技术员')
                    return false;
                }
                var input6 = +$('#input6').val(), C36 = 0;
                if (!input6 && $('#input6').parent().prev().hasClass('checked')) {
                    alert('请输入人员月工资支出')
                    return false;
                }
                if (input6 && $('#input6').parent().prev().hasClass('checked')) {
                    C36 = input6;
                }

                if (!$('.option6').find('.checked').length) {
                    alert('请选择您是否使用其他配套作业设备')
                    return false;
                }
                var input7 = +$('#input7').val(), C39 = 0;
                if (!input7 && $('#input7').parent().prev().hasClass('checked')) {
                    alert('请输入配套作业设备每月成本')
                    return false;
                }
                if (input7 && $('#input7').parent().prev().hasClass('checked')) {
                    C39 = input7;
                }

                var H8 = 30;
                var F8 = 200;

                H8 = MTarget[1];
                F8 = MTarget[0];


                //预计您的燃油消耗将节省
                var C19 = (1.22 * C14 + 1 * D14) - 1;
                //预计您的产量将提高
                var C21 = (1.35 * C14 + 1 * D14) - 1;
                //按小时计算预期收入增长
                var C29 = 7.5 * H8 * C24 * C19;
                //按方量计算预期收入增长
                var D29 = F8 * C21 * C24 * C11;
                //其它预计每年可以节省的费用
                var C41 = C36 * 12 + C39 * 12 * C21;

                pop.find('.input1').val((C19 * 100).toFixed(1))
                pop.find('.input2').val((C21 * 100).toFixed(1))

                if ($("#input4-radio").hasClass("checked")) {
                    pop.find('.input3').val(C29.toFixed(1))
                } else {
                    pop.find('.input3').val(D29.toFixed(1))
                }
                pop.find('.input4').val(C41.toFixed(1))


                pop.removeClass('hide');
                $('body').css({'overflow': "hidden"})

                var h = pop.find('.content').outerHeight();
                // alert(document.body.style.zoom)
                h = 945 * document.body.style.zoom;
                if (h < winH) {
                    var a = (winH - h) / 2;
                    pop.find('.content').css({'top': a + 'px'})
                } else {
                    pop.find('.content').css({'top': '0px'})
                }
            })

            pop.find('.close').on('click', function () {
                pop.addClass('hide');
                $('body').css({'overflow': ""})
            })
            pop.find('.btn-sub').on('click', function () {
                pop.addClass('hide');
                $('body').css({'overflow': ""})
            })

        }
    };
    window.core = Core;

    //page js
    $(function () {

        //来源
        var utmSource = $.getUrlPara('utm_source');
        var utmMedium = $.getUrlPara('utm_medium');
        var utmCampaign = $.getUrlPara('utm_campaign');
        var utmContent = $.getUrlPara('utm_content');
        var utmTerm = $.getUrlPara('utm_term');

        //20171222 by jls
         var DataSource = $.getUrlPara('DataSource');

        var fromUrl = document.referrer;
        var fromUrlSlice = "";
        //console.log(fromUrl);

        if (fromUrl) {
            fromUrlSlice = fromUrl.slice(8);
            //console.log(fromUrl);
            var getUrl = fromUrlSlice.split('/');
            var domain = getUrl[0];
            //var start = domain.indexOf('');
            //domain = domain.slice(start);
            //console.log(domain);
        }

        if (domain == "m.baidu.com") {
            if (fromUrl.indexOf("baidu.php") < 0) {
                console.log("no baidu");
                utmTerm = "";
                utmSource = "baidu";
                utmMedium = "organic";
                utmCampaign = "(organic)";
                utmContent = "CATWAJI-WAP";

            }
        }


        //20171226 by jls DataSource 参数判断, 2017 12 活动用参
        if(document.referrer==''){
            // DataSource=NGH-320-Regular
           if( $.getUrlPara('id')==43 || $.getUrlPara('catid')==43 ){
                 $.cookie('DataSource', 'NGH-320-Regular');
           }else if( $.getUrlPara('id')==44 || $.getUrlPara('catid')==44  ){
                 $.cookie('DataSource', 'NGH-320-Regular');
           }else if( $.getUrlPara('id')==45 || $.getUrlPara('catid')==45 || $.getUrlPara('catid')==43   ){
                 $.cookie('DataSource', 'NGH-320-Regular');
           }else{
                $.cookie('DataSource', 'other');
           }

        }else if( document.referrer.indexOf(webBaseURL + '/ngh') > -1 ) {
            $.cookie('DataSource', 'NGH-320-Campaign');
            if(!!$.getParaFromString(document.referrer.split('?')[1],'utm_source'))   utmSource = $.getParaFromString(document.referrer.split('?')[1],'utm_source');
            if(!!$.getParaFromString(document.referrer.split('?')[1],'utm_medium'))   utmMedium = $.getParaFromString(document.referrer.split('?')[1],'utm_medium');
            if(!!$.getParaFromString(document.referrer.split('?')[1],'utm_campaign'))   utmCampaign = $.getParaFromString(document.referrer.split('?')[1],'utm_campaign');
            if(!!$.getParaFromString(document.referrer.split('?')[1],'utm_content'))   utmContent = $.getParaFromString(document.referrer.split('?')[1],'utm_content');
            if(!!$.getParaFromString(document.referrer.split('?')[1],'utm_term'))   utmTerm = $.getParaFromString(document.referrer.split('?')[1],'utm_term');

        }else if( document.referrer.indexOf( webBaseURL + '/middle-excavator.html') > -1 ){
                        // DataSource=NGH-320-Regular
           if( $.getUrlPara('id')==43  || $.getUrlPara('catid')==43 ){
                 $.cookie('DataSource', 'NGH-320-Regular');
           }else if( $.getUrlPara('id')==44  || $.getUrlPara('catid')==44 ){
                 $.cookie('DataSource', 'NGH-320-Regular');
           }else if( $.getUrlPara('id')==45  || $.getUrlPara('catid')==45 ){
                 $.cookie('DataSource', 'NGH-320-Regular');
           }else{
                $.cookie('DataSource', 'other');
           }

        }else {

            if($.cookie('DataSource')!='NGH-320-Campaign'){
               if( $.getUrlPara('id')==43 || $.getUrlPara('catid')==43 ){
                     $.cookie('DataSource', 'NGH-320-Regular');
               }else if( $.getUrlPara('id')==44  || $.getUrlPara('catid')==44  ){
                     $.cookie('DataSource', 'NGH-320-Regular');
               }else if( $.getUrlPara('id')==45  || $.getUrlPara('catid')==45  ){
                     $.cookie('DataSource', 'NGH-320-Regular');
               }else{
                    $.cookie('DataSource', 'other');
               }
            }
        }


        if (utmSource) {
            $.cookie('utmSource', utmSource)
        }
        if (utmMedium) {
            $.cookie('utmMedium', utmMedium)
        }
        if (utmCampaign) {
            $.cookie('utmCampaign', utmCampaign)
        }
        if (utmContent) {
            $.cookie('utmContent', utmContent)
        }
        if (utmTerm) {
            $.cookie('utmTerm', utmTerm)
        }


        // if (utmSource) {
        //     $.cookie('utmSource', utmSource, {'expires': 24})
        // }
        // if (utmMedium) {
        //     $.cookie('utmMedium', utmMedium, {'expires': 24})
        // }
        // if (utmCampaign) {
        //     $.cookie('utmCampaign', utmCampaign, {'expires': 24})
        // }
        // if (utmContent) {
        //     $.cookie('utmContent', utmContent, {'expires': 24})
        // }
        // if (utmTerm) {
        //     $.cookie('utmTerm', utmTerm, {'expires': 24})
        // }




        // if (DataSource) {
        //     $.cookie('DataSource', DataSource);
        // }else{
        //     //xunjia.html  register_  register.html
        //     if( location.href.indexOf('login.html') == -1 &&  location.href.indexOf('register.html') == -1  &&  location.href.indexOf('register_') == -1 &&  location.href.indexOf('xunjia.html') == -1 &&  location.href.indexOf('/ngh/') == -1  && location.href.indexOf('product-detail.html') == -1 ) {
        //         $.cookie('DataSource', 'other');
        //         console.log('==bb');
        //     }else if (location.href.indexOf('/ngh/') > -1) {
        //          $.cookie('DataSource', 'NGH-320-Campaign');
        //     }

        // }        
        //20171226 by jls DataSource 参数判断, 2017 12 活动用参



        var core = Core;
        // var main_h  = window.innerHeight - $('header').outerHeight()-$('footer').outerHeight()
        // $('.main').css({'min-height':main_h});

        //if (isIos) {
        //    document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className + ' ios';
        //}
        //;

        //从首页跳转过来
        var mn = $.getUrlPara('mobile') || '';
        if (!!mn) {
            core.dataHandle.login(mn, function () {
            });
        }

        core.userInfo = JSON.parse(localStorageCAT.getItem('userInfo2') || '{}');
        if (!core.userInfo.mobile) {
            core.userInfo.mobile = '';
        }

        if (core.userInfo.mobile) {
            if (window.zhuge) {
                //注册成功/登录成功(含自动登录)调用
                zhuge.identify(core.userInfo.mobile, {name: core.userInfo.Name});
            }
        }

        //不是 点击back到此页面
        var fromPage = JSON.parse(localStorageCAT.getItem('fromPage') || '[]');

        var r = document.referrer || 'p_2g01.html';
        if (localStorageCAT.getItem('from-back') != '1' && r.indexOf('xunjia.html') < 0) {
            fromPage.push(r);
            localStorageCAT.setItem('fromPage', JSON.stringify(fromPage));
        } else {
            localStorageCAT.setItem('from-back', '');
        }

        //右上角菜单按钮
        $('.top-menu').on('click', function () {
            $(this).hide().next().show();
            $('.menu-list').remove();
            $('.back-on').removeClass('back-on');
            if (core.userInfo.UserID) {//已登录
                $('header').append('<ul class="menu-list"><li><a href="javascript:;" class="user"><img src="img/btn-name.png" alt="" class="btn-name"><em>' + core.userInfo.Name + '</em></a><img src="img/btn-logout.png" alt="" class="btn-logout"></li><li><a href="javascript:;" class="link-catbang-user"><img src="img/btn-userInfo.png" alt="" style="margin-left: 16px"><strong style="margin-left: -10px" >卡特帮个人中心</strong></a></li>' +
                    '<li><a href="http://www.catwj.cn/advantage.html?utm_source=catwaji_m&utm_medium=owned&utm_content=16032541&utm_campaign=1603_Cat360?tbid=7"  class="item"><img src="img/360-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-360"><strong>Cat<sup>®</sup>（卡特）360°全程安心服务</strong><br><span >立即点击了解详情&gt;&gt;</span></p></a></li>' +

                     '<li><a href="http://m.catwj.cn/ngh/?utm_source=catwj%5Fm%5Fdaohang&utm_medium=owned&utm_content=180504%5F01%5Fnghcam&utm_campaign=1803%5Fwap" class="item"><img src="img/ngh-icon.png" style="margin-left: 16px"><strong>新一代Cat<sup>®</sup>&nbsp;液压挖掘机震撼上市！</strong></a></li>' +

                    '<li style="display:none"><a class="item"><img src="img/fuel-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-fuel"><strong>油耗保障服务</strong></p></a></li>' +
                    '<li><a href="http://m.catwj.cn//catbang/ktb1.html?t=11" class="item"><img src="img/zhineng-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-zhineng"><strong>Cat®（卡特）智能</strong></p></a></li>' +
                    '<li><a class="item"><img src="img/dealer-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-dealer"><strong>代理商查询</strong></p></a></li>' +
                    '<li><a href="p_2g01.html" class="item"><img src="img/home-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-home"><strong>首 页</strong></p></a></li>' +
                    '</ul>');
                $(".menu-list").find(".btn-dealer").on("click", function () {
                      window.location="dealer.html";
                });
                $(".menu-list").find(".btn-fuel").on("click", function () {
                    $('.menu-list').hide();
                    $('.back-on').removeClass('back-on');
                      window.location="fuel.html";
                });

            } else {//未登录
                $('header').append('<ul class="menu-list"><li><a href="login.html"><img src="img/btn-login.png" alt="" class="btn-login"></a></li><li><a href="register.html"><img src="img/btn-register.png" alt="" class="btn-register"></a></li>' +
                    '<li><a href="http://www.catwj.cn/advantage.html?utm_source=catwaji_m&utm_medium=owned&utm_content=16032541&utm_campaign=1603_Cat360?tbid=7"  class="item"><img src="img/360-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-360"><strong>Cat<sup>®</sup>（卡特）360°全程安心服务</strong><br><span >立即点击了解详情&gt;&gt;</span></p></a></li>' +

                     '<li><a href="http://m.catwj.cn/ngh/?utm_source=catwj%5Fm%5Fdaohang&utm_medium=owned&utm_content=180504%5F01%5Fnghcam&utm_campaign=1803%5Fwap" class="item"><img src="img/ngh-icon.png" style="margin-left: 16px"><strong>新一代Cat<sup>®</sup>&nbsp;液压挖掘机震撼上市！</strong></a></li>' +


                    '<li style="display:none"><a class="item"><img src="img/fuel-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-fuel"><strong>油耗保障服务</strong></p></a></li>' +
                    '<li><a href="http://m.catwj.cn//catbang/ktb1.html?t=11" class="item"><img src="img/zhineng-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-zhineng"><strong>Cat®（卡特）智能</strong></p></a></li>' +
                    '<li><a class="item"><img src="img/dealer-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-dealer"><strong>代理商查询</strong></p></a></li>' +
                    '<li><a href="p_2g01.html" class="item"><img src="img/home-icon.png" style="margin-left: 16px">' +
                    '<p class="btn-home"><strong>首 页</strong></p></a></li>' +
                    '</ul>');
                $(".menu-list").find(".btn-dealer").on("click", function () {
                    window.location="dealer.html";
                });
                $(".menu-list").find(".btn-fuel").on("click", function () {
                    $('.menu-list').hide();
                    $('.back-on').removeClass('back-on');
                    window.location="fuel.html";
                });
            }
        });

        $('.top-menu-1').on('click', function () {
            $(this).hide().prev().show();
            $('.menu-list').remove();
        });

        $(document).on('click', function (e) {
            var $target = $(e.target);
            if ($target.closest('.menu-list').length == 0 && $target.closest('.top-menu').length == 0 && $target.closest('.back').length == 0) {
                $('.top-menu-1').hide().prev().show();
                $('.menu-list').remove();
                $('.back-on').removeClass('back-on');
            }
        }).on(touchMoveEvent, function (e) {
            $('.top-menu-1').hide().prev().show();
            $('.menu-list').remove();
            $('.back-on').removeClass('back-on');
        });

        //头部的注销按钮
        $('header').on('click', '.btn-logout', function (e) {
            e.preventDefault();
            localStorageCAT.removeItem('userInfo2');
            window.location.href = "p_2g01.html";
        });

        //链接到卡特帮
        $('body').on('click', '.link-catbang', function () {
            location.href = SITE_CATBANG + '/index.html?mobile=' + core.userInfo.mobile;
        });
        //链接到卡特帮 用户中心
        $('body').on('click', '.link-catbang-user', function () {
            dataLayer && dataLayer.push({
                'event': 'event',
                'category': '首页',
                'action': '点击按钮',
                'label': '首页_点击按钮_个人中心'
            });

            location.href = SITE_CATBANG + '/userinfo.html?mobile=' + core.userInfo.mobile;
        });

        //$('.footer-menu').on('click', function (e) {
        //    if (e.target.nodeName.toLowerCase() == 'a') {
        //        var $target = $(e.target);
        //        var index = $target.index();
        //        if (index == 1) {
        //            dataLayer && dataLayer.push({
        //                'event': 'event',
        //                'category': '首页',
        //                'action': '点击',
        //                'label': '首页_点击_首页'
        //            });
        //        } else if (index == 2) {
        //            dataLayer && dataLayer.push({
        //                'event': 'event',
        //                'category': '首页',
        //                'action': '点击',
        //                'label': '首页_点击_产品列表'
        //            });
        //        } else if (index == 3) {
        //            dataLayer && dataLayer.push({
        //                'event': 'event',
        //                'category': '首页',
        //                'action': '点击',
        //                'label': '首页_点击_卡特帮入口'
        //            });
        //        } else {
        //            dataLayer && dataLayer.push({
        //                'event': 'event',
        //                'category': '首页',
        //                'action': '点击',
        //                'label': '首页_点击_微信入口'
        //            });
        //        }
        //
        //        console.log(index);
        //
        //    }
        //});

        $('a[href=""]').click(function (e) {
            e.preventDefault();
        });

        //头部搜索
        $('.search').on('click', function () {
            window.location.href = 'search.html';
        });
        //公共logo
        $('.logo').on('click', function () {
            window.location.href = 'p_2g01.html';
        });

        //页面公共搜索框
        $('.btn-search').on('click', function () {
            if (!$(this).data('searchpage')) {
                window.location.href = 'search.html?key=' + $(this).prev().val();
            }
        });


        //头部的返回按钮
        $('.back').click(function (e) {
            localStorageCAT.setItem('from-back', '1');

            if ($(this).data('noback')) {
                return;
            }

            if ($(this).attr('to')) {
                window.location.href = $(this).attr('to');
                return;
            }
            var fromPage = JSON.parse(localStorageCAT.getItem('fromPage') || '[]');
            if (fromPage.length) {
                var link = fromPage.pop();
                localStorageCAT.setItem('fromPage', JSON.stringify(fromPage));
                window.location.href = link;
            }
        });

        //tab切话
        $('.tab').on('click', function (e) {
            if ($(this).hasClass('tab-0')) {
                return false;
            }
            var target = e.target,
                item = $(target).closest('.item');
            if (item.length) {
                item.addClass('on').siblings().removeClass('on');
                $(item.attr('rel')).removeClass('hide').siblings('.tab-part').addClass('hide');
            }
            //e.preventDefault();
        });

        $(window).on('scroll', function () {
            $('header').css({'top': '0px'})
            $('footer').css({'bottom': '0px'})
        });


        //公共二维码弹窗    2017-9-19 by jls
        // $('.jls2017919').click(function(){
        //     var div = document.createElement('div');
        //     div.style.background = 'rgba(0,0,0,.8)';
        //     div.style.position = 'fixed';
        //     div.style.top = '0';
        //     div.style.left = '0';
        //     div.style.width = '100%';
        //     div.style.height = '100%';
        //     div.style.zIndex = '1000';

        //     var imag = document.createElement('img');
        //     imag.src = "http://m.catwj.cn//img/jls20179191.jpg";
        //     imag.style.position = 'fixed';
        //     imag.style.bottom = '50%';
        //     imag.style.right = '7%';

        //     imag.style.width = '86%';
        //     imag.style.height = 'auto';
        //     imag.style.transform = 'translate(0,50%)';
        //     imag.style.webkitTransform = 'translate(0,50%)';

        //     var span = document.createElement('span');
        //     span.style.position = 'fixed';
        //     span.style.display = 'block';
        //     span.style.top = '0';
        //     span.style.right = '0';
        //     span.style.width = '16%';
        //     span.style.height = '25%';
        //     span.style.zIndex = '2';               
        //     div.appendChild(imag);
        //     div.appendChild(span);
        //     $('body').append(div);
        //     $(span).click(function(){
        //         $(div).remove();
        //     });
        // })

    })
})(window, jQuery);
