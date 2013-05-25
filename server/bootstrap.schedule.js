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
        var dayOffset = 0;

        // we add a year's worth of timeslots
        for (var i = 0; i < 8760; i++) {
            row.hour = (i % 24) + 1;

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



        console.log('reserving rooms...');
        var roomArray = Rooms.find().fetch();
        var threshold = 1;
        Schedule.find().forEach(function(document){
            console.log(JSON.stringify('week offset: ' + moment().diff(document.date, 'weeks')));
            // a number from 0 to 52
            //threshold  = moment().diff(document.date, 'weeks') * -1;

            // a number from 1 to 53
            //threshold  = (moment().diff(document.date, 'weeks') * -1) + 1;

            // a number from 1 to 0.000x
            threshold  = 1 / ((moment().diff(document.date, 'weeks') * -1) + 1);
            console.log(threshold);
            if(Math.random() < threshold){
                try{
                    var room = roomArray[Math.floor(Math.random() * roomArray.length)];

                    Rooms.update(room._id, {$addToSet: {reservations: document._id}});
                    console.log('room ' + room.name + ' reserved at ' + document.date + ' :: ' + document.hour + ':00');
                }catch(error){
                    console.log(error);
                }
            }
        });

    }



    console.log('everything should be all set...');
});


