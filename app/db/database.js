var rdb = require('rethinkdb');
var CONFIG = require('../../config');
var connection = rdb.connect(CONFIG)
.then(function (connection) {

    // module.exports.changes = function (tableName, id) {
    //     return rdb.table(tableName).changes().run(connection, (err, cursor) => {
    //         return cursor;
    //     });
    // };
    module.exports.find = function (tableName, id) {
        return rdb.table(tableName).get(id).run(connection)
        .then(function (result) {
            return result;
        });
    };

    module.exports.findAll = function (tableName) {
        return rdb.table(tableName).run(connection)
        .then(function (cursor) {
            return cursor.toArray();
        });
    };

    module.exports.findBy = function (tableName, fieldName, value, start, end) {
        var start = start || 0,
            end = end || 25;
        return rdb.table(tableName).filter(rdb.row(fieldName).eq(value)).slice(start,end).run(connection)
        .then(function (cursor) {
            return cursor.toArray();
        });
    };

    module.exports.findIndexed = function (tableName, query, index) {
        return rdb.table(tableName).getAll(query, { index: index }).run(connection)
        .then(function (cursor) {
            return cursor.toArray();
        });
    };

    module.exports.save = function (tableName, object) {
        return rdb.table(tableName).insert(object).run(connection)
        .then(function (result) {
            return result;
        });
    };

    module.exports.edit = function (tableName, id, object) {
        return rdb.table(tableName).get(id).update(object).run(connection)
        .then(function (result) {
            return result;
        });
    };

    module.exports.destroy = function (tableName, id) {
        return rdb.table(tableName).get(id).delete().run(connection)
        .then(function (result) {
            return result;
        });
    };

});