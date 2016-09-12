var express = require('express');
var rdb = require('../db/rethink');
var router = express.Router();

router.post('/', function (req, res, next) {
  rdb.save('m', {id: 1})
    .then(function (m) {
    	res.json(m);
    })
});

module.exports = router;