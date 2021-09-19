module.exports = {
  name: 'play',
  aliases: ['p'],
  category: 'Music',
  utilisation: '{prefix}play [name/URL]',
  execute(client, message, args) {
    if (!message.member.voice.channel) return message.reply('ses kanalında değilsin ki. nasıl müzik açmamı bekliyorsun? ☺️');

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`şu anda \`${message.member.voice.channel.name}\` kanalında müzik çalıyor. önce o kanala gitmelisin 😉`);

    if (!args[0]) return message.reply('aramamı istediğin müziğin adını söylemelisin ki o müziği arayabileyim 😖');

    client.player.play(message, args.join(' '), {
      firstResult: true
    });
  },
};
