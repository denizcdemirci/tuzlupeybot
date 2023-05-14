const calculateTime = require('../../src/utils/calculateTime');

module.exports = {
  name: 'seçim',
  description: 'Seçime ne kadar kaldı?',
  execute({ inter }) {
    const { diff, days, hours, minutes } = calculateTime('2023-05-28 08:00');

    if (diff > 0) {
      inter.reply(`seçime ${days} gün ${hours} saat ${minutes} dakika kaldı`);
    } else {
      inter.reply('🫶🏻 sevgi kazanacak');
    }
  },
};
