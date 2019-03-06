const CronJob = require('cron').CronJob;

module.exports = {
    start: function(options, reaction, List) {
        console.log('START CLOCK ACTION');
        new CronJob(options.cronTime, function () {
            List.reactions[reaction.title](reaction.options);
        }).start();
    }
};
