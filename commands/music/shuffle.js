module.exports = {
  name: 'shuffle',
  description: 'Müziği karışık çalar',
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

    await queue.shuffle();

    return inter.reply({
      content: `**${queue.tracks.length}** müzik karıştırıldı 👍🏻`,
    });
  },
};
