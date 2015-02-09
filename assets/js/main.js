/**
 * @license
 * nfp_www <https://nfp.is/>
 * Copyright 2015 Jonatan Nilsson <http://jonatan.nilsson.is/>
 *
 * All code for current website can be found on
 * https://github.com/nfp-projects/nfp_www in its original format.
 *
 * Available under WTFPL License (http://www.wtfpl.net/txt/copying/)
*/

'use strict';

//Helper modules
require('es6-promise').polyfill();
require('fastclick')(document.body);

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

setTimeout(function() {
  
  
  

  
}, 2000);




