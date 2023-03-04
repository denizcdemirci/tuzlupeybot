const { ApplicationCommandOptionType, ActivityType } = require('discord.js');

module.exports = {
  name: 'aktivite',
  description: 'Botun yapmasını istediğin aktiviteyi belirler',
  options: [
    {
      name: 'neyapıyor',
      description: 'Hangi aktiviteyi yapacak',
      type: ApplicationCommandOptionType.Number,
      required: true,
      choices: [
        {
          name: 'oynuyor',
          value: ActivityType.Playing
        },
        {
          name: 'yayınlıyor',
          value: ActivityType.Streaming
        },
        {
          name: 'dinliyor',
          value: ActivityType.Listening
        },
        {
          name: 'izliyor',
          value: ActivityType.Watching
        },
        {
          name: 'yarışıyor',
          value: ActivityType.Competing
        },
      ],
    },
    {
      name: 'yaptığışey',
      description: 'Botun yaptığı aktivitenin ne olduğu',
      type: ApplicationCommandOptionType.String,
      required: true,
    }
  ],
  execute({ client, inter }) {
    client.user.setPresence({
      activities: [
        {
          name: inter.options.getString('yaptığışey'),
          type: inter.options.getNumber('neyapıyor')
        }
      ],
    });

    inter.reply({
      content: 'tabi efendim',
      ephemeral: true
    });
  },
};
