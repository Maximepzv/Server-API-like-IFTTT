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
                    console.log("La température est en dessous de la limite");
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
                    console.log("La température est au dessus de la limite");
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
                    console.log("La pression est en dessous de la limite");
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
                    console.log("La pression est au dessus de la limite");
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
            weather.getPressure(function (err, result) {
                if (err) console.log(err);
                if (options.limit > result) {
                    console.log("L'humidité est en dessous de la limite");
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
            weather.getPressure(function (err, result) {
                if (err) console.log(err);
                if (options.limit < result) {
                    console.log("L'humidité est au dessus de la limite");
                    List.reactions[reaction.title](reaction.options);
                }
            });
        });
    }
};
