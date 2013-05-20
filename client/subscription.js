Meteor.subscribe('schedule');

Meteor.subscribe('mySchedule',
    {}
    //Meteor.userId()
);

Meteor.subscribe('rooms');

//Meteor.subscribe('schedule',
//    Session.get('display_date')
//);