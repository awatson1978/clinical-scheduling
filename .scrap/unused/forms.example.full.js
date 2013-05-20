
Template.userCardTemplate.editing_email = function () {
    try{
        console.log('Template.profilePageTemplate.editing_email');
        return Session.equals('editing_profile_email', "true");
    }catch(error){
        console.log(error);
    }
};
Template.userCardTemplate.editing_name = function () {
    try{
        console.log('Template.profilePageTemplate.editing_name');
        return Session.equals('editing_profile_name', "true");
    }catch(error){
        console.log(error);
    }
};
Template.userCardTemplate.editing_birthdate = function () {
    try{
        console.log('Template.profilePageTemplate.editing_birthdate');
        return Session.equals('editing_profile_birthdate', "true");
    }catch(error){
        console.log(error);
    }
};
Template.userCardTemplate.editing_avatar = function () {
    try{
        console.log('Template.profilePageTemplate.editing_avatar');
        return Session.equals('editing_profile_avatar', "true");
    }catch(error){
        console.log(error);
    }
};




Template.userCardTemplate.events(
    okCancelEvents('#userAvatarInput',
    {
        ok: function (value) {
            console.log('userAvatarInput - ok');
            Meteor.users.update(Meteor.userId(), {$set: { 'profile.avatar': value }});
            Session.set('editing_profile_avatar', "false");
            Meteor.flush();
        },
        cancel: function () {
            console.log('userAvatarInput - cancel');
            Session.set('editing_profile_avatar', "false");
        }
    })
);
Template.userCardTemplate.events(
    okCancelEvents('#userDateOfBirthInput',
    {
        ok: function (value) {
            console.log('userDateOfBirthInput - ok');
            Meteor.users.update(Meteor.userId(), {$set: { 'profile.dateOfBirth': value }});
            Session.set('editing_profile_birthdate', "false");
            Meteor.flush();
    },
        cancel: function () {
            console.log('userDateOfBirthInput - cancel');
            Session.set('editing_profile_birthdate', "false");
        }
    })
);
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
Template.userCardTemplate.events(
    okCancelEvents('#userEmailInput',
    {
        ok: function (value) {
            console.log('userEmailInput - cancel');
            Meteor.users.update(Meteor.userId(), {$set: { emails: [{address: value }] }});
            Session.set('editing_profile_email', "false");
            Meteor.flush();
    },
        cancel: function () {
            console.log('userEmailInput - cancel');
            Session.set('editing_profile_email', "false");
        }
    })
);
Template.userCardTemplate.events({
    'dblclick .userEmailDisplay': function (evt, tmpl) {
        Session.set('editing_profile_email', "true");
        Meteor.flush();
        activateInput(tmpl.find("#profile-input-email"));
    },
    'click .userNameDisplay': function (evt, tmpl) {
        Session.set('editing_profile_name', "true");
        Meteor.flush();
        activateInput(tmpl.find("#profile-input-name"));
    },
    'click .userDateOfBirthDisplay': function (evt, tmpl) {
        Session.set('editing_profile_birthdate', "true");
        Meteor.flush();
        activateInput(tmpl.find("#profile-input-birth-date"));
    },
    'click .userAvatarDisplay': function (evt, tmpl) {
        Session.set('editing_profile_avatar', "true");
        Meteor.flush();
        activateInput(tmpl.find("#profile-input-avatar"));
    },
    'click .userCollaboratorsDisplay': function (evt, tmpl) {
        Session.set('editing_profile_collaborators', "true");
        Meteor.flush();
        activateInput(tmpl.find("#profile-input-collaborator"));
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
Template.userCardTemplate.user_id = function () {
    try{
        if(Meteor.user()){
            return Meteor.user()._id;
        }else{
            return "UserId not found.";
        }
    }
    catch(err){
        console.log(err);
    }
};
Template.userCardTemplate.user_email = function () {
    try{
        if(Meteor.user().emails){
            return Meteor.user().emails[0].address;
        }else{
            return "User email address not available right now.";
        }
    }
    catch(err)
    {
        console.log(err);
    }
};


Template.userCardTemplate.user_image = function () {
    try{
        if(Meteor.user().services.facebook){
            return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
        }else if(Meteor.user().profile){
            return $.trim(Meteor.user().profile.avatar);
        }else{
            return "/images/placeholder-240x240.gif";
        }
    }
    catch(err){
        console.log(err);
    }
};





