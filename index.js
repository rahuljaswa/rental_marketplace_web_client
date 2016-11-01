'use strict';

var express = require('express');
var app = express();

var localhostPort = 8000;

app.use(function(req, res, next) {
	if ((req.headers['x-forwarded-proto'] != 'https') && (req.headers.host != ('localhost:' + localhostPort))) {
		return res.redirect(['https://', req.get('Host'), req.url].join(''));
	}
	next();
});

app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN));

app.use(express.static(__dirname + '/app'));

app.all('/*', function(req, res) {
	res.sendfile('app/index.html');
});

var port = process.env.PORT || localhostPort;

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
