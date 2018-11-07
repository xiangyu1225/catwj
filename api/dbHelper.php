<?php
/**
 * Created by @清扬陌客.
 * User: qingyangmoke@qq.com
 * Date: 14/11/21
 * Time: 下午6:03
 */

header("Content-type: text/html; charset=utf-8");

header("Access-Control-Allow-Origin: *");


/**
 * 类名：DB
 * 说明：数据库操作类
 */
class DB
{
    private $host = "127.0.0.1";            //服务器
    private $username = "root";        //数据库用户名
    private $password = "bintang123";        //数据密码
    private $dbname = "cat";          //数据库名


    private $dbport = 3306;
    private $conn;            //数据库连接变量

    //发布时使用
    public function DB()
    {
    }

    /**
     * 打开数据库连接
     */
    public function open()
    {
        $this->conn = mysql_connect($this->host . ':' . $this->dbport, $this->username, $this->password);
        //解决中文乱码的问题 by song 2014年11月21日23:31:49
        mysql_query("set names 'utf8'", $this->conn);
        //mysql_query("SET NAMES 'UTF8'");
        //mysql_query("SET CHARACTER SET UTF8");
        //mysql_query("SET CHARACTER_SET_RESULTS='UTF8'");
        $result = mysql_select_db($this->dbname);
        //mysql_query("SET CHARACTER SET utf8");
        return $result;
    }

    /**
     * 关闭数据连接
     */
    public function close()
    {
        mysql_close($this->conn);
    }

    /**
     * 通过sql语句获取数据
     * @return: array()
     */
    public function getObjListBySql($sql)
    {
        //echo($sql);
        $this->open();
        $rs = mysql_query($sql, $this->conn);
        //echo($rs);
        $objList = array();
        while ($obj = mysql_fetch_object($rs)) {
            if ($obj) {
                $objList[] = $obj;
            }
        }
        $this->close();
        return $objList;
    }

    /**
     * 向数据库表中插入数据
     * @param：$sql,删除的SQl语句
     * @return:true or false
     */
    public function excuteNoQuery($sql)
    {
        $result = $this->open();
        if ($result) {
            $result = mysql_query($sql, $this->conn);
        }

        $this->close();
        return $result;
    }

    /**
     * 向数据库表中插入数据
     * @param：$sql,删除的SQl语句
     * @return:true or false
     */
    public function excuteNoQueryWithAffectedRows($sql)
    {
        $result = $this->open();
        if ($result) {
            $result = mysql_query($sql, $this->conn);
        }

        //hywin add 增加返回影响的行数 2014年12月15日17:08:03
        $cnt = 0;
        if ($result) {
            $cnt = mysql_affected_rows($this->conn);
        }

        $this->close();//已经close过的话影响的行数一定会是0的,所以不修改本函数再加一个函数的方式行不通,2014年12月15日17:08:46
        return $cnt;
    }

    /*
     * @description: 取得一个table的所有属性名
     * @param: $tbName 表名
     * @return：字符串数组
     */
    public function fieldName($tbName)
    {
        $resultName = array();
        $i = 0;
        $this->open();
        $result = mysql_query("SELECT * FROM $tbName");
        while ($property = mysql_fetch_field($result)) {
            $resultName[$i++] = $property->name;
        }
        $this->close();
        return $resultName;
    }
}