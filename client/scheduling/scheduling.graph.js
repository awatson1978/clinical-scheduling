
Template.calendarYearTemplate.resized = function () {
    return Session.get("resized");
};
Template.calendarYearTemplate.roomselected = function () {
    return Session.get("selected_room");
};



Template.calendarYearTemplate.rendered = function () {
    console.log('rendering calendar...');

    var self = this;
    self.node = self.find("svg");

    if (!self.handle) {
        console.log('creating reactive D3 container...');
        self.handle = Deps.autorun(function(){
            var resized = Session.get('resized');
            //var selectedRoomId = Session.get('selected_room');


            console.log('setting variables...');
            var width = 1024;
            var height = 150;
            var cellSize = width / 53;

            var day = d3.time.format("%w");
            var week = d3.time.format("%U");
            var percent = d3.format(".1%");
            var format = d3.time.format("%Y-%m-%d");

            try{
                console.log('setting color scale...');
                var color = d3.scale.quantize()
                    .domain([0, 1])
                    .range(d3.range(5).map(function(d) { return "q" + d; }));
            }catch(error){console.log(error);}


            try{
                console.log('creating SVG canvas to draw on...');
                var svg = d3.select("#calendarYearGraph").selectAll("svg")
                    .data(d3.range(2013, 2014))
                    .enter().append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("class", "RdYlGn available")
                    .append("g")
                    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");
            }catch(error){console.log(error);}


            try{
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
            }catch(error){console.log(error);}

            try{
                console.log('creating calendar months...');
                svg.selectAll(".month")
                    .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
                    .enter().append("path")
                    .attr("class", "month")
                    .attr("d", monthPath);
            }catch(error){console.log(error);}


            console.log('creating month path...');
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

            var collectionData = null;
            var reservationsList = null;

            try{
                console.log('querying room reservations...');
                reservationsList = Rooms.findOne(Session.get('selected_room')).reservations;
                collectionData = Schedule.find({_id: {$in: reservationsList}}).fetch();
            }catch(error){console.log(error);}


            try{
                console.log('mapping and rolling up data...');
                var data = d3.nest()
                    .key(function(d) { return d.date; })
                    //.rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
                    .rollup(function(d) { return 0.05 + d3.sum(d, function(e) {return 0.1;}); })
                    .map(collectionData);
            }catch(error){console.log(error);}

            console.log(JSON.stringify(data));

            try{
                console.log('applying color filter to rectangles...');

                rect.filter(function(d) { return d in data; })
                    .attr("class", function(d) {return "day " + color(data[d]);});
                    //.attr("class", function(d) {return "day reserved";});
            }catch(error){console.log(error);}

        });
    };
};
Template.calendarYearTemplate.destroyed = function () {
    this.handle && this.handle.stop();
};

function renderCalendarYearChart(){
    console.log('renderCalendarYearChart');

    d3.select(self.frameElement).style("height", "500px");
};

