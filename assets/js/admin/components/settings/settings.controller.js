'use strict';

var m = require('mithril');
var settings = require('./settings.model');
var auth = require('../../../helpers/authentication');
require('./settings.view');

settings._controller = function() {
  this.layout = 'admin';
  if (!auth.loggedIn || auth.user.level < 2) return m.route('/login');
  this.action = m.route.param('action');
  this.vm = settings.vm.init(this);
}

module.exports = settings;
