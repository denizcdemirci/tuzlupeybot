const {Client, MessageAttachment} = require('discord.js');
const client = new Client();
const fetch = require('node-fetch');
const editJsonFile = require('edit-json-file');
file = editJsonFile('./config.json', {
  autosave: true
});
const config = file.toObject();

client.on('guildMemberAdd', (member) => {
  const channel = member.guild.channels.cache.find(channel => channel.id === config.mainChannel);
  if (!channel) return;
  return channel.send(`**Tuzlu Peynir**'e hoş geldin ${member}, umarız keyifli vakit geçirirsin 🤔`);
});

client.on('guildMemberRemove', (member) => {
  const channel = member.guild.channels.cache.find(channel => channel.id === config.mainChannel);
  if (!channel) return;
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

  if (message.content.toLowerCase() === 'sela') {
    return message.reply('yallah arabistana');
  }

  if (message.content.toLowerCase() === 'dikkat') {
    return message.reply('mardatone tefankardo xeri hirrime').then(botMessage => {
      botMessage.delete({
        timeout: config.replyTimeout
      })
    });
  }

  if (message.content.toLowerCase() === 'bugün kandil mi') {
    if (config.islamicHoliday) {
      return message.reply('evet bugün kandil 🕌');
    } else {
      return message.reply('hayır bugün kandil değil 🕌');
    }
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

  if (command === 'ayarlar') {
    await message.delete();
    if (args[0] === 'kandil') {
      if (args[1] === 'evet') {
        return file.set('islamicHoliday', true);
      } else if (args[1] === 'hayır') {
        return file.set('islamicHoliday', false);
      }
    }
  }
});

client.on('voiceStateUpdate', (oldState, newState) => {
  if (!newState.channel) return;
  return client.user.setActivity(newState.channel.name.substr(newState.channel.name.indexOf(' ') + 1));
});

client.login(process.env.DC_TOKEN);
