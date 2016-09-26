var express = require('express');
var rdb = require('../db/database');


var socketAction = function(io, socket) {
	rdb.changes('m').then(function (item) {
          item.each((err, m) => {
          	console.log('Change detected', m);
        	io.emit('m', m);
          });
    });
}

module.exports = socketAction;