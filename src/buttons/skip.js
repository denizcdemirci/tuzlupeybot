module.exports = async ({inter, queue}) => {
  if (!queue || !queue.playing) return inter.reply({
    content: 'şu anda herhangi bir müzik çalmıyor 😡',
    ephemeral: true
  });

  const success = queue.skip();

  return inter.reply({
    content: success ? `${queue.current.title} geçildi` : 'bi\'şeyler ters gitti...',
    ephemeral: true
  });
};
