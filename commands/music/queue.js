const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'queue',
  description: 'Sıradaki müzikleri al',
  voiceChannel: true,
  execute({client, inter}) {
    const queue = player.getQueue(inter.guildId);

    if (!queue || !queue.playing) return inter.reply({
      content: 'şu anda herhangi bir müzik çalmıyor 😡',
      ephemeral: true
    });

    if (!queue.tracks[0]) return inter.reply({
      content: 'bu müzikten sonra oynatma listesinde başka müzik yok 😡',
      ephemeral: true
    });

    const methods = ['', '🔁', '🔂'];

    const songs = queue.tracks.length;

    const nextSongs = songs > 5 ? `**${songs - 5}** müzik daha ekle...` : `çalma listesinden **${songs}** şarkı...`;

    const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`);

    const embed = new EmbedBuilder()
      .setThumbnail(inter.guild.iconURL({size: 2048, dynamic: true}))
      .setAuthor({
        name: `Sunucu sırası - ${inter.guild.name} ${methods[queue.repeatMode]}`,
        iconURL: client.user.displayAvatarURL({size: 1024, dynamic: true})
      })
      .setDescription(`Şu anda ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

    inter.reply({
      embeds: [embed]
    });
  },
};
