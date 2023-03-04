module.exports = {
  name: 'resume',
  description: 'Müziği devam ettirir',
  voiceChannel: true,
  execute({ inter }) {
    const queue = player.getQueue(inter.guildId);

    if (!queue || !queue.playing) return inter.reply({
      content: 'şu anda herhangi bir müzik çalmıyor 😡',
      ephemeral: true
    });

    if (!queue.connection.paused) return inter.reply({
      content: 'müzik zaten çalıyor 🙄',
      ephemeral: true
    })

    const success = queue.setPaused(false);

    return inter.reply({
      content: success ? `${queue.current.title} devam ettirildi 😏` : 'bi\'şeyler ters gitti...'
    });
  },
};
