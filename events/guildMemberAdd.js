module.exports = (client, member) => {
  const channel = member.guild.channels.cache.find(channel => channel.id === client.config.discord.mainChannel);

  channel.send(`**${member.guild.name}** kanalına hoş geldin ${member}, umarız keyifli vakit geçirirsin 🤔`);
};
