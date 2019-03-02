import { Router } from 'express';

import addServices from './addServices';
import recipe from './recipe';

export default ({ }) => {
    let api = Router();

    // routes
    api.use('/add', addServices(api));
    api.use('/', recipe(api));
    api.get('/testAuth', function (req, res) {
        return res.status(200).send({success: true, msg: 'Authorized', user: req.user});
    });

    return api;
}
