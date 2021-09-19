module.exports = (client, oldState, newState) => {
  if (!newState.channel) return;
  if (newState.member.user.bot) return;

  client.user.setActivity(newState.channel.name.substr(newState.channel.name.indexOf(' ') + 1));
};
