var express = require('express');
var rdb = require('../db/database');
var auth = require('../db/auth');
var router = express.Router();
var table = 'm';

// Get information about resource. 
router.get('/:id', auth.authorize, function (req, res, next) {
    rdb.stat(table, req.params.id)
    .then(function (stats) {
        if(!stats) {
            var notFoundError = new Error('User not found');
            notFoundError.status = 404;
            return next(notFoundError);
        }
        
        res.json(stats);
    });
});


module.exports = router;