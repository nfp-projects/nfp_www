'use strict';

var m = require('mithril');
var login = require('./login.model');

//this enforces that view is loaded with the controller.
require('./login.view');

login.controller = function() {
  this.action = m.route.param('action');
  this.vm = login.vm.init();

  if (this.action === 'oauth2') {
    if (window.opener) {
      return window.close();
    }
    return m.route('/');
  }
  if (this.action === 'logout') {
    this.vm.logout();
    return m.route('/');
  }
};

module.exports = login;
