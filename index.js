
'use strict';

var express = require('express'),
    nunjucks = require('nunjucks'),
    path = require('path'),
    router = require('./router');

var app = express();

// Middlewares
app.use('/tmp/styles', express.static(path.join(__dirname, 'tmp', 'styles')));
app.use('/tmp/fonts', express.static(path.join(__dirname, 'tmp', 'fonts')));
app.use('/tmp/vendor', express.static(path.join(__dirname, 'tmp', 'vendor')));
app.use('/static', express.static(path.join(__dirname, 'static')));

router(app);

nunjucks.configure({ noCache: true });

// Start server
app.listen(8000, function () {
  console.log('server listening in http://localhost:8000');
});

