'use strict';

var m = require('mithril');
var layout = require('./components/layout/layout');
var home = require('./components/home/home.controller');

m.module(document.body, layout);
m.route(document.getElementById("content"), '/', {
  '/': home
});
