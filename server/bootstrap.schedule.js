//  bootstrapping the collections that run the scheduling module

//schedule.date
//schedule.hour
//schedule.reservations
//schedule.notes

Meteor.startup(function () {
    // if there are no rooms, create sample room resources
    console.log('creating rooms...');
    if (Rooms.find().count() === 0) {
        Rooms.insert({
            name: 'Brazil Room 1',
            random: '0',
            reservations: []
        });
        Rooms.insert({
            name: 'Brazil Room 2',
            random: '1',
            reservations: []
        });
        Rooms.insert({
            name: 'Brazil Room 3',
            random: '2',
            reservations: []
        });
        Rooms.insert({
            name: 'Russia Room 1',
            random: '3',
            reservations: []
        });
        Rooms.insert({
            name: 'Russia Room 2',
            random: '4',
            reservations: []
        });
        Rooms.insert({
            name: 'Russia Room 3',
            random: '5',
            reservations: []
        });
        Rooms.insert({
            name: 'India Room 1',
            random: '6',
            reservations: []
        });
        Rooms.insert({
            name: 'India Room 2',
            random: '7',
            reservations: []
        });
        Rooms.insert({
            name: 'India Room 3',
            random: '8',
            reservations: []
        });
    }

    // next we prepopulate reservation slots in the calendar
    console.log('creating schedule...');
    if (Schedule.find().count() === 0) {

        var row = {}
        row.date =  moment().format("YYYY-MM-DD");

        var hourCount = 25;
        var daycount = 0;
        var dayOffset = 0;

        // we add three months worth of timeslots
        for (var i = 0; i < 2160; i++) {
            row.hour = (i % 24) + 1;
            row.Open = Math.random() * 10000;
            row.Close = Math.random() * 10000;


            if(hourCount == 1){
                hourCount = 24;
                dayOffset = Math.floor(i / 23);
                row.date =  moment().add('d', dayOffset).format("YYYY-MM-DD");
            }else{
                hourCount--;
            }

            console.log(JSON.stringify(row));
            Schedule.insert(row);
        }

        // once we've created rooms and prepopulated the schedule,
        // lets reserve some rooms!
        console.log('reserving rooms...');
        var roomArray = Rooms.find({}).fetch();
        Schedule.find().forEach(function(document){
            console.log(JSON.stringify(document));
            if(Math.random() < 0.50){
                try{
                    var room = roomArray[Math.floor(Math.random() * roomArray.length)];
                    //console.log("room: " + JSON.stringify(room));
                    //console.log("room._id: " + room._id);

                    Rooms.update(room._id, {$addToSet: {reservations: document._id}});
                }catch(error){
                    console.log(error);
                }
            }
        });

    }



    console.log('everything should be all set...');
});


