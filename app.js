var express = require('express');
var bodyParser = require('body-parser');
var CONFIG = require('./config');
var socketAction = require('./app/socket/io.js');
// guard 
var cors = require('cors');
var helmet = require('helmet');
// router
var m = require('./app/routes/m');
var update = require('./app/routes/update');
var users = require('./app/routes/users');
var login = require('./app/routes/login');
var resource = require('./app/routes/resource');
var code = require('./app/routes/code');
var stats = require('./app/routes/stats');
var router = express.Router();
var port = process.env.PORT || 888;


var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(888);





// sockio
socketAction(io)


// MIDDLEWHERE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(helmet());



// Routers
app.use(CONFIG.api + '/update', update);
app.use(CONFIG.api + '/m', m);
app.use(CONFIG.api + '/users', users);
app.use(CONFIG.api + '/login', login);
app.use(CONFIG.api + '/resource', resource);
app.use(CONFIG.api + '/code', code);

app.use(CONFIG.api + '/stats', stats);


// Main page version
app.get('/', function(req, res) {
    res.send('Current version on: ' + CONFIG.api);
});

// Главный роутер
app.use(CONFIG.api, router);


// error all header 200 code
app.use(function (error, request, response, next) {
    response.status(200);
    response.json({ 
    	status: false,
    	code: error.status,
    	message: error.message
    });
});


