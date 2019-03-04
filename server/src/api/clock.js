import { Router } from 'express';
import Clock from '../services/clock';

// new CronJab('seconds minutes hours dayOfMonth months dayOfWeek')
// Asterisk. E.g. *
// Ranges. E.g. 1-3,5
// Steps. E.g. */2

// "0 {00, 15, 30, 45} * * * *" Every hour at {00, 15, 30, 45}
// "0 {00, 15, 30, 45} {0-23} * * *" Every day at {0-23}:{00, 15, 30, 45}

export default () => {
    let router = Router();

    router.post('/clock', function(req, res, next) {
        let param = req.body.param;
        console.log(param);
        let clock = new Clock(param);
        try {
            let job = clock.job();
            job.start();
        }
        catch (e) {
            return res.status(500).send({success: false, msg: 'Invalid request. No cron job created.'});
        }
        return res.status(200).send({success: true, msg: 'New cron job with param: ' + req.body.param});
    });

    return router;
}
