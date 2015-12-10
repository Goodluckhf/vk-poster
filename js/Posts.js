var Posts = function(group) {
    var posts = [],
        me = this,
        templateItem = '<div class="box box-widget">' +
                            '<div class="box-header with-border">' +
                                '<div class="user-block">' +
                                    '<span class="username"><a href="http://vk.com/' + group + '"></a></span>' +
                                    '<span class="description"></span>' +
                                '</div>' +
                            '</div>' +
                            '<div class="box-body">' +
                                '<p class="post-message"></p>' +
                                '<div class="attachment-block clearfix">' +                                    
                                '</div>' +
                                '<button style="margin-left: 48%;" class="btn btn-primary accept-post" type="button"><i class="fa fa-share"></i>Беру!</button>' +
                                '<span class="pull-right post-likes-reposts"></span>' +
                            '</div>' +
                        '</div>',
        count,
        groupName = group.trim(),
        containerSelector = App.contentSelector;
    
    $(containerSelector).on('click', '.accept-post', function(e) {
        var $this = $(this);
        var block = $this.parents('.box-widget');
        me.loadingBlock(block);
        
        // при загрузки другой группы событие срабатывает 2 раза
        
        var key = $this.data('id');
        
        console.log(posts[key]);
        
        PostProvider.post({
            post: posts[key]
        }).done(function(data) {            
            if(data.response) {
                toastr["success"]("Пост отправлен!", 'Ура');
                block.fadeOut();
            }
            else {
                toastr["error"]('Что-то пошло не так!', 'Ой');
                block.find('.ajax-loader').remove();
            }
        });
        
    });
    var getVkatachment = function(atach) {
        return 'photo' + atach.owner_id + '_' + atach.id;
    }
    this.render = function() {
        posts = [];
        
        return this.load().done(function(data) {
            $(containerSelector).html(" ");

            for(var i in posts) {
                var $item = $(templateItem);
                var text;
                if(posts[i].text.length > 300) {
                    var visible = posts[i].text.slice(0, 300);
                    var hidden = posts[i].text.slice(301);
                    text = visible + '<a class="expand-text" href="#">Показать полностью...</a><span class="hidden-text" style="display:none;">' + hidden + '</span>';
                }
                else {
                    text = posts[i].text;
                }
                $item.find('p.post-message').html(text);
                $item.find('button.accept-post').data('id', i);
                $item.find('span.username a').text(groupName);
                $item.find('.user-block .description').text('Дата публикации: ' + posts[i].date);
                $item.find('.post-likes-reposts').html('Репостов: ' + posts[i].reposts + '<br>Лайков: ' + posts[i].likes);
                //$item.find('.user-block .description').text(posts[i].date);
                var attachments = posts[i].attachments;
                //console.log(attachments);
               
                for(var j in attachments) {
                     $item.find('.attachment-block').append('<img src="' + attachments[j].photo.photo_130 + '">');

                }
               
                $(containerSelector).append($item);
            }
        });
    }
    
    this.load = function() {
        return Request.api('wall.get', {domain: group, count: 100, v: 5.40}).done(function(data) {
            if(data.response) {
                var items = data.response.items;
                count = data.response.count;
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
                    //post.id = lastId++;
                    posts.push(post);
                }
               // console.log(posts);
            }
        }); 
    }
    
    this.getGroup = function() {
        return groupName;
    }
    
    this.getCount = function() {
        return count;
    }
    
    this.getPosts = function() {
        return posts;
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
    this.loadingBlock = function (block) {
        var $block = $(block);
        var div = $('<div class="ajax-loader" style="position:absolute; background-color:rgba(255,255,255,0.8); z-index:10;"><center><img src="/img/ajax-loader.gif"></center></div>');

        div.width($block.width());
        div.height($block.height());
        div.position().left = $block.position().left;
        div.position().top = $block.position().top;

        $block.prepend(div);

        div.find('img').css({'margin-top': div.height() / 2 - 25 + 'px'});
    }
}