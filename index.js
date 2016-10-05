'use strict';

var express = require('express');
var app = express();

app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN));

var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/app'));

app.all('/*', function(req, res) {
	res.sendfile('app/index.html');
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
