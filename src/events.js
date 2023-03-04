const {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ActivityType
} = require('discord.js');

player.on('error', (queue, error) => {
  console.log(`bi'şeyler ters gitti... ${error.message}`);
});

player.on('connectionError', (queue, error) => {
  console.log(`ses kanalına katılamıyorum... ${error.message}`);
});

player.on('trackStart', (queue, track) => {
  if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;

  const embed = new EmbedBuilder()
    .setAuthor({
      name: `🎶 şu anda ${queue.connection.channel.name} kanalında ${track.title} çalıyor 🥳`,
      iconURL: track.requestedBy.avatarURL()
    })
    .setColor('#13f857');

  const back = new ButtonBuilder()
    .setLabel('Önceki')
    .setCustomId(JSON.stringify({
      ffb: 'back'
    }))
    .setStyle('Primary');

  const skip = new ButtonBuilder()
    .setLabel('Sonraki')
    .setCustomId(JSON.stringify({
      ffb: 'skip'
    }))
    .setStyle('Primary');

  const resumepause = new ButtonBuilder()
    .setLabel('Çal & Durdur')
    .setCustomId(JSON.stringify({
      ffb: 'resume&pause'
    }))
    .setStyle('Danger');

  const loop = new ButtonBuilder()
    .setLabel('Tekrarla')
    .setCustomId(JSON.stringify({
      ffb: 'loop'
    }))
    .setStyle('Secondary');

  const queuebutton = new ButtonBuilder()
    .setLabel('Sıra')
    .setCustomId(JSON.stringify({
      ffb: 'queue'
    }))
    .setStyle('Secondary');

  const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, queuebutton, skip);

  queue.metadata.send({
    embeds: [embed],
    components: [row1]
  });

  client.user.setPresence({
    activities: [
      {
        name: track.title,
        type: ActivityType.Listening
      }
    ],
  });
});

player.on('trackAdd', (queue, track) => {
  queue.metadata.send(`🎵 ${track.title} sıraya eklendi 🥳`);
});

player.on('botDisconnect', (queue) => {
  queue.metadata.send('kanal ile bağlantım kesildiği için müzik durdu 😔');
});

player.on('channelEmpty', (queue) => {
  queue.metadata.send('ses kanalında kimse kalmadığı için müziği durdurdum 😕');
});

player.on('queueEnd', (queue) => {
  queue.metadata.send('listede başka çalınacak müzik kalmadığı için kanaldan ayrıldım 🙄');
});

player.on('tracksAdd', (queue, tracks) => {
  queue.metadata.send(`oynatma listesindeki tüm şarkılar sıraya eklendi 🥳`);
});
