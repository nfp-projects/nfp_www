'use strict';

var m = require('mithril');
var auth = require('../../helpers/authentication');

var profile = {};


profile.vm = (function() {
  var vm = {};

  vm.init = function() {

  };

  return vm;
}());

profile.controller = function() {
  if (!auth.loggedIn()) return m.route('/login');
  profile.vm.init();
};

profile.view = function() {
  return <div class="">test</div>;
};

module.exports = profile;
