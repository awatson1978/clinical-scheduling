Session.set('selected_room', '');
Session.set('display_date', moment().format("YYYY-MM-DD"));
Session.set('selected_hour', '');
Session.set("resized", '');

Template.appContainerTemplate.reservationJson = function(){
    return Session.get('json_data');
};

$(window).resize(function(evt) {
    try{
        Session.set("resized", new Date());
        Session.set("appWidth", window.innerWidth);
        console.log('window.innerWidth: ' + window.innerWidth);
    }catch(err){
        console.log(err);
    }
});


