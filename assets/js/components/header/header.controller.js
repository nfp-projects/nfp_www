'use strict';

//Global modules
var m = require('mithril');

//Local modules
var header = require('./header.model');
require('./header.view'); //load the view

header._controller = function() {
  this.vm = header.vm.init();
  this.menu = this.vm.getCategories();
  //intentionally empty
};

module.exports = header;
