'use strict';

var m = require('mithril');
var home = require('./home.model');

//this enforces that view is loaded with the controller.
require('./home.view');

home._controller = function() {
  this.layout = 'public';
  home.vm.init();
};

module.exports = home;
