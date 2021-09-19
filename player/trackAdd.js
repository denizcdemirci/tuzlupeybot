module.exports = (client, message, queue, track) => {
  message.channel.send(`🎵 \`${track.title}\` sıraya eklendi 🥳`);
};
