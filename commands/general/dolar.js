module.exports = {
    name: 'dolar',
    aliases: ['dolar'],
    category: 'General',
    utilisation: '{prefix}dolar',
    execute(client, message) {
        const fetch = require('node-fetch');


        fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=b059a8b0-35bf-11ec-990f-e122c752a66e&base_currency=USD`)
            .then((response) => {
                return response.json();
            }).then(({ data }) => {
                const { TRY } = data;
                message.channel.send(`Dolar şuan ${TRY} civarında oynaşmakta. Denizin istediği macbook ise bir sonraki fiyat güncellemesinde ${2325 * TRY} TL olacak. :Sadge:`);
            }).catch(err => {
                message.reply(err?.status == 429 ? 'Maalesef bu aylık istek limitlerini aştık. GElecek ay görüşmek üzere :rjza:' :
                    'Bilinmeyen bir hata oluştu. Bilgi almak için @lil deniz#0001 adlı kullanıcıya ulaşabilirsiniz.');
            });
    },
};
