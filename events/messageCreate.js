module.exports = (client, message) => {
  if (message.author.bot || message.channel.type === 'dm') return;

  if (client.config.islamicGreetings.some((text) => text === message.content.toLowerCase())) {
    message.react('🕌');
    message.reply('cami mi lan burası orospu çocuğu').then(botMessage => {
      botMessage.delete({
        timeout: client.config.app.replyTimeout
      })
    });
  }

  if (message.content.split(/ +/g).some((text) => client.config.rizaNicknames.some((nickname) => text === nickname))) {
    message.react('743900789717598308');
  }
};
