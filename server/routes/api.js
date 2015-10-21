
// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Orph = require('../models/orph');
var Resourse = require('../models/resourse');
var User   = require('../models/user');


// Routes
Orph.methods(['get', 'put', 'post', 'delete']);
Orph.register(router, '/orph');

Resourse.methods(['get', 'put', 'post', 'delete']);
Resourse.register(router, '/resourse');


User.methods(['get', 'put', 'post', 'delete']);
User.register(router, '/user');


router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// Return router
module.exports = router;
