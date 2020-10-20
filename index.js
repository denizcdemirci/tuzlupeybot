// const fs = require('fs');
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();
const config = require('./assets/config.json');

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === config.mainChannel);
  if (!channel) return;
  channel.send(`**Tuzlu Peynir**'e hoş geldin ${member}, umarız keyifli vakit geçirirsin 🤔`);
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === config.mainChannel);
  if (!channel) return;
  channel.send(`${member} **Tuzlu Peynir**'den ayrıldı 🤔`);
});

client.on('message', async message => {
  if (message.author.bot) return;

  if (config.islamicGreetings.some((text) => text === message.content.toLowerCase())) {
    return message.reply('cami mi lan burası orospu çocuğu').then(botMessage => {
      botMessage.delete({
        timeout: config.replyTimeout
      })
    })
  }

  if (message.content.toLowerCase() === 'dikkat') {
    return message.reply('mardatone tefankardo xeri hirrime').then(botMessage => {
      botMessage.delete({
        timeout: config.replyTimeout
      })
    })
  }

  if (message.content.split(/ +/g).some((text) => config.rizaNicknames.some((nickname) => text === nickname))) {
    return message.react('743900789717598308');
  }

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  /* if (command === 'sela' || message.content.startsWith('sela')) {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const dispatcher = connection.play(fs.createReadStream('./assets/sela.mp3'));
      dispatcher.on('start', () => {
        let member = message.mentions.members.first();
        if (member) {
          message.channel.send(`🕌 ${member.user} için sela okundu`);
          return message.react('🇫');
        } else {
          message.channel.send(`🕌 ${message.author} sela okuttu`);
          return message.react('🇫');
        }
      });
      dispatcher.on('finish', () => {
        return connection.disconnect();
      });
    } else {
      return message.reply('önce bi ses kanalına gir amk').then(botMessage => {
        botMessage.delete({
          timeout: config.replyTimeout
        })
      })
    }
  }

  if ((command === 'kes' || message.content === 'kes') && message.member.voice.channel) {
    await message.member.voice.channel.leave();
    return message.react('🙁');
  } */

  if (command === 'kurallar') {
    const attachment = new MessageAttachment('https://cdn.discordapp.com/attachments/107541159357739008/764980773362991104/unknown.png');
    return message.channel.send(attachment);
  }

  if (command === 'yaz') {
    await message.delete();
    return message.channel.send(args.join(' '));
  }

  if (command === 'oyna') {
    await client.user.setActivity(args.join(' '));
    return message.react('393105743403941890');
  }

  if (command === 'izle') {
    await client.user.setActivity(args.join(' '), {
      type: 'WATCHING'
    });
    return message.react('393107856142106635');
  }

  if (command === 'dinle') {
    await client.user.setActivity(args.join(' '), {
      type: 'LISTENING'
    });
    return message.react('547151525932433408');
  }
});

client.login(process.env.DC_TOKEN);
