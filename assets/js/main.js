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
var generic = require('./components/generic/generic.controller');

try
{
  var authentication = require('./helpers/authentication');

  //Configure mithril
  m.route.mode = 'pathname';

  //Init authentication
  authentication.init();

  //The routes for this website.
  var home = require('./components/home/home.controller');
  var releases = require('./components/releases/releases.controller');
  var profile = require('./components/profile/profile.controller');
  var login = require('./components/login/login.controller');
  var generic = require('./components/generic/generic.controller');

  var content = document.getElementById('content');

  if (!content) return;

  m.route(document.getElementById('content'), '/', {
    '/': home,
    '/releases': releases,
    '/profile': profile,
    '/login': login,
    '/login/:action': login,
    '/error': generic('throw_error'),
    '/:other...': generic('not_found')
  });

  //Render the header & footer
  var header = require('./components/header/header.controller');
  var footer = require('./components/footer/footer.controller');
  m.module(document.getElementById('header'), header);
  m.module(document.getElementById('footer'), footer);
}
catch (error) {
  if (error.message !== 'Please ensure the DOM element exists before rendering a template into it.') {
    m.render(document.getElementById('container'), generic('error').view(error));
  }
}
