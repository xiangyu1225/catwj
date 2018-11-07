<?php
/*
 * VERSION: 0.0.0.0
 * DATE: 15/9/19
 * Requires 
 * @author: 清扬陌客, qingyangmoke@qq.com
 */

require_once dirname(__FILE__) . "/library/ezSQL/shared/ez_sql_core.php";
require_once dirname(__FILE__) . "/library/ezSQL/mysqli/ez_sql_mysqli.php";


define('DATABASE_USER', 'root');
define('DATABASE_PASSWORD', 'bintang123');
define('DATABASE_HOST', '127.0.0.1');
define('DATABASE_ENCODING', 'utf8');
define('DATABASE_NAME', 'cat');

class jsonResult
{
    public $statusCode = 400;
    public $errorMsg = "";
}


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

/**
 * 全局防注入
 * @param mixed $content <p>
 * </p>
 * @return bool true if var is an array,
 * false otherwise.
 * @since 4.0
 * @since 5.0
 */
function sql_injection($content)
{
    $db = mysqlDataBase::create();
    if (is_array($content)) {
        foreach ($content as $key => $value) {
            $content[$key] = $db->escape($value);
        }
    } else if (is_string($content)) {
        $content = $db->escape($content);
    }
    return $content;
}

$_POST = sql_injection($_POST);
$_GET = sql_injection($_GET);