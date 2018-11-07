<?php
if (isset($_REQUEST["phone"])) {
    $phone = $_REQUEST["phone"];

    $utm_source = "catwaji_m";//queryString("utm_source");
    $utm_medium = "owned";//queryString("utm_medium");
    $utm_content = "15122813";//queryString("utm_content");
    $utm_campaign = "950GC_2015";//queryString("utm_campaign");
    $utm_term = "";//queryString("utm_term");

    $ds = "CATWAJI-950GC-2016-WAP-LP";
    $Flg = intval($_REQUEST["Flg"]) > 0 ? "N" : "Y";//是否新用户

    //测试地址
    //echo file_get_contents("http://catsitenew.onestaging.com/Interface/TestDriver950?phone=$phone&Flg=$Flg&Src=$utm_source&mdm=$utm_medium&cap=$utm_campaign&ctt=$utm_content&tem=$utm_term&ds=$ds");
    //正式接口
    echo file_get_contents("http://www.catwaji.com/Interface/TestDriver950?phone=$phone&Flg=$Flg&Src=$utm_source&mdm=$utm_medium&cap=$utm_campaign&ctt=$utm_content&tem=$utm_term&ds=$ds");
} else {
    echo "{\"success\":\"0\",\"ErrorDetail\":\"参数错误\"}";
}
?> 