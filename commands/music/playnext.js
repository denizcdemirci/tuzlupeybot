const { ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
  name: 'playnext',
  description: 'Sırada çalmak istediğin müziği kuyruğa ekler',
  voiceChannel: true,
  options: [
    {
      name: 'song',
      description: 'Sıradaki çalmak istediğin müzik',
      type: ApplicationCommandOptionType.String,
      required: true,
    }
  ],
  async execute({ inter }) {
    await inter.deferReply();
    const queue = player.getQueue(inter.guildId);

    if (!queue || !queue.playing) return inter.reply({
      content: 'şu anda herhangi bir müzik çalmıyor 😡',
      ephemeral: true
    });

    const song = inter.options.getString('song');

    const res = await player.search(song, {
      requestedBy: inter.member,
      searchEngine: QueryType.AUTO
    });

    if (!res || !res.tracks.length) return inter.editReply({
      content: 'herhangi bir sonuç bulunamadı 🤨',
      ephemeral: true
    });

    if (res.playlist) return inter.editReply({
      content: 'bu komut oynatma listelerini desteklemiyor 😊',
      ephemeral: true
    });

    queue.insert(res.tracks[0], 0);

    await inter.editReply({
      content: 'müzik kuyruğa eklendi, sırada o çalacak 🥳',
    });
  },
};
