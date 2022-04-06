const axios = require('axios').default;

function getGoogleCalendarApiPath(calendarId) {
    return 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events';
}

function checkTodayIsHoliday() {
    return axios.get(
        getGoogleCalendarApiPath(process.env.CALENDAR_HOLIDAY_IN_BNAGKOK_ID),
        {
            params: {
                orderBy: 'startTime',
                singleEvents: true,
                key: process.env.GOOGLE_API_KEY,
                timeMin: (new Date()).toISOString(),
                maxResults: 1
            }
        }
    ).then(function (response) {
        console.log(response.data.items.length > 0);
        response.data.items.length > 0;
    }).catch(function (error) {
        console.log(error);
    });
}

module.exports = {
    checkTodayIsHoliday
}