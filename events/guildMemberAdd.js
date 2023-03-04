module.exports = (client, member) => {
  const channel = member.guild.channels.cache.find(channel => channel.id === client.config.app.mainChannel);

  channel.send(`**${member.guild.name}** sunucusuna hoş geldin ${member}, umarız keyifli vakit geçirirsin 🤔`);
};
