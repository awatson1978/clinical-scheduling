

//--------------------------------------------------------------------------
// New Task Input Bar

Template.workqueuesPageTemplate.events({
    'click #newTaskInput': function(evt,tmpl){
        try{
            // we'll need a trigger create a new task
            // but the following is probably not it, since it relies on a text input.
            //            if($('#newTaskInput').val() === 'add new task'){
            //                $('#newTaskInput').removeClass('lightgray');
            //                $('#newTaskInput').val('');
            //            }
        }catch(err){
            console.log(err);
        }
    }
});

// the following is part of an okCancelEvent helper
// and might want to be factored out into an independent function
Template.workqueuesPageTemplate.events(okCancelEvents(
    '#newTaskInput',
    {
        ok: function (text, evt) {

            // this probably needs to be moved elsewhere
            try{
                console.log('ok called on new todo item');
                var tag = Session.get('tag_filter');

                console.log('text.length: ' + text.length);
                if (text.length) {
                    console.log('text: ' + text);
                    console.log('list_id: ' + Session.get('list_id'));
                    console.log('owner: ' + Meteor.userId());

                    Meteor.call('createNewTask', {
                        text: text,
                        list_id: Session.get('list_id'),
                        done: false,
                        star: false,
                        timestamp: (new Date()).getTime(),
                        owner: Meteor.userId(),
                        tags: tag ? [tag] : [],
                        public: 'public'
                    }, function (error, todo) {
                        console.log('error: ' + error);
                        console.log('todo: ' + todo);
                    });
                } else {
                    Session.set("createError",
                        "It needs a title and a description, or why bother?");
                }
                evt.target.value = '';
            }catch(err){
                console.log(err);
            }
        },
        cancel: function(text,evt){
            $('#newTaskInput').addClass('lightgray');
            $('#newTaskInput').val('add new task');
        }
    })
);

//--------------------------------------------------------------------------
// workqueueTemplate


// this will probably be needed regardless
Template.workqueueTemplate.showTaskDetail = function(){
    try{
        return Session.get('show_task_detail_panel');
    }catch(error){
        console.log(error);
    }
};



//----------------------------------------------------------------------
// taskItemTemplate

