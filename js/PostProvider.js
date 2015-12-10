var PostProvider = (new function() {
    var me = this,
        events = new EventsContainer();
    
    this.datePicker;
    
//    $(function() {
//        me.datePicker = $('.date-picker').data('DateTimePicker');
//    });
    this.startDate;
    
    this.currentDate;
    
    this.dateInterval;
    
    this.publicId = '';
    
    this.postAsGroup = 1;
    
    this.start = function(data) {
        console.log(data);
        this.startDate = data.startDate;
        this.currentDate = data.startDate;
        this.dateInterval = data.interval || 30;
        this.publicId = data.publicId || 'meal4real';
        
    }
    
    this.post = function(d) {
        var data = {};
        data.data = {};

        data.data.post = d.post;
        data.data.publish_date = this.currentDate;
        data.data.group_id = this.publicId;
        data.url = '/upload.php'
        return Request.send(data).done(function(r) {
            if(r.response) {
                console.log(r.response);
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
    }
    
    
    
});