//-------------------------------------------------------------
// reservationDetails


// finds the correct reservation slot
Template.reservationDetails.helpers({
  reservation: function() {
    return Schedule.findOne(Session.get('selected_reservation_slot'));
  },
  reservation_color: function () {
    var reservations = Rooms.findOne(Session.get('selectedRoom')).reservations;
    if (reservations.indexOf(this._id) > -1) {
      return "panel-warning";
    } else {
      return "panel-success";
    }
  },
  reservation_status: function () {
    var room = Rooms.findOne(Session.get('selectedRoom'));
    if(room){
      if (room.reservations.indexOf(this._id) > -1) {
        return "Reserved";
      } else {
        return "Available";
      }
    }
  },
  reservation_date: function () {
    return moment(Session.get('display_date')).format("MMM Do YYYY");
  },
  reserved: function () {
    var room = Rooms.findOne(Session.get('selectedRoom'));
    if(room){
      if (room.reservations.indexOf(this._id) > -1) {
        return true;
      } else {
        return false;
      }
    }
  }
});




//-------------------------------------------------------------
// buttons



// adds this reservation slot to the room's list of reservations
Template.reservationDetails.events({
  'touchend #reserveRoomsButton': function() {
    Rooms.update(Session.get('selectedRoom'), {
      $addToSet: {
        reservations: this._id
      }
    })
    Meteor.flush();
  },
  'touchend #cancelReservationButton': function() {
    Rooms.update(Session.get('selectedRoom'), {
      $pull: {
        reservations: this._id
      }
    })
    Meteor.flush();
  },
  'click #reserveRoomsButton': function() {
    Rooms.update(Session.get('selectedRoom'), {
      $addToSet: {
        reservations: this._id
      }
    })
    Session.set('last_reservation_change', new Date());
    Meteor.flush();
  },
  'click #cancelReservationButton': function() {
    console.log('click #cancelReservationButton');
    Rooms.update(Session.get('selectedRoom'), {
      $pull: {
        reservations: this._id
      }
    })
    Session.set('last_reservation_change', new Date());
    Meteor.flush();
  }
});
