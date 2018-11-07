<?php
/**
 * Created by PhpStorm.
 * User: song
 * Date: 15/3/23
 * Time: 上午10:51
 */
header("Content-Type: text/html;charset=utf-8");
header("Access-Control-Allow-Origin: *");


class jsonResult
{
    public $statusCode = 500;
}

$name = $_REQUEST['name'];

$mediasource = "";

if (isset($_REQUEST['mediasource'])) {
    $mediasource = $_REQUEST['mediasource'];
}

$phone = intval($_REQUEST['phone']);

$gender = 1;

$result = new jsonResult();
$result->statusCode = 500;

//echo "11";
$now = date('Y-m-d H:i:s', time());

$strToken = "a889810174804b9b93511cde053f4586";
$datasource = "CATWAJI-950GC-2016-WAP-LP";

//$client = new SoapClient("http://catsite.ogilvy.com.cn/CatWajiWebService.asmx?wsdl");
$client = new SoapClient("http://catwajiservice.ogilvy.com.cn/CatWajiWebService.asmx?wsdl");

//echo "22";
$strInfo = '<Cat><UserInfo><Name>' . $name . '</Name><Gender>1</Gender><Mobile>' . $phone . '</Mobile><Province></Province><City></City><CityOther></CityOther><BirthYear>1986</BirthYear><BirthMonth>02</BirthMonth><PurchasePeriod>97</PurchasePeriod><ExcavatorSize>3</ExcavatorSize><IsComponents>Y</IsComponents><AgreeContact>Y</AgreeContact><OrderMessage>sktap</OrderMessage><RegDate>' . $now . '</RegDate><MediaSource>' . $mediasource . '</MediaSource><DataSource>' . $datasource . '</DataSource><RegisterType>注册</RegisterType></UserInfo></Cat>';
$params = array(
    "strInfo" => $strInfo,
    "strToken" => $strToken,
);
//注册
$response = $client->__soapCall("UserRegist", array($params));
//var_dump($response);

$xml = simplexml_load_string($response->UserRegistResult);
//var_dump($xml);

$success = (string)$xml->Return->Success;


if ($success == "Y") {
    $result->statusCode = 200;
} else {
    $err = (string)$xml->Return->ErrMessage;
    if (strpos($err, '已经存在') === false) {
        $result->statusCode = 500;
    } else {
        $result->statusCode = 200;
    }
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);

?>