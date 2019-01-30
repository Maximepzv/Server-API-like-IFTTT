// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    facebook: {
        token: String,
        id: String
    }
});

// methods ====================================================================

//if a document is not found, will be atomically created or (if specified) updated
/*UserSchema.statics.findOrCreate = require("find-or-create");*/

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.password && (this.isModified('password') || this.isNew)) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

UserSchema.statics.upsertFbUser = function (accessToken, refreshToken, profile, cb) {
    let that = this;

    return this.findOneAndUpdate({$or:[
            {email: profile.emails[0].value},
            {'facebook.id': profile.id}
        ]}, {
            email: profile.emails[0].value,
            'facebook.id': profile.id,
            'facebook.token': accessToken
        }, function(err, user) {
        // no user was found, lets create a new one
        if (!user) {
            var newUser = new that({
                email: profile.emails[0].value,
                facebook: {
                    id: profile.id,
                    token: accessToken
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
