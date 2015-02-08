//------------------------------------------------------------------------
// calendarDayTemplate
// this daily calendar of 24 hours

Template.calendarDayTemplate.helpers({
  schedule: function(){
    return Schedule.find({
      date: Session.get('display_date')
    });
  },
  time: function() {
    if (this.hour.toString().length == 1) {
      return "0" + this.hour.toString() + ":00";
    } else {
      return this.hour.toString() + ":00";
    }
  },
  reservation_status: function() {
    if (Session.get('selectedRoom') != "") {
      var reservations = Rooms.findOne(Session.get('selectedRoom')).reservations;

      if (reservations.indexOf(this._id) > -1) {
        return "reserved";
      } else {
        return "available";
      }
    }
  },
  reservation_label: function() {
    if (Session.get('selectedRoom') != "") {
      var reservations = Rooms.findOne(Session.get('selectedRoom')).reservations;

      // right now, we're searching an array of _id strings
      // to find if the room has a reservation for this time slot
      if (reservations.indexOf(this._id) > -1) {
        return "appointment-warning";
      } else {
        return "appointment-success";
      }

      // eventually, if we want to support tracking such things as notes and who made the reservation
      // we're going to need to search through an array of objects, instead of an array of strings
      // to do that, we need a function such as .grep() or .each()

      // $.grep()
      //http://stackoverflow.com/questions/7364150/find-object-by-id-in-array-of-javascript-objects

      // $.each()
      // http://api.jquery.com/jQuery.each/

    }
  },
  inquery: function() {
    if (Session.get('selectedRoom')) {
      return true;
    } else {
      return false;
    }
  },
  room: function () {
    if (Session.get('selectedRoom')) {
      return Rooms.findOne(Session.get('selectedRoom'));
    } else {
      return {};
    }
  },
  selectedRoom: function () {
    if (Session.get('selectedRoom')) {
      var room = Rooms.findOne(Session.get('selectedRoom'))
      if(room){
        return room.name;
      }else{
        return "---";
      }
    } else {
      return "---";
    }
  },
  selected_date: function () {
    return moment(Session.get('display_date')).format("MMM Do YYYY");
  }
});


// when you click a reservation slot, set a variable
Template.calendarDayTemplate.events({
  'click #nextButton': function() {
    Session.set('display_date', moment(Session.get('display_date')).add('d', 1).format("YYYY-MM-DD"));
    Session.set('selected_reservation_slot', Schedule.findOne({
      date: Session.get('display_date'),
      hour: Session.get('selected_hour')
    }));
  },
  'click #previousButton': function() {
    Session.set('display_date', moment(Session.get('display_date')).subtract('d', 1).format("YYYY-MM-DD"));
    Session.set('selected_reservation_slot', Schedule.findOne({
      date: Session.get('display_date'),
      hour: Session.get('selected_hour')
    }));
  },
  'click #displayedDate': function() {
    Session.set('display_date', moment().format("YYYY-MM-DD"));
    Session.set('selected_reservation_slot', Schedule.findOne({
      date: Session.get('display_date'),
      hour: Session.get('selected_hour')
    }));
  },
  'click .timeslot': function() {
    Session.set('selected_hour', this.hour);
    Session.set('selected_reservation_slot', this._id);
  }
});
