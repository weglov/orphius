## ORPHIUS
------
Орфиус

Новая версия v1

- WEBPACK
- ES6
- RethinkDB

File config.js remove from git-project
you have to create a file with contents in root folder


```

module.exports = {
    api: '/v1',
    host: 'localhost',
    port: 28015,
    db: 'orphio',
    secret: 'mysupersecret' 
};

```



##### USER:

`GET /users/:id` |  Get information about a user.

`GET /users/search/:id` |  Get a list of users matching the query.

`POST /users`  | Registration new user

`PUT /users/:id` |  Change information about a user

`DELETE /users/:id` |  Delete a user

`POST /login` |  Get token Authentication




##### RESOURCE:

`GET /resource/self/:userid`  | GET a full list of resources with user access.

`GET /resource/:id`  |  Get information about a resource.

`GET /resource/search/:id`  |  Get a list of resource matching the query.

`POST /resource`   | Registration new resource

`PUT /resource/:id`  |  Change information about a resource.

`DELETE /resource/:id`  |  Delete a resource.


##### MISTAKE:
