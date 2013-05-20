

//-------------------------------------------------------------
// reservationDetailPane


Template.reservationDetailPane.reservationSlot = function(){
    return Session.get('selected_hour');
};
Template.reservationDetailPane.helpers({
    reservation: function(){
        return Schedule.findOne(Session.get('selected_hour'));
    },
    reservationJson: function(){
        return JSON.stringify(Schedule.findOne(Session.get('selected_hour')));
    }
});
Template.reservationDetailPane.reservation_color = function(){
    var reservations = Rooms.findOne(Session.get('selected_room')).reservations;
    if(reservations.indexOf(this._id) > -1){
        return "panel-warning";
    }else{
        return "panel-success";
    }
};
Template.reservationDetailPane.reservation_status = function(){
    var reservations = Rooms.findOne(Session.get('selected_room')).reservations;
    if(reservations.indexOf(this._id) > -1){
        return "Reserved";
    }else{
        return "Available";
    }
};
Template.reservationDetailPane.reserved = function(){
    var reservations = Rooms.findOne(Session.get('selected_room')).reservations;
    if(reservations.indexOf(this._id) > -1){
        return true;
    }else{
        return false;
    }
};
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


//-------------------------------------------------------------
// buttons

Template.reservationDetailPane.events({
    'tap #reserveRoomsButton':function(){
        Rooms.update(Session.get('selected_room'), {$addToSet: {reservations: this._id}})
    },
    'tap #cancelReservationButton':function(){
        Rooms.update(Session.get('selected_room'), {$pull: {reservations: this._id}})
    }
});
Template.reservationDetailPane.reservation_date = function(){
    return moment(Session.get('display_date')).format("MMM Do YYYY");
};