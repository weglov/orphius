var express = require('express');
var rdb = require('../db/database');
var auth = require('../db/auth');
var token = require('../db/token');

var router = express.Router();

router.post('/', function (req, res, next) {
    rdb.findBy('users', 'email', req.body.email)
    .then(function (user) {
        user = user[0];

        if(!user) {
            var userNotFoundError = new Error('User not found');
            userNotFoundError.status = 404;
            return next(userNotFoundError);
        }

        auth.authenticate(req.body.password, user.password)
        .then(function (authenticated) {
            if(authenticated) {
                var currentUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: token.generate(user)
                };

                res.json(currentUser);
            } else {
                var authenticationFailedError = new Error('Authentication failed');
                authenticationFailedError.status = 401;
                return next(authenticationFailedError);
            }
        });
    })
});

module.exports = router;