var App = (new function () {
    var events = new EventsContainer();
    events.register('ready');

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
        this.loadingBlock('.modal-dialog');
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
        var posts = new Posts(group);
        posts.render();

    });
    AuthService.onReady(function () {

        console.log({user: AuthService.user(), token: AuthService.token()});
        var str = '';
        bootbox.hideAll();
        $('.date-picker').datetimepicker({
            locale: 'ru',
            stepping: 5,
            toolbarPlacement: 'bottom'
            //sideBySide: true
        });
        

    });
    $('body').on('click', '.login', function () {
        App.start();
    });


    bootbox.dialog({
        /**
         * @required String|Element
         */
        message: '<center><button class="btn btn-primary login">Войти ВКонтакте</button></center>',
        /**
         * @optional String|Element
         * adds a header to the dialog and places this text in an h4
         */
        title: "Авторизация ВК",
        closeButton: false,
    });

});
