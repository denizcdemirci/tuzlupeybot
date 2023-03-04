module.exports = {
  name: 'stop',
  description: 'Müziği durdurur',
  voiceChannel: true,
  execute({ inter }) {
    const queue = player.getQueue(inter.guildId);

    if (!queue || !queue.playing) return inter.reply({
      content: 'şu anda herhangi bir müzik çalmıyor 😡',
      ephemeral: true
    });

    queue.destroy();

    inter.reply({
      content: 'müzik durduruldu 😨'
    });
  },
};
