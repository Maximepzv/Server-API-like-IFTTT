import { Router } from 'express';
import User from '../models/user'
import Actions from '../../properties/actionsByService'
import Services from '../../properties/servicesByAction'
import Reactions from '../../properties/reactionsByService'

export default () => {
    let router = Router();

    router.get('/getServices', function(req, res) {
        User.find(req.user, function (err, docs) {
            return res.status(200).send({success: true, msg: docs});
        });
    });

    router.get('/getActionsByService/:service', function(req, res) {
        const service = req.params.service;
        return res.status(200).send({success: true, msg: Actions[service]});
    });

    router.get('/getServicesByAction/:action', function(req, res) {
        const action = req.params.action;
        return res.status(200).send({success: true, msg: Services[action]});
    });

    router.get('/getReactsByService/:service', function(req, res) {
        const service = req.params.service;
        return res.status(200).send({success: true, msg: Reactions[service]});
    });

    return router;
}
