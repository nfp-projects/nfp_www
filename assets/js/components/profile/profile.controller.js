'use strict';

var m = require('mithril');
var auth = require('../../helpers/authentication');

var profile = require('./profile.model');
require('./profile.view');

profile.controller = function() {
  if (!auth.loggedIn) return m.route('/login');
  this.vm = profile.vm.init();
};

module.exports = profile;
