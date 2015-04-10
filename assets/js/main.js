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

//Add debug components to window. Allows us to play with controls
//in the console. 
window.components = {};

//Helper modules
require('es6-promise').polyfill();

var m = require('mithril');
var _ = require('lodash');
window.components.m = m;
var generic = require('./components/public/generic/generic.controller');

try
{
  var authentication = require('./helpers/authentication');

  //Configure mithril
  m.route.mode = 'pathname';

  //Init authentication
  authentication.init();

  var pub = require('./components/public/public');
  var admin = require('./components/admin/admin');

  m.route(document.getElementById('container'), '/', _.merge(admin.routes(), pub.routes()));
}
catch (error) {
  m.render(document.body, m('#container.container', generic('error').view(error)));
}
