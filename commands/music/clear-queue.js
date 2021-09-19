module.exports = {
  name: 'clear-queue',
  aliases: ['cq'],
  category: 'Music',
  utilisation: '{prefix}clear-queue',
  execute(client, message) {
    if (!message.member.voice.channel) return message.reply('ses kanalında değilsin ki. nasıl müzik açmamı bekliyorsun? ☺️');

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`şu anda \`${message.member.voice.channel.name}\` kanalında müzik çalıyor. önce o kanala gitmelisin 😉`);

    if (!client.player.getQueue(message)) return message.reply('şu anda herhangi bir müzik çalmıyor 😋');

    if (client.player.getQueue(message).tracks.length <= 1) return message.reply('sırada sadece bir müzik var 😘');

    client.player.clearQueue(message);

    message.channel.send('sıra silindi 🎉');
  },
};
