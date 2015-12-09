<?php
//if (isset($_POST["url"])) {
//
//    $upload_url = $_POST["url"];
//
//    $post_params['photo'] = '@' . 'kartinka.jpg'; // kartinka.jpg к примеру лежит в той же папке, что и наш upload.php
//
//    $ch = curl_init();
//    curl_setopt($ch, CURLOPT_URL, $upload_url);
//    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//    curl_setopt($ch, CURLOPT_POST, true);
//    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_params);
//    $result = curl_exec($ch);
//    curl_close($ch);
//
//    echo $result;
//
//}
function PR($ar) {
    echo '<pre>';
    print_r($ar);
    echo '</pre>';
}

// function saveImg($url) {
//    $upload_dir = ;
//    $name = 'image.jpg';
//    $file = file_get_contents($url); 
//    $openedfile = fopen($upload_dir.$name, "w");
//    fwrite($openedfile, $file);
//    fclose($openedfile);
//   
//    return $upload_dir.$name;
//  }

//PR($_REQUEST);
if(isset($_REQUEST['image'])) {
    echo 'asdasd';
    PR($_REQUEST['image']);
    die();
}
if(isset($_REQUEST['img'])) {
    $res = file_get_contents('https://api.vk.com/method/photos.getWallUploadServer?group_id=107952301&access_token=18bd7e8e6ba421ba7a9b57ab3892797b7bc55c0245d4f5bd814340bc7065cd37261a5eddc55620bfd460d');
    $result  = json_decode($res, true);
    $lala = dirname(__FILE__)."/flower.jpg";
    $cfile = curl_file_create($lala,'image/jpeg','test_name.jpg');
    
    $curl=curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_URL => $result['response']['upload_url'],
      CURLOPT_POST => 1,
      CURLOPT_POSTFIELDS => array("file1" => $cfile, "file2" => $cfile, "file3" => $cfile, "file4" => $cfile, "file5" => $cfile, "file6" => $cfile, "file7" => $cfile)
    ));
    $postResult = curl_exec($curl);
    curl_close($curl);
    echo $postResult;
    die();
    
    //$img = $_SERVER['DOCUMENT_ROOT'] . '/flower.jpg';
    //echo $img;
    //die();
    //file_put_contents($img, file_get_contents($_REQUEST['img']));
    //$results = file_get_contents($result['response']['upload_url'] . '&photo=' . $img);
    //PR($results);
    
    
    
//    $uploadfile="@flower.jpg"; 
   $ch = curl_init($result['response']['upload_url']);  
   curl_setopt($ch, CURLOPT_POSTFIELDS,
               array('file1'=> $cfile,
                     //'shoesize'=>'9',
                     ));
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
   $postResult = curl_exec($ch);
   curl_close($ch);
   PR($postResult);
   die();
   //print "$postResult";
//}
//    
    
    
    
    
//    $opts = array('http' =>
//        array(
//          'method'  => 'POST',
//          'header'  => 'Content-type: Content-Type: multipart/form-data\r\n',
//                        //'Content-length: ' . $_SERVER['CONTENT_LENGTH'],     
//          'content' => http_build_query($_REQUEST),
//          'timeout' => 60
//        )
//    );
//                     
//$context  = stream_context_create($opts);
//$url = 'https://api.vk.com/method/wall.post';        
//$result = file_get_contents($url, false, $context);
    
    
    //die();
//    $r = new HttpRequest($result['response']['upload_url'], HttpRequest::METH_POST);
//    $r->addPostFile('photo', $_REQUEST['img'], 'image/jpeg');
//    try {
//        PR($r->send()->getBody());
//    } catch (HttpException $ex) {
//        echo $ex;
//    }
    
    
    
//    $resource = curl_init();
//    curl_setopt($resource, CURLOPT_URL, $_REQUEST['img']);
//    //curl_setopt($resource, CURLOPT_HEADER, 1);
//    curl_setopt($resource, CURLOPT_RETURNTRANSFER, 1);
//    curl_setopt($resource, CURLOPT_BINARYTRANSFER, 1);
//    $file = curl_exec($resource);
//    curl_close($resource);
   
    
     //= file_get_contents($_REQUEST['img']);
    //PR($file);
    
    
    
//    $im = @imagecreatefromjpeg($_REQUEST['img']);
////    echo '<pre>';
////    print_r($im);
////    echo '</pre>';
//    header('Content-Type: image/jpeg');
//    imagejpeg($im);
}