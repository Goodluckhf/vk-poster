<?php

//echo '<pre>';
//print_r($_SERVER);
//echo '</pre>';
$opts = array('http' =>
  array(
    'method'  => 'POST',
    'header'  => 'Content-type: application/x-www-form-urlencoded\r\n'.
                 'Content-length: ' . $_SERVER['CONTENT_LENGTH'],     
    'content' => http_build_query($_REQUEST),
    'timeout' => 60
  )
);
                       
$context  = stream_context_create($opts);
$url = 'https://api.vk.com/method/wall.post';        
$result = file_get_contents($url, false, $context);




//$message = $_REQUEST['message'];
//$attachments = $_REQUEST['attachments'];
//$publish_date = $_REQUEST['publish_date'];
//$owner_id = $_REQUEST['owner_id'];
//$access_token = $_REQUEST['access_token'];
//$url = 'https://api.vk.com/method/wall.post?message=' . $message . '&attachments=' . $attachments . '&publish_date=' . $publish_date . '&owner_id=' . $owner_id . '&v=5.40&access_token=' . $access_token;
//$res = file_get_contents($url);
echo json_encode($result);
die();
       