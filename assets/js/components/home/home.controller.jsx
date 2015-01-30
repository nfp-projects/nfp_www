'use strict';

var m = require('mithril');
var home = require('./home.model');

//this enforces that view is loaded with the controller.
require('./home.view');

home.controller = function() {
  console.log('home constructor called');
  m.redraw.strategy("diff");
  home.vm.init();
};

module.exports = home;
