const cron = require('node-cron');

const dotenv = require('dotenv');
dotenv.config();

const { Client, Intents, WebhookClient } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const calendar = require('./service/calendar');

client.once('ready', async () => {
  console.log('Ready!');

  try {
    const webhook = new WebhookClient({ id: process.env.WEBHOOK_ID, token: process.env.WEBHOOK_TOKEN });

    await cron.schedule('00 10 * * Mon-Fri', async () => {
      calendar.checkTodayIsHoliday(webhook);
      calendar.checkTodayEvent(webhook);
    });

  } catch (error) {
    console.error('Error trying to send a message: ', error);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
