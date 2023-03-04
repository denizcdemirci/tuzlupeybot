const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
  name: 'nowplaying',
  description: 'Şu an ne çalıyor?',
  voiceChannel: true,
  execute({ inter }) {
    const queue = player.getQueue(inter.guildId);

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
        iconURL: client.user.displayAvatarURL({size: 1024, dynamic: true})
      })
      .setThumbnail(track.thumbnail)
      .setDescription(`Ses seviyesi **${queue.volume}**%\nSüre **${trackDuration}**\nİlerleme ${progress}\nTekrar modu **${methods[queue.repeatMode]}**\n${track.requestedBy} tarafından talep edildi`)

    const volumeup = new ButtonBuilder()
      .setLabel('Sesi arttır')
      .setCustomId(JSON.stringify({
        ffb: 'volumeup'
      }))
      .setStyle('Primary');

    const volumedown = new ButtonBuilder()
      .setLabel('Sesi azalt')
      .setCustomId(JSON.stringify({
        ffb: 'volumedown'
      }))
      .setStyle('Primary');

    const loop = new ButtonBuilder()
      .setLabel('Tekrarla')
      .setCustomId(JSON.stringify({
        ffb: 'loop'
      }))
      .setStyle('Danger');

    const resumepause = new ButtonBuilder()
      .setLabel('Çal & Durdur')
      .setCustomId(JSON.stringify({
        ffb: 'resume&pause'
      }))
      .setStyle('Success');

    const row = new ActionRowBuilder().addComponents(volumedown, resumepause, loop, volumeup);

    inter.reply({
      embeds: [embed],
      components: [row]
    });
  },
};
