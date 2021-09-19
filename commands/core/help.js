module.exports = {
  name: 'help',
  aliases: ['h'],
  category: 'Core',
  utilisation: '{prefix}help <komut adı>',
  execute(client, message, args) {
    if (!args[0]) {
      const general = message.client.commands.filter(x => x.category === 'General').map((x) => '`' + x.name + '`').join(', ');
      const music = message.client.commands.filter(x => x.category === 'Music').map((x) => '`' + x.name + '`').join(', ');

      message.channel.send({
        embed: {
          color: 'ORANGE',
          author: {
            name: 'Yardım paneli'
          },
          description: `Filtreleri kullanmak için, \`${client.config.discord.prefix}filter (filtre adı)\` yazmalısın. Örnek: \`${client.config.discord.prefix}filter bassboost\``,
          fields: [
            {
              name: 'Genel',
              value: general
            },
            {
              name: 'Müzik',
              value: music
            },
            {
              name: 'Filtreler',
              value: client.config.filters.map((x) => '`' + x + '`').join(', ')
            },
          ],
        },
      });
    } else {
      const command = message.client.commands.get(args.join(' ').toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(' ').toLowerCase()));

      if (!command) return message.channel.send(`böyle bir komut yok ki amk 🤔`);

      message.channel.send({
        embed: {
          color: 'ORANGE',
          author: {
            name: 'Yardım paneli'
          },
          description: 'Komutu nasıl kullanabileceğin ile ilgili bilgiler.\nZorunlu değişkenler `[]` ile, isteğe bağlı değişkenler `<>` ile gösteriliyor.',
          fields: [
            {
              name: 'Adı',
              value: command.name,
              inline: true
            },
            {
              name: 'Kategori',
              value: command.category,
              inline: true
            },
            {
              name: 'Benzer adlar',
              value: command.aliases.length < 1 ? 'Yok' : command.aliases.join(', '),
              inline: true
            },
            {
              name: 'Kullanım',
              value: command.utilisation.replace('{prefix}', client.config.discord.prefix),
              inline: true
            },
          ],
        }
      });
    }
  },
};
