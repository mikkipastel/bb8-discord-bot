# bb8-discord-bot

Chatbot for alert team to standup meeting in Discord by webhook from text channel.

## Setup
Install all library to use in this project
```
npm install
```

## Prepare
I keep some key in `.env` file then you create key to use after folk or clone this project
- `process.env.WEBHOOK_ID` You can get it from webhook url from text channel webhook.
- `process.env.WEBHOOK_TOKEN` You can get it from webhook url from text channel webhook.
- `process.env.DISCORD_BOT_TOKEN` Create your bot in Discord Developer.
- `process.env.CALENDAR_HOLIDAY_IN_BNAGKOK_ID` This is calendar default for holiday in Thailand.
- `process.env.CALENDAR_YAVIN_TEAM` This is my team calendar, you can change this to your.
- `process.env.GOOGLE_API_KEY` Your API Key from Google Application.
- `process.env.ROLE_ID` for get tag another role without `@everyone` (optional)

### Features
[x] alert team to standup meeting
[-] check holiday from calendar