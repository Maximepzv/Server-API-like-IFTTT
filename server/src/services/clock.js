const CronJob = require('cron').CronJob;

export default class {
    constructor(param) {
        this.param = param;
    }

    job() {
        return new CronJob(this.param, function () {
            const d = new Date();
            console.log(d);
        });
    };
}
