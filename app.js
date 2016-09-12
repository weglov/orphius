var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var CONFIG = require('./config');
var m = require('./app/routes/m');
var users = require('./app/routes/users');
var login = require('./app/routes/login');
var app = express();


var router = express.Router();
// MIDDLEWHERE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 888;

// Routers
app.use(CONFIG.api + '/m', m);
app.use(CONFIG.api + '/users', users);
app.use(CONFIG.api + '/login', login);

// Text placeholder
app.get('/', function(req, res) {
    res.send('Current version on: ' + CONFIG.api);
});

app.use(CONFIG.api, router);

app.listen(port);
console.log('localhost: ' + port);
