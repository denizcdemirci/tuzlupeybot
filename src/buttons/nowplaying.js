const { EmbedBuilder } = require('discord.js');

module.exports = async ({client, inter, queue}) => {
  if (!queue || !queue.playing) return inter.reply({
    content: 'şu anda herhangi bir müzik çalmıyor 😡',
    ephemeral: true
  });

  const track = queue.current;

  const methods = ['disabled', 'track', 'queue'];

  const timestamp = queue.getPlayerTimestamp();

  const trackDuration = timestamp.progress === 'Infinity' ? 'sonsuz (canlı)' : track.duration;

  const progress = queue.createProgressBar();

  const embed = new EmbedBuilder()
    .setAuthor({
      name: track.title,
      iconURL: client.user.displayAvatarURL({
        size: 1024,
        dynamic: true
      }),
    })
    .setThumbnail(track.thumbnail)
    .setDescription(`Ses seviyesi **%${queue.volume}**\nSüre **${trackDuration}**\nİlerleme ${progress}\nTekrar modu **${methods[queue.repeatMode]}**\n${track.requestedBy} tarafından talep edildi`)

  inter.reply({
    embeds: [embed],
    ephemeral: true
  });
}
