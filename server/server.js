var express= require('express');
var mongoose = require('mongoose');

var app = express();

app.get('/', function(req,res){
	res.send('working');
});

app.listen(3000);
console.log('API is runnung');