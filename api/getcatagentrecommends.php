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

$typeid = intval($_REQUEST["typeid"]);

$db = new DB();

$sql_select = "select `tbid` as id,`catid`,`sort`  from `tb_hm_catagent_recommends`  where typeid=$typeid";

$result_select = $db->getObjListBySql($sql_select);

$result = new getListResult();

if (count($result_select) > 0) {
    $result->ErrorCode = 0;
    $result->ErrorDetail = "成功";
    $catid = $result_select[0]->catid;
    $sql_select = "select tbid as id,`title`,`picUrl`,`sort` from tb_hm_catdetails where find_in_set(tbid,'$catid')";
    $result_select = $db->getObjListBySql($sql_select);
    if (count($result_select) > 0) {
        $result->list = $result_select;
    }
} else {
    $result->ErrorCode = 0;
}

echo json_encode($result, 256);


