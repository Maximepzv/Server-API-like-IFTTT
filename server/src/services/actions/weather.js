const weather = require('openweather-apis');
const CronJob = require('cron').CronJob;
import config from '../../../properties/config'

const self = module.exports = {
        /* OPTIONS FORMAT :
           'city':  options.city,
           'units': options.units || 'metric',
           'limit': options.limit
        */

    temperatureBelow: function (options, reaction, List, user) {
        new CronJob("0 */5 * * * *", function () {
            weather.setAPPID(config.openweatherApis.key);
            weather.setLang('en');
            weather.setCity(options.city);
            weather.setUnits(options.units);
            weather.getTemperature(function(err, result) {
                if (err) console.log(err);
                if (options.limit > result) {
                    List.reactions[reaction.title](reaction.options, user);
                }
            });
        }).start();
    },

    temperatureAbove: function(options, reaction, List, user) {
        new CronJob("0 */5 * * * *", function () {
            weather.setAPPID(config.openweatherApis.key);
            weather.setLang('en');
            weather.setCity(options.city);
            weather.setUnits(options.units);
            weather.getTemperature(function(err, result) {
                if (err) console.log(err);
                if (options.limit < result) {
                    List.reactions[reaction.title](reaction.options, user);
                }
            });
        }).start();
    },

    pressureBelow: function(options, reaction, List, user) {
        new CronJob("0 */5 * * * *", function () {
            weather.setAPPID(config.openweatherApis.key);
            weather.setLang('en');
            weather.setCity(options.city);
            weather.setUnits(options.units);
            weather.getPressure(function (err, result) {
                if (err) console.log(err);
                if (options.limit > result) {
                    List.reactions[reaction.title](reaction.options, user);
                }
            });
        }).start();
    },

    pressureAbove: function(options, reaction, List, user) {
        new CronJob("0 */5 * * * *", function () {
            weather.setAPPID(config.openweatherApis.key);
            weather.setLang('en');
            weather.setCity(options.city);
            weather.setUnits(options.units);
            weather.getPressure(function (err, result) {
                if (err) console.log(err);
                if (options.limit < result) {
                    List.reactions[reaction.title](reaction.options, user);
                }
            });
        }).start();
    },

    humidityBelow: function(options, reaction, List, user) {
        new CronJob("0 */5 * * * *", function () {
            weather.setAPPID(config.openweatherApis.key);
            weather.setLang('en');
            weather.setCity(options.city);
            weather.setUnits(options.units);
            weather.getHumidity(function (err, result) {
                if (err) console.log(err);
                if (options.limit > result) {
                    List.reactions[reaction.title](reaction.options, user);
                }
            });
        }).start();
    },

    humidityAbove: function(options, reaction, List, user) {
        new CronJob("0 */5 * * * *", function () {
            weather.setAPPID(config.openweatherApis.key);
            weather.setLang('en');
            weather.setCity(options.city);
            weather.setUnits(options.units);
            weather.getHumidity(function (err, result) {
                if (err) console.log(err);
                if (options.limit < result) {
                    List.reactions[reaction.title](reaction.options, user);
                }
            });
        }).start();
    }
};
