

Template.calendarYear.helpers({
  resized: function(){
    return Session.get("resized");
  },
  roomSelected: function () {
    //renderCalendarYearChart();
    return Session.get('selectedRoom');
  }
});

Template.calendarYear.rendered = function(){
  console.log('rendering calendar...');
  console.log('renderCalendarYearChart');

  //d3.select(self.frameElement).style("height", "500px");

  var self = $('#calendarYearGraph');
  self.node = self.find("svg");

  if (!self.handle) {
    console.log('creating reactive D3 container...');
    self.handle = Tracker.autorun(function(){
      var resized = Session.get('resized');
      //var selectedRoomId = Session.get('selectedRoom');


      console.log('setting variables...');
      var width = 1024;
      var height = 150;
      var cellSize = width / 53;

      var day = d3.time.format("%w");
      var week = d3.time.format("%U");
      var percent = d3.format(".1%");
      var format = d3.time.format("%Y-%m-%d");

      console.log('setting color scale...');
      var color = d3.scale.quantize()
      .domain([0, 1])
      .range(d3.range(5).map(function(d) { return "q" + d; }));


      console.log('creating SVG canvas to draw on...');
      var svg = d3.select("#calendarYearGraph").selectAll("svg")
      .data(d3.range(2015, 2016))
      .enter().append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "RdYlGn available")
      .append("g")
      .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");


      console.log('creating calendar rectangles for each day...');
      var rect = svg.selectAll(".day")
      .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
      .enter().append("rect")
      .attr("class", "day")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", function(d) { return week(d) * cellSize; })
      .attr("y", function(d) { return day(d) * cellSize; })
      .datum(format);

      rect.append("title")
      .text(function(d) { return d; });

      console.log('creating calendar months...');
      svg.selectAll(".month")
      .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
      .enter().append("path")
      .attr("class", "month")
      .attr("d", monthPath);



      var collectionData = null;
      var reservationsList = null;


      console.log('querying room reservations...');

      //console.log('selectedRoom', Session.get('selectedRoom'));
      var selectedRoom = Session.get('selectedRoom');
      var room = Rooms.findOne(Session.get('selectedRoom'));
      //console.log('room', selectedRoom);

      if(!room){
        room = {reservations: []};
      }

      collectionData = Schedule.find({_id: {$in: room.reservations}}).fetch();
      console.log('collectionData', collectionData);





      console.log('mapping and rolling up data...');

      // this is just a weird little function to count up the number of reservations
      // and display appropriate colors
      var data = d3.nest()
      .key(function(d) { return d.date; })
      .rollup(function(d) { return 0.05 + d3.sum(d, function(e) {return 0.1;}); })
      .map(collectionData);

      //console.log(data);

      // add ids to graph so jquery can attack to it
      rect.attr("id", function(d) {return "day-" + d; });
      rect.attr("class", function(d) {return "day"});

      // addClass and removeClass don't work on SVG elements
      // so we need to remove the q0, q1, q2, q3, and q4 classes
      // by querying the .day class, and resetting the class attribute
      $('.day').attr('class', 'day');

      // we've been having major scoping
      for(var key in data){
        if(data.hasOwnProperty(key)){
          //console.log(key + ' ' + data[key]);
          if(data[key] < 0.21){
            d3.select('#day-' + key).attr("class", "day q0");
          }else if((data[key] > 0.21) && (data[key] < 0.41)){
            d3.select('#day-' + key).attr("class", "day q1");
          }else if((data[key] > 0.41) && (data[key] < 0.61)){
            d3.select('#day-' + key).attr("class", "day q2");
          }else if((data[key] > 0.61) && (data[key] < 0.81)){
            d3.select('#day-' + key).attr("class", "day q3");
          }else{
            d3.select('#day-' + key).attr("class", "day q4");
          }
        }
      }


      //console.log('creating month path...');
      function monthPath(t0) {
        var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
        d0 = +day(t0), w0 = +week(t0),
        d1 = +day(t1), w1 = +week(t1);
        return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
        + "H" + w0 * cellSize + "V" + 7 * cellSize
        + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
        + "H" + (w1 + 1) * cellSize + "V" + 0
        + "H" + (w0 + 1) * cellSize + "Z";
      }

    });
  };
};
Template.calendarYear.destroyed = function(){
  this.handle && this.handle.stop();
};
