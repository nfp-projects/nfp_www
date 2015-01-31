'use strict';

var m = require('mithril');
var login = require('./login.model');

//this enforces that view is loaded with the controller.
require('./login.view');

login.controller = function() {
  login.vm.init();
};

module.exports = login;
