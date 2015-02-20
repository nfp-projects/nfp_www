'use strict';

var forge = require('../../helpers/forge');
var api = require('../../helpers/api');

var profile = {};

profile.vm = forge(function(vm) {
  vm.user = {};

  vm.formUpdate = function(e) {
    vm.user[e.target.name] = e.target.value;
  };

  vm.init = function() {
    api.get('/profile').then(function(data) {
      console.log(data);
      vm.user = data;
    }, function(error) {
      vm.error('Error while retrieving profile: ' + error.message);
    });
  };

  vm.submit = function(e) {
    e.preventDefault();
    vm.working = true;
    api.post('/profile', vm.user).then(function(data) {
      vm.success('Successfully updated profile');
      vm.working = false;
      console.log(data);
      vm.user = data;
    }, function(error) {
      vm.error('Error while updating profile: ' + error.message);
    });
  };
});

window.debug = {};
window.debug.profile = profile;

module.exports = profile;
