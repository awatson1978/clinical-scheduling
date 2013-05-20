//-------------------------------------------------------------
// room selection

// gets the list of rooms
Template.roomSelectionTemplate.roomList = function(){
    return Rooms.find();
};

// sets which room will be displayed in the scheduling calendar
Template.roomSelectionTemplate.events({
    'touchend .roomslot':function(){
        Session.set('selected_room', this._id);
    },
    'click .roomslot':function(){
        Session.set('selected_room', this._id);
    }
});
