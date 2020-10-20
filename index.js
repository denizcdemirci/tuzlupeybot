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

  if (message.content.toLowerCase() === 'sela') {
    return message.reply('yallah arabistana').then(botMessage => {
      botMessage.delete({
        timeout: config.replyTimeout
      })
    })
  }


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
