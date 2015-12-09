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
        data.data = {};
       // data.unixTime = (new moment(this.currentDate)).unix();
        data.data.message = d.message;
        data.data.attachments = d.attachments;
        data.data.publish_date = this.currentDate;
        data.data.owner_id = this.publicId;
        data.data.v = 5.40;
        data.url = "/ajax.php";
        
        
       
        //console.log(d);
        //console.log(data);
//        return Request.api("wall.post", data).done(function() {
//            me.inc();
//        });      
        return Request.send(data).done(function(r) {
            console.log(r);
            me.inc();
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