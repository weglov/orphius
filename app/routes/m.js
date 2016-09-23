var express = require('express');
var rdb = require('../db/database');
var router = express.Router();
var auth = require('../db/auth');

var table = 'm';

router.get('/:resource', auth.authorize, function (req, res, next) {
    rdb.findIndexed(table, req.params.resource, 'resource')
    .then(function (m) {
        if(!m) {
            var notFoundError = new Error('Resource not found');
            notFoundError.status = 404;
            return next(notFoundError);
        }
        res.json(m);
    });
});

router.get('/changes/:id', function (req, res, next) {
    rdb.changes(table, req.params.id)
    .then(function (m) {
        res.json(m);
    });
});

router.post('/', function (req, res) {
		if (req.body.m && req.body.url && req.body.resource) {
			var newM = {
            m: req.body.m,
            left: req.body.left || '',
            right: req.body.right || '',
            check: req.body.check || false,
            url: req.body.url,
            resource: req.body.resource
        	};
		} else {
			var incorrectError = new Error('incorrect mistake');
            incorrect.status = 401;
            return next(incorrect);
		}
        

        rdb.save(table, newM)
        .then(function (result) {
            res.json(result);
        });
});

router.put('/:id', auth.authorize, function (req, res) {
    rdb.find(table, req.params.id)
    .then(function (m) {
        var updateM = {
            check: req.body.check || m.check,
        };

        rdb.edit(table, check.id, updateUser)
        .then(function (results) {
            res.json(results);
        });
    });
});

router.delete('/:id', auth.authorize, function (req, res) {
    rdb.destroy(table, req.params.id)
    .then(function (results) {
        res.json(results);
    });
});




module.exports = router;
