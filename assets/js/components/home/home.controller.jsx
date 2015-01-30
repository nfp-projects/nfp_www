'use strict';

var home = require('./home.model');

//this enforces that view is loaded with the controller.
require('./home.view');

home.controller = function() {
  home.vm.init();
};

module.exports = home;
