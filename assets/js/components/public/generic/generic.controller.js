'use strict';

var Module = require('../../../helpers/module');
var views = require('./generic.view');

module.exports = function(type, useLayout) {
  var generic = new Module();
  generic._controller = function() {
    this.layout = useLayout;
  };
  generic._view = views[type];
  return generic;
};
