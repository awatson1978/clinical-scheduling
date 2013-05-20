Template.calendarYearTemplate.destroyed = function () {
    this.handle && this.handle.stop();
};
Template.calendarYearTemplate.rendered = function () {
    console.log('rendering calendar...');

    //var resize = Session.get("resize");
    self.node = self.find("svg");

    if (! self.handle) {
        console.log('no safe handle...');
        self.handle = Meteor.autorun(function(){
            console.log('creating handle...');
            console.log(Session.get('display_date'));
            renderCalendarYearChart();
        });
    };
};


function renderCalendarYearChart(){
    console.log('renderCalendarYearChart');

    //var width = 768;
    //var cellSize = 17;

    // it's a -55 offset due to 40 pixels of padding and a -15 pixel offset in 'row'
    var width = (window.innerWidth - 55);
    var height = 180;
    var cellSize = width / 53;

    var day = d3.time.format("%w"),
        week = d3.time.format("%U"),
        percent = d3.format(".1%"),
        format = d3.time.format("%Y-%m-%d");

    var color = d3.scale.quantize()
        .domain([-.05, .05])
        .range(d3.range(11).map(function(d) { return "q" + d + "-11"; }));

    var svg = d3.select("#calendarYearGraph").selectAll("svg")
        .data(d3.range(2008, 2009))
        .enter().append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "RdYlGn")
        .append("g")
        .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");


    var rect = svg.selectAll(".day")
        .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
        .enter().append("rect")
        .attr("class", "day")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", function(d) { return week(d) * cellSize; })
        .attr("y", function(d) { return day(d) * cellSize; })
        .datum(format);


    svg.selectAll(".month")
        .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
        .enter().append("path")
        .attr("class", "month")
        .attr("d", monthPath);


    var data = d3.nest()
            .key(function(d) { return d.Date; })
            .rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
            .map(DowJonesSample.find().fetch());

    rect.filter(function(d) { return d in data; })
        .attr("class", function(d) { return "day " + color(data[d]); });



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

    d3.select(self.frameElement).style("height", "500px");

};