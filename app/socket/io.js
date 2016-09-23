var express = require('express');
var io = require('socket.io')();
var rdb = require('../db/database');


var socket = function(socket) {
		rdb.changes('m').then(function (m) {
          m.each(function(err, item) {
            io.sockets.emit('m', item);
          });
        });
}

module.exports = socket;