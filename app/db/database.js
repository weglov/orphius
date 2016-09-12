var rdb = require('rethinkdb');
var CONFIG = require('../../config');

var connection = rdb.connect(dbConfig)
.then(function (connection) {

    module.exports.find = function (tableName, id) {
        return rdb.table(tableName).get(id).run(connection)
        .then(function (result) {
            return result;
        });
    };

});