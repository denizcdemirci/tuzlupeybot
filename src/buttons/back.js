module.exports = async ({inter, queue}) => {
  if (!queue || !queue.playing) return inter.reply({
    content: 'şu anda herhangi bir müzik çalmıyor 😡',
    ephemeral: true
  });

  if (!queue.previousTracks[1]) return inter.reply({
    content: 'daha önce hiç müzik çalmamış ki 😡',
    ephemeral: true
  });

  await queue.back();

  inter.reply({
    content: 'önceki müziğe geçtim 😎',
    ephemeral: true
  });
};
