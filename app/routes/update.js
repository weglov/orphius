var express = require('express');
var rdb = require('../db/database');
var auth = require('../db/auth');
var token = require('../db/token');

var router = express.Router();

router.get('/', function (req, res, next) {
    rdb.updateDBT()
    .then(function (result) {
        res.json(result);
    })
});

module.exports = router;