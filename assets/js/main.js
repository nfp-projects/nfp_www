'use strict';

var m = require('mithril');
var authentication = require('./helpers/authentication');

//Configure mithril
m.route.mode = "pathname";

//Init authentication
authentication.init();

//Render the header:
var header = require('./components/header/header.controller');
m.module(document.getElementById("header"), header);

//The routes for this website.
var home = require('./components/home/home.controller');
var releases = require('./components/releases/releases.controller');
var login = require('./components/login/login.controller');

m.route(document.getElementById("content"), '/', {
  '/': home,
  '/releases': releases,
  '/login': login,
  '/login/:action': login
});
