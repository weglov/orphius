
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var orphSchema = new mongoose.Schema({
    left: String,
    main: String,
    right: String,
    url: String
});

// Return model
module.exports = restful.model('orph', orphSchema);
