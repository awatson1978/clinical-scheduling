

//-------------------------------------------------------------
// reservationDetailPane


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


//-------------------------------------------------------------
// edit scheduled reservation notes (form)
Session.equals('editing_notes', "false");
Template.reservationDetailPane.editing_notes = function () {
    return Session.equals('editing_notes', "true");
};
Template.reservationDetailPane.events(
    okCancelEvents('#notesTextInput',
        {
            ok: function (value) {
                Schedule.update(Session.get('selected_date'), {$set: {notes: value}});
                Session.set('editing_notes', "false");
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_notes', "false");
            }
        })
);
Template.reservationDetailPane.events({
    'click #notesTextDisplay': function (evt, tmpl) {
        Session.set('editing_notes', "true");
        Meteor.flush();
        activateInput(tmpl.find("#notesTextInput"));
    }
});
Template.reservationDetailPane.notes = function () {
    return Schedule.findOne(Session.get('selected_date')).notes;
};


