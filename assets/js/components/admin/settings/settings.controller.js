'use strict';

var m = require('mithril');
var settings = require('./settings.model');
var auth = require('../../../helpers/authentication');
require('./settings.view');

var map = {
  'categories': 'category'
}

settings._controller = function() {
  this.layout = 'admin';
  if (!auth.loggedIn || auth.user.level < 2) return m.route('/login');
  this.action = m.route.param('action');
  this.id = m.route.param('id');

  if (this.id) {
    this.action = map[this.action] || this.action;
  }

  this.vm = settings.vm.init(this);
}

module.exports = settings;
