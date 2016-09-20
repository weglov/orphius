var express = require('express');
var rdb = require('../db/database');
var auth = require('../db/auth');
var token = require('../db/token');

var router = express.Router();

router.post('/', function (req, res, next) {
    rdb.findBy('users', 'email', req.body.email)
    .then(function (user) {
        user = user[0];
        // email is busy
        if(user) {
            var emailIsBusy = new Error('email is busy');
            emailIsBusy.status = 400;
            return next(emailIsBusy);
        }
        // new user
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
    })
});

module.exports = router;