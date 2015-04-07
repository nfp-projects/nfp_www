'use strict';

//Global modules
var m = require('mithril');

//Local modules
var login = require('./login.model');
var auth = require('../../../helpers/authentication');
require('./login.view'); //load the view


login._controller = function() {
  this.layout = 'public';
  this.action = m.route.param('action');
  this.vm = login.vm.init(this);
 
  if (!this.action) {
    this.action = 'login';
  }

  if (this.action === 'login' &&
      auth.loggedIn) {
    return m.route('/profile');
  }

  if (this.action === 'login' ||
      this.action === 'forgot') {
    return;
  }
  if (this.action === 'oauth2') {
    if (window.opener) {
      return window.close();
    }
    return m.route('/');
  }
  if (this.action === 'error') {
    throw new Error('This page is not valid');
  }
  if (this.action === 'logout') {
    this.vm.logout();
    return m.route('/');
  }
};

module.exports = login;
