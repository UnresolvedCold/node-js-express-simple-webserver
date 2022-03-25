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

var PORT = process.env.PORT || 3000

app.listen(PORT).on('listening', function() {
    console.log('Listening on port '+this.address().port);
});