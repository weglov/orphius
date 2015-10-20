// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

// Schema
var siteSchema = new mongoose.Schema({
	name: String,
	orph: [{ type: Schema.Types.ObjectId, ref: 'orph' }]
});

// Return model
module.exports = restful.model('site', siteSchema);
