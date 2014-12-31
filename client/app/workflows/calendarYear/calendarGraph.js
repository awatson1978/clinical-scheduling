// ClinicalGraphs = {
//   calendarGraph: function(chartId){
//     console.log('calendarGraph...');
//
//
//     console.log('selectedRoom', Session.get('selectedRoom'));
//     var selectedRoom = Session.get('selectedRoom');
//     var room = Rooms.findOne(Session.get('selectedRoom'));
//     console.log('room', selectedRoom);
//
//     if(!room){
//       room = {reservations: []};
//     }
//
//     collectionData = Schedule.find({_id: {$in: room.reservations}}).fetch();
//     console.log('collectionData', collectionData);
//   }
// }
