import { Router } from 'express';
import Rss from '../services/rss';

export default () => {
    let router = Router();

    router.post('/rss', function(req, res, next) {
        let param = {
            'url': req.body.url,
            'title': req.body.title,
            'content': req.body.content
        };
        console.log(param);
        let rss = new Rss(param);
        try {
            let job = rss.job();
            job.start();
        }
        catch (e) {
            return res.status(500).send({success: false, msg: 'Invalid request. RSS reader has failed.'});
        }
        return res.status(200).send({success: true, msg: 'New rss reader with param: ' + req.body.url});
    });

    return router;
}
