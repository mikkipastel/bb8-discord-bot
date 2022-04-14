const axios = require('axios').default;

function getGoogleCalendarApiPath(calendarId) {
    return 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events';
}

function checkTodayIsHoliday(webhook) {
    let minNow = new Date();
    minNow.setHours(7, 0, 0, 0);
    const timeMin = minNow.toISOString();

    let maxNow = new Date();
    maxNow.setDate(maxNow.getDate() + 1);
    maxNow.setHours(7, 0, -1, 0);
    const timeMax = (new Date(maxNow)).toISOString();

    axios.get(
        getGoogleCalendarApiPath(process.env.CALENDAR_HOLIDAY_IN_BNAGKOK_ID),
        {
            params: {
                orderBy: 'startTime',
                singleEvents: true,
                key: process.env.GOOGLE_API_KEY,
                timeMin: timeMin,
                timeMax: timeMax,
                maxResults: 1
            }
        }
    ).then(function (response) {
        const nowDate = timeMin.split('T')[0];
        if (response.data.items.length > 0 && nowDate == response.data.items[0].start.date) {
            //todo: return embedded message
            const printText = 'วันนี้เป็น' + response.data.items[0].summary
            console.log(printText);
            webhook.send(printText, {});
            true;
        } else {
            console.log('Today is not Holiday');
            webhook.send('@everyone, standup meeting', {});
            false;
        }
    }).catch(function (error) {
        console.log(error);
    });
}

function checkTodayEvent(webhook) {
    const nowDateTime = (new Date()).toISOString();

    return axios.get(
        getGoogleCalendarApiPath(process.env.CALENDAR_YAVIN_TEAM),
        {
            params: {
                orderBy: 'startTime',
                singleEvents: true,
                key: process.env.GOOGLE_API_KEY,
                timeMin: nowDateTime
            }
        }
    ).then(function (response) {
        console.log(response.data.items);
        if (response.data.items.length > 0) {
            var printText = "";
            console.log(response.data.items);
            response.data.items.forEach(function (item, index) {
                //todo: return embedded message
                printText += item.start.date + ' - ' + item.end.date + ' : ' + item.summary;
                if (index < response.data.items.length - 1) {
                    printText += '\n';
                }
            });
            console.log(printText);
            webhook.send(printText, {});
        }
    }).catch(function (error) {
        console.log(error);
    });
}

module.exports = {
    checkTodayIsHoliday,
    checkTodayEvent
}