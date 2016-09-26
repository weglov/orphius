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
var rdb = require('./app/db/database');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(888);
var socketAction = require('./app/socket/io.js');

// sockio


io.on('connection', function(socket) {
        // socket event
        socketAction(io, socket);
        socket.on('disconnect', function () {
            
        })
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


