const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'volume',
  description: 'Ses seviyesini ayarlar',
  voiceChannel: true,
  options: [
    {
      name: 'volume',
      description: 'Ses seviyesi',
      type: ApplicationCommandOptionType.Number,
      required: true,
      minValue: 1,
      maxValue: client.config.opt.maxVol
    }
  ],
  execute({ inter }) {
    const queue = player.getQueue(inter.guildId);

    if (!queue || !queue.playing) return inter.reply({
      content: 'şu anda herhangi bir müzik çalmıyor 😡',
      ephemeral: true
    });

    const vol = inter.options.getNumber('volume');

    if (queue.volume === vol) return inter.reply({
      content: `değiştirmek istedği ses seviyesi şu anda ses seviyesiyle aynı 😐`,
      ephemeral: true
    });

    const success = queue.setVolume(vol);

    return inter.reply({
      content: success ? `ses seviyesi %**${vol}**/**${client.config.opt.maxVol}** olarak değiştirildi 🔊` : 'bi\'şeyler ters gitti...'
    });
  },
};
