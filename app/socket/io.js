var r = require('rethinkdb');
var CONFIG = require('../../config');

module.exports = function(io) {
	// join to room
		io.on('connection', function(socket) {
          socket.on('enterRoom', function (rooms){
          	rooms.forEach(function(index) {
          		socket.join(index.id);
          	});
          });
		});
	// event to room
	r.connect(CONFIG).then(function(c) {
	  r.table("m").changes().run(c)
	    .then(function(cursor) {
	      cursor.each(function(err, item) {
	      	io.to(item.new_val.resource).emit("m", item);
	      });
	    });
	});
}
