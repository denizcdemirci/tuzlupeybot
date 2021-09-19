module.exports = {
  name: 'skip',
  aliases: ['sk'],
  category: 'Music',
  utilisation: '{prefix}skip',
  execute(client, message) {
    if (!message.member.voice.channel) return message.reply('ses kanalında değilsin ki. nasıl müzik açmamı bekliyorsun? ☺️');

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`şu anda \`${message.member.voice.channel.name}\` kanalında müzik çalıyor. önce o kanala gitmelisin 😉`);

    if (!client.player.getQueue(message)) return message.reply('şu anda herhangi bir müzik çalmıyor 😋');

    const success = client.player.skip(message);

    if (success) message.channel.send('sıradaki müziğe geçtim 😎');
  },
};
