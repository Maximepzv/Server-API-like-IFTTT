import { Router } from 'express';
import User from '../models/user';

export default () => {
    let router = Router();

    router.get('/getServices', function(req, res) {
        User.find(req.user, function (err, docs) {
            return res.status(200).send({success: true, msg: docs});
        });
    });

    return router;
}
