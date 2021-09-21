module.exports = (client, oldState, newState) => {
  const voiceChannels = [
    '107541160855105536',
    '152775281055236097',
    '789546252101484544',
    '818258673171824640',
  ];

  if (!newState.channel) return;
  if (newState.member.user.bot) return;
  if (voiceChannels.some((channel) => channel === newState.channelID)) return;

  client.user.setActivity(newState.channel.name.substr(newState.channel.name.indexOf(' ') + 1));
};
