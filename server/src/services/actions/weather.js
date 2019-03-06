const weather = require('openweather-apis');
const CronJob = require('cron').CronJob;
import config from '../../../properties/config'

const self = module.exports = {
    start: function (options, reaction, List) {
        /* OPTIONS FORMAT :
           'city':  options.city,
           'units': options.units || 'metric',
           'fn':    options.fn,
           'limit': options.limit
        */
        weather.setAPPID(config.openweatherApis.key);
        weather.setLang('en');
        weather.setCity(options.city);
        weather.setUnits(options.units);
        new CronJob("0 */5 * * * *", function () {
            let weatherFunctions = [
                self.temperatureBelow,
                self.temperatureAbove,
                self.pressureBelow,
                self.pressureAbove,
                self.humidityAbove,
                self.humidityBelow
            ];
            weatherFunctions[Number(options.fn)](Number(options.limit), reaction, List);
        }).start();
    },

    temperatureBelow: function (limit, reaction, List) {
        weather.getTemperature(function(err, result) {
            if (err) console.log(err);
            if (limit > result) {
                console.log("La température est en dessous de la limite");
                List.reactions[reaction.title](reaction.options);
            }
        });
    },

    temperatureAbove: function(limit, reaction, List) {
        weather.getTemperature(function(err, result) {
            if (err) console.log(err);
            if (limit < result) {
                console.log("La température est au dessus de la limite");
                List.reactions[reaction.title](reaction.options);
            }
        });
    },

    pressureBelow: function(limit, reaction, List) {
        weather.getPressure(function(err, result) {
            if (err) console.log(err);
            if (limit > result) {
                console.log("La pression est en dessous de la limite");
                List.reactions[reaction.title](reaction.options);
            }
        });
    },

    pressureAbove: function(limit, reaction, List) {
        weather.getPressure(function(err, result) {
            if (err) console.log(err);
            if (limit < result) {
                console.log("La pression est au dessus de la limite");
                List.reactions[reaction.title](reaction.options);
            }
        });
    },

    humidityBelow: function(limit, reaction, List) {
        weather.getPressure(function(err, result) {
            if (err) console.log(err);
            if (limit > result) {
                console.log("L'humidité est en dessous de la limite");
                List.reactions[reaction.title](reaction.options);
            }
        });
    },

    humidityAbove: function(limit, reaction, List) {
        weather.getPressure(function(err, result) {
            if (err) console.log(err);
            if (limit < result) {
                console.log("L'humidité est au dessus de la limite");
                List.reactions[reaction.title](reaction.options);
            }
        });
    }
};
