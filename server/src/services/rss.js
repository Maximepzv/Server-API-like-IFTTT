const FeedSub = require('feedsub');

export default class {
    constructor(param) {
        this.param = param;
        this.oldItem = {
            title: ''
        };
    }

    reader() {
        let reader = new FeedSub(this.param.url, {
           interval: 5 // Check feed every 10 minutes.
        });

        reader.on('item', (item) => {
            if (this.param.title === true) {
                if (item.title.includes(this.param.word)) {
                    if (this.oldItem.title !== item.title) {
                        // Trigger
                        this.oldItem = item;
                    }
                }
            } else {
                if (item.content.includes(this.param.word)) {
                    if (this.oldItem.title !== item.title) {
                        // Trigger
                        this.oldItem = item;
                    }
                }
            }
        });
        return reader;
    };
}
