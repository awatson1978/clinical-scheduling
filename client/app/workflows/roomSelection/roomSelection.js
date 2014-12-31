//-------------------------------------------------------------
// room selection


Template.roomSelection.helpers({
  roomList: function(){
    return Rooms.find({}, {
      sort: {
        name: 1
      }
    });
  }
});


// sets which room will be displayed in the scheduling calendar
Template.roomSelection.events({
  'click .room': function() {
    console.log('click .room');
    Session.set('selectedRoom', this._id);
    console.log('selectedRoom', Session.get('selectedRoom'));
  }
});
