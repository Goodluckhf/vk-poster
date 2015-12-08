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
    
    this.publicId;
    
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
        data.unixTime = (new moment(this.currentDate)).unix();
        data.message = d.message;
        data.attachments = d.attachments;
        data.publish_date = this.currentDate;
        data.owner_id = this.publicId;
        data.v = 5.40;
        
        console.log(data);
        return Request.api("wall.post", data).done(function() {
            me.inc();
        });      
    }
    
    this.inc = function() {
        var newTime = $('.date-picker').data('DateTimePicker').date().add(this.dateInterval, 'm').toDate();
        $('.date-picker').data('DateTimePicker').date(newTime);
        this.currentDate = newTime;
    }
    
    
    
});