var express = require('express');
var rdb = require('../db/database');
var auth = require('../db/auth');
var router = express.Router();


router.get('/', auth.authorize, function (req, res) {
    rdb.findAll('users')
    .then(function (users) {
        res.json(users);
    });
});

router.get('/:id', auth.authorize, function (req, res, next) {
    rdb.find('users', req.params.id)
    .then(function (user) {
        if(!user) {
            var notFoundError = new Error('User not found');
            notFoundError.status = 404;
            return next(notFoundError);
        }

        res.json(user);
    });
});

router.post('/', function (req, res) {
    auth.hash_password(req.body.password)
    .then(function (hash) {
        var newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hash
        };

        rdb.save('users', newUser)
        .then(function (result) {
            res.json(result);
        });
    });
});

router.put('/:id', auth.authorize, function (req, res) {
    rdb.find('users', req.params.id)
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

router.delete('/:id', auth.authorize, function (req, res) {
    rdb.destroy('users', req.params.id)
    .then(function (results) {
        res.json(results);
    });
});

module.exports = router;