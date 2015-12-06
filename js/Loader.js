var Loader = (new function () {
    var _template = '<div id="loader" class="loader">' +
                        '<img src="/img/ajax-loader.gif" />' +
                    '</div>';
    this.go = function () {
        $('.cont').append(_template);
    }
    this.stop = function () {
        $('#loader').remove();
    }
});