'use strict';

var m = require('mithril');
var api = require('../../helpers/api');

var profile = {};

profile.vm = (function() {
  var vm = {};

  vm.errors = m.prop('');
  vm.working = m.prop(false);
  vm.user = {};

  vm.formUpdate = function(e) {
    vm.user[e.target.name] = e.target.value;
  };

  vm.init = function() {
    api.get('/profile').then(function(data) {
      console.log(data);
      vm.user = data;
    });

    return vm;
  };

  vm.submit = function(e) {
    e.preventDefault();
    vm.working(true);
    api.post('/profile', vm.user).then(function(data) {
      vm.working(false);
      console.log(data);
      vm.user = data;
    });
  };

  return vm;
}());

module.exports = profile;
