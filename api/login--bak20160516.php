<?php

//登录，注册，询价

ini_set("date.timezone", "Asia/Shanghai");
header("Content-Type: text/html;charset=utf-8");
header("Access-Control-Allow-Origin: *");

// print_r($_POST);

// echo "test";

$action = $_GET["action"];
$mobile = $_GET["mobile"];
$userName = $_GET["userName"];
$userId = $_GET["UserID"];

$utmSource = $_GET["utmSource"];
$utmMedium = $_GET["utmMedium"];
$utmCampaign = $_GET["utmCampaign"];
$utmContent = $_GET["utmContent"];
$utmTerm = $_GET["utmTerm"];

if ($_GET["debug"] && ($_GET["debug"] == "true")) {
    //测试地址
    $wsdl = "http://catsite.ogilvy.com.cn/CatWajiWebService.asmx?wsdl";
} else {
    //正式地址
    $wsdl = "http://catwajiservice.ogilvy.com.cn/CatWajiWebService.asmx?wsdl";
}

$strToken = "a889810174804b9b93511cde053f4586";

$client = new SoapClient($wsdl);


if ($action == "login") {
    $args = array("strMobile" => $mobile, "strToken" => $strToken);
    $result = $client->UserLogin($args);
    if ($result) {
        $result = $result->UserLoginResult;
    }
} else if ($action == "register") {
    $args = array("strInfo" => "<Cat><UserInfo><Name>" . $userName . "</Name><Mobile>" . $mobile . "</Mobile><UtmSource>" . $utmSource . "</UtmSource><UtmMedium>" . $utmMedium . "</UtmMedium><UtmCampaign>" . $utmCampaign . "</UtmCampaign><UtmContent>" . $utmContent . "</UtmContent><UtmTerm>" . $utmTerm . "</UtmTerm></UserInfo></Cat>", "strToken" => $strToken);
    $result = $client->UserRegist($args);
    if ($result) {
        $result = $result->UserRegistResult;
    }
} else if ($action == "ask") {
    $args = array("strInfo" => "<Cat><UserInfo><UserID>" . $userId . "</UserID><Name>" . $userName . "</Name><Mobile>" . $mobile . "</Mobile><UtmSource>" . $utmSource . "</UtmSource><UtmMedium>" . $utmMedium . "</UtmMedium><UtmCampaign>" . $utmCampaign . "</UtmCampaign><UtmContent>" . $utmContent . "</UtmContent><UtmTerm>" . $utmTerm . "</UtmTerm></UserInfo></Cat>", "strToken" => $strToken);
    $result = $client->UserEnquire($args);
    if ($result) {
        $result = $result->UserEnquireResult;
    }


    // print_r($args);
}

//解析xml
$xml = simplexml_load_string($result);
// print_r($xml);

echo json_encode($xml->Return);


return false;


//{ UserLoginResult: "<Cat><Return><Success>Y</Success><UserID>19044</UserID><Name>aaa </Name><Gender>1</Gender><Province></Province><City></City><BirthYear>0</BirthYear><BirthMonth>0</BirthMonth><CityOther></CityOther><ErrMessage></ErrMessage></Return></Cat>" }

//{ UserRegistResult: "<Cat><Return><Success>Y</Success><UserID>19045</UserID><ErrMessage></ErrMessage></Return></Cat>" }

//{ UserEnquireResult: "<Cat><Return><Success>Y</Success><ErrMessage></ErrMessage></Return></Cat>" }

?> 