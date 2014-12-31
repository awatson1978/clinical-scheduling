scheduling
=================

A basic resource scheduling applet, using the [rzymek:fullcalendar](https://atmospherejs.com/rzymek/fullcalendar) package, the D3 calendar graph, moment.js, and plenty of Meteor reactive goodness.  

This applet does *not* contain iron:router, so it's up to you to implement custom routing logic!

Also, the calendar widget doesn't really do anything, except for being loaded into the applet.  It's up to you to implement some custom logic.  

*note*: The demo works great on localhost; but the scheduling collection is quite big, and apparently doesn't run particularly well on the meteor.com servers.  That's really a fault of the schema design of this particular calendaring widget.


============================
#### Screenshot  

![Scheduling Screenshot](https://raw.githubusercontent.com/awatson1978/clinical-scheduling/master/public/scheduling-screenshot.png)  


============================
#### Meteor Version  

1.0

============================
#### Installation  


````sh
# Should be as simple as cloning the repository...  
git clone https://github.com/awatson1978/clinical-scheduling.git
cd clinical-scheduling

# And then running it...
meteor
````

============================
#### Licensing

MIT License. Use as you wish, including for commercial purposes.
