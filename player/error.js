module.exports = (client, error, message, ...args) => {
  switch (error) {
    case 'NotPlaying':
      message.channel.send('şu anda herhangi bir müzik çalmıyor 😋');
      break;
    case 'NotConnected':
      message.channel.send('ses kanalında değilsin ki. nasıl müzik açmamı bekliyorsun? ☺️');
      break;
    case 'UnableToJoin':
      message.channel.send('ses kanalına katılamıyorum. rolümü kontrol eder misin 😇');
      break;
    case 'VideoUnavailable':
      message.channel.send(`\`${args[0].title}\` ülkende engelli olduğu için çalamıyorum ve sıradaki şarkıya geçiyorum... 🇹🇷`);
      break;
    case 'MusicStarting':
      message.channel.send('müzik başlıyor... lütfen bekle ve tekrar dene ☺️');
      break;
    default:
      message.channel.send(`bi'şeyler ters gitti... ${error}`);
  }
};
