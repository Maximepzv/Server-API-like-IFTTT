import jwt from 'jsonwebtoken';
// import config
import config from '../../properties/config.json';

export default class {
    createToken(user) {
        return jwt.sign(user.toJSON(), config.auth.secret);
    }

    generateToken(req, res, next) {
        req.token = jwt.sign(req.user.toJSON(), config.auth.secret);
        next();
    }

    getToken(headers) {
        if (headers && headers.authorization) {
            let parted = headers.authorization.split(' ');

            if (parted.length === 2) {
                return parted[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    sendToken(req, res) {
        res.json({success: true, token: 'JWT ' + req.token, user: req.user});
    }
}

