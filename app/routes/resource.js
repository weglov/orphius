var express = require('express');
var rdb = require('../db/database');
var router = express.Router();
var auth = require('../db/auth');

var table = 'resource';


router.post('/', auth.authorize, function (req, res) {
		if (req.body.m && req.body.url && req.body.resource) {
			var newM = {
            m: req.body.m,
            left: req.body.left,
            right: req.body.right,
            check: req.body.check || false,
            url: req.body.url,
            resource: req.body.resource
        	};
		} else {
			var incorrectError = new Error('incorrect mistake');
            incorrect.code = 401;
            return next(incorrect);
		}
        

        rdb.save(table, newM)
        .then(function (result) {
            res.json(result);
        });
});



module.exports = router;
