var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var CONFIG = require('./config');
var router = express.Router();
var m = require('./app/routes/m')
var app = express();

// MIDDLEWHERE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 888;

// router.route('/m').get(function(req, res) {
//     res.json({
//         "status": false,
//         "code": 400,
//         "message": "Метод несуществует",
//         "data": []
//     });
// });
app.use('/api/' + CONFIG.api + '/m', m);

// Text placeholder
app.get('/', function(req, res) {
    res.send('Current version on: ' + CONFIG.api);
});

app.use('/api/' + CONFIG.api, router);

app.listen(port);
console.log('localhost: ' + port);
