const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
  name: 'hoşgeldin',
  description: 'Bot bulunduğun ses kanalına katılır',
  execute({ inter }) {
    if (inter.member.voice.channel) {
      joinVoiceChannel({
        channelId: inter.member.voice.channel.id,
        guildId: inter.guild.id,
        adapterCreator: inter.guild.voiceAdapterCreator
      });

      inter.reply({
        content: 'geldim',
        ephemeral: true,
      });
    } else {
      inter.reply({
        content: 'ses kanalında değilsin ki amk',
        ephemeral: true,
      });
    }
  },
};
