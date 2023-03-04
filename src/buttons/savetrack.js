const { EmbedBuilder } = require('discord.js')

module.exports = async ({inter, queue}) => {
  if (!queue || !queue.playing) return inter.reply({
    content: 'şu anda herhangi bir müzik çalmıyor 😡',
    ephemeral: true
  });

  inter.member.send({
    embeds: [
      new EmbedBuilder()
        .setColor('Red')
        .setTitle(`:arrow_forward: ${queue.current.title}`)
        .setURL(queue.current.url)
        .addFields({
            name: ':hourglass: Süre:',
            value: `\`${queue.current.duration}\``,
            inline: true
          },
          {
            name: 'Müziği açan:',
            value: `\`${queue.current.author}\``,
            inline: true
          },
          {
            name: 'Görüntüleme :eyes:',
            value: `\`${Number(queue.current.views).toLocaleString()}\``,
            inline: true
          },
          {
            name: 'Müzik URL\'si:',
            value: `\`${queue.current.url}\``
          })
        .setThumbnail(queue.current.thumbnail)
        .setFooter({
          text: `${inter.member.guild.name} sunucusundan`,
          iconURL: inter.member.guild.iconURL({
            dynamic: false
          })
        })
    ]
  }).then(() => {
    return inter.reply({
      content: 'müziğin adını sana özel mesaj olarak gönderdim 🤠',
      ephemeral: true
    });
  }).catch(() => {
    return inter.reply({
      content: 'sana özel mesaj gönderemiyorum 🥺',
      ephemeral: true
    });
  });
};
