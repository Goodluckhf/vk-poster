var PostProvider = (new function() {
    var me = this,
        events = new EventsContainer(),
        posts = [];
    
    events.register('postLoadSuccess')
          .register('postLoadFail');
    
    this.datePicker;
    
//    $(function() {
//        me.datePicker = $('.date-picker').data('DateTimePicker');
//    });
    this.startDate;
    
    this.currentDate;
    
    this.dateInterval;
    
    this.publicId = '';
    
    this.postAsGroup = 1;
    
    this.lastKey = 0;
    
    
    var renderTime = function() {
        $('a.next-post-date span').text($('.date-picker').val().trim());
    }
    
    this.onPostLoad = function(callback) {
        events.listen('postLoadSuccess', callback);
    }
    
    this.onPostLoadFail = function(callback) {
        events.listen('postLoadFail', callback);
    }
    
    this.getPosts = function() {
        return posts;
    }
    
    this.loadPosts = function(group, count) {
        return Request.api('wall.get', {domain: group, count: count, v: 5.40}).done(function(data) {
            
            if(data.response) {
                var items = data.response.items;
                //var count = data.response.count;
                me.lastKey =  posts.length;
                for(var i in items) {
                    var isNotPhoto = false;
                    var attachments = items[i].attachments;
                    for(var j in attachments) {
                        if(attachments[j].type != 'photo') {
                            isNotPhoto = true;
                            break;
                        }                    
                    }
                    if(isNotPhoto) {
                        continue;
                    }
                    var post = {};                    
                    post.text = items[i].text;
                    post.reposts = items[i].reposts.count;
                    post.likes = items[i].likes.count;
                    post.date = me.convertTime(items[i].date);
                    post.attachments = !items[i].attachments ? null : items[i].attachments ;
                    //newPosts.push(post);  
                    posts.push(post);
                }
                
                events.trigger('postLoadSuccess', {
                    items: posts,
                    group: group,
                    lastKey: me.lastKey
                });
            }
            else {
                events.trigger('postLoadFail', {group:group});                
            }            
        }); 
    }
    
    this.start = function(data) {
        console.log(data);
        this.startDate = data.startDate;
        this.currentDate = data.startDate;
        this.dateInterval = data.interval || 30;
        //this.publicId = data.publicId || -107952301;
        this.publicId = data.publicId || -77686561;
        renderTime();
        
    }
    
    this.setPublic = function(publicId) {
        this.publicId = publicId;
    }
    
    this.post = function(key) {
        var data = {};
        data.data = {};
        //console.log([posts, key]);
        data.data.post = posts[key];
        data.data.publish_date = this.currentDate;
        data.data.group_id = this.publicId;
        data.url = '/upload.php';
        return Request.send(data).done(function(r) {
            if(r.response) {
                console.log(r.response);
                me.inc();
            }
            else {
                toastr["error"]('Что-то пошло не так!', 'Ой');
            }
            
        });      
    }
    
    this.inc = function() {
        var newTime = $('.date-picker').data('DateTimePicker').date().add(this.dateInterval, 'm').toDate();
        $('.date-picker').data('DateTimePicker').date(newTime);
        //console.log(newTime);
        var unixTime = (new moment(newTime)).unix();
        //console.log(unixTime);
        this.currentDate = unixTime;
        renderTime();
    }
    
    
    this.convertTime = function(timestamp) {
        var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
            dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
            ampm = 'AM',
            time;
	
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min;

        return time;
    }
    
    
});