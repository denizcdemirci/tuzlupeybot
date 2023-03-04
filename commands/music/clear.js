module.exports = {
  name: 'clear',
  description: 'Oynatma listesindeki tüm müzikleri siler',
  voiceChannel: true,
  async execute({ inter }) {
    const queue = player.getQueue(inter.guildId);

    if (!queue || !queue.playing) return inter.reply({
      content: 'şu anda herhangi bir müzik çalmıyor 😡',
      ephemeral: true
    });

    if (!queue.tracks[0]) return inter.reply({
      content: 'bu müzikten sonra oynatma listesinde başka müzik yok 😡',
      ephemeral: true
    });

    await queue.clear();

    inter.reply('oynatma listesi temizlendi 🗑️');
  },
};
