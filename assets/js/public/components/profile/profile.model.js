'use strict';

var Module = require('../../../helpers/module');
var api = require('../../../helpers/api');
var m = require('mithril');

var profile = new Module();

profile.vm = {
  addMessage: true,
  user: {},

  formUpdate: function(e) {
    e.preventDefault();
    m.redraw.strategy('none');
    profile.vm.user[e.target.name] = e.target.value;
  },

  init: function() {
    api.get('/profile?username,name,email,change_password').then(function(data) {
      console.log(data);
      profile.vm.user = data;
    }, function(error) {
      profile.vm.error('Error while retrieving profile: ' + error.message);
    });
  },

  submit: function(e) {
    e.preventDefault();
    profile.vm.working = true;
    m.redraw();
    api.post('/profile', profile.vm.user).then(function(data) {
      profile.vm.success('Successfully updated profile');
      profile.vm.user = data;
    }, function(error) {
      profile.vm.error('Error while updating profile: ' + error.message);
    }).then(function() {
      profile.vm.working = false;
    });
  }
};

window.components.profile = profile;

module.exports = profile;
