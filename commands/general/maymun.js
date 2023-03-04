const fetch = require('node-fetch');

module.exports = {
  name: 'maymun',
  description: 'Maymun gifleri gönderir',
  async execute({ client, inter }) {
    if (inter.channel.id === client.config.app.monkeyChannel) {
      try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_TOKEN}&tag=monkey`);

        const { data } = await response.json();

        inter.reply({
          content: data.images.original.url
        });
      } catch (error) {
        inter.reply(error);
      }
    } else {
      inter.reply(`maymun paylaşımlarını <#${client.config.app.monkeyChannel}> kanalında yapabilirsin ❤️`);
    }
  },
};
