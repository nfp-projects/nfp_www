'use strict';
var m = require('mithril');

function routes() {
  //The routes for this website.
  var home = require('./components/home/home.controller');
  var releases = require('./components/releases/releases.controller');
  var profile = require('./components/profile/profile.controller');
  var login = require('./components/login/login.controller');
  var generic = require('./components/generic/generic.controller');

  return {
    '/': home,
    '/releases': releases,
    '/profile': profile,
    '/login': login,
    '/login/:action': login,
    '/error': generic('throw_error'),
    '/:other...': generic('not_found', 'public')
  };
}
exports.routes = routes;
