var rdb = require('rethinkdb');
var CONFIG = require('../../config');
var connection = rdb.connect(CONFIG)
.then(function (connection) {
    module.exports.updateDBT = function(table) {
    return rdb.do(function() { return 1}).run(connection).then(function() {
        return Promise.all([
            rdb.tableCreate("m").run(connection),
            rdb.tableCreate("users").run(connection),
            rdb.tableCreate("resource").run(connection)
        ])
    }).then(function() {
        return Promise.all([
            rdb.table("m").indexCreate("resource").run(connection),
            rdb.table("m").indexCreate("timestamp").run(connection)
        ])
    }).error(function(err) {
         if (err.msg.indexOf("already exists") == -1) 
            return err;
    })
        .finally(function() {
         if (connection) connection.close();
        });
    };
    // find by id
    module.exports.find = function (tableName, id) {
        return rdb.table(tableName).get(id).run(connection)
        .then(function (result) {
            return result;
        });
    };
    // find by id
    module.exports.stat = function (tableName, id) {
        return rdb.table(tableName).getAll(id, {index: 'resource'}).count().run(connection)
            .then(function (result) {
                return result;
            });
    };
    // all table 
    module.exports.findAll = function (tableName) {
        return rdb.table(tableName).run(connection)
        .then(function (cursor) {
            return cursor.toArray();
        });
    };

    // return table with resourse and offset 
    module.exports.findByResourse = function (tableName, resource, offset, count) {
        var offset = offset || 0,
            count = count || 25,
            resource = resource || '';
        return rdb.table(tableName).getAll(resource, {index: 'resource'}).orderBy(rdb.desc('timestamp')).slice(offset,offset+count).run(connection)
        .then(function (cursor) {
            return cursor.toArray();
        });
    };

    // Search by query
    module.exports.findBy = function (tableName, fieldName, value) {
        return rdb.table(tableName).filter(rdb.row(fieldName).eq(value)).run(connection)
        .then(function (cursor) {
            return cursor.toArray();
        });
    };

    // Search by query and access control
    module.exports.findAccsess = function (tableName, access, value) {
        return rdb.table(tableName).filter(function(user) {
                    return user(access).contains(value)
                    }).run(connection)
        .then(function (cursor) {
            return cursor.toArray();
        });
    };

    // Search by query index
    module.exports.findIndexed = function (tableName, query, index) {
        return rdb.table(tableName).getAll(query, { index: index }).run(connection)
        .then(function (cursor) {
            return cursor.toArray();
        });
    };

    // Save in table
    module.exports.save = function (tableName, object) {
        return rdb.table(tableName).insert(object).run(connection)
        .then(function (result) {
            return result;
        });
    };

    // Edit in table
    module.exports.edit = function (tableName, id, object) {
        return rdb.table(tableName).get(id).update(object).run(connection)
        .then(function (result) {
            return result;
        });
    };

    // Delete in table
    module.exports.destroy = function (tableName, id) {
        return rdb.table(tableName).get(id).delete().run(connection)
        .then(function (result) {
            return result;
        });
    };

});