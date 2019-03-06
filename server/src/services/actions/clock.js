const CronJob = require('cron').CronJob;

module.exports = {
    start: function(options, reaction, List) {
        /* OPTIONS FORMAT :
           'cronTime':  options.cronTime,
        */
        new CronJob(options.cronTime, function () {
            List.reactions[reaction.title](reaction.options);
        }).start();
    }
};
