module.exports = async ({inter, queue}) => {
  if (!queue || !queue.playing) return inter.reply({
    content: 'şu anda herhangi bir müzik çalmıyor 😡',
    ephemeral: true
  });

  const success = queue.setPaused(false);

  if (!success) queue.setPaused(true);

  return inter.reply({
    content: `${success ? `${queue.current.title} duraklatıldı` : `${queue.current.title} devam ettirildi`}`,
    ephemeral: true
  });
};
