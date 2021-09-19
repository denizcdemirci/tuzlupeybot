module.exports = {
  name: 'maymun',
  aliases: ['meymun'],
  category: 'General',
  utilisation: '{prefix}maymun',
  execute(client, message) {
    const fetch = require('node-fetch');

    if (message.channel.id === client.config.discord.monkeyChannel) {
      fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_TOKEN}&tag=monkey`).then((data) => {
        return data.json();
      }).then(async (response) => {
        const monkeys = ['🐒', '🐵', '🙈', '🙉', '🙊', '🍌'];
        await message.react(monkeys[Math.floor(Math.random() * monkeys.length)]);
        message.channel.send(response.data.images.original.url);
      });
    } else {
      message.reply(`maymun paylaşımlarını <#${client.config.discord.monkeyChannel}> kanalında yapabilirsin ❤️`);
    }
  },
};
