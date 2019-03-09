const {google} = require('googleapis');

/*
Module options:

options.eventName  : Name of the event
options.eventStart : Starting date of the event
options.eventEnd   : Ending date of the event

Date format:
YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS
ex:
2019-03-14 or 2019-03-14T10:42:00
 */

module.exports = {
    start: function(options, user) {
        console.log('Calendar reaction executed');
        const oAuth2Client = new google.auth.OAuth2(
            "336340546827-7j7ktfj77g2jr9b551ulogjacouc5kcs.apps.googleusercontent.com",
            "vBZ5V5XqMVRV4X0vJIqLIMnL",
            "http://localhost:8081/home");
        oAuth2Client.setCredentials({
            "access_token": user.google.token,
            "refresh_token": user.google.refreshToken,
            "scope":"https://www.googleapis.com/auth/calendar.events",
            /*"token_type":"Bearer",*/
        });
        this.addEvent(oAuth2Client, options);
    },

    addEvent: function(auth, options) {
        let eventName = options.eventName;
        let eventStart = options.eventStart;
        let eventEnd = options.eventEnd;

        if (eventStart.indexOf('T') >= 0 && eventEnd.indexOf('T') >= 0) {
            res = {
                start: {
                    dateTime: eventStart,
                    timeZone: "Europe/Paris"
                },
                end: {
                    dateTime: eventEnd,
                    timeZone: "Europe/Paris"
                },
                summary: eventName
            };
        } else {
            res = {
                start: {date: eventStart},
                end: {date: eventEnd},
                summary: eventName
            };
        }


        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.insert({
            calendarId: 'primary',
            resource : res
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
        });
    }
};
