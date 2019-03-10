import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import FacebookTokenStrategy from 'passport-facebook-token';
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

import User from '../models/user'
import jwt from 'jsonwebtoken';

// import config
import config from '../../properties/config.json';

import Token from './token';

export default (app) => {

    let token = new Token();

    // add strategy
    let jwtOptions = {
        "jwtFromRequest": ExtractJwt.fromExtractors([ExtractJwt.fromUrlQueryParameter("token"), ExtractJwt.fromAuthHeaderWithScheme("jwt")]),
        "secretOrKey": config.auth.secret
    };

    passport.use(new Strategy(jwtOptions, function(jwt_payload, done) {
        User.findOne({_id: jwt_payload._id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));

    /* FACEBOOK STRATEGY */
    passport.use(new FacebookTokenStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            if (req.user) {
                User.findOne(
                    {'_id': req.user._id},
                    function (err, user) {
                        user.facebook.id = profile.id;
                        user.facebook.token = accessToken;
                        user.facebook.refreshToken = refreshToken;
                        user.facebook.email = profile.emails[0].value;
                        user.save();
                        return done(null, req.user);
                    }
                );
            } else {
                User.upsertFbUser(accessToken, refreshToken, profile, function (err, user) {
                    return done(err, user);
                });
            }
        }
    ));

    /* GOOGLE STRATEGY */
    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: "http://localhost:8080/api/auth/google/callback",
            passReqToCallback : true
        },
        function(req, accessToken, refreshToken, profile, done) {
            if (req.user) {
                User.findOne(
                    {'_id': profile.id},
                    function (err, user) {
                        user.google.id = profile.id;
                        user.google.token = accessToken;
                        user.google.refreshToken = refreshToken;
                        user.google.email = profile.emails[0].value;
                        user.save();
                        return done(null, req.user);
                    }
                );
            } else {
                User.upsertGoogleUser(accessToken, refreshToken, profile, (err, user) => {
                    return done(err, user);
                });
            }
        }
    ));
    //append to app
    app.use(passport.initialize());

    // add login route
    app.post('/api/signup', function(req, res) {
        if (!req.body.email || !req.body.password) {
            res.json({success: false, msg: 'Please pass email and password.'});
        } else {
            let newUser = new User({
                'local.password': req.body.password,
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                'local.email': req.body.email
            });
            // save the user
            newUser.save(function(err) {
                if (err) {
                    return res.json({success: false, msg: 'Email already exists.'});
                }
                res.json({success: true, msg: 'Successful created new user.'});
            });
        }
    });

    app.post('/api/signin', function(req, res, next) {
        User.findOne(
            {'local.email': req.body.email}
            , function(err, user) {
                if (err) throw err;

                if (!user) {
                    res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
                } else {
                    // check if password matches
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            // if user is found and password is right create a token
                            // return the information including token as JSON
                            req.user = user;
                            next();
                        } else {
                            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                        }
                    });
                }
            });
    }, token.generateToken, token.sendToken);

    /* FACEBOOK */
    app.post('/api/auth/facebook', passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }

        // prepare token for API
        req.auth = {
            id: req.user.id
        };

        next();
    }, token.generateToken, token.sendToken);

    /* GOOGLE */
    app.get('/api/auth/google', passport.authenticate('google', {session: false, accessType: "offline", prompt: 'consent', scope: config.google.scope}));

    app.get('/api/auth/google/callback',
        passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:8081/signin' }),
        function(req, res) {
            const token = jwt.sign(req.user.toJSON(), config.auth.secret);
            res.redirect('http://localhost:8081/signin?token=' + token);
        });
}
