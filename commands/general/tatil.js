module.exports = {
  name: 'tatil',
  aliases: [],
  category: 'General',
  utilisation: '{prefix}tatil',
  execute(client, message) {
    const calculateTime = require('../../utils/calculateTime');
    const { diff, days, hours, minutes } = calculateTime('2021-05-20');

    if (diff > 0) {
      message.channel.send(`fethiyeye gitmeye ${days} gün ${hours} saat ${minutes} dakika kaldı`);
    } else {
      message.channel.send('tatildesiniz');
    }

    message.react('743900789717598308');
  },
};
