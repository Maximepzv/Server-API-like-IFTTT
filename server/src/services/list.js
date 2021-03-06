/* EXAMPLES */
const action1 = require('./actions/action1');
const action2 = require('./actions/action2');

const reaction1 = require('./reactions/reaction1');
const reaction2 = require('./reactions/reaction2');
/* EXAMPLES */

const clock = require('./actions/clock');
const rss = require('./actions/rss');
const weather = require('./actions/weather');
const launch = require('./actions/launch');

const example = require('./reactions/example');
const add_to_calendar = require('./reactions/add_to_calendar');
const send_mail = require('./reactions/send_mail');
const ping_once = require('./reactions/ping_once');

module.exports = {
  actions: {
      'action1': action1.start,
      'action2': action2.start,
      'on_every_tick': clock.on_every_tick,
      'matches_on_title': rss.matches_on_title,
      'matches_on_content': rss.matches_on_content,
      'temperatureBelow': weather.temperatureBelow,
      'temperatureAbove': weather.temperatureAbove,
      'pressureBelow': weather.pressureBelow,
      'pressureAbove': weather.pressureAbove,
      'humidityAbove': weather.humidityAbove,
      'humidityBelow': weather.humidityBelow,
      'launch': launch.start
  },
  reactions: {
      'reaction1': reaction1.start,
      'reaction2': reaction2.start,
      'exampleEveryDayAt': example.exampleEveryDayAt,
      'exampleEveryHourAt': example.exampleEveryHourAt,
      'exampleMatchInTitle': example.exampleMatchInTitle,
      'exampleMatchInContent': example.exampleMatchInContent,
      'exampleTemperatureBelow': example.exampleTemperatureBelow,
      'exampleTemperatureAbove': example.exampleTemperatureAbove,
      'examplePressureBelow': example.examplePressureBelow,
      'examplePressureAbove': example.examplePressureAbove,
      'exampleHumidityBelow': example.exampleHumidityBelow,
      'exampleHumidityAbove': example.exampleHumidityAbove,
      'add_to_calendar': add_to_calendar.start,
      'send_mail': send_mail.start,
      'ping_once': ping_once.start
  }
};
