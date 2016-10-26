var express = require('express');
var rdb = require('../db/database');
var auth = require('../db/auth');
var router = express.Router();
var table = 'users';

// Get information about a user. 
router.get('/:id', auth.authorize, function (req, res, next) {
    rdb.find(table, req.params.id)
    .then(function (user) {
        if(!user) {
            var notFoundError = new Error('User not found');
            notFoundError.status = 404;
            return next(notFoundError);
        }

        res.json(user);
    });
});


module.exports = router;