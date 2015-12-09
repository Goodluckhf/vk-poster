<?php


//if(isset($_REQUEST['token'])) {
//    
//    setcookie("vk-token",$_REQUEST['token'],time()+60*60*24*30, '/');
//    header("Location: http://vk-ploader.dev");
//}
if(isset($_REQUEST['code'])) {
    //$res = file_get_contents('https://oauth.vk.com/access_token?code=' . $_REQUEST['code'] . '&client_id=5180832&client_secret=G8PLjiQIwCSfD5jaNclV&redirect_uri=http://vk-ploader.dev/auth.php');
    $res = file_get_contents('https://oauth.vk.com/access_token?code=' . $_REQUEST['code'] . '&client_id=5180832&client_secret=G8PLjiQIwCSfD5jaNclV&redirect_uri=https://oauth.vk.com/blank.html');
    $result = (array)json_decode($res);    
    if(isset($result['access_token'])) {
        setcookie("vk-token",$result['access_token'],time()+60*60*24*30, '/');
        setcookie("vk-user-id",$result['user_id'],time()+60*60*24*30, '/');
        header("Location: http://vk-ploader.dev");
    }
    else {
        print_r($result);
    }
}
else {
    print_r($_REQUEST);
}
