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



class VkApi {
    const IMG_DIR = __DIR__ . '/vk-images/';
    const API_URL = 'https://api.vk.com/method/';
    
    //private $uploadUrl;
    private $token;
    private $groupId;
    private $userId;
    private $post;
    
    
    public function __construct($token, $groupId, $userId) {
        $this->userId = $userId;
        $this->token = $token;
        $this->groupId = $groupId;
    }
    
    public function setPost($post) {
        $this->post = $post;
    }
    
    public function loadImgByUrl($url, $number) {
        $img = self::IMG_DIR . 'img-'. $number . '-' . md5(microtime()) . '.jpg';
        file_put_contents($img, file_get_contents($url));
        return $img;
    }
    
    public function callApi($method, $data, $httpMethod = 'get') {
        if(!isset($data['access_token'])) {
            $data['access_token'] = $this->token;
        }
//        if(!isset($data['v'])) {
//            $data['v'] = 5.40;
//        }
        $params = http_build_query($data);
        $url = self::API_URL . $method;
        if($httpMethod == 'get') {       
            $url .= '?'. $params;
            $res = file_get_contents($url);
        }
        else if($httpMethod == 'post') {
            $opts = array('http' =>
                array(
                    'method'  => 'POST',
                    'header'  => 'Content-type: application/x-www-form-urlencoded\r\n'.
                                 'Content-length: ' . strlen($params),     
                    'content' => $params,
                    'timeout' => 60
                )
            );

          $context  = stream_context_create($opts); 
          //PR($context);
          //die();
          $res = file_get_contents($url, false, $context);
        }       
        return json_decode($res, true);
    }
    
    public function getUploadServer() {
        return $this->callApi('photos.getWallUploadServer', [
            'group_id' => $this->groupId * (-1),
            'access_token' => $this->token,            
        ]);
    } 
    
    public function sendImgs($uploadUrl, $imgs) {
        $curl=curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $uploadUrl,
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => $imgs
        ));
        $postResult = curl_exec($curl);
        curl_close($curl); 
        return json_decode($postResult, true);
    }
    
    
    public function curlPost() {
        $photos = $this->post['attachments'];
        $imgs = [];
        foreach($photos as $key => $photo) {
            if($photo['type'] != 'photo') {
                continue;
            }
            $url = $photo['photo']['photo_604'];
            $imgFile = $this->loadImgByUrl($url, ($key + 1));
            $imgs['file' . ($key + 1) ] = curl_file_create($imgFile, 'image/jpeg','test_name.jpg');
        }
        $uploadResult = $this->getUploadServer();
        $result = $this->sendImgs($uploadResult['response']['upload_url'], $imgs);
        return $result;
    }
    
    public function saveWallPhoto($photo, $server, $hash) {
        $data = [
            'photo'  => $photo,
            'server' => $server,
            'hash'   => $hash,
            'group_id' => ($this->groupId * (-1))
        ];
        $result = $this->callApi('photos.saveWallPhoto', $data, 'post');
        return $result;
    }
    
    public function post($publishDate, $photos) {
        $data = [
            'owner_id'     => $this->groupId,
            'message'      => $this->post['text'],
            'attachments'  => implode(',', $photos),
            'publish_date' => $publishDate
        ];
        $result = $this->callApi('wall.post', $data, 'post');
        return $result;
        
    }
    public function getPhotosByResponse($response) {
        $photos = [];
        foreach($response['response'] as $key => $photo) {
            $photos[] = $photo['id'];
        }
        return $photos;        
    }
    
}


if(isset($_REQUEST['group_id']) && isset($_REQUEST['publish_date'])) {
    $vk = new VkApi($_COOKIE['vk-token'], $_REQUEST['group_id'], $_COOKIE['vk-user-id']);
    $vk->setPost($_REQUEST['post']);
    $result = $vk->curlPost();
    $photosResponse = $vk->saveWallPhoto($result['photo'], $result['server'], $result['hash']);
    $resPost = $vk->post($_REQUEST['publish_date'], $vk->getPhotosByResponse($photosResponse));
    echo json_encode($resPost);

    die();
}