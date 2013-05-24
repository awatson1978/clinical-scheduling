Meteor.publish('mySchedule', function (ownerId) {
    try{
        return Schedule.find({owner: ownerId}, {limit: 40});
    }catch(error){
        console.log(error);
    }
});

Meteor.publish('schedule', function () {
    try{
        // 30 days worth of reservations is 720 records
        return Schedule.find({},{limit: 8760});
    }catch(error){
        console.log(error);
    }
});
Meteor.publish('rooms', function () {
    return Rooms.find();
});


Meteor.publish('dowjones', function () {
    return DowJonesSample.find();
});


