'use strict';

var appRoot = require('app-root-path');

//Our koa app
var koa = require('koa');
var app = koa();

var config = require('./lib/config');

//Logger
var logger = require('./lib/log');

//Middlewares
var koaLogger = require('koa-bunyan');
var koaStatic = require('koa-static');
app.use(koaLogger(logger, {
  level: 'debug',
  timeLimit: '100'
}));
app.use(koaStatic(appRoot.resolve('/dist')));

//routes
var index = require('./lib/request-handlers/index');
app.use(index.index);

app.listen(config.get('server:port'));
logger.info('Running www server on port', config.get('server:port'));
