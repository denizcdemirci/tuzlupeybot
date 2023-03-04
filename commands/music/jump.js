const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'jump',
  description: 'Sıradaki belirli bir müziğe atlar',
  voiceChannel: true,
  options: [
    {
      name: 'song',
      description: 'Atlamak istediğiniz müziğin adı/url\'si',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: 'number',
      description: 'Müziğin bulunduğu sıradaki yeri',
      type: ApplicationCommandOptionType.Number,
      required: false,
    }
  ],
  async execute({ inter }) {
    const track = inter.options.getString('song');
    const number = inter.options.getNumber('number')

    const queue = player.getQueue(inter.guildId);

    if (!queue || !queue.playing) return inter.reply({
      content: 'şu anda herhangi bir müzik çalmıyor 😡',
      ephemeral: true
    });

    if (!track && !number) inter.reply({
      content: 'müziğe atlamak için seçeneklerden birini kullanmalısın 🤨',
      ephemeral: true
    });

    if (track) {
      for (let song of queue.tracks) {
        if (song.title === track || song.url === track) {
          queue.skipTo(song)
          return inter.reply({
            content: `${track} müziğine atlandı 🫡`
          });
        }
      }

      return inter.reply({
        content: 'böyle bir müzik yok ki amk 😡 müzik url\'sini veya müziğin tam adını kullanmayı dene',
        ephemeral: true
      });
    }

    if (number) {
      const index = number - 1;
      const trackname = queue.tracks[index].title;

      if (!trackname) return inter.reply({
        content: 'böyle bir müzik yok ki amk 😡',
        ephemeral: true
      });

      queue.skipTo(index);

      return inter.reply({
        content: `${trackname} müziğine atlandı 🫡`
      });
    }
  },
};
