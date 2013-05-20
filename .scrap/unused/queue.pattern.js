//-------------------------------------------------------
//  Queue Pattern - Secret Sauce
//  http://docs.mongodb.org/manual/reference/operator/update-array/
//
//  Todos.update({_id: id}, {$push: {tags: tag}});
//  Todos.update({_id: id}, {$pull: {tags: tag}});
//  Todos.update({_id: id}, {$pop: {tags: 1}});
//  Todos.update({_id: id}, {$pop: {tags: -1}});
//  Todos.update(this._id, {$set: {text: value}});
//  Todos.update(this._id, {$addToSet: {tags: value}});




Template.something.events({
    'click .remove': function (evt) {
        var tag = this.tag;
        var id = this.todo_id;

        evt.target.parentNode.style.opacity = 0;
        // wait for CSS animation to finish
        Meteor.setTimeout(function () {
            Todos.update({_id: id}, {$pull: {tags: tag}});
        }, 300);
        Meteor.flush();
    }
});

Template.taskItemTemplate.events(okCancelEvents(
    '#todo-input',
    {
        ok: function (value) {
            Todos.update(this._id, {$set: {text: value}});
            Session.set('editing_itemname', null);
        },
        cancel: function () {
            Session.set('editing_itemname', null);
        }
    }));

Template.taskItemTemplate.events(okCancelEvents(
    '#edittag-input',
    {
        ok: function (value) {
            Todos.update(this._id, {$addToSet: {tags: value}});
            Session.set('editing_addtag', null);
        },
        cancel: function () {
            Session.set('editing_addtag', null);
        }
    }));
