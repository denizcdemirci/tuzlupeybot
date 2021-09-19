module.exports = {
  name: 'volume',
  aliases: [],
  category: 'Music',
  utilisation: '{prefix}volume [1-100]',
  execute(client, message, args) {
    if (!message.member.voice.channel) return message.reply('ses kanalında değilsin ki. nasıl müzik açmamı bekliyorsun? ☺️');

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`şu anda \`${message.member.voice.channel.name}\` kanalında müzik çalıyor. önce o kanala gitmelisin 😉`);

    if (!client.player.getQueue(message)) return message.reply('şu anda herhangi bir müzik çalmıyor 😋');

    if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send('geçerli bir sayı gir amk 😡');

    if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send('lütfen 1 ile 100 arasında bir sayı gir 🤗');

    const success = client.player.setVolume(message, parseInt(args[0]));

    if (success) message.channel.send(`🔉 ses seviyesi **%${parseInt(args[0])}** olarak ayarlandı`);
  },
};
