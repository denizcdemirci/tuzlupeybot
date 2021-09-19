module.exports = {
  name: 'w-filters',
  aliases: ['filters'],
  category: 'Music',
  utilisation: '{prefix}w-filters',
  execute(client, message) {
    if (!message.member.voice.channel) return message.reply('ses kanalında değilsin ki. nasıl müzik açmamı bekliyorsun? ☺️');

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`şu anda \`${message.member.voice.channel.name}\` kanalında müzik çalıyor. önce o kanala gitmelisin 😉`);

    if (!client.player.getQueue(message)) return message.reply('şu anda herhangi bir müzik çalmıyor 😋');

    const filtersStatuses = [[], []];

    client.config.filters.forEach((filterName) => {
      const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
      array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + ' : ' + (client.player.getQueue(message).filters[filterName] ? '✅' : '❌'));
    });

    message.channel.send({
      embed: {
        color: 'ORANGE',
        fields: [
          {
            name: 'Filtreler',
            value: filtersStatuses[0].join('\n'),
            inline: true
          },
          {
            name: '** **',
            value: filtersStatuses[1].join('\n'),
            inline: true
          },
        ],
        description: `İşte etkinleştirilen veya devre dışı bırakılan tüm filtrelerin listesi.\nŞarkıya filtre eklemek için \`${client.config.discord.prefix}filter\` komutunu kullan.`,
      },
    });
  },
};
