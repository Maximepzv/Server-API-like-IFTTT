const CronJob = require('cron').CronJob;

module.exports = {
    start: function(options, reaction, List) {
        console.log('START ACTION2');
        // TODO : DO SOMETHING WITH OPTIONS
        try {
            // Simule un trigger et lance une réaction
            new CronJob('* * * * * *', function () {
                List.reactions[reaction.title](reaction.options);
            }).start();
        }
        catch (e) {
            console.log('ACTION2 catch an error ' + e);
            return (e);
        }
    }
};
