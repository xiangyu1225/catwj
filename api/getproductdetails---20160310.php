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
    public $title = "";
    public $picList = array();//头部图片地址
    public $parameters = "";//主要参数
    public $advantage = "";//性能优势
    public $volume = "";//
    public $power = "";//
    public $quality = "";//
    public $catSmart = array();//1 2
    public $simpleComment = "";//
    public $youshi = "";//产品优势
    public $suitable = array();//
    public $engine = array();//
    public $hydraulicSystem = array();//
    public $drive = array();//
    public $qualityList = array();//
    public $maintain = array();//
    public $expertList = array();
    public $recommend = array();
    public $extTools = array();
}

//class extToolInfo
//{
//    public $volume = "";//
//    public $power = "";//
//    public $quality = "";//
//    public $catid = 1;//1 2
//    public $simpleComment = "";
//}


$db = new DB();

$id = intval($_REQUEST["id"]);


$sql_select = "call usp_hm_getproductdetails($id)";
$result_select = $db->getObjListBySql($sql_select);
$result = new getListResult();
$index = 0;
if (count($result_select) > 0) {
    $result->ErrorCode = 0;
    $result->ErrorDetail = "成功";
    $result->title = $result_select[0]->title;
    $result->parameters = $result_select[0]->parameters;
    $result->advantage = $result_select[0]->advantage;
    $result->picList = explode(';', $result_select[0]->picUrlDetails);
    $sql_select2 = "call usp_hm_getexpertlist($id)";
    $result_select2 = $db->getObjListBySql($sql_select2);
    if (count($result_select2) > 0) {
        $result->expertList = $result_select2;
    }

    if (strlen($result_select[0]->recommend) > 0) {
        $recommend = $result_select[0]->recommend;
        $sql_select3 = "call usp_hm_getrecommend('$recommend')";
        $result_select3 = $db->getObjListBySql($sql_select3);
        if (count($result_select3) > 0) {
            $result->recommend = $result_select3;
        }
    }

    $sql_select4 = "select * from tb_hm_catdetails_conf where catid=$id";
    $result_select4 = $db->getObjListBySql($sql_select4);
    if (count($result_select4) > 0) {
        $result->volume = $result_select4[0]->volume;
        $result->power = $result_select4[0]->power;
        $result->quality = $result_select4[0]->quality;
        $result->catSmart = explode(';', $result_select4[0]->catsmart);//$result_select4[0]->catsmart;
        $result->simpleComment = $result_select4[0]->simplecomment;
        $result->suitable = explode(';', $result_select4[0]->suitable);
        $result->engine = explode(';', $result_select4[0]->engine);
        $result->hydraulicSystem = explode(';', $result_select4[0]->hydraulicSystem);
        $result->drive = explode(';', $result_select4[0]->drive);
        $result->qualityList = explode(';', $result_select4[0]->qualityList);
        $result->maintain = explode(';', $result_select4[0]->maintain);

        $result->youshi = $result_select4[0]->youshi;
    }

    $sql_select5 = "select `tbid` as id,`catid`,`title`,`desc`,`picURL`,`sort`  from `tb_hm_exttools`  where catid=$id";
    $result_select5 = $db->getObjListBySql($sql_select5);
    if (count($result_select5) > 0) {
        $result->extTools = $result_select5;
    }
} else {
    $result->ErrorCode = -1;
}

echo json_encode($result, 256);


