const weather = require('openweather-apis');
const CronJob = require('cron').CronJob;
import config from '../../../properties/config'

const self = module.exports = {
        /* OPTIONS FORMAT :
           'city':  options.city,
           'units': options.units || 'metric',
           'limit': options.limit
        */

    temperatureBelow: function (options, reaction, List) {
        new CronJob("0 */5 * * * *", function () {
            weather.setAPPID(config.openweatherApis.key);
            weather.setLang('en');
            weather.setCity(options.city);
            weather.setUnits(options.units);
            weather.getTemperature(function(err, result) {
                if (err) console.log(err);
                if (options.limit > result) {
                    List.reactions[reaction.title](reaction.options);
                }
            });
        }).start();
    },

    temperatureAbove: function(options, reaction, List) {
        new CronJob("0 */5 * * * *", function () {
            weather.setAPPID(config.openweatherApis.key);
            weather.setLang('en');
            weather.setCity(options.city);
            weather.setUnits(options.units);
            weather.getTemperature(function(err, result) {
                if (err) console.log(err);
                if (options.limit < result) {
                    List.reactions[reaction.title](reaction.options);
                }
            });
        }).start();
    },

    pressureBelow: function(options, reaction, List) {
        new CronJob("0 */5 * * * *", function () {
            weather.setAPPID(config.openweatherApis.key);
            weather.setLang('en');
            weather.setCity(options.city);
            weather.setUnits(options.units);
            weather.getPressure(function (err, result) {
                if (err) console.log(err);
                if (options.limit > result) {
                    List.reactions[reaction.title](reaction.options);
                }
            });
        }).start();
    },

    pressureAbove: function(options, reaction, List) {
        new CronJob("0 */5 * * * *", function () {
            weather.setAPPID(config.openweatherApis.key);
            weather.setLang('en');
            weather.setCity(options.city);
            weather.setUnits(options.units);
            weather.getPressure(function (err, result) {
                if (err) console.log(err);
                if (options.limit < result) {
                    List.reactions[reaction.title](reaction.options);
                }
            });
        }).start();
    },

    humidityBelow: function(options, reaction, List) {
        new CronJob("0 */5 * * * *", function () {
            weather.setAPPID(config.openweatherApis.key);
            weather.setLang('en');
            weather.setCity(options.city);
            weather.setUnits(options.units);
            weather.getHumidity(function (err, result) {
                if (err) console.log(err);
                if (options.limit > result) {
                    List.reactions[reaction.title](reaction.options);
                }
            });
        });
    },

    humidityAbove: function(options, reaction, List) {
        new CronJob("0 */5 * * * *", function () {
            weather.setAPPID(config.openweatherApis.key);
            weather.setLang('en');
            weather.setCity(options.city);
            weather.setUnits(options.units);
            weather.getHumidity(function (err, result) {
                if (err) console.log(err);
                if (options.limit < result) {
                    List.reactions[reaction.title](reaction.options);
                }
            });
        });
    }
};
