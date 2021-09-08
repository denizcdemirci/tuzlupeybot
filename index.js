const {Client, MessageAttachment} = require('discord.js');
const client = new Client();
const fetch = require('node-fetch');
const moment = require('moment-timezone');
const config = require('./config.json');

client.on('guildMemberAdd', (member) => {
  const channel = member.guild.channels.cache.find(channel => channel.id === config.mainChannel);
  return channel.send(`**Tuzlu Peynir**'e hoş geldin ${member}, umarız keyifli vakit geçirirsin 🤔`);
});

client.on('guildMemberRemove', (member) => {
  const channel = member.guild.channels.cache.find(channel => channel.id === config.mainChannel);
  return channel.send(`${member} **Tuzlu Peynir**'den ayrıldı 🤔`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;

  if (config.islamicGreetings.some((text) => text === message.content.toLowerCase())) {
    return message.reply('cami mi lan burası orospu çocuğu').then(botMessage => {
      botMessage.delete({
        timeout: config.replyTimeout
      })
    });
  }

  if (message.content.split(/ +/g).some((text) => config.rizaNicknames.some((nickname) => text === nickname))) {
    return message.react('743900789717598308');
  }

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'kurallar') {
    const attachment = new MessageAttachment('https://cdn.discordapp.com/attachments/107541159357739008/764980773362991104/unknown.png');
    return message.channel.send(attachment);
  }

  if (command === 'maymun' || command === 'meymun') {
    if (message.channel.id === config.monkeyChannel) {
      fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_TOKEN}&tag=monkey`).then((data) => {
        return data.json();
      }).then(async (response) => {
        const monkeys = ['🐒', '🐵', '🙈', '🙉', '🙊', '🍌'];
        await message.react(monkeys[Math.floor(Math.random() * monkeys.length)]);
        return message.channel.send(response.data.images.original.url);
      });
    } else {
      return message.reply(`${command} paylaşımlarını <#${config.monkeyChannel}> kanalında yapabilirsin ❤️`);
    }
  }

  if (command === 'makine' || command === 'makina') {
    const { diff, days, hours, minutes } = calculateTime('2021-09-07');
    if (diff > 0) {
      message.channel.send(`${command} olmaya ${days} gün ${hours} saat ${minutes} dakika kaldı`);
    } else {
      message.channel.send(`${command} olundu`);
    }
    return message.react('743900789717598308');
  }

  if (command === 'şafak') {
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
      message.channel.send(`${maniler[Math.floor((Math.random() * maniler.length))]}\n\nşafak atarsa ${days}`);
      return message.react('🪖');
    } else if (diff <= 86400 && diff > 0) {
      message.channelsend('şafak doğan güneş');
      return message.react('🌞');
    } else if (diff <= 0) {
      message.channel.send('şafak attı');
      return message.react('🎖️');
    }
  }

  if (command === 'sigara') {
    const { days, hours, minutes, minutesDiff } = calculateTime('2021-09-07 13:00', false);
    message.channel.send(`cihan ${days} gün ${hours} saat ${minutes} dakikadır sigara içmiyor\n${(minutesDiff / 72).toFixed(0)} dal sigara içmedi ve ${days * 16}₺ para biriktirdi`);
    return message.react('🚬');
  }

  if (command === 'hosgeldin' || command === 'hoşgeldin') {
    if (message.member.voice.channel) {
      await message.member.voice.channel.join();
    } else {
      return message.reply('ses kanalında değilsin ki amk').then(botMessage => {
        botMessage.delete({
          timeout: config.replyTimeout
        })
      });
    }
  }
});

client.on('ready', () => {
  client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;

    if (command === 'yaz') {
      // const text = args.find((command) => command.name === 'yazı').value;
      // client.channels.cache.find(channel => channel.id === interaction.channel_id).send(text)
      // const channel = client.guild.channels.cache.find(channel => channel.id === config.modChannel);
      // return channel.send(`<@!${interaction.data.id}> bota şunu yazdırdı: ${text}`);

      return client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: args.find((command) => command.name === 'yazı').value
          }
        }
      });
    }

    if (command === 'yap') {
      await client.user.setActivity(args.find((command) => command.name === 'açıklama').value, {
        type: args.find((command) => command.name === 'aktivite').value
      });

      return client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: 'tm'
          }
        }
      });
    }
  });
});

client.on('voiceStateUpdate', (oldState, newState) => {
  if (!newState.channel) return;

  const otherVoiceChannels = ['107541160855105536', '587682706868011029', '152775281055236097', '789546252101484544'];
  if (otherVoiceChannels.some((channel) => channel === newState.channelID)) return;

  if (newState.channelID === config.dotaChannel) {
    let inviteTo = null;

    if (newState.id === '102834355553972224') {
      inviteTo = '138261523339411456';
    } else if (newState.id === '138261523339411456') {
      inviteTo = '102834355553972224';
    }

    if (inviteTo) {
      client.users.cache.get(inviteTo).send(`${newState.guild.members.cache.get(newState.id).user.username} seni ${newState.channel.name} kanalında bekliyor 🤔`);
    }
  }

  return client.user.setActivity(newState.channel.name.substr(newState.channel.name.indexOf(' ') + 1));
});

function calculateTime(date, countdown = true) {
  moment.tz.setDefault('Europe/Istanbul');
  const diff = countdown ? moment.duration(moment(date).diff(moment())) : moment.duration(moment().diff(moment(date)));
  const days = parseInt(diff.asDays());
  const hours = parseInt(diff.asHours()) - days * 24;
  const minutes = parseInt(diff.asMinutes()) - (days * 24 * 60 + hours * 60);
  const minutesDiff = parseInt(diff.asMinutes());

  return {
    diff,
    days,
    hours,
    minutes,
    minutesDiff
  }
}

client.login(process.env.DC_TOKEN);
