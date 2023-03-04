module.exports = async ({inter, queue}) => {
  if (!queue || !queue.playing) return inter.reply({
    content: 'şu anda herhangi bir müzik çalmıyor 😡',
    ephemeral: true
  });

  const vol = Math.floor(queue.volume + 5);

  if (vol > client.config.opt.maxVol) return inter.reply({
    content: 'sesi daha fazla arttıramıyorum 😔',
    ephemeral: true
  });

  if (queue.volume === vol) return inter.reply({
    content: 'değiştirmek istediğin ses seviyesi zaten bu 😐',
    ephemeral: true
  });

  const success = queue.setVolume(vol);

  return inter.reply({
    content: success ? `ses seviyesi %**${vol}**/**${client.config.opt.maxVol}** olarak değiştirildi 🔊` : 'bi\'şeyler ters gitti...',
    ephemeral: true
  });
};
