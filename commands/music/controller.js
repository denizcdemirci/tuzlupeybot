const {
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  PermissionsBitField
} = require('discord.js');

module.exports = {
  name: 'controller',
  description: 'Denetleyici kanalınını ayarlar',
  voiceChannel: false,
  permissions: PermissionsBitField.Flags.ManageMessages,
  options: [
    {
      name: 'channel',
      description: 'Göndermek istediğiniz kanal',
      type: ApplicationCommandOptionType.Channel,
      required: true,
    }
  ],
  async execute({ inter }) {
    let Channel = inter.options.getChannel('channel');

    if (Channel.type !== 0) return inter.reply({
      content: 'bir tek ses kanalına gönderebilirsin 😡',
      ephemeral: true
    })

    const embed = new EmbedBuilder()
      .setTitle('müziğinizi aşağıdaki düğmelerden kontrol edebilirsiniz')
      .setImage(inter.guild.iconURL({
        size: 4096,
        dynamic: true
      }));

    inter.reply({
      content: `${Channel} kanalına gönderiliyor 😏`,
      ephemeral: true
    });

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

    const save = new ButtonBuilder()
      .setLabel('Kaydet')
      .setCustomId(JSON.stringify({
        ffb: 'savetrack'
      }))
      .setStyle('Success');

    const volumeup = new ButtonBuilder()
      .setLabel('Sesi arttır')
      .setCustomId(JSON.stringify({
        ffb: 'volumeup'
      }))
      .setStyle('Primary');

    const volumedown = new ButtonBuilder()
      .setLabel('Sesi azalt')
      .setCustomId(JSON.stringify({
        ffb: 'volumedown'
      }))
      .setStyle('Primary');

    const loop = new ButtonBuilder()
      .setLabel('Tekrarla')
      .setCustomId(JSON.stringify({
        ffb: 'loop'
      }))
      .setStyle('Danger');

    const np = new ButtonBuilder()
      .setLabel('Şu an çalan')
      .setCustomId(JSON.stringify({
        ffb: 'nowplaying'
      }))
      .setStyle('Secondary');

    const queuebutton = new ButtonBuilder()
      .setLabel('Sıra')
      .setCustomId(JSON.stringify({
        ffb: 'queue'
      }))
      .setStyle('Secondary');

    const row1 = new ActionRowBuilder().addComponents(back, queuebutton, resumepause, np, skip);
    const row2 = new ActionRowBuilder().addComponents(volumedown, loop, save, volumeup);

    Channel.send({
      embeds: [embed],
      components: [row1, row2]
    });
  },
};
