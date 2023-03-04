const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'yardım',
  description: 'Botun komutlarını gösterir',
  showHelp: false,
  execute({ client, inter }) {
    const commands = client.commands.filter(command => command.showHelp !== false);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL({
          size: 1024,
          dynamic: true
        })
      })
      .setDescription('Kullanabileceğin tüm komutlar aşağıda listelenmiştir')
      .addFields([
        {
          name: `Toplam ${commands.size} komut mevcut`,
          value: commands.map(command => `\`${command.name}\``).join(' | ')
        }
      ]);

    inter.reply({
      embeds: [embed]
    });
  },
};
