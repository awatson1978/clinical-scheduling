
Template.calendarDayTemplate.schedule = function(){
    return Schedule.find({date: Session.get('display_date')},{});
};
Template.calendarDayTemplate.events({
    'click .timeslot': function(){
        Session.set('selected_date', this._id);
    }
});



Template.reservationSlotTemplate.time = function(){
    console.log(this.hour.length);
    if(this.hour.toString().length == 1){
        return "0" + this.hour.toString() + ":00";
    }else{
        return this.hour.toString() + ":00";
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



Template.reservationDetailPane.reservationSlot = function(){
    return Session.get('selected_date');
};
Template.reservationDetailPane.helpers({
    reservation: function(){
        return Schedule.findOne(Session.get('selected_date'));
    },
    reservationJson: function(){
        return JSON.stringify(Schedule.findOne(Session.get('selected_date')));
    }
});