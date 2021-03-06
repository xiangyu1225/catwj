/*
 * VERSION: 0.0.0.0
 * DATE: 15/12/29
 * Requires
 * @license Copyright (c) 2013-2015, sktap. All rights reserved.
 * @author: 清扬陌客, qingyangmoke@qq.com
 */
(function (global) {
    var CATAPI = window.CATAPI = {};
    CATAPI.checkPhoneIsResiter = function (phone, callback) {
        $.ajax({
            type: "GET",
            url: "php/phoneExists.php",
            dataType: "json",
            data: {
                rnd: Math.random() * 10000,
                phone: phone
            },
            success: function (data) {
                if (data.success == "0") {
                    callback({
                        statusCode: 200,
                        phoneExists: false
                    });
                } else {
                    callback({
                        statusCode: 200,
                        phoneExists: true
                    });
                }
            }, error: function () {
                callback({
                    statusCode: 300,
                    phoneExists: false
                });
            }
        });
    };

    CATAPI.TestDriver950 = function (phone, name, Flg, callback) {
        $.ajax({
            type: "GET",
            url: "php/TestDriver950.php",
            dataType: "json",
            data: {
                rnd: Math.random() * 10000,
                phone: phone,
                name: name,
                Flg: Flg
            },
            success: function (data) {
                if (data.success == "1") {
                    callback({
                        statusCode: 200
                    });
                } else {
                    callback({
                        statusCode: 500
                    });
                }
            }, error: function () {
                callback({
                    statusCode: 300
                });
            }
        });
    };
    CATAPI.Resiter = function (phone, name, utmSource, utmMedium, utmCampaign, utmContent, utmTerm, callback) {
        var params = {
            'action': 'register',
            'mobile': phone,
            'userName': name,
            'dataSource': "CATWAJI-950GC-2016-WAP-LP",
            'utmSource': utmSource,
            'utmMedium': utmMedium,
            'utmCampaign': utmCampaign,
            'utmContent': utmContent,
            'utmTerm': utmTerm
        };
        $.ajax({
            'type': 'GET',
            'dataType': 'json',
            'url': 'http://h5.sktap.cn/app/cat/site/api/login2.php',
            'data': params,
            'success': function (data) {
                if (data.Success == 'Y') {
                    callback({
                        statusCode: 200
                    });
                } else {//已注册
                    if (data.ErrMessage.indexOf('已经存在') >= 0) {
                        callback({
                            statusCode: 200
                        });
                    } else {
                        callback({
                            statusCode: 500
                        });
                    }
                }
            },
            'error': function () {
                callback({
                    statusCode: 300
                });
            }
        });
        //
        //var params = {
        //    'phone': phone,
        //    'name': name,
        //    'mediasource': [
        //        decodeURIComponent(utmSource)
        //        , decodeURIComponent(utmMedium)
        //        , decodeURIComponent(utmCampaign)
        //        , encodeURIComponent(utmTerm)
        //        , decodeURIComponent(utmContent)].join(',')
        //};
        //$.ajax({
        //    'type': 'GET',
        //    'dataType': 'json',
        //    'url': 'http://h5.sktap.cn/app/cat/site/api/Register.php',
        //    'data': params,
        //    'success': function (data) {
        //        callback(data);
        //    },
        //    'error': function () {
        //        callback({
        //            statusCode: 300
        //        });
        //    }
        //});
    }
})(window);