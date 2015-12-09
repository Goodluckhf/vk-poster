var Request = (new function() {
    
    this.api = function(method, data) {
        data = typeof data === undefined ? {} : data;
        if(AuthService.isAuth()) {
            data.access_token = AuthService.token();
        }
        return $.ajax({
            url: 'https://api.vk.com/method/' + method,
            dataType: 'jsonp',
            data: data,
            method: 'post'
        });
    }
    this.send = function(data) {
        if(AuthService.isAuth()) {
            data.data.access_token = AuthService.token();
        }
        return $.ajax({
            url: data.url,
            dataType: 'json',
            data: data.data,
            method: 'post'
        });
    }
    
});
