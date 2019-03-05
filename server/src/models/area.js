// load the things we need
let mongoose = require('mongoose');

// define the schema for our user model
let Schema = mongoose.Schema;

let AreaSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    action: {
        title: {
            type: String
        },
        options: {
            type: Object
        }
    },
    reaction: {
        title: {
            type: String
        },
        options: {
            type: Object
        }
    }
 });

// methods ====================================================================


// create the model for users and expose it to our app
module.exports = mongoose.model('Recipe', AreaSchema);
