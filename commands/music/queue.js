module.exports = {
  name: 'queue',
  aliases: [],
  category: 'Music',
  utilisation: '{prefix}queue',
  execute(client, message) {
    if (!message.member.voice.channel) return message.reply('ses kanalında değilsin ki. nasıl müzik açmamı bekliyorsun? ☺️');

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`şu anda \`${message.member.voice.channel.name}\` kanalında müzik çalıyor. önce o kanala gitmelisin 😉`);

    const queue = client.player.getQueue(message);

    if (!client.player.getQueue(message)) return message.reply('şu anda herhangi bir müzik çalmıyor 😋');

    message.channel.send(`**Çalma listesi ${client.player.getQueue(message).loopMode ? '(döngüde)' : ''}**\nŞu anda çalan: ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
      return `**#${i + 1}** - ${track.title} | ${track.author} (çalınmasını isteyen: ${track.requestedBy.username})`
    }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `ve **${queue.tracks.length - 5}** diğer müzik listede` : `Çalma listesinde toplam **${queue.tracks.length}** müzik var.`}`));
  },
};
