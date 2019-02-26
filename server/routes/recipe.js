var passport = require('passport');
var config = require('../config/database');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var Recipe = require('../models/recipe');
var mongoose = require('mongoose');

router.get('/getRecipes', passport.authenticate('jwt', { session: false}), function(req, res) {
    let token = getToken(req.headers);

    if (token) {
        console.log(req.user);
        return res.status(200).send({success: true, msg: 'WIP.'});
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/getServices', passport.authenticate('jwt', { session: false}), function(req, res) {
    let token = getToken(req.headers);

    if (token) {
        User.find(req.user, 'google twitter facebook' , function (err, docs) {
            return res.status(200).send({success: true, msg: docs});
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/getServicesByAction', passport.authenticate('jwt', { session: false}), function(req, res) {
    let token = getToken(req.headers);

    if (token) {
        console.log(req.user);
        return res.status(200).send({success: true, msg: 'WIP.'});
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/getActionsByService', passport.authenticate('jwt', { session: false}), function(req, res) {
    let token = getToken(req.headers);

    if (token) {
        console.log(req.user);
        return res.status(200).send({success: true, msg: 'WIP.'});
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

module.exports = router;
