'use strict';

//Local modules
var header = require('./header.model');
require('./header.view'); //load the view

header._controller = function() {
  this.vm = header.vm.init();
  this.menu = this.vm.getCategories();
  this.breadcrumbs = this.vm.getBreadcrumbs.bind(this.vm);
};

module.exports = header;
