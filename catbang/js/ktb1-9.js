/*
 * VERSION: 0.0.0.0
 * DATE: 16/5/11
 * Requires 
 * @license Copyright (c) 2013-2015, sktap. All rights reserved.
 * @author: 清扬陌客, qingyangmoke@qq.com
 */
$(function(){
    var url = "http://www.catwj.cn/fuel.html?utm_source=catwaji_m&utm_medium=owned&utm_content=16032543&utm_campaign=1603_Cat360";
    $(".phase9-btn-red").on("click", function () {
        if (core.userInfo.phone) {
            window.location = url + "&mobile=" + core.userInfo.phone;
        } else {
            window.location = url;
        }
    });
    $(".phase9-btn-blue").on("click", function () {
            window.location = "http://catwaji2g.mobileone.com.cn/register.html?catid=19";
    });
});