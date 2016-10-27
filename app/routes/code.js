var express = require('express');
var router = express.Router();
var rdb = require('../db/database');
var config = require('../../config.js');
var code = require('./code/v1.js');
var url = config.url || 'http://78.155.218.217:888/v1/'
// Get information about a resource. 
router.get('/:id.js',  function (req, res, next) {
    // Setting code
    var init = {
      resource: '',
      url: config.url + 'm'
    }
    
        var data = {
          url: url + 'm',
          resource: req.params.id
        }
        res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
        res.status(200).send(code(JSON.stringify(data)));
   

});


module.exports = router;