// this is pretty much all boilerplate material, and useful
Template.taskItemTemplate.showDeleteButton = function(){
    try{
        if(Session.get('selected_task_delete_id') === this._id){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
    }
};
Template.taskItemTemplate.tag_objs = function () {
    try{
        var todo_id = this._id;
        return _.map(this.tags || [], function (tag) {
            return {todo_id: todo_id, tag: tag};
        });
    }catch(error){
        console.log(error);
    }
};
Template.taskItemTemplate.done_class = function () {
    try{
        return this.done ? 'done' : '';
    }catch(error){
        console.log(error);
    }
};
Template.taskItemTemplate.task_complete = function () {
    try{
        return this.done ? 'green' : 'lightgray';
    }catch(error){
        console.log(error);
    }
};
Template.taskItemTemplate.task_text_complete = function () {
    try{
        return this.done ? 'strikeout' : '';
    }catch(error){
        console.log(error);
    }
};
Template.taskItemTemplate.task_star = function () {
    try{
        return this.star ? 'goldenrod' : 'lightgray';
    }catch(error){
        console.log(error);
    }
};

Template.taskItemTemplate.editing = function () {
    try{
        return Session.equals('editing_itemname', this._id);
    }catch(error){
        console.log(error);
    }
};



Template.taskItemTemplate.events({
    'dblclick .todo': function(){
        Session.set('show_task_detail_panel', true);
        Meteor.flush();
    },
    'click .checkmark': function (e) {
        Todos.update(this._id, {$set: {done: !this.done}});
        e.preventDefault();
        Meteor.flush();
    },
    'click .task-star': function (e) {
        Todos.update(this._id, {$set: {star: !this.star}});
        e.preventDefault();
        Meteor.flush();
    },
    'click .task-info': function (e) {
        // this block was written before I had a good understanding of the Meteor.helper functions
        // it should be refactored into a proper helper function
        if(Session.get('show_task_detail_panel')){
            Session.set('show_task_detail_panel', false);
        }else{
            Session.set('show_task_detail_panel', true);
            Session.set('selected_task_id', this._id);
            Session.set('selected_task_done_status', this.done);
            Session.set('selected_task_star_status', this.star);
            Session.set('selected_task_text', this.text);
        }
        setTaskDetailVisibility();
        Meteor.flush();
    },
    'click .task-delete': function (e) {
        if(confirm('Are you sure you want to delete task ' + Session.get('selected_task_id') + '?')){
            Todos.remove(this._id);
            Meteor.flush();
        }
    },

    'dblclick .display .todo-text': function (evt, tmpl) {
        Session.set('editing_itemname', this._id);
        Meteor.flush(); // update DOM before focus
        activateInput(tmpl.find("#todo-input"));
        Meteor.flush();
    },
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






//----------------------------------------------------------------------
//----------------------------------------------------------------------
// TASK DETAIL CARD




Template.taskDetailCardTemplate.events({
    'click .task-detail-image-container': function(evt,tmpl){
        Session.set('is_modal_dialog', true);
        Session.set('pre_modal_sidebar_panel_state', Session.get('show_sidebar_panel'));
        Session.set('show_sidebar_panel',false);
        Session.set('pre_modal_page', '#workqueuesPage');
        showPage('#iconAssetsPage');
    },
    'click .send-to-collaborator':function(evt,tmpl){
        sendToActiveCollaborator();
    },
    'click #detailedTaskAddTagIcon': function (evt) {
        Session.set('editing_detailed_addtag', Session.get('selected_task_id'));
        Meteor.flush();

        $('#edittagInputDetailed').focus();
        $('#edittagInputDetailed').select();
    },
    'click .remove': function (evt) {
        var tag = this.tag;
        var id = this.todo_id;

        evt.target.parentNode.style.opacity = 0;
        // wait for CSS animation to finish
        Meteor.setTimeout(function () {
            Todos.update({_id: id}, {$pull: {tags: tag}});
        }, 300);
    },
    'click .task-detail-checkmark': function (e) {
        Todos.update(Session.get('selected_task_id'), {$set: {done: !Todos.findOne(Session.get('selected_task_id')).done}});
        e.preventDefault();
        Meteor.flush();
    },
    'click .task-detail-star': function (e) {
        Todos.update(Session.get('selected_task_id'), {$set: {star: !Todos.findOne(Session.get('selected_task_id')).star}});
        e.preventDefault();
        Meteor.flush();
    },
    'click .task-detail-send': function(e){
        sendToActiveCollaborator();
    },
    'click .task-detail-delete': function (e) {
        if(confirm('Are you sure you want to delete task ' + Session.get('selected_task_id') + '?')){
            Session.set('show_task_detail_panel', false);
            setTaskDetailVisibility();
            Todos.remove(Session.get('selected_task_id'));
            Meteor.flush();
        }
    },
    'click .card-header': function (evt, tmpl) {
        Session.set('show_task_detail_panel', false);
        setTaskDetailVisibility();
        Meteor.flush();
    }
});



// more boiler plate
Template.taskDetailCardTemplate.todo_id = function(){
    try{
        return Session.get('selected_task_id');
    }catch(error){
        console.log(error);
    }
};
Template.taskDetailCardTemplate.todo_text = function(){
    try{
        return Session.get('selected_task_text');
    }catch(error){
        console.log(error);
    }
};
Template.taskDetailCardTemplate.todo_done = function(){
    try{
        return Session.get('selected_task_done_status') ? 'checked="checked"' : '';
    }catch(error){
        console.log(error);
    }
};

Template.taskDetailCardTemplate.detailed_task_complete = function () {
    try{
        return Todos.findOne(Session.get('selected_task_id')).done ? 'green' : 'dimgray';
    }catch(error){
        console.log(error);
    }
};
Template.taskDetailCardTemplate.detailed_task_text_complete = function () {
    try{
        return Todos.findOne(Session.get('selected_task_id')).done ? 'strikeout' : '';
    }catch(error){
        console.log(error);
    }
};
Template.taskDetailCardTemplate.detailed_task_star = function () {
    try{
        return Todos.findOne(Session.get('selected_task_id')).star ? 'goldenrod' : 'dimgray';
    }catch(error){
        console.log(error);
    }
};

