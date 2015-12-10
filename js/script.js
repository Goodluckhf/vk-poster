var App = (new function () {
    var events = new EventsContainer();
    events.register('ready');
    
    this.getCookie = function(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    this.contentSelector = 'section.content .tab-content';

    this.loadingBlock = function (block) {
        var $block = $(block);
        var div = $('<div style="position:absolute; background-color:rgba(255,255,255,0.8); z-index:10;"><center><img src="/img/ajax-loader.gif"></center></div>');

        div.width($block.width());
        div.height($block.height());
        div.position().left = $block.position().left;
        div.position().top = $block.position().top;

        $block.prepend(div);

        div.find('img').css({'margin-top': div.height() / 2 - 25 + 'px'});
    }

    this.start = function () {
        //console.log(this.getCookie('vk-token'));
        AuthService.auth();
        
    }

});



$(function () {

    $('body').on('click', 'a.expand-text', function (e) {
        e.preventDefault();

        $(this).siblings('span.hidden-text').show();
        $(this).remove();
    });
    $('#search-btn').click(function () {
        App.loadingBlock(App.contentSelector);
        var group = $('.group-search-inp').val().trim();
        // переделать на setData
        var posts = new Posts(group);
        posts.render();

    });
    AuthService.onReady(function () {
        console.log({user: AuthService.id(), token: AuthService.token()});
        var str = '';
        bootbox.hideAll();
        $('.date-picker').datetimepicker({
            locale: 'ru',
            stepping: 5,
            toolbarPlacement: 'bottom'
            //sideBySide: true
        });
        $('.saveConfig').click(function() {
            PostProvider.start({
                startDate: $('.date-picker').data('DateTimePicker').date().unix(),
                interval: 45,
                publicId : -77686561,
            });
        });
        
        

    });
    $('body').on('click', '.login', function () {
        App.start();
    });


    bootbox.dialog({
        /**
         * @required String|Element
         */
//         url:'https://oauth.vk.com/authorize',
//            data: {
//                client_id: 5180832,
//                display:'popup',
//                scope: 'photo,groups,wall',
//                response_type: 'code',
//                v: 5.40,
//                redirect_uri: 'https://api.vk.com/blank.html'
//            }
        //message: '<center><button class="btn btn-primary login">Войти ВКонтакте</button></center>',
        message: '<center><button class="btn btn-primary login">Войти ВКонтакте</button></center>',
        /**
         * @optional String|Element
         * adds a header to the dialog and places this text in an h4
         */
        title: "Авторизация ВК",
        closeButton: false,
    });

});
