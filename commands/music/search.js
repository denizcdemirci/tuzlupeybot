const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
  name: 'search',
  description: 'Müzik aratır ve seçim yapmanızı sağlar',
  voiceChannel: true,
  options: [
    {
      name: 'song',
      description: 'Aramak istediğin müzik',
      type: ApplicationCommandOptionType.String,
      required: true,
    }
  ],
  async execute({ client, inter }) {
    const song = inter.options.getString('song');

    const res = await player.search(song, {
      requestedBy: inter.member,
      searchEngine: QueryType.AUTO
    });

    if (!res || !res.tracks.length) return inter.reply({
      content: 'herhangi bir sonuç bulunamadı 🤨',
      ephemeral: true
    });

    const queue = await player.createQueue(inter.guild, {
      metadata: inter.channel,
      leaveOnEnd: client.config.opt.leaveOnEnd,
    });

    const maxTracks = res.tracks.slice(0, 10);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${song} için sonuçlar`,
        iconURL: client.user.displayAvatarURL({
          size: 1024,
          dynamic: true
        })
      })
      .setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\n**1** ile **${maxTracks.length}** arasında seçim yap veya **iptal** yaz`);

    inter.reply({
      embeds: [embed]
    });

    const collector = inter.channel.createMessageCollector({
      time: 15000,
      max: 1,
      errors: ['time'],
      filter: m => m.author.id === inter.member.id
    });

    collector.on('collect', async (query) => {
      if (query.content.toLowerCase() === 'iptal') return inter.followUp({
        content: 'arama iptal edildi 🥲',
        ephemeral: true
      }), collector.stop();

      const value = parseInt(query);
      if (!value || value <= 0 || value > maxTracks.length) return inter.followUp({
        content: `geçersiz cevap, **1** ile **${maxTracks.length}** arasında seçim yapmayı dene veya **iptal** yaz`,
        ephemeral: true
      });

      collector.stop();

      try {
        if (!queue.connection) await queue.connect(inter.member.voice.channel);
      } catch {
        await player.deleteQueue(inter.guildId);

        return inter.followUp({
          content: 'ses kanalına katılamıyorum 😔',
          ephemeral: true
        });
      }

      await inter.followUp('aradığın şey yükleniyor ⏳');

      queue.addTrack(res.tracks[query.content - 1]);

      if (!queue.playing) await queue.play();
    });

    collector.on('end', (msg, reason) => {
      if (reason === 'time') return inter.followUp({
        content: 'arama zaman aşımına uğradı 🥲',
        ephemeral: true
      })
    });
  },
};
