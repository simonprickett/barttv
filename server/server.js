"use strict";

var express = require('express'),
	app = express(),
	port = process.env.PORT || 8000,
	http = require('http'),
	bodyParser = require('body-parser');

app.use(function(req, res, next) {
	console.log('%s %s %s', req.method, req.url, req.path);
	next();
});

app.use(bodyParser.json());
app.use(express.static('app'));

app.get('/heartbeat', function(req, res) {
	res.status(200).send('OK');
});

require('./routes')(app);

http.createServer(app).listen(port);
console.log('barttv server on port %s', port);