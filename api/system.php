<?php

/**
 * Created by PhpStorm.
 * User: song
 * Date: 15/3/23
 * Time: 下午9:06
 */
class SystemHelper
{
    public static function  createGuid()
    {
        if (function_exists('com_create_guid')) {
            return com_create_guid();
        } else {
            mt_srand((double)microtime() * 10000);//optional for php 4.2.0 and up.
            $charid = strtoupper(md5(uniqid(rand(), true)));
            $hyphen = chr(45);// "-"
            $uuid = ''//chr(123)// "{"
                . substr($charid, 0, 8) . $hyphen
                . substr($charid, 8, 4) . $hyphen
                . substr($charid, 12, 4) . $hyphen
                . substr($charid, 16, 4) . $hyphen
                . substr($charid, 20, 12)
                . '';//chr(125);// "}"
            return $uuid;
        }
    }

    public static function mysql_escape_string($str)
    {
        if (!get_magic_quotes_gpc()) {
            $str = addslashes($str); // 进行过滤
        }
        $str = str_replace("_", "\_", $str);
        $str = str_replace("%", "\%", $str);
        return $str;
    }

    public static function sendMessage($phone)
    {
        $content = urlencode(iconv('UTF-8', 'GB2312', '【Cat挖掘机查询中心】测试内容'));
        $url = "http://211.151.85.133:8080/sendsms.asp?username=KTH&password=888888&mobile=$phone&message=$content";
        //初始化curl
        $ch = curl_init();
        //设置超时
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        //运行curl，结果以jason形式返回
        $res = curl_exec($ch);
        curl_close($ch);
        return $res;
    }
}