var PostProvider = (new function() {
    var me = this,
        events = new EventsContainer();
    
    this.datePicker;
    
    $(function() {
        me.datePicker = $('.date-picker').data('DateTimePicker');
    });
    this.startDate;
    
    this.currentDate;
    
    this.dateInterval;
    
    this.publicId;
    
    this.postAsGroup = 1;
    
    this.start = function(data) {
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
        return Request.api("wall.post", data).done(function() {
            me.inc();
        });      
    }
    
    this.inc = function() {
        var newTime = this.datePicker.date().add(this.dateInterval, 'm').toDate();
        this.datePicker.date(newTime);
        this.currentDate = newTime;
    }
});