const weather = require('openweather-apis');
import config from '../../properties/config'
const CronJob = require('cron').CronJob;

export default class {
    constructor(param) {
        this.param = param;
        weather.setAPPID(config.openweatherApis.key);
        this.weatherInit(this.param);
    }

    async start() {
        let weatherFunctions = [
            this.temperatureBelow,
            this.temperatureAbove,
            this.pressureBelow,
            this.pressureAbove,
            this.humidityAbove,
            this.humidityBelow
        ];
        weatherFunctions[Number(this.param.fn)](Number(this.param.limit));
        //setInterval(weatherFunctions[this.param.fn], 5 * 60 * 1000, this.param.limit);
    }

    weatherInit(json) {
        weather.setLang('en');
        weather.setCity(json.city);
        weather.setUnits(json.units);
    }

    temperatureBelow(limit) {
        console.log('temperature Below');
        new CronJob("* * * * * *", function () {
            weather.getTemperature(function(err, result) {
                if (err) console.log(err);
                console.log(result);
                if (limit > result) {
                    console.log("La température est en dessous de la limite");
                }
            });
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
