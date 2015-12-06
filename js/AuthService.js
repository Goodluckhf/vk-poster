var AuthService = (new function () {
    var user,
        token,
        events = new EventsContainer(),
        isReady = false,
        isAuth = false;
        
        events.register("ready");
        
        
    this.onReady = function (callback) {
        if (isReady) {
            callback();
        }
        else {
            events.listen('ready', callback);
        }
    }

    this.auth = function () {
        VK.Auth.login(function (data) {
            if (!data.session) {
                alert("Нужно авторизоваться!");
                Loader.stop();
            }
            else {
                Loader.stop();
                user = data.session.user;
                token = data.session.sid;
                isReady = true;
                isAuth = true;
                events.trigger('ready');
            }
        }, 262148);
    }
    
    this.user = function() {
        return user;
    }
    
    this.token = function() {
        return token;
    }
    
    this.isAuth = function() {
        return isAuth;
    }

});