'use strict';

var m = require('mithril');

function routes() {
  //The routes for this website.
  var dashboard = require('./dashboard/dashboard.controller');
  var settings = require('./settings/settings.controller');

  return {
    '/admin': dashboard,
    '/admin/settings': settings,
    '/admin/settings/:action': settings,
    '/admin/settings/:action/:id': settings,
  };
}
exports.routes = routes;
