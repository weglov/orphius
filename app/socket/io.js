var r = require('rethinkdb');
var CONFIG = require('../../config');

module.exports = function(io) {
	r.connect(CONFIG).then(function(c) {
	  r.table("m").changes().run(c)
	    .then(function(cursor) {
	      cursor.each(function(err, item) {
	        io.emit("m", item);
	      });
	    });
	});
}
