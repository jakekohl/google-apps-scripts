/*
  This script is set up to monitor a calendar for events that start with the prefix 'Jake - ' and if my work email is not set as an attendee, it adds it as an attendee so that the event can be reserved on my work calendar.

  To set up in Google Apps Scripts:
    1. Copy this to a new project
    2. Under Project Settings -> Project Properties, create the following variables
      - WORK_EMAIL (example@domain.com)
      - DAYS (int)
    3. Deploy the script
    4. You can run it to verify that it works
    5. Create a trigger based on your preferences.
*/

function forwardEventToWorkEmail() {
    const userProperties = PropertiesService.getScriptProperties();
    const workEmail = userProperties.getProperty('WORK_EMAIL');
    const days = userProperties.getProperty('DAYS'); // Create a script 
    Logger.log(workEmail);
    let now = new Date();
    let range = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
    let events = CalendarApp.getDefaultCalendar().getEvents(now, range, {search: 'Jake - '});
    Logger.log(events);
    for (let i = 0; i < events.length; i++) {
      let event = events[i]
      let attendees = event.getGuestByEmail(workEmail);
      if (attendees == null) {
        events[i].addGuest(workEmail);
        Logger.log(`The Event ` + event.getTitle() + `that is on ` + event.getStartTime() + ` has been updated to include ${workEmail}`)
      }
    }
  };