const CronJob = require('cron').CronJob;

module.exports = {
    on_every_tick: function(options, reaction, List, user) {
        /* OPTIONS FORMAT :
           'cronTime':  options.cronTime,
        */
        new CronJob(options.cronTime, function () {
            List.reactions[reaction.title](reaction.options, user);
        }, 	null, false, 'Europe/Paris').start();
    }
};
