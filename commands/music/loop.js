const { ApplicationCommandOptionType } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
  name: 'loop',
  description: 'Müziğin veya tüm kuyruğun tekrara alınmasını etkinleştirin veya devre dışı bırakın',
  voiceChannel: true,
  options: [
    {
      name: 'action',
      description: 'Tekrarda gerçekleştirmek istediğin eylem',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: 'Etkinleştir',
          value: 'enable_loop_queue'
        },
        {
          name: 'Devredışı',
          value: 'disable_loop'
        },
        {
          name: 'Müzik',
          value: 'enable_loop_song'
        },
      ],
    }
  ],
  execute({ inter }) {
    const queue = player.getQueue(inter.guildId);

    if (!queue || !queue.playing) return inter.reply({
      content: 'şu anda herhangi bir müzik çalmıyor 😡',
      ephemeral: true
    });

    switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
      case 'enable_loop_queue': {
        if (queue.repeatMode === 1) return inter.reply({
          content: 'önce tekrar modunda mevcut müziği devre dışı bırakmalısın (/loop Devredışı)',
          ephemeral: true
        });

        const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);

        return inter.reply({
          content: success ? 'tekrar modu **etkin** tüm sıra sonsuza kadar tekrarlanacak 🤯' : 'bi\'şeyler ters gitti...'
        });
        break
      }
      case 'disable_loop': {
        const success = queue.setRepeatMode(QueueRepeatMode.OFF);

        return inter.reply({
          content: success ? `tekrar modu **devre dışı**` : 'bi\'şeyler ters gitti...'
        });
        break
      }
      case 'enable_loop_song': {
        if (queue.repeatMode === 2) return inter.reply({
          content: 'önce tekrar modunda mevcut müziği devre dışı bırakmalısın (/loop Devredışı)',
          ephemeral: true
        });

        const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

        return inter.reply({
          content: success ? `tekrar modu **etkin** tüm sıra sonsuza kadar tekrarlanacak 🤯 (/loop Devredışı ile döngüyü sonlandırabilirsin)` : 'bi\'şeyler ters gitti...'
        });
        break
      }
    }
  },
};
