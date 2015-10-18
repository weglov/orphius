
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var MistakeSchema = new mongoose.Schema({
    name: String,
    sku: String,
    price: Number
});

// Return model
module.exports = restful.model('mistakes', MistakeSchema);
