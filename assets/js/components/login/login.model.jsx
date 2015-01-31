'use strict';

var m = require('mithril');

var login = {};

login.vm = (function() {
  var vm = {};

  vm.init = function() {
    vm.username = m.prop('');
    vm.password = m.prop('');

    vm.login = function() {
      console.log(vm.username());
      vm.username('test');
      console.log(vm.password());
    };
  };

  return vm;
}());

module.exports = login;
