'use strict';

var m = require('mithril');
var layout = require('./layout');
var home = require('./components/home/home.controller');
var header = require('./components/header/header.controller');

//Render the basic layout first
m.render(document.body, layout());

m.module(document.getElementById("header"), header);
m.route(document.getElementById("content"), '/', {
  '/': home
});
