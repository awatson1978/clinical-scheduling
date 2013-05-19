Schedule =  new Meteor.Collection("schedule");

Schedule.allow({
    insert: function(){
        return true;
    },
    update: function () {
        return true;
    },
    remove: function(){
        return true;
    }
});