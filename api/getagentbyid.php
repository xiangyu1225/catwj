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
    public $data;
}

$db = new DB();

$sql_select = "select * from  tb_hm_agentlist where tbid=" . intval($_GET["id"]);

$result_select = $db->getObjListBySql($sql_select);

$result = new getListResult();

if (count($result_select) > 0) {
    $result->ErrorCode = 0;
    $result->ErrorDetail = "成功";
    $result->data = $result_select[0];
} else {
    $result->ErrorCode = 0;
}

echo json_encode($result, 256);


