module.exports = {
  name: 'makine',
  aliases: ['makina'],
  category: 'General',
  utilisation: '{prefix}makine',
  execute(client, message) {
    const calculateTime = require('../../utils/calculateTime');
    const { diff, days, hours, minutes } = calculateTime('2021-09-07');

    if (diff > 0) {
      message.channel.send(`makine olmaya ${days} gün ${hours} saat ${minutes} dakika kaldı`);
    } else {
      message.channel.send(`makine olundu`);
    }

    message.react('743900789717598308');
  },
};
