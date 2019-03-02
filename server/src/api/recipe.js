import { Router } from 'express';
import User from '../models/user'

export default () => {
    let router = Router();

    router.get('/getRecipes', function(req, res) {
        return res.status(200).send({success: true, msg: 'WIP.'});
    });

    router.get('/getServices', function(req, res) {
        User.find(req.user, function (err, docs) {
            return res.status(200).send({success: true, msg: docs});
        });
    });

    router.get('/getServicesByAction', function(req, res) {
        return res.status(200).send({success: true, msg: 'WIP.'});
    });

    router.get('/getActionsByService', function(req, res) {
        return res.status(200).send({success: true, msg: 'WIP.'});
    });

    return router;
}
