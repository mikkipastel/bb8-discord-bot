const cron = require('node-cron');

const dotenv = require('dotenv');
dotenv.config();

const { Client, Intents, WebhookClient } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', async () => {
  console.log('Ready!');

  try {
    const webhook = new WebhookClient({ id: process.env.WEBHOOK_ID, token: process.env.WEBOOK_TOKEN });

    await cron.schedule('00 10 * * Mon-Fri', () => {
      console.log('Trigger standup meeting schedule');
      webhook.send('@everyone, standup meeting', {});
    });
    
  } catch (error) {
    console.error('Error trying to send a message: ', error);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
