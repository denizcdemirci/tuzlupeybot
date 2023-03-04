const { ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
  name: 'play',
  description: 'Müziği başlatır',
  voiceChannel: true,
  options: [
    {
      name: 'song',
      description: 'Çalmak istediğin müzik',
      type: ApplicationCommandOptionType.String,
      required: true,
    }
  ],
  async execute({ inter }) {
    await inter.deferReply();
    const song = inter.options.getString('song');
    const res = await player.search(song, {
      requestedBy: inter.member,
      searchEngine: QueryType.AUTO
    });

    if (!res || !res.tracks.length) return inter.editReply({
      content: 'herhangi bir müzik bulamadım 🙄',
      ephemeral: true
    });

    const queue = await player.createQueue(inter.guild, {
      metadata: inter.channel,
      spotifyBridge: client.config.opt.spotifyBridge,
      initialVolume: client.config.opt.defaultvolume,
      leaveOnEnd: client.config.opt.leaveOnEnd
    });

    try {
      if (!queue.connection) await queue.connect(inter.member.voice.channel);
    } catch {
      await player.deleteQueue(inter.guildId);

      return inter.editReply({
        content: 'ses kanalına katılamıyorum 😔',
        ephemeral: true
      });
    }

    await inter.editReply({
      content: `istediğin ${res.playlist ? 'çalma listesi' : 'müzik'} yükleniyor 🤩`
    });

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};
