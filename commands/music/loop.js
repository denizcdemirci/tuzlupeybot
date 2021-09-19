module.exports = {
  name: 'loop',
  aliases: ['lp', 'repeat'],
  category: 'Music',
  utilisation: '{prefix}loop',
  execute(client, message, args) {
    if (!message.member.voice.channel) return message.reply('ses kanalında değilsin ki. nasıl müzik açmamı bekliyorsun? ☺️');

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`şu anda \`${message.member.voice.channel.name}\` kanalında müzik çalıyor. önce o kanala gitmelisin 😉`);

    if (!client.player.getQueue(message)) return message.reply('şu anda herhangi bir müzik çalmıyor 😋');

    if (args.join(' ').toLowerCase() === 'queue') {
      if (client.player.getQueue(message).loopMode) {
        client.player.setLoopMode(message, false);
        return message.channel.send('tekrarlama modu devre dışı bırakldı 😮');
      } else {
        client.player.setLoopMode(message, true);
        return message.channel.send('🔁 tekrarlama modu etkinleştirildi. tüm sıra durmadan tekrarlanacak');
      }
    } else {
      if (client.player.getQueue(message).repeatMode) {
        client.player.setRepeatMode(message, false);
        return message.channel.send('tekrarlama modu devre dışı bırakldı 😮');
      } else {
        client.player.setRepeatMode(message, true);
        return message.channel.send('🔁 tekrarlama modu etkinleştirildi. tüm sıra durmadan tekrarlanacak');
      }
    }
  },
};
