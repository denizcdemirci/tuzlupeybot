module.exports = {
  name: 'filter',
  aliases: [],
  category: 'Music',
  utilisation: '{prefix}filter [filter name]',
  execute(client, message, args) {
    if (!message.member.voice.channel) return message.reply('ses kanalında değilsin ki. nasıl müzik açmamı bekliyorsun? ☺️');

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`şu anda \`${message.member.voice.channel.name}\` kanalında müzik çalıyor. önce o kanala gitmelisin 😉`);

    if (!client.player.getQueue(message)) return message.reply('şu anda herhangi bir müzik çalmıyor 😋');

    if (!args[0]) return message.reply('lütfen etkinleştirmek veya devre dışı bırakmak istediğin geçerli bir filtre söyle 😬');

    const filterToUpdate = client.config.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

    if (!filterToUpdate) return message.reply('böyle bir filtre yok ki amk 😡 bir de şunları dene: `bassboost`, `vibrato`, `vaporwave`');

    const filtersUpdated = {};

    filtersUpdated[filterToUpdate] = !client.player.getQueue(message).filters[filterToUpdate];

    client.player.setFilters(message, filtersUpdated);

    if (filtersUpdated[filterToUpdate]) message.reply('müziğe filtre ekliyorum, lütfen bekle. not: müzik ne kadar uzunsa filtre eklemem o kadar uzun sürecek 🥲');
    else message.reply('müzikteki filtreyi kaldırıyorum, lütfen bekle. not: müzik ne kadar uzunsa filtreyi kaldırmam o kadar uzun sürecek 🥲');
  },
};
