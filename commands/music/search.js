module.exports = {
  name: 'search',
  aliases: ['sr'],
  category: 'Music',
  utilisation: '{prefix}search [name/URL]',
  execute(client, message, args) {
    if (!message.member.voice.channel) return message.reply('ses kanalında değilsin ki. nasıl müzik açmamı bekliyorsun? ☺️');

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`şu anda \`${message.member.voice.channel.name}\` kanalında müzik çalıyor. önce o kanala gitmelisin 😉`);

    if (!args[0]) return message.reply('açmaını istediğin müziğin adını söylemelisin ki o müziği açabileyim 😒');

    client.player.play(message, args.join(' '));
  },
};
