var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var FacebookTokenStrategy = require('passport-facebook-token');

// load up the user model
var User = require('../models/user');
var dbConfig = require('./database'); // get db config file
var config = require('./oauth');

module.exports = function(passport) {
    /* LOCAL STRATEGY */
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = dbConfig.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
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

    passport.use(new FacebookTokenStrategy({
            clientID: config.oauth.facebook.clientID,
            clientSecret: config.oauth.facebook.clientSecret
        },
        function(accessToken, refreshToken, profile, done) {
            User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
            });
        }
    ));
};
