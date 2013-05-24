

//-------------------------------------------------------------
// reservationDetailPane


// finds the correct reservation slot
Template.reservationDetailPane.helpers({
    reservation: function(){
        return Schedule.findOne(Session.get('selected_reservation_slot'));
    }
});

// toggles the header color
Template.reservationDetailPane.reservation_color = function(){
    var reservations = Rooms.findOne(Session.get('selected_room')).reservations;
    if(reservations.indexOf(this._id) > -1){
        return "panel-warning";
    }else{
        return "panel-success";
    }
};

// toggles the header text
Template.reservationDetailPane.reservation_status = function(){
    var reservations = Rooms.findOne(Session.get('selected_room')).reservations;
    if(reservations.indexOf(this._id) > -1){
        return "Reserved";
    }else{
        return "Available";
    }
};

// formats the date
Template.reservationDetailPane.reservation_date = function(){
    return moment(Session.get('display_date')).format("MMM Do YYYY");
};


//-------------------------------------------------------------
// buttons

//toggles which button is displayed
Template.reservationDetailPane.reserved = function(){
    var reservations = Rooms.findOne(Session.get('selected_room')).reservations;
    if(reservations.indexOf(this._id) > -1){
        return true;
    }else{
        return false;
    }
};

// adds this reservation slot to the room's list of reservations
Template.reservationDetailPane.events({
    'touchend #reserveRoomsButton':function(){
        Rooms.update(Session.get('selected_room'), {$addToSet: {reservations: this._id}})
        Meteor.flush();
    },
    'touchend #cancelReservationButton':function(){
        Rooms.update(Session.get('selected_room'), {$pull: {reservations: this._id}})
        Meteor.flush();
    },
    'click #reserveRoomsButton':function(){
        Rooms.update(Session.get('selected_room'), {$addToSet: {reservations: this._id}})
        Meteor.flush();
    },
    'click #cancelReservationButton':function(){
        Rooms.update(Session.get('selected_room'), {$pull: {reservations: this._id}})
        Meteor.flush();
    }

});





//-------------------------------------------------------------
// edit scheduled reservation notes (form)

//Session.equals('editing_notes', "false");
//Template.reservationDetailPane.editing_notes = function () {
//    return Session.equals('editing_notes', "true");
//};
//Template.reservationDetailPane.events(
//    okCancelEvents('#notesTextInput',
//        {
//            ok: function (value) {
//                Schedule.update(Session.get('selected_hour'), {$set: {notes: value}});
//                Session.set('editing_notes', "false");
//                Meteor.flush();
//            },
//            cancel: function () {
//                Session.set('editing_notes', "false");
//            }
//        })
//);
//Template.reservationDetailPane.events({
//    'click #notesTextDisplay': function (evt, tmpl) {
//        Session.set('editing_notes', "true");
//        Meteor.flush();
//        activateInput(tmpl.find("#notesTextInput"));
//    }
//});
//Template.reservationDetailPane.notes = function () {
//    try{
//        if(Schedule.findOne(Session.get('selected_hour')).notes){
//            return Schedule.findOne(Session.get('selected_hour')).notes;
//        }else{
//            return "click here to add notes."
//        }
//    }catch(error){
//
//    }
//};

