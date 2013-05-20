
//------------------------------------------------------------------------
// schedulingPageTemplate
// the header and date picker

Template.schedulingPageTemplate.selected_room = function(){
    if(Session.get('selected_room')){
        return " - " + Rooms.findOne(Session.get('selected_room')).name;
    }else{
        return "";
    }
};

Template.schedulingPageTemplate.events({
    'click .next':function(){
        console.log(moment().add('d', 1).format("YYYY-MM-DD"));
        Session.set('display_date', moment(Session.get('display_date')).add('d', 1).format("YYYY-MM-DD"));
        Meteor.flush();
    },
    'click .previous':function(){
        console.log(moment().subtract('d', 1).format("YYYY-MM-DD"));
        Session.set('display_date', moment(Session.get('display_date')).subtract('d', 1).format("YYYY-MM-DD"));
        Meteor.flush();
    },
    'click .displayed_date':function(){
        Session.set('display_date', moment().format("YYYY-MM-DD"));
        Meteor.flush();
    }
});
Template.schedulingPageTemplate.selected_date = function(){
    return Session.get('display_date');
};


//------------------------------------------------------------------------
// calendarDayTemplate
// this daily calendar of 24 hours

Template.calendarDayTemplate.schedule = function(){
    return Schedule.find({date: Session.get('display_date')},{});
};
Template.calendarDayTemplate.events({
    'click .timeslot': function(){
        Session.set('selected_date', this._id);
    }
});



//------------------------------------------------------------------------
// reservationSlotTemplate
// each hour in the calendar

Template.reservationSlotTemplate.time = function(){
    if(this.hour.toString().length == 1){
        return "0" + this.hour.toString() + ":00";
    }else{
        return this.hour.toString() + ":00";
    }
};
Template.reservationSlotTemplate.isReserved = function(){
    if(this.reserved != ""){
        return true;
    }else{
        return false;
    }
}
Template.reservationSlotTemplate.room_name = function(){
    return this.reserved;
    //return Rooms.findOne({random: this.reserved}).name;
}