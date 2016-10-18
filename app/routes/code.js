var express = require('express');
var router = express.Router();


// Get information about a resource. 
router.get('/:id',  function (req, res, next) {
    res.sendFile(__dirname + '/code/v1.js');
});


module.exports = router;
