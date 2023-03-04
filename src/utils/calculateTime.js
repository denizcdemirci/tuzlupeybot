const moment = require('moment-timezone');

moment.tz.setDefault('Europe/Istanbul');

module.exports = function (date, countdown = true) {
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
    minutesDiff,
  };
};
