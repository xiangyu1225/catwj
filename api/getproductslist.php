<?php
/*
 * VERSION: 0.0.0.0
 * DATE: 15/7/17
 * Requires 
 * @author: 清扬陌客, qingyangmoke@qq.com
 */
header("Content-type: text/html; charset=utf-8");

include_once("./system.php");
include_once("./dbHelper.php");

session_start();


//获取所有促销活动结果
class getListResult
{
    public $ErrorCode = 0;
    public $ErrorDetail = "";
    public $list = array();
}

$db = new DB();

$key = SystemHelper::mysql_escape_string($_REQUEST["key"]);

$type = intval($_REQUEST["type"]);

$sql_select = "call usp_hm_getproductslist('$key',$type)";

$result_select = $db->getObjListBySql($sql_select);

$result = new getListResult();
$index = 0;
if (count($result_select) > 0) {
    $result->ErrorCode = 0;
    $result->ErrorDetail = "成功";
    $result->list = $result_select;
//    foreach ($result_select as $row) {
//        $result->list[$index] = $row->words;
//        $index++;
//    }
} else {
    $result->ErrorCode = 0;
}

echo json_encode($result, 256);


