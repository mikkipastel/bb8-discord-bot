const cron = require('node-cron');

const dotenv = require('dotenv');
dotenv.config();

const { Client, Intents, WebhookClient } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const calendar = require('./service/calendar');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

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

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('holiday').setDescription('Replies with 10 holiday date!')
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);
rest.put(Routes.applicationGuildCommands(process.env.BOT_CLIENT_ID, process.env.SERVER_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  
  const { commandName } = interaction;
      
  if (commandName === 'ping') {
    const timeTaken = Date.now() - interaction.createdTimestamp;
    await interaction.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (commandName === 'holiday') {
    await interaction.reply(await calendar.getHolidayList());
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
