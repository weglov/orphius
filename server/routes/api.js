
// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Orph = require('../models/orph');
var Sites = require('../models/site');



// Routes
Orph.methods(['get', 'put', 'post', 'delete']);
Orph.register(router, '/orph');

Sites.methods(['get', 'put', 'post', 'delete']);
Sites.register(router, '/site');
// Return router
module.exports = router;
