Session.set('selected_room', '');
Session.set('display_date', moment().format("YYYY-MM-DD"));
Session.set('selected_hour', '');

Template.appContainerTemplate.reservationJson = function(){
    return Session.get('json_data');
};