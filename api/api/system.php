<?php

/**
 * Created by PhpStorm.
 * User: song
 * Date: 15/3/23
 * Time: 下午9:06
 */


//上传图片根目录
define('IMAGE_DOCUMENT_ROOT', '/alidata/www/html/app/cat/site/');
//卡特服务器跟目录
//define('IMAGE_DOCUMENT_ROOT', '/var/www/html/');


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

    public static function  getClientIP()
    {
        $ip = "127.0.0.1";
        $unknown = 'unknown';
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $_SERVER['HTTP_X_FORWARDED_FOR'] && strcasecmp($_SERVER['HTTP_X_FORWARDED_FOR'], $unknown)) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } elseif (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], $unknown)) {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        if (false !== strpos($ip, ',')) $ip = reset(explode(',', $ip));
        return $ip;
    }

    public static function  saveImage($file, $name)
    {
        $ret = "";
        if ((($file["type"] == "image/gif")
                || ($file["type"] == "image/jpeg")
                || ($file["type"] == "image/png"))
            && ($file["size"] < 500000)
        ) {
            if ($file["error"] > 0) {
                $ret = "Return Code: " . $file["error"] . "<br />";
            } else {
                if (file_exists($name)) {
                    $ret = $name . " already exists. ";
                } else {
                    if (!(move_uploaded_file($file["tmp_name"], $name)
                        && file_exists($name))
                    ) { //移动失败
                        $ret = "图片保存失败";
                    } else {
                        //移动成功
                    }
                }
            }
        } else {
            $ret = "Invalid file";
        }
        return $ret;
    }
}