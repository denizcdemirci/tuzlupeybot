module.exports = {
  name: 'dolar',
  aliases: [],
  category: 'General',
  utilisation: '{prefix}dolar',
    execute(client, message) {
    const fetch = require('node-fetch');

    fetch('https://freecurrencyapi.net/api/v2/latest?apikey=b059a8b0-35bf-11ec-990f-e122c752a66e&base_currency=USD')
      .then((response) => {
        return response.json();
      }).then(({ data }) => {
      const { TRY } = data;

      message.channel.send(`Dolar şuan ${TRY.toFixed(2)} TL civarında oynaşmakta.\nDenizin istediği macbook ise bir sonraki fiyat güncellemesinde ${(2516 * TRY).toFixed(2)} TL olacak. <:Sadge:834156037279973386>`);
    }).catch((e) => {
      if (e.status === 429) {
        message.reply('Maalesef bu aylık istek limitlerini aştık. Gelecek ay görüşmek üzere <:rjza:743900789717598308>');
      } else {
        message.reply('Bilinmeyen bir hata oluştu. Bilgi almak için <@102835660141916160> adlı kullanıcıya ulaşabilirsiniz.');
      }
    });
  },
};
