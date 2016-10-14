var express = require('express');
var rdb = require('../db/database');
var router = express.Router();
var auth = require('../db/auth');

var table = 'm';


router.post('/', function (req, res) {
		if (req.body.m && req.body.url && req.body.resource) {
			var newM = {
            m: req.body.m,
            left: req.body.left || '',
            right: req.body.right || '',
            check: req.body.check || false,
            url: req.body.url,
            resource: req.body.resource,
            title: req.body.title || '',
            options: req.body.option || {},
            timestamp: new Date().getTime()
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

router.get('/', function (req, res) {
    rdb.findByResourse(table, req.query.resource, parseInt(req.query.offset), parseInt(req.query.count))
    .then(function (m) {
         if(!m) {
             var notFoundError = new Error('Resource mistake not found');
             notFoundError.status = 404;
             return next(notFoundError);
         }
         res.json(m);
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
