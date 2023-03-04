const calculateTime = require('../../src/utils/calculateTime');

module.exports = {
  name: 'tatil',
  description: 'Tatile ne zaman gidiyoruz?',
  execute({ inter }) {
    const { diff, days, hours, minutes } = calculateTime('2021-05-20');

    if (diff > 0) {
      inter.reply(`fethiyeye gitmeye ${days} gün ${hours} saat ${minutes} dakika kaldı`);
    } else {
      inter.reply('tatildesiniz');
    }
  },
};
