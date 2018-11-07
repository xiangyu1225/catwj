<?php
if (isset($_REQUEST["phone"])) {
    //测试地址
    //echo file_get_contents("http://catsitenew.onestaging.com/Interface/phoneExits?phone=" . $_REQUEST["phone"]);
    //正式地址
    echo file_get_contents("http://www.catwaji.com/Interface/phoneExits?phone=" . $_REQUEST["phone"]);
} else {
    echo "{\"success\":\"0\",\"ErrorDetail\":\"参数错误\"}";
}
?> 