'use strict';

var m = require('mithril');
var home = require('./home.model');

home._view = function() {
  return m("section", ["This is the frontpage"]);
};
