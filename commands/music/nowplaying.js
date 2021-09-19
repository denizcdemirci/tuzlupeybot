module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  category: 'Music',
  utilisation: '{prefix}nowplaying',
  execute(client, message) {
    if (!message.member.voice.channel) return message.reply('ses kanalında değilsin ki. nasıl müzik açmamı bekliyorsun? ☺️');

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`şu anda \`${message.member.voice.channel.name}\` kanalında müzik çalıyor. önce o kanala gitmelisin 😉`);

    if (!client.player.getQueue(message)) return message.reply('şu anda herhangi bir müzik çalmıyor 😋');

    const track = client.player.nowPlaying(message);
    const filters = [];

    Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

    message.channel.send({
      embed: {
        color: 'RED',
        author: {
          name: track.title
        },
        fields: [
          {
            name: 'Kanal',
            value: track.author,
            inline: true
          },
          {
            name: 'Çalınmasını isteyen',
            value: track.requestedBy.username,
            inline: true
          },
          {
            name: 'Oynatma listesinden',
            value: track.fromPlaylist ? 'Evet' : 'Hayır',
            inline: true
          },
          {
            name: 'Görüntüleme',
            value: track.views,
            inline: true
          },
          {
            name: 'Süre',
            value: track.duration,
            inline: true
          },
          {
            name: 'Aktif filtreler',
            value: filters.length + '/' + client.config.filters.length,
            inline: true
          },
          {
            name: 'Ses seviyesi',
            value: client.player.getQueue(message).volume,
            inline: true
          },
          {
            name: 'Tekrar modu',
            value: client.player.getQueue(message).repeatMode ? 'Aktif' : 'Devre dışı',
            inline: true
          },
          {
            name: 'Durduruldu',
            value: client.player.getQueue(message).paused ? 'Evet' : 'Hayır',
            inline: true
          },
          {
            name: 'İlerleme çubuğu',
            value: client.player.createProgressBar(message, {
              timecodes: true
            }),
            inline: true
          }
        ],
        thumbnail: {
          url: track.thumbnail
        },
      },
    });
  },
};
