const { ApplicationCommandOptionType } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'seek',
  description: 'Bir müzikte ileri veya geri atlar',
  voiceChannel: true,
  options: [
    {
      name: 'time',
      description: 'Atlamak istediğin zaman',
      type: ApplicationCommandOptionType.String,
      required: true,
    }
  ],
  async execute({ inter }) {
    const queue = player.getQueue(inter.guildId);

    if (!queue || !queue.playing) return inter.reply({
      content: 'şu anda herhangi bir müzik çalmıyor 😡',
      ephemeral: true
    });

    const timeToMS = ms(inter.options.getString('time'));

    if (timeToMS >= queue.current.durationMS) return inter.reply({
      content: `belirtilen süre, geçerli müziğin toplam süresinden daha uzun 😨 ❌\n5s, 10s, 20 seconds, 1m gibi geçerli bir süre deneyin 🤙🏻`,
      ephemeral: true
    });

    await queue.seek(timeToMS);

    inter.reply({
      content: `geçerli müzikte ayarlanan süre **${ms(timeToMS, { long: true })}** 🤙🏻`
    });
  },
};
