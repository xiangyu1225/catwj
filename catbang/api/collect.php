<?php
/*
 * VERSION: 0.0.0.0
 * DATE: 15/7/17
 * Requires 
 * @author: 清扬陌客, qingyangmoke@qq.com
 */
header("Content-type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");
include_once dirname(__FILE__) . "/mysqlDataBase.php";
include_once dirname(__FILE__) . "/system.php";
session_start();
$db = mysqlDataBase::create();

function echoRet($ret)
{
    echo $_GET['jsoncallback'] . "(" . json_encode($ret) . ")";
    exit(0);
}

$action = $_GET['type'];
$id = intval($_GET['id']);
if ($action == 'add') {
    $row = $db->get_var("select count(*) as cnt from catbang where id=$id;");
    if ($row && count($row) > 0) {
        $ret['msg'] = '您已经收藏过了.';
        $ret['state'] = '201';
        echoRet($ret);
    } else {
        $title = $db->escape(urldecode($_GET['title']));
        $content = '';
        $userid = $db->escape($_GET['userid']);
        $createTime = date("Y-m-d H:i:s", time());
        $db->query("insert into `catbang` (`id`,`title`,`content`,`userid`,`createTime`) values($id,'$title','$content','$userid',now());");

        $ret['msg'] = '收藏成功.';
        $ret['state'] = '200';
        echoRet($ret);
    }
} else if ($action == 'del') {
    $db->query("delete from `catbang` where `id` = $id;");
    $ret['msg'] = '删除成功.';
    $ret['state'] = '200';
    echoRet($ret);
} else {//query all
    $userid = $db->escape($_GET['userid']);
    $results = $db->get_results("select id,title from  `catbang` where `userid` = '$userid';");
    $ret['list'] = $results;
    $ret['state'] = '200';
    echoRet($ret);
}