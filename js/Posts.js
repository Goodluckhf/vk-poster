var Posts = function() {
    var //posts = [],
        me = this,
        templateItem = '<div class="box box-widget">' +
                            '<div class="box-header with-border">' +
                                '<div class="user-block">' +
                                    '<div class="pull-left">' +
                                        '<span class="username"><a></a></span>' +
                                        '<span class="description"></span>' +
                                    '</div>' +
                                    '<span class="pull-right post-likes-reposts"></span>' +                                    
                                '</div>' +
                            '</div>' +
                            '<div class="box-body">' +
                                '<p class="post-message"></p>' +
                                '<div class="attachment-block clearfix">' +                                    
                                '</div>' +
                                '<div class="button-wrapper">' +
                                    '<button class="btn btn-flat btn-block btn-primary accept-post" type="button"><i class="fa fa-share"></i>Беру!</button>' +
                                '</div>' +                                
                            '</div>' +
                        '</div>',
        containerSelector = App.contentSelector;
    
    
    $(containerSelector).on('click', '.accept-post', function(e) {
        var $this = $(this);
        var block = $this.parents('.box-widget');
        me.loadingBlock($this.parents('div.button-wrapper'));
        console.log($this);
        // при загрузки другой группы событие срабатывает 2 раза

        var key = $this.data('id');        
        PostProvider.post(key).done(function(data) {            
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

    this.render = function(data) {
        
        //return this.load().done(function(data) {
            //$(containerSelector).html(" ");
        $('.ajax-loader').remove();
        var posts = data['items'];    
        for(var i = data.lastKey; i < data['items'].length; i++) {
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
            $item.find('span.username a').text(data.group);
            $item.find('.user-block .description').text('Дата публикации: ' + posts[i].date);
            $item.find('.post-likes-reposts').html('Репостов: ' + posts[i].reposts + '<br>Лайков: ' + posts[i].likes);
            //$item.find('.user-block .description').text(posts[i].date);
            var attachments = posts[i].attachments;
            //console.log(attachments);

            for(var j in attachments) {
                 $item.find('.attachment-block').append('<img src="' + attachments[j].photo.photo_130 + '">');

            }
            $item.find('span.username a').attr('href', 'http://vk.com/' + data.group);
            $(containerSelector).append($item);
        }
        //});
    }
    
    PostProvider.onPostLoad(function(data) {
        console.log(data);
        me.render(data); 
    });
    
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