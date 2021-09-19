module.exports = {
  name: 'yaz',
  aliases: [],
  category: 'General',
  utilisation: '{prefix}yaz [mesaj]',
  execute(client, message, args) {
    message.delete();

    if (args.length > 0) {
      message.channel.send(args.join(' '));
    }
  },
};
