'use strict';
var m = require('mithril');

function routes() {
  //The routes for this website.
  var home = require('./home/home.controller');
  var releases = require('./releases/releases.controller');
  var profile = require('./profile/profile.controller');
  var login = require('./login/login.controller');
  var generic = require('./generic/generic.controller');

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
