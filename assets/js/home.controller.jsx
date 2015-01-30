'use strict';

var home = require('./home.model');
require('./home.view');

home.controller = function() {
  home.vm.init();
};

module.exports = home;
