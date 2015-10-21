var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

// Schema
var resourseSchema = new mongoose.Schema({
	name: String,
	url: String
});

// Return model
module.exports = restful.model('Resourse', resourseSchema);
