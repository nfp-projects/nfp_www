'use strict';

var m = require('mithril');
var dashboard = require('./dashboard.model');
var auth = require('../../../helpers/authentication');

//this enforces that view is loaded with the controller.
require('./dashboard.view');

dashboard._controller = function() {
  this.layout = 'admin';
  
  if (!auth.loggedIn || auth.user.level < 2) return m.route('/login');
  dashboard.vm.init();
};

module.exports = dashboard;
