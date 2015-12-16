var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	email: String, 
    password: String, 
    name: String,
    admin: Boolean 
});




// Return model
module.exports = restful.model('User', userSchema);
