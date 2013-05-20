//// people want to see their scheduled video conferences
//// but also want to see the publicly scheduled conferences
//// so, we need to define two collections, even though they'
//
//AllTodos =          new Meteor.Collection("allTodos");
//Todos =             new Meteor.Collection("todos");
//
//
//Todos.allow({
//    insert: function(userId, todo){
//        //return userId && todo.owner === userId;
//        //return false;
//        return true;
//    },
//    update: function (userId, todos, fields, modifier) {
//        //        return _.all(todos, function (todo) {
//        //            //if (userId !== todo.owner)
//        //            //    return false; // not the owner
//        //
//        //            var allowed = [
//        //                "text",
//        //                "tags",
//        //                "timestamp",
//        //                "public",
//        //                "done",
//        //                "tags"
//        //            ];
//        //            if (_.difference(fields, allowed).length)
//        //                return false; // tried to write to forbidden field
//        //
//        //            return true;
//        //        });
//        return true;
//    },
//    remove: function(userId, todos){
//        return true;
//    }
//});
//
//
//
//Meteor.subscribe('allTodos');
//Meteor.subscribe('todos',
//    Meteor.userId()
//);
//
//
//Meteor.publish('todos', function (ownerId) {
//    try{
//        return Todos.find({owner: ownerId});
//    }catch(error){
//        console.log(error);
//    }
//});
//Meteor.publish('allTodos', function () {
//    try{
//        return Todos.find();
//    }catch(error){
//        console.log(error);
//    }
//});



Template.workqueueTemplate.todos = function () {

    try{
        var selectionQuery = {owner: Meteor.userId()};

        if (Session.get('tag_filter')){
            selectionQuery.tags = Session.get('tag_filter');
        }

        var sortSettings = {timestamp: 1};
        if(Session.get('sort_workqueues_completed')){
            sortSettings = {done: 1};
        }
        if(Session.get('sort_workqueues_starred')){
            sortSettings = {star: 1};
        }
        if(Session.get('sort_workqueues_alphabetically')){
            sortSettings = {text: 1};
        }

        switch(Session.get('selected_list')){
            case "all":
                console.log('selected list - all');
                return Todos.find(selectionQuery, {sort: sortSettings});
                break;
            case "urgent":
                console.log('selected list - urgent');
                selectionQuery.star = true;
                return Todos.find(selectionQuery, {sort: sortSettings});
                break;
            case "routine":
                console.log('selected list - routine');
                selectionQuery.star = false;
                return Todos.find(selectionQuery, {sort: sortSettings});
                break;
            case "finished":
                console.log('selected list - finished');
                selectionQuery.done = true;
                return Todos.find(selectionQuery, {sort: sortSettings});
                break;
            case "unfinished":
                console.log('selected list - unfinished');
                selectionQuery.done = false;
                return Todos.find(selectionQuery, {sort: sortSettings});
                break;
            default:
                break;
        }

    }catch(error){
        console.log(error);
    }
};
