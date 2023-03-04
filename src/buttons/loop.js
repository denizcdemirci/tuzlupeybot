const { QueueRepeatMode } = require('discord-player');

module.exports = async ({inter, queue}) => {
  const methods = ['disabled', 'track', 'queue'];

  if (!queue || !queue.playing) return inter.reply({
    content: 'şu anda herhangi bir müzik çalmıyor 😡',
    ephemeral: true
  });

  const repeatMode = queue.repeatMode;

  if (repeatMode === 0) queue.setRepeatMode(QueueRepeatMode.TRACK);

  if (repeatMode === 1) queue.setRepeatMode(QueueRepeatMode.QUEUE);

  if (repeatMode === 2) queue.setRepeatMode(QueueRepeatMode.OFF);

  return inter.reply({
    content: `tekrar modu **${methods[queue.repeatMode]}** olarak ayarlandı 🤯`
  });
};
