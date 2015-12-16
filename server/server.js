
// // Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan      = require('morgan');
var cors = require('cors');
var config = require('./config'); 
// MongoDB
mongoose.connect(config.database);

// Express
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api'));
app.use(morgan('dev'));

app.set('superSecret', config.secret);

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:3000/api');
});




// Start server
app.listen(3000);
console.log('API is running on port 3000');
