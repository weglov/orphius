
// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Mistake = require('../models/mistake');

// Routes
Mistake.methods(['get', 'put', 'post', 'delete']);
Mistake.register(router, '/mistakes');

// Return router
module.exports = router;
