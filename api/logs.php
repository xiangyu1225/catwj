<?php
/*
 * VERSION: 0.0.0.0
 * DATE: 15/7/17
 * Requires 
 * @author: 清扬陌客, qingyangmoke@qq.com
 */
header("Content-type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");

include_once("./api/mysqlDataBase.php");

session_start();

$result["statusCode"] = 200;

$db = mysqlDataBase::create();

$uid = $db->escape($_REQUEST["uid"]);
$phone = $db->escape($_REQUEST["phone"]);
$svcName = $db->escape($_REQUEST["svcName"]);
$parameters = $db->escape($_REQUEST["parameters"]);
$recommend = $db->escape($_REQUEST["recommend"]);

$sql_select = "insert into `tb_logs` (`uid`,`phone`,`svcName`,`parameters`,`recommend`,`addtime`) values('$uid','$phone','$svcName','$parameters','$recommend',now());";

if (!$db->query($sql_select)) {
    $result["statusCode"] = 501;
    $result["errorMsg"] = "db error";
}


echo json_encode($result, 256);


