module.exports = {
  name: 'dolar',
  aliases: [],
  category: 'General',
  utilisation: '{prefix}dolar',
    execute(client, message) {
    const fetch = require('node-fetch');

   const headers = { apikey: "K8707gqiH3gnFgRvcKFy2pBESDp9G8Nf" };

fetch("https://api.apilayer.com/exchangerates_data/latest?base=usd", {
  method: "GET",
  headers: headers,
})
  .then((response) => {
    console.log("first", response);
    return response.json();
  })
  .then(({ rates }) => {
    const { TRY } = rates;

    message.channel.send(
      `Dolar şuan ${TRY.toFixed(
        2
      )} TL civarında oynaşmakta.\nDenizin istediği macbook ise bir sonraki fiyat güncellemesinde ${(
        2516 * TRY
      ).toFixed(2)} TL olacak. Zeta'nın gitmek istediği yurtdışı seyahatinin masrafları 
    bir sonraki fiyat güncellemesinde ${(1500*TRY).toFixed(2)} TL olacak. <:Sadge:834156037279973386>`
    );
  })
  .catch((e) => {
    if (e.status === 429) {
      message.reply(
        "Maalesef bu aylık istek limitlerini aştık. Gelecek ay görüşmek üzere <:rjza:743900789717598308>"
      );
    } else {
      message.reply(
        "Bilinmeyen bir hata oluştu. Bilgi almak için <@102835660141916160> adlı kullanıcıya ulaşabilirsiniz."
      );
    }
  });
  },
};
