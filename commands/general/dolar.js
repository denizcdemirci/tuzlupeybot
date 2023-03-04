const fetch = require('node-fetch');

module.exports = {
  name: 'dolar',
  description: 'Dolar ne kadar?',
  async execute({ inter }) {
    try {
      const response = await fetch('https://api.apilayer.com/exchangerates_data/latest?base=usd', {
        method: 'GET',
        headers: {
          apikey: process.env.APILAYER_TOKEN
        },
      });

      const { rates } = await response.json();
      const { TRY } = rates;

      inter.reply(
        `Dolar şuan ${
          TRY.toFixed(2)
        } TL civarında oynaşmakta.\nDenizin istediği iphone 14 pro ise bir sonraki fiyat güncellemesinde ${
          (2194.12 * TRY).toFixed(2)
        } TL olacak. Zeta'nın gitmek istediği yurtdışı seyahatinin masrafları bir sonraki fiyat güncellemesinde ${
          (1500 * TRY).toFixed(2)
        } TL olacak. <:Sadge:834156037279973386>`
      );
    } catch (error) {
      if (error.status === 429) {
        inter.reply('Maalesef bu aylık istek limitlerini aştık. Gelecek ay görüşmek üzere <:rjza:743900789717598308>');
      } else {
        inter.reply('Bilinmeyen bir hata oluştu. Bilgi almak için <@102835660141916160> adlı kullanıcıya ulaşabilirsiniz.');
      }
    }
  },
};
