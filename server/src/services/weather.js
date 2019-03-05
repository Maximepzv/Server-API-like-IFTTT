const weather = require('openweather-apis');
import config from '../../properties/config'
const CronJob = require('cron').CronJob;

export default class {
    constructor(param) {
        this.param = param;
        weather.setAPPID(config.openweatherApis.key);
        weather.setLang('en');
        weather.setCity(this.param.city);
        weather.setUnits(this.param.units);
    }

    job() {
        /*return new CronJob("* * * * * *",
            this.chooseFunction(Number(this.param.fn), Number(this.param.limit)), 'France/Paris');*/
        let weatherFunctions = [
            this.temperatureBelow,
            this.temperatureAbove,
            this.pressureBelow,
            this.pressureAbove,
            this.humidityAbove,
            this.humidityBelow
        ];
        return new CronJob("0 */5 * * * *", function (param) {
            console.log(new Date);
            weatherFunctions[Number(param.fn)](Number(param.limit));
        }, this.param);
    };

    temperatureBelow(limit) {
            weather.getTemperature(function(err, result) {
                if (err) console.log(err);
                if (limit > result) {
                    console.log("La température est en dessous de la limite");
                }
            });
    }

    temperatureAbove(limit) {
        weather.getTemperature(function(err, result) {
            if (err) console.log(err);
            if (limit < result) {
                console.log("La température est au dessus de la limite");
            }
        });
    }

    pressureBelow(limit) {
        weather.getPressure(function(err, result) {
            if (err) console.log(err);
            if (limit > result) {
                console.log("La pression est en dessous de la limite");
            }
        });
    }

    pressureAbove(limit) {
        weather.getPressure(function(err, result) {
            if (err) console.log(err);
            if (limit < result) {
                console.log("La pression est au dessus de la limite");
            }
        });
    }

    humidityBelow(limit) {
        weather.getPressure(function(err, result) {
            if (err) console.log(err);
            if (limit > result) {
                console.log("L'humidité est en dessous de la limite");
            }
        });
    }

    humidityAbove(limit) {
        weather.getPressure(function(err, result) {
            if (err) console.log(err);
            if (limit < result) {
                console.log("L'humidité est au dessus de la limite");
            }
        });
    }
}
