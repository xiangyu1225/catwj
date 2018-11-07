<?php
header("Content-Type: text/html;charset=utf-8");
header("Access-Control-Allow-Origin: *");
echo phpinfo();
try {

    //   $wsdl = "http://catsite.ogilvy.com.cn/CatWajiWebService.asmx?wsdl";

    //   $strToken = "a889810174804b9b93511cde053f4586";
    //   $strInfo = "<Cat><UserInfo><UserID>19044</UserID><Name>aaa</Name><Mobile>11522222222</Mobile></UserInfo></Cat>";
    //   $strMobile = "11122222222";

    //   $a = "a889810174804b9b93511cde053f4586";
    //   $args=array("strMobile"=>"11522222222","strToken"=>$a);
    //   // $args=array("strInfo"=>"<Cat><UserInfo><Name>aaa</Name><Mobile>11522222222</Mobile></UserInfo></Cat>","strToken"=>"a889810174804b9b93511cde053f4586");


    //   //UserLogin  UserRegist  UserEnquire

    //   $client = new SoapClient($wsdl);
    //   $ret = $client->UserLogin($args);


    //   if ($ret){
    //     // print_r($ret)
    //     print_r($ret->UserLoginResult);

    //   }


    //{ UserLoginResult: '<Cat><Return><Success>Y</Success><UserID>19044</UserID><Name>aaa </Name><Gender>1</Gender><Province></Province><City></City><BirthYear>0</BirthYear><BirthMonth>0</BirthMonth><CityOther></CityOther><ErrMessage></ErrMessage></Return></Cat>' }

    //{ UserRegistResult: '<Cat><Return><Success>Y</Success><UserID>19045</UserID><ErrMessage></ErrMessage></Return></Cat>' }

    //{ UserEnquireResult: '<Cat><Return><Success>Y</Success><ErrMessage></ErrMessage></Return></Cat>' }

} catch (SoapFault $fault) {
    echo "Error: ", $fault->faultcode, ", string: ", $fault->faultstring;
}


?> 
