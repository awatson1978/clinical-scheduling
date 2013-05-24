Session.set('selected_room', '');
Session.set('display_date', moment().format("YYYY-MM-DD"));
Session.set('selected_hour', '');
Session.set('selected_reservation_slot', '');
Session.set("resized", '');
Session.set("last_reservation_change", '');

Template.appContainerTemplate.reservationJson = function(){
    return Session.get('json_data');
};

$(window).resize(function(evt) {
    try{
        Session.set("resized", new Date());
    }catch(err){
        console.log(err);
    }
});


