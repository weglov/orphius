var express = require('express');
var bodyParser = require('body-parser');
var CONFIG = require('./config');
// guard 
var cors = require('cors');
var helmet = require('helmet');
// router
var m = require('./app/routes/m');
var users = require('./app/routes/users');
var login = require('./app/routes/login');
var resource = require('./app/routes/resource');
var router = express.Router();
var port = process.env.PORT || 888;

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(888);


// sockio


io.on('connection', function(socket) {  
    socket.emit('announcements', { message: 'A new user has joined!' });
});



// MIDDLEWHERE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(helmet());



// Routers
app.use(CONFIG.api + '/m', m);
app.use(CONFIG.api + '/users', users);
app.use(CONFIG.api + '/login', login);
app.use(CONFIG.api + '/resource', resource);

// Text placeholder
app.get('/', function(req, res) {
    res.send('Current version on: ' + CONFIG.api);
});

// Главный роутер
app.use(CONFIG.api, router);


// error
app.use(function (error, request, response, next) {
    response.status(200);
    response.json({ 
    	status: false,
    	code: error.status,
    	message: error.message
    });
});


