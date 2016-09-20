var express = require('express');
var rdb = require('../db/database');
var router = express.Router();
var auth = require('../db/auth');


router.get('/', auth.authorize, function (req, res) {
    rdb.findAll('m')
    .then(function (m) {
        res.json(m);
    });
});

router.post('/', auth.authorize, function (req, res) {
        var newM = {
            m: req.body.m,
            left: req.body.left,
            right: req.body.right,
            url: req.body.right,
            account: req.body.site
        };

        rdb.save('m', newM)
        .then(function (result) {
            res.json(result);
        });
});


module.exports = router;