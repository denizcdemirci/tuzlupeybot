const { ApplicationCommandOptionType } = require('discord.js');
const { AudioFilters } = require('discord-player');

module.exports = {
  name: 'filter',
  description: 'Müziğe filtre uygular',
  voiceChannel: true,
  options: [
    {
      name: 'filter',
      description: 'Eklemek istediğiniz filtre',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [...Object.keys(AudioFilters.filters).map((filter) => Object({
        name: filter,
        value: filter
      })).splice(0, 25)],
    }
  ],
  async execute({ inter }) {
    const queue = player.getQueue(inter.guildId);

    if (!queue || !queue.playing) return inter.reply({
      content: 'şu anda herhangi bir müzik çalmıyor 😡',
      ephemeral: true
    });

    const actualFilter = queue.getFiltersEnabled()[0];

    const infilter = inter.options.getString('filter');

    const filters = [];

    queue.getFiltersEnabled().map(x => filters.push(x));
    queue.getFiltersDisabled().map(x => filters.push(x));

    const filter = filters.find((x) => x.toLowerCase() === infilter.toLowerCase());

    if (!filter) return inter.reply({
      content: `böyle bir filtre yok ki amk 😡\n${actualFilter ? `şu anda etki filtre ${actualFilter}.\n` : ''}mevcut filtrelerin listesi ${filters.map((filter) => `**${filter}**`).join(', ')}.`,
      ephemeral: true
    });

    const filtersUpdated = {};

    filtersUpdated[filter] = !queue.getFiltersEnabled().includes(filter);

    await queue.setFilters(filtersUpdated);

    inter.reply({
      content: `${filter} filtresi artık **${queue.getFiltersEnabled().includes(filter) ? 'etkin' : 'devre dışı'}** ✅\n*not: müzik ne kadar uzunsa filtreyi ${queue.getFiltersEnabled().includes(filter) ? 'eklemem' : 'kaldırmam'} o kadar uzun sürecek 🥲*`
    });
  },
};
