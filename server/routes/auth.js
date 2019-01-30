var passport = require('passport');
var config = require('../config/database');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");

/* LOCAL ROUTER */

router.post('/signup', function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass email and password.'});
    } else {
        let newUser = new User({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username or Email already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

router.post('/signin', function(req, res) {
    User.findOne({$or:[
            {username: req.body.username},
            {email: req.body.username}
    ]}, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), config.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

router.get('/testAuth', passport.authenticate('jwt', { session: false}), function(req, res) {
    let token = getToken(req.headers);

    if (token) {
        return res.status(200).send({success: true, msg: 'Authorized.'});
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

generateToken = function (req, res, next) {
    req.token = createToken(req.user);
    next();
};

sendToken = function (req, res) {
    res.json({success: true, token: 'JWT ' + req.token});
};

createToken = function(user) {
    return jwt.sign(user.toJSON(), config.secret);
};

router.post('/auth/facebook', passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }

        // prepare token for API
        req.auth = {
            id: req.user.id
        };

        next();
    }, generateToken, sendToken);

getToken = function (headers) {
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
};

module.exports = router;
