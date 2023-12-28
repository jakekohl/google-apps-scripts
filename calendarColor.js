/*
    Started by using blog post https://medium.com/@dhavalsavalia/how-to-colorize-google-calendar-event-using-apps-script-1-2-d88dd27658f0

    Customize the colors of your Google Calendar events based on title as of now
*/

// define ids and creates variables
var userProperties = PropertiesService.getScriptProperties();
var calendarIDSecret = userProperties.getProperty('email');
var calendar = CalendarApp.getCalendarById(calendarIDSecret);
var now = new Date(Date.now())
var nowYear = now.getFullYear();
var beginDate = new Date(nowYear, 0, 1);
var endDate = new Date(nowYear+2, 0, 1);

function assign_color() {
  var events = calendar.getEvents(beginDate, endDate);
  for (var i=0; i<events.length; i++) {
    console.log(`Current count ${i} out of ` + events.length);
    var event = events[i];
    var title = event.getTitle();
    var color = event.getColor();
    if (/Busy \(via Clockwise\)/.test(title) && color !== 3){
      try { 
        event.setColor(3); 
        console.log(`'Updated ${title} to purple.`)
      } catch (error) {
        console.log(error);
      };
    } else if (/.*standup.*/i.test(title) && color !== 5) {
      try { 
        event.setColor(5); 
        console.log(`'Updated ${title} to yellow.`)
      } catch (error) {
        console.log(error);
      };
    }
    else {
      try { 
        event.setColor(0); 
        console.log(`'Updated ${title} to null.`)
      } catch (error) {
        console.log(error);
      };
    };
  }
};