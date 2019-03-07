let Parser = require('rss-parser');
const CronJob = require('cron').CronJob;

module.exports = {
    matches_on_title: function (options, reaction, List) {
        /* OPTIONS FORMAT :
           'url':      options.url,
           'title':    options.title
        */
        let parser = new Parser();
        let oldTitle = '';
        new CronJob("0 */5 * * * *",
            async function () {
                const feed = await parser.parseURL(options.url);
                feed.items.forEach(item => {
                    if (options.title !== undefined && options.title !== '') {
                        if (item.title.includes(options.title) && oldTitle !== item.title) {
                            List.reactions[reaction.title](reaction.options);
                            oldTitle = item.title;
                        }
                    }
                });
        }).start();
    },

    matches_on_content: function (options, reaction, List) {
        /* OPTIONS FORMAT :
           'url':      options.url,
           'content':  options.content
        */
        let parser = new Parser();
        let oldContent = '';
        new CronJob("0 */5 * * * *",
            async function () {
                const feed = await parser.parseURL(options.url);
                feed.items.forEach(item => {
                    if (options.content !== undefined && options.content !== '') {
                        if (item.content.includes(options.content) && oldContent !== item.title) {
                            List.reactions[reaction.title](reaction.options);
                            oldContent = item.content;
                        }
                    }
                });
        }).start();
    }
};
