var express = require('express');
var router = express.Router();
var rdb = require('../db/database');
var config = require('../../config.js');
var code = require('./code/v1.js');
// Get information about a resource. 
router.get('/:id.js',  function (req, res, next) {
    // Setting code
    var init = {
      resource: '',
      url: config.url + 'm'
    }
    
    // Полученние настроек ресурса
    rdb.find("resource", req.params.id)
      .then(function (resource) {
        init.resource = resource.id
        return resource;
    }).then(function(resource) {
        var data = {
          url: config.url + 'm',
          resource: resource.id
        }
        res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
        res.status(200).send(code(JSON.stringify(data)));
    })

   

});


module.exports = router;
