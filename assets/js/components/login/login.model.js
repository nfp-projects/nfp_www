'use strict';

var m = require('mithril');
var _ = require('lodash');
var auth = require('../../helpers/authentication');
var api = require('../../helpers/api');

var login = {};

login.vm = (function() {
  var vm = {};

  vm.init = function() {
    vm.username = m.prop('');
    vm.password = m.prop('');
    vm.errors = m.prop('');
    vm.logging = m.prop(false);

    vm.oauthLogin = function(provider) {
      var token = auth.jso.getToken(provider);
      if (!token) {
        vm.logging(false);
        return m.redraw();
      }
      vm.authenticate({google: token.access_token});
    };

    vm.login = function(method, e) {
      e.preventDefault();
      vm.logging(true);

      if (method !== 'local') {
        m.redraw(); //Get dat fancy loading bar

        //Check to see if we maybe already have the token.
        var token = auth.jso.getToken(method);
        if (token) {
          return vm.oauthLogin(method);
        }

        return auth.jso.authRequest(
                method,
                auth.scopes[method],
                _.partial(vm.oauthLogin, method));
      }

      //Local login
      vm.authenticate({
        username: vm.username(),
        password: vm.password()
      });
    };

    vm.authenticate = function(opt) {
      api.post('/authenticate', opt, {secure: true}).then(function(res) {
        console.log(res);
        auth.authenticated(res);
        m.route('/');
      }, function(error) {
        vm.errors('Unable to login: ' + error.message);
      }).then(function() {
        vm.logging(false);
      });
    };

    vm.logout = function() {
      auth.logout();
    };

    return vm;
  };

  return vm;
}());

module.exports = login;
