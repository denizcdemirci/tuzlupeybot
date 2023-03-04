const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'yaz',
  description: 'Bot sizin yerinize yazar',
  options: [
    {
      name: 'mesaj',
      description: 'Botun yazacağı mesaj',
      type: ApplicationCommandOptionType.String,
      required: true,
    }
  ],
  execute({ inter }) {
    inter.reply({
      content: 'yazdım',
      ephemeral: true
    });

    inter.channel.send(inter.options.getString('mesaj'));
  },
};
