module.exports = {
  app: {
    mainChannel: '107541159357739008',
    monkeyChannel: '768157293048758325',
    replyTimeout: 5000,
  },
  islamicGreetings: ['selamın aleyküm', 'sa', 's.a', 's.a.'],
  rizaNicknames: ['rıza', 'riza', 'r1z4', 'rjz4'],
  opt: {
    DJ: {
      enabled: false,
      roleName: '',
      commands: []
    },
    maxVol: 100,
    leaveOnEnd: true,
    loopMessage: false,
    spotifyBridge: true,
    defaultvolume: 75,
    discordPlayer: {
      ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
      }
    }
  }
};
