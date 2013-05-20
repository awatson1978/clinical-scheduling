//-------------------------------------------------------------
// room selection

Template.roomSelectionTemplate.roomList = function(){
    return Rooms.find();
};
Template.roomSelectionTemplate.events({
    'tap .roomslot':function(){
        Session.set('selected_room', this._id);
        Session.set('json_data', JSON.stringify(this));
    },
    'tap .allroom':function(){
        Session.set('selected_room', '');
        Session.set('json_data', JSON.stringify(this));
    }
});
