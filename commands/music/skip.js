module.exports = {
  name: 'skip',
  description: 'Bir sonraki müziğe geçer',
  voiceChannel: true,
  execute({ inter }) {
    const queue = player.getQueue(inter.guildId);

    if (!queue || !queue.playing) return inter.reply({
      content: 'şu anda herhangi bir müzik çalmıyor 😡',
      ephemeral: true
    });

    const success = queue.skip();

    return inter.reply({
      content: success ? `şu anki müzik ${queue.current.title} geçildi` : 'bi\'şeyler ters gitti...'
    });
  },
};
