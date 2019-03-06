let Parser = require('rss-parser');
const CronJob = require('cron').CronJob;

module.exports = {
    start: function (options, reaction, List) {
        /* OPTIONS FORMAT :
           'url':      options.url,
           'title':    options.title,
           'content':  options.content,
        */
        let parser = new Parser();
        let oldItem = {
          title: '',
          content: ''
        };
        new CronJob("0 */5 * * * *",
        async function () {
            const feed = await parser.parseURL(options.url);
            feed.items.forEach(item => {
                if (options.title !== undefined && options.title !== '') {
                    if (item.title.includes(options.title))
                        if (oldItem.title !== item.title) {
                            List.reactions[reaction.title](reaction.options);
                            oldItem = item;
                        }
                } else if (options.content !== undefined && options.content !== '') {
                    if (item.content.includes(options.content))
                        if (oldItem.title !== item.title) {
                            List.reactions[reaction.title](reaction.options);
                            oldItem = item;
                        }
                }
            });
        }).start();
    }
};
