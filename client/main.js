Session.set('display_date', moment().format("YYYY-MM-DD"));
Session.set('selected_room', '');

Template.appContainerTemplate.reservationJson = function(){
    return Session.get('json_data');
};