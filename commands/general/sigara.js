const calculateTime = require('../../src/utils/calculateTime');

module.exports = {
  name: 'sigara',
  description: 'Cihan sigarayı bırakalı ne kadar zaman oldu?',
  execute({ inter }) {
    const { days, hours, minutes, minutesDiff } = calculateTime('2021-09-07 13:00', false);

    inter.reply(`cihan ${days} gün ${hours} saat ${minutes} dakikadır sigara içmiyor\n${(minutesDiff / 72).toFixed(0)} dal sigara içmedi ve ${((minutesDiff / 72).toFixed(0) * 16 / 20).toFixed(2)}₺ para biriktirdi`);
  },
};
