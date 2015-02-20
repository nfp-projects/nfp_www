'use strict';

//Global modules
var m = require('mithril');

//Local modules
var login = require('./login.model');
var auth = require('../../helpers/authentication');
require('./login.view'); //load the view


login.controller = function() {
  this.action = m.route.param('action');
  this.vm = login.vm.init();

  if (!this.action && auth.loggedIn) {
    m.route('/profile');
  }

  if (!this.action || this.action === 'forgot') {
    return;
  }
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
  return m.route('/profile');
};

module.exports = login;
