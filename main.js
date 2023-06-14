const { Client, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');
const { Client: ExarotonClient } = require('exaroton');

global.client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ],
  disableMentions: 'everyone',
});

client.config = require('./config');

global.player = new Player(client, client.config.opt.discordPlayer);

global.exarotonClient = new ExarotonClient(process.env.EXAROTON_TOKEN);

require('./src/loader');
require('./src/events');

client.login(process.env.DC_TOKEN);
