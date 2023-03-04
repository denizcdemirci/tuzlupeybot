module.exports = {
  name: 'pause',
  description: 'Müziği duraklat',
  voiceChannel: true,
  execute({ inter }) {
    const queue = player.getQueue(inter.guildId);

    if (!queue || !queue.playing) return inter.reply({
      content: 'şu anda herhangi bir müzik çalmıyor 😡',
      ephemeral: true
    });

    if (queue.connection.paused) return inter.reply({
      content: 'müzik zaten duraklatılmış 🙄',
      ephemeral: true
    })

    const success = queue.setPaused(true);

    return inter.reply({
      content: success ? `şu anki müzik ${queue.current.title} duraklantıldı 😋` : 'bi\'şeyler ters gitti...'
    });
  },
};
