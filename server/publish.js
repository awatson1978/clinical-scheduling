Meteor.publish('mySchedule', function (ownerId) {
    try{
        return Schedule.find({owner: ownerId}, {limit: 40});
    }catch(error){
        console.log(error);
    }
});
//Meteor.publish('roomSchedule', function (roomId) {
//    try{
//        return Schedule.find({reservationLocks: roomId}, {limit: 40});
//        return Schedule.find({reservations: {roomId: {$exists: true} }}, {limit: 40});
//    }catch(error){
//        console.log(error);
//    }
//});

Meteor.publish('schedule', function () {
    try{
        // 30 days worth of reservations is 720 records
        return Schedule.find({},{limit: 720});
    }catch(error){
        console.log(error);
    }
});
Meteor.publish('rooms', function () {
    return Rooms.find();
});


//Meteor.publish('schedule', function (specifiedDate) {
//    try{
//        return Schedule.find({date: specifiedDate},{limit: 40});
//    }catch(error){
//        console.log(error);
//    }
//});
