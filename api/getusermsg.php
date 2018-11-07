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

$id = $_REQUEST["id"];
$result = new getListResult();
$sql_select = "call usp_hm_getusermsg('$id')";
$result_select = $db->getObjListBySql($sql_select);
if (count($result_select) > 0) {
    $result->list = $result_select;
} else {
    $result->ErrorCode = -1;
}

echo json_encode($result, 256);


