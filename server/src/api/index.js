import { Router } from 'express';

import addServices from './addServices';
import recipe from './recipe';
import rss from "./rss";
import weather from './weather';
import area from './area';

export default ({ }) => {
    let api = Router();

    // routes
    api.use('/add', addServices(api));
    api.use('/', area(api));
    api.use('/', recipe(api));
    api.use('/', rss(api));
    api.use('/', weather(api));
    api.get('/testAuth', function (req, res) {
        return res.status(200).send({success: true, msg: 'Authorized', user: req.user});
    });

    return api;
}
