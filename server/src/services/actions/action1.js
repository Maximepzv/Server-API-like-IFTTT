const CronJob = require('cron').CronJob;

module.exports = {
    start: function(options, reaction, List, user) {
        console.log('START ACTION1');
        // TODO : DO SOMETHING WITH OPTIONS
        // Simule un trigger et lance une réaction
        new CronJob('* * * * * *', function () {
                List.reactions[reaction.title](reaction.options, user);
        }).start();
    }
};
