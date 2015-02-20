'use strict';

var views = require('./generic.view');

module.exports = function(type) {
  return {
    controller: function() {},
    view: views[type]
  };
};
