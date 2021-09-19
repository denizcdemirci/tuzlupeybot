module.exports = (client, member) => {
  const channel = member.guild.channels.cache.find(channel => channel.id === client.config.discord.mainChannel);

  channel.send(`${member}, **${member.guild.name}** kanalından ayrıldı 🤔`);
};
