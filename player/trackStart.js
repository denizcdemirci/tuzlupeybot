module.exports = (client, message, track) => {
  message.channel.send(`🎶 şu anda \`${message.member.voice.channel.name}\` kanalında \`${track.title}\` çalıyor 🥳`);

  client.user.setActivity(track.title, {
    type: 'LISTENING'
  });
};
