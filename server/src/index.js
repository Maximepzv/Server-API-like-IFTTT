// set up ======================================================================
// get all the tools
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import connectMongo from 'connect-mongo';
import session from 'express-session';

import api from './api';

// import config
import config from '../properties/config.json';

let app = express();

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(config.database.uri, { useCreateIndex: true, useNewUrlParser: true })
    .then(() =>  console.log('connection to database successful'))
    .catch((err) => console.error(err));

const MongoStore = connectMongo(session);
const db = mongoose.connection;

// change session strategy
app.use(session({
    secret: config.auth.secret,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db })
}));

import initializePassportUser from './passport-user';

app.use(cookieParser());

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.options('*', cors(config.server.cors));
app.use(cors(config.server.cors));

app.use(bodyParser.json({
    limit: config.server.bodyLimit
}));

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json
app.use(bodyParser.json());

try {
    //init passport
    initializePassportUser(app);

    // api router
    app.use('/api', passport.authenticate('jwt', { session: false }), api({ config }));

    // run server
    app.listen(config.server.port, () => {
        console.log(`Started on port ${config.server.port}`);
    });
}
catch (err) {
    console.error(err);
}

export default app;
