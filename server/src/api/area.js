import { Router } from 'express';
import Area from '../models/area';
const List = require('../services/list');

export default () => {
    let router = Router();

    router.get('/getArea', function(req, res) {
        Area.find({userId: req.user._id}, function (err, docs) {
            return res.status(200).send({success: true, msg: docs});
        });
    });

    router.put('/newArea', function (req, res) {
        // On essaye d'executer l'action
        List.actions[req.body.action.title](req.body.action.options, req.body.reaction, List);
        // TODO : CATCH si l'action échoue on retourne un message d'erreur
            //return res.status(501).send({success: false, msg: 'Not Implemented or invalid parameters'});
        // l'action s'exécuter correctement et enregistrement d'un nouveau document MongoDB area
        let newArea = new Area({
            userId: req.user._id,
            'action.title': req.body.action.title,
            'action.options': req.body.action.options,
            'reaction.title': req.body.reaction.title,
            'reaction.options': req.body.reaction.options,
        });
        // save the area
        newArea.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Unsuccessful created new area ' + err});
            }
            res.json({success: true, msg: 'Successful created new area.'});
        });
    });

    return router;
}
