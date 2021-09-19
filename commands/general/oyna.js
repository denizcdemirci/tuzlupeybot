module.exports = {
  name: 'oyna',
  aliases: [],
  category: 'General',
  utilisation: '{prefix}oyna [aktivite]',
  execute(client, message, args) {
    message.delete();

    if (args.length > 0) {
      client.user.setActivity(args.join(' '));

      message.react('393105743403941890');
    }
  },
};
