var Menu = function() {
    var me = this,
        template = '<div class="col-md-3 col-sm-6 col-xs-12 menu">' +
                        '<div class="info-box ">' +
                            '<div class="info-box-content">' +
                              '<span class="info-box-text">Начало: </span>' +
                              '<input type="">' +
                              '<span class="info-box-number">1,410</span>' +
                            '</div>' +
                          '</div>' +
                    '</div>';
    
    
    this.render = function() {
       // $(template).modal('show');
//       ; var 
        $('body').prepend($(template));
    }
}