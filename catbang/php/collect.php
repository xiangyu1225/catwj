<?php 
    ini_set('date.timezone','Asia/Shanghai');

    // header("Access-Control-Allow-Origin","*");

    $db_config["hostname"]    = "localhost:3306";    //服务器地址 
    $db_config["username"]    = "root";        //数据库用户名 
    $db_config["password"]    = "";        //数据库密码 
    $db_config["database"]    = "test";        //数据库名称 
    $db_config["charset"]     = "utf8";

    include('function.php');
    include('mysql.class.php'); 

    // print_r($_POST);

    // echo "test";

    //check everyone
    function echoRet( $ret ){ 
      echo $_GET['jsoncallback'] . "(".json_encode($ret).")";  
      // die( json_encode($ret) ); 
    }

    //connect to db
    $db    = new db();
    $db->connect($db_config); 

    $action = $_GET['action'];
    $id = $_GET['id'];
    if( $action == 'add'){
      $row = $db->row_select('catbang', 'id='.gl($id));
      // check id. 
      if ($row) {
          $ret['msg'] = '您已经收藏过了.';
          $ret['state'] = '201';
          echoRet( $ret );
      }else{
          $data['id'] = gl($_GET['id']);
          $data['title'] = gl($_GET['title']);
          $data['content'] = gl($_GET['content']);
          $data['userid'] = gl($_GET['userid']);

          $s = $db->row_insert('catbang',$data);
          // print_r($s);

          $ret['msg'] = '收藏成功.';
          $ret['state'] = '200';
          echoRet( $ret );
      } 
    }else if( $action == 'del'){
      $s = $db->row_delete('catbang', 'id='.gl($id));
      // print_r($s);

      $ret['msg'] = '删除成功.';
      $ret['state'] = '200';
      echoRet( $ret );
    } else {//query all
      $row = $db->row_select('catbang');
      if ($row) {
          $ret['list'] = $row;
          $ret['state'] = '200';
          echoRet( $ret );
      }
    }
    return false;
?> 