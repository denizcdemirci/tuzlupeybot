module.exports = (client, message) => {
  if (message.author.bot || message.channel.type === 'dm') return;

  if (client.config.islamicGreetings.some((text) => text === message.content.toLowerCase())) {
    message.react('🕌');
    message.reply('cami mi lan burası orospu çocuğu').then(botMessage => {
      botMessage.delete({
        timeout: client.config.discord.replyTimeout
      })
    });
  }

  if (message.content.split(/ +/g).some((text) => client.config.rizaNicknames.some((nickname) => text === nickname))) {
    message.react('743900789717598308');
  }

  const prefix = client.config.discord.prefix;

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

  if (cmd) cmd.execute(client, message, args);
};
