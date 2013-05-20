
//------------------------------------------------------------------------
// schedulingPageTemplate
// the header and date picker


// don't show the scheduling calendar unless a room has been selected
Template.schedulingPageTemplate.helpers({
    inquery: function(){
        if(Session.get('selected_room') == ""){
            return false;
        }else{
            return true;
        }
    }
});

// displays the name of the selected room, if selected
Template.schedulingPageTemplate.selected_room = function(){
    if(Session.get('selected_room')){
        return Rooms.findOne(Session.get('selected_room')).name;
    }else{
        return "";
    }
};

// add or subtract a day to the displayed date
Template.schedulingPageTemplate.events({
    'touchend .next':function(){
        Session.set('display_date', moment(Session.get('display_date')).add('d', 1).format("YYYY-MM-DD"));
        Meteor.flush();
    },
    'touchend .previous':function(){
        Session.set('display_date', moment(Session.get('display_date')).subtract('d', 1).format("YYYY-MM-DD"));
        Meteor.flush();
    },
    'touchend .displayed_date':function(){
        Session.set('display_date', moment().format("YYYY-MM-DD"));
        Meteor.flush();
    },
    'click .next':function(){
        Session.set('display_date', moment(Session.get('display_date')).add('d', 1).format("YYYY-MM-DD"));
        Meteor.flush();
    },
    'click .previous':function(){
        Session.set('display_date', moment(Session.get('display_date')).subtract('d', 1).format("YYYY-MM-DD"));
        Meteor.flush();
    },
    'click .displayed_date':function(){
        Session.set('display_date', moment().format("YYYY-MM-DD"));
        Meteor.flush();
    }
});

// format the display date
Template.schedulingPageTemplate.selected_date = function(){
    return moment(Session.get('display_date')).format("MMM Do YYYY");
};


//------------------------------------------------------------------------
// calendarDayTemplate
// this daily calendar of 24 hours


// filter the schedule to the 24 hours of the selected display date
Template.calendarDayTemplate.schedule = function(){
    return Schedule.find({date: Session.get('display_date')},{});
};

// when you click a reservation slot, set a variable
Template.calendarDayTemplate.events({
    'touchend .timeslot': function(){
        Session.set('selected_hour', this._id);
    },
    'click .timeslot': function(){
        Session.set('selected_hour', this._id);
    }
});



//------------------------------------------------------------------------
// reservationSlotTemplate
// each hour in the calendar

// format the displayed time
Template.reservationSlotTemplate.time = function(){
    if(this.hour.toString().length == 1){
        return "0" + this.hour.toString() + ":00";
    }else{
        return this.hour.toString() + ":00";
    }
};



// the text to display in the reservation status label
Template.reservationSlotTemplate.reservation_status = function(){
    try{
        if(Session.get('selected_room') != ""){
            var reservations = Rooms.findOne(Session.get('selected_room')).reservations;
            console.log("reservations: " + JSON.stringify(reservations));
            console.log("this._id: " + this._id);

            if(reservations.indexOf(this._id) > -1){
                return "reserved";
            }else{
                return "available";
            }
        }
    }catch(error){
        console.log(error);
    }
};

// the color to display the reservation label
Template.reservationSlotTemplate.reservation_label = function(){
    try{
        if(Session.get('selected_room') != ""){
            var reservations = Rooms.findOne(Session.get('selected_room')).reservations;

            // right now, we're searching an array of _id strings
            // to find if the room has a reservation for this time slot
            if(reservations.indexOf(this._id) > -1){
                return "label-warning";
            }else{
                return "label-success";
            }

            // eventually, if we want to support tracking such things as notes and who made the reservation
            // we're going to need to search through an array of objects, instead of an array of strings
            // to do that, we need a function such as .grep() or .each()

            // $.grep()
            //http://stackoverflow.com/questions/7364150/find-object-by-id-in-array-of-javascript-objects

            // $.each()
            // http://api.jquery.com/jQuery.each/

        }
    }catch(error){
        console.log(error);
    }
};
