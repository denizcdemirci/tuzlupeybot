const ms = require('ms');

module.exports = {
  name: 'ping',
  description: 'Butonun pingini ölçer',
  async execute({ client, inter }) {
    await inter.reply('Ping?');

    inter.editReply(`Pong! API Latency is ${Math.round(client.ws.ping)}ms 🛰️, Last heartbeat calculated ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago`);
  },
};
