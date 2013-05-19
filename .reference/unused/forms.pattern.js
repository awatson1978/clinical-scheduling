Template.userCardTemplate.editing_name = function () {
    try{
        console.log('Template.profilePageTemplate.editing_name');
        return Session.equals('editing_profile_name', "true");
    }catch(error){
        console.log(error);
    }
};
Template.userCardTemplate.events(
    okCancelEvents('#userNameInput',
        {
            ok: function (value) {
                console.log('userNameInput - ok');
                Meteor.users.update(Meteor.userId(), {$set: { 'profile.name': value }});
                Session.set('editing_profile_name', "false");
                Meteor.flush();
            },
            cancel: function () {
                console.log('userNameInput - cancel');
                Session.set('editing_profile_name', "false");
            }
        })
);
Template.userCardTemplate.events({
    'click .userNameDisplay': function (evt, tmpl) {
        Session.set('editing_profile_name', "true");
        Meteor.flush();
        activateInput(tmpl.find("#profile-input-name"));
    }
});
Template.userCardTemplate.user_name = function () {
    try{
        if(Meteor.user().profile){
            return Meteor.user().profile.name;
        }else{
            return "User profile not created yet.";
        }
    }
    catch(err){
        console.log(err);
    }
};