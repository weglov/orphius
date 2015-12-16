
// Dependencies
var express = require('express');
var router = express.Router();
var cors = require('cors');
var jwt    = require('jsonwebtoken');
var config = require('../config'); 

// Models
var Orph = require('../models/orph');
var Resourse = require('../models/resourse');
var User   = require('../models/user');
var app = express();
var bodyParser = require('body-parser');

app.set('superSecret', config.secret); 

// 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Routes

Orph.methods(['get', 'put', 'post', 'delete']);
Orph.register(router, '/orph');

Resourse.methods(['get', 'put', 'post', 'delete']);
Resourse.register(router, '/resourse');


User.methods(['get', 'put', 'post', 'delete']);
User.register(router, '/user');


router.post('/authenticate', function(req, res) {
	// find the user
	User.findOne({
		email: req.body.email
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: config.ru.auth_fail_user });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: config.ru.auth_fail_password });
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}		

		}

	});
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
router.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
});

router.get('/check', function(req, res) {
	res.json(req.decoded);
});


router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// Return router
module.exports = router;
