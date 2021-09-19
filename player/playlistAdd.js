module.exports = (client, message, queue, playlist) => {
  message.channel.send(`🎵 \`${playlist.title}\` sıraya eklendi 🥳 (sırada **${playlist.tracks.length}** müzik var)`);
};
