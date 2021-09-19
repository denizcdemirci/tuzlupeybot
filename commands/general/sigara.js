module.exports = {
  name: 'sigara',
  aliases: [],
  category: 'General',
  utilisation: '{prefix}sigara',
  execute(client, message) {
    const calculateTime = require('../../utils/calculateTime');
    const { days, hours, minutes, minutesDiff } = calculateTime('2021-09-07 13:00', false);

    message.channel.send(`cihan ${days} gün ${hours} saat ${minutes} dakikadır sigara içmiyor\n${(minutesDiff / 72).toFixed(0)} dal sigara içmedi ve ${((minutesDiff / 72).toFixed(0) * 16 / 20).toFixed(2)}₺ para biriktirdi`);
    message.react('🚬');
  },
};
