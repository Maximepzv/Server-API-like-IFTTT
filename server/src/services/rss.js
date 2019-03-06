let Parser = require('rss-parser');
const CronJob = require('cron').CronJob;

export default class {
    constructor(param) {
        this.param = param;
        this.oldItem = {
            title: '',
            content: ''
        };
        this.parser = new Parser();
    }

    job() {
        return new CronJob("0 */5 * * * *",
            async function (that) {
            const feed = await that.parser.parseURL(that.param.url);
            feed.items.forEach(item => {
                if (that.param.title !== undefined && that.param.title !== '') {
                    if (item.title.includes(that.param.title))
                        if (that.oldItem.title !== item.title) {
                            console.log('Title Trigger');
                            console.log(that.param.title);
                            console.log(item.title);
                            that.oldItem = item;
                        }
                } else if (that.param.content !== undefined && that.param.content !== '') {
                    if (item.content.includes(that.param.content))
                        if (that.oldItem.titem !== item.title) {
                            console.log('Content Trigger');
                            console.log(that.param.content);
                            console.log(item.content);
                            that.oldItem = item;
                        }
                }
            });
        }, this);
    }
}
