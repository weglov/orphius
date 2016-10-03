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

// Get a list of users matching the query.
router.get('/search/:id', auth.authorize, function (req, res, next) {
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


// REGISTRATION NEW USER
router.post('/', function (req, res, next) {
    rdb.findBy(table, 'email', req.body.email)
    .then(function (user) {
        user = user[0];
        // email is busy
        if(user) {
            var emailIsBusy = new Error('email is busy');
            emailIsBusy.status = 403;
            return next(emailIsBusy);
        }
        // new user
        auth.hash_password(req.body.password)
            .then(function (hash) {
                    var newUser = {
                        email: req.body.email,
                        password: hash,
                        active: req.body.active || true
                    };

                    rdb.save(table, newUser)
                    .then(function (result) {
                        res.json(result);
                    });
            })
        .catch(function(e) {
            var emailIsBusy = new Error('password wrong');
            emailIsBusy.status = e;
            return next(emailIsBusy);
        });
    })
});

// CHANGE USER
router.put('/:id', auth.authorize, function (req, res) {
    rdb.find(table, req.params.id)
    .then(function (user) {
        var updateUser = {
            name: req.body.user || user.name,
            email: req.body.email || user.email
        };

        rdb.edit('user', user.id, updateUser)
        .then(function (results) {
            res.json(results);
        });
    });
});

// DELETE USER
router.delete('/:id', auth.authorize, function (req, res) {
    rdb.destroy(table, req.params.id)
    .then(function (results) {
        res.json(results);
    });
});

module.exports = router;