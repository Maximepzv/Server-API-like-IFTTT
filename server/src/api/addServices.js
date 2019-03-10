import { Router } from 'express';
import passport from 'passport';
import Token from '../lib/token'
import config from "../../properties/config";

export default () => {
    let router = Router();
    let token = new Token();

    /* GOOGLE */
    router.get('/google', passport.authenticate('google', {session: false, accessType: "offline", prompt: 'consent', scope: config.google.scope}), function (req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }

        // prepare token for API
        req.auth = {
            id: req.user.id
        };

        next();
    }, token.generateToken, token.sendToken);

    return router;
}
