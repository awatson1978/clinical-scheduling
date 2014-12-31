Meteor.publish('mySchedule', function (ownerId) {
  return Schedule.find({owner: ownerId}, {limit: 40});
});

Meteor.publish('schedule', function () {
  return Schedule.find({},{limit: 8760});
});
Meteor.publish('rooms', function () {
  return Rooms.find();
});

Meteor.publish('dowjones', function () {
  return DowJonesSample.find();
});
