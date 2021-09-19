module.exports = (client, message, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop();
        return message.channel.send('seçim iptal edildi 😖');
    } else message.channel.send(`**1** ile **${tracks.length}** arasında geçerli bir sayı girmelisin 😡`);
};
