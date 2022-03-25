var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser')
var upload = multer();

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

// Default route
var help_api = require('./help');
app.use('/', help_api);

// Use API route
var api = require('./api');
app.use('/api', api);

app.listen(3000).on('listening', function() {
    console.log('Listening on port 3000');
});