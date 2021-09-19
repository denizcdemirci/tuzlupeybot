module.exports = {
  name: 'dinle',
  aliases: [],
  category: 'General',
  utilisation: '{prefix}dinle [aktivite]',
  execute(client, message, args) {
    message.delete();

    if (args.length > 0) {
      client.user.setActivity(args.join(' '), {
        type: 'LISTENING'
      });

      message.react('547151525932433408');
    }
  },
};
