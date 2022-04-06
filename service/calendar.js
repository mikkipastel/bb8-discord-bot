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
        //todo: return embedded message
        const printText = 'วันนี้เป็นวัน' + response.data.items[0].summary
        console.log(printText);
        return response.data.items.length > 0;
    }).catch(function (error) {
        console.log(error);
    });
}

function checkTodayEvent() {
    const nowDateTime = (new Date()).toISOString();
    return axios.get(
        getGoogleCalendarApiPath(process.env.CALENDAR_YAVIN_TEAM),
        {
            params: {
                orderBy: 'startTime',
                singleEvents: true,
                key: process.env.GOOGLE_API_KEY,
                timeMin:nowDateTime
            }
        }
    ).then(function (response) {
        console.log(response.data.items);
        const nowDate = nowDateTime.split('T')[0];
        if (response.data.items.length > 0 && nowDate == response.data.items[0].start.date) {
            response.data.items.forEach(function (item) {
                //todo: return embedded message
                const printText = item.summary + ' : ' + item.start.date + ' - ' + item.end.date;
                console.log(printText);
            });
        }
    }).catch(function (error) {
        console.log(error);
    });
}

module.exports = {
    checkTodayIsHoliday,
    checkTodayEvent
}