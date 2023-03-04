const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'remove',
  description: 'Bir müziği sıradan kaldırır',
  voiceChannel: true,
  options: [
    {
      name: 'song',
      description: 'Kaldırmak istediğiniz parçanın adı/url\'si',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: 'number',
      description: 'Müziğin bulunduğu sıradaki yer',
      type: ApplicationCommandOptionType.Number,
      required: false,
    }
  ],
  async execute({ inter }) {
    const number = inter.options.getNumber('number')
    const track = inter.options.getString('song');

    const queue = player.getQueue(inter.guildId);

    if (!queue || !queue.playing) return inter.reply({
      content: 'şu anda herhangi bir müzik çalmıyor 😡',
      ephemeral: true
    });

    if (!track && !number) inter.reply({
      content: 'müziğe kaldırmak için seçeneklerden birini kullanmalısın 🤨',
      ephemeral: true
    });

    if (track) {
      for (let song of queue.tracks) {
        if (song.title === track || song.url === track) {
          queue.remove(song);
          return inter.reply({
            content: `${track} sıradan kaldırıldı 🤤`
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

      queue.remove(index);

      return inter.reply({
        content: `${trackname} sıradan kaldırıldı 🤤`
      });
    }
  },
};
