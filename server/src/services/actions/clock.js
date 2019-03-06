const CronJob = require('cron').CronJob;

module.exports = {
    on_every_tick: function(options, reaction, List) {
        /* OPTIONS FORMAT :
           'cronTime':  options.cronTime,
        */
        new CronJob(options.cronTime, function () {
            List.reactions[reaction.title](reaction.options);
        }).start();
    }
};
