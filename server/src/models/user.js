// load the things we need
let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    local: {
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        }
    },
    facebook: {
        id: String,
        token: String,
        refreshToken: String,
        email: String
    },
    google: {
        id: String,
        token: String,
        refreshToken: String,
        email: String
    }
});

// methods ====================================================================

//if a document is not found, will be atomically created or (if specified) updated
/*UserSchema.statics.findOrCreate = require("find-or-create");*/

UserSchema.pre('save', function (next) {
    let user = this;
    if (this.local.password && (this.isModified('password') || this.isNew)) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.local.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.local.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.local.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

/* FACEBOOK INSERT OR UPDATE USER */
UserSchema.statics.upsertFbUser = function (accessToken, refreshToken, profile, cb) {
    let that = this;

    return this.findOneAndUpdate(
            {'facebook.id': profile.id},
        {
            'facebook.email': profile.emails[0].value,
            'facebook.id': profile.id,
            'facebook.token': accessToken,
            'facebook.refreshToken': refreshToken
        }, function(err, user) {
        // no user was found, lets create a new one
        if (!user) {
            let newUser = new that({
                facebook: {
                    id: profile.id,
                    token: accessToken,
                    email: profile.emails[0].value
                }
            });

            newUser.save(function(error, savedUser) {
                if (error) {
                    console.log(error);
                }
                return cb(error, savedUser);
            });
        } else {
            return cb(err, user);
        }
    });
};

/* GOOGLE INSERT OR UPDATE USER */
UserSchema.statics.upsertGoogleUser = function (accessToken, refreshToken, profile, cb) {
    let that = this;

    return this.findOneAndUpdate(
        {'google.id': profile.id},
        {
            'google.email': profile.emails[0].value,
            'google.id': profile.id,
            'google.token': accessToken,
            'google.refreshToken': refreshToken
        }, function(err, user) {
            // no user was found, lets create a new one
            if (!user) {
                let newUser = new that({
                    google: {
                        id: profile.id,
                        token: accessToken,
                        email: profile.emails[0].value,
                        refreshToken: refreshToken
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
};


// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);
