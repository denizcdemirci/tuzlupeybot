module.exports = {
  name: 'izle',
  aliases: [],
  category: 'General',
  utilisation: '{prefix}izle [aktivite]',
  execute(client, message, args) {
    message.delete();

    if (args.length > 0) {
      client.user.setActivity(args.join(' '), {
        type: 'WATCHING'
      });

      message.react('393107856142106635');
    }
  },
};
