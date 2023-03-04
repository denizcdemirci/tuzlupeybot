module.exports = (client, member) => {
  const channel = member.guild.channels.cache.find(channel => channel.id === client.config.app.mainChannel);

  channel.send(`${member}, **${member.guild.name}** sunucusundan ayrıldı 🤔`);
};
