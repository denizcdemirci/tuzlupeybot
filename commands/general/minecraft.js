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
      serverStatus = '🟡 Hazırlanıyor';
    } else {
      serverStatus = '🔴 Offline';
    }

    const embed = new EmbedBuilder()
      .setTitle('Tuzlu MC')
      .addFields(
        {
          name: 'Adres',
          value: '`mc.tuzlu.games`',
        },
        {
          name: 'Sunucu Durumu',
          value: serverStatus,
          inline: true
        },
        {
          name: 'Sürüm',
          value: server.software.version,
          inline: true
        },
        {
          name: 'Kişi Sayısı',
          value: `${server.players.count}/${server.players.max}`,
          inline: true
        },
        {
          name: 'Çevrimiçi Oyuncular',
          value: `${server.players.list.length > 0 ? server.players.list.join(', ') : '😔 Kimse yok'}`,
        },
      )
      .setColor('#ffaa00');

    inter.reply({
      embeds: [embed]
    });
  },
};
