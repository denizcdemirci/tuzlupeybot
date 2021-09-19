module.exports = {
  name: 'resume',
  aliases: [],
  category: 'Music',
  utilisation: '{prefix}resume',
  execute(client, message) {
    if (!message.member.voice.channel) return message.reply('ses kanalında değilsin ki. nasıl müzik açmamı bekliyorsun? ☺️');

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`şu anda \`${message.member.voice.channel.name}\` kanalında müzik çalıyor. önce o kanala gitmelisin 😉`);

    if (!client.player.getQueue(message)) return message.reply('şu anda herhangi bir müzik çalmıyor 😋');

    if (!client.player.getQueue(message).paused) return message.reply('müzik zaten çalıyor 🙄');

    const success = client.player.resume(message);

    if (success) message.channel.send(`\`${client.player.getQueue(message).playing.title}\` devam ettirildi 😏`);
  },
};
