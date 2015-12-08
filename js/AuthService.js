var AuthService = (new function () {
    var user,
        groups,
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
            }
            else {
                user = data.session.user;
                token = data.session.sid;
                isReady = true;
                isAuth = true;
                Request.api('groups.get', {
                    filter: 'admin',
                    extended: 1,
                    v: 5.40
                }).done(function(gr) {
                    groups = gr.response.items;
                    events.trigger('ready');
                })
                
            }
        }, 270340);
    }
    //262144 + 4 + 8192
    this.user = function() {
        return user;
    }
    
    this.token = function() {
        return token;
    }
    
    this.isAuth = function() {
        return isAuth;
    }
    
    this.getGroups = function() {
        return groups;
    }

});