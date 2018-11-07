<?php
/*
 * VERSION: 0.0.0.0
 * DATE: 15/9/19
 * Requires 
 * @author: 清扬陌客, qingyangmoke@qq.com
 */

//防止重复引用
if (function_exists('mysqlDataBase')) die('<b>Fatal Error:</b> mysqlDataBase is defined!');

include dirname(__FILE__) . "/library/ezSQL/shared/ez_sql_core.php";
include dirname(__FILE__) . "/library/ezSQL/mysqli/ez_sql_mysqli.php";

define('DATABASE_USER', 'aliyunroot');
define('DATABASE_PASSWORD', 'aliyun_root_123');
define('DATABASE_HOST', 'rds6f77vqau7rbj.mysql.rds.aliyuncs.com');
define('DATABASE_ENCODING', 'utf8');
define('DATABASE_NAME', 'catdb');

class mysqlDataBase extends ezSQL_mysqli
{
    function  mysqlDataBase()
    {
        parent::ezSQL_mysqli(DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_HOST, DATABASE_ENCODING);
    }

    public static function create()
    {
        return new mysqlDataBase();
    }
}
