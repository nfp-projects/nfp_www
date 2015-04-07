'use strict';

var m = require('mithril');

var releases = {};

releases.Release = function(data) {
  this.title = m.prop(data.title);
  this.description = m.prop(data.description);
};

releases.vm = (function() {
  var vm = {};

  vm.init = function() {

  };

  return vm;
}());

releases.controller = function() {
  releases.vm.init();
};

releases.view = function() {
  return <div class="">test</div>;
};

module.exports = releases;
