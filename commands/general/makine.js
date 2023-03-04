const calculateTime = require('../../src/utils/calculateTime');

module.exports = {
  name: 'makine',
  description: 'Makine olmaya ne kadar kaldı?',
  execute({ inter }) {
    const { diff, days, hours, minutes } = calculateTime('2021-09-07');

    if (diff > 0) {
      inter.reply(`makine olmaya ${days} gün ${hours} saat ${minutes} dakika kaldı`);
    } else {
      inter.reply('makine olundu');
    }
  },
};
