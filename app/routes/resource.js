var express = require('express');
var rdb = require('../db/database');
var auth = require('../db/auth');
var router = express.Router();
var table = 'resource';


    // Search by query and access control
router.get('/self/:userid', function (req, res, next) {
    rdb.findAccsess(table, 'access', req.params.userid)
    .then(function (resource) {
        if(!resource) {
            var notFoundError = new Error('resource not found');
            notFoundError.status = 404;
            return next(notFoundError);
        }
        res.json(resource);
    });
});

// Get information about a resource. 
router.get('/:id', auth.authorize, function (req, res, next) {
    rdb.find(table, req.params.id)
    .then(function (resource) {
        if(!resource) {
            var notFoundError = new Error('resource not found');
            notFoundError.status = 404;
            return next(notFoundError);
        }
        res.json(resource);
    });
});

// Get a list of resource matching the query.
router.get('/search/:id', auth.authorize, function (req, res, next) {
    rdb.find(table, req.params.id)
    .then(function (resource) {
        if(!resource) {
            var notFoundError = new Error('resource not found');
            notFoundError.status = 404;
            return next(notFoundError);
        }

        res.json(resource);
    });
});



router.post('/', auth.authorize, function (req, res) {
		if (req.body.name && req.body.source) {
			var newResourse = {
            name: req.body.name,
            access: req.body.access || {},
            source: req.body.source || '',
            settings: req.body.settings || {}
        	};
		} else {
			var incorrectError = new Error('incorrect resourse');
            incorrect.code = 401;
            return next(incorrect);
		}
        

        rdb.save(table, newResourse)
        .then(function (result) {
            res.json(result);
        });
});

router.put('/:id', auth.authorize, function (req, res) {
    rdb.find(table, req.params.id)
    .then(function (resource) {
        var updateResource = {
            name: req.body.name || resource.name,
            access: req.body.access || resource.access,
            source: req.body.source || resource.source,
            settings: req.body.settings || resource.settings
        };

        rdb.edit(table, resource.id, updateResource)
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
