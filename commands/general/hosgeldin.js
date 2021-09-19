module.exports = {
  name: 'hoşgeldin',
  aliases: ['hosgeldin'],
  category: 'General',
  utilisation: '{prefix}hoşgeldin',
  execute(client, message) {
    if (message.member.voice.channel) {
      message.member.voice.channel.join();
    } else {
      return message.reply('ses kanalında değilsin ki amk').then(botMessage => {
        botMessage.delete({
          timeout: client.config.discord.replyTimeout
        })
      });
    }
  },
};
