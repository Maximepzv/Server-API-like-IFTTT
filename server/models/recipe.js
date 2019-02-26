// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    firstService: String,
    action: String,
    secondService: String,
    reaction: String
});

// methods ====================================================================


// create the model for users and expose it to our app
module.exports = mongoose.model('Recipe', RecipeSchema);
