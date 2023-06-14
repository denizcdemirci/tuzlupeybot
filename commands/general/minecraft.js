const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'minecraft',
  description: 'Tuzlu MC sunucusu hakkında bilgi verir',
  async execute({ inter }) {
    let server = exarotonClient.server(process.env.EXAROTON_SERVER_ID);

    await server.get();

    let serverStatus = null;

    if (server.hasStatus(server.STATUS.ONLINE)) {
      serverStatus = '🟢 Online';
    } else if (server.hasStatus([server.STATUS.PREPARING, server.STATUS.LOADING, server.STATUS.STARTING])) {
      serverStatus = '🟡 Başlatılıyor';
    } else {
      serverStatus = '🔴 Offline';
    }

    const embed = new EmbedBuilder()
      .setAuthor({
        name: 'Tuzlu MC',
        iconURL: 'https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/apple-icon-114x114.png',
      })
      .addFields(
        {
          name: 'Adres',
          value: '> `mc.tuzlu.games`',
        },
        {
          name: 'Sürüm',
          value: server.software.version.split(' ')[0],
          inline: true
        },
        {
          name: 'Sunucu Durumu',
          value: serverStatus,
          inline: true
        },
        {
          name: `Çevrimiçi Oyuncular (${server.players.count}/${server.players.max})`,
          value: `${server.players.list.length > 0 ? server.players.list.join(', ') : '😔 Kimse yok'}`,
        },
      )
      .setColor('#ffaa00');

    inter.reply({
      embeds: [embed]
    });
  },
};
