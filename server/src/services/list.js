/* EXAMPLES */
const action1 = require('./actions/action1');
const action2 = require('./actions/action2');

const reaction1 = require('./reactions/reaction1');
const reaction2 = require('./reactions/reaction2');
/* EXAMPLES */

const clock = require('./actions/clock');
const rss = require('./actions/rss');
const weather = require('./actions/weather');
const example = require('./reactions/example');

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
      'humidityBelow': weather.humidityBelow
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
      'exampleHumidityAbove': example.exampleHumidityAbove
  }
};
