const calculateTime = require('../../src/utils/calculateTime');

module.exports = {
  name: 'şafak',
  description: 'Şafak attı mı?',
  execute({ inter }) {
    const { diff, days } = calculateTime('2021-09-16');

    const maniler = [
      'Bergamanın bol taşı\nNe yapalım binbaşı\nYârim askere gitti\nDinmez gözümün yaşı',
      'Asker ettiler beni\nBilecik alayına\nAlır kaçırırım seni\nGelirse kolayıma',
      'Askere gideceğim\nElbet geri döneceğim\nSen beni bekle csgo\nSana ömrümü vereceğim',
      'ASKER OLDUM GİDERİM\nYOKTUR BENİM KADERİM\nFİNCAN GÖBEK ÜSTÜNDEN\nNARGİLEYİ ÇEKERİM',
      'BİLECİK BAYIR MI\nHASAN ÇANTAN AĞIR MI\nHİÇ İZİNE GELMİYON\nBAŞ ÇAVUŞUN GAVUR MU',
      'Hasan gider askere\nAlır gelir teskere\nTuzlu Peynir kurban olsun\nHasan gibi askere'
    ];

    if (diff > 86400) {
      inter.reply(`${maniler[Math.floor((Math.random() * maniler.length))]}\n\nşafak atarsa ${days}`);
    } else if (diff <= 86400 && diff > 0) {
      inter.reply('şafak doğan güneş');
    } else if (diff <= 0) {
      inter.reply('şafak attı');
    }
  },
};
