'use strict';

//Global modules
var m = require('mithril');
var _ = require('lodash');

//Internal modules
var auth = require('../../helpers/authentication');

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
        console.log('ERROR, UNABLE TO LOGIN');
        vm.errors('Unable to login with ' + provider);
        vm.logging(false);
        return m.endComputation();
      }
      console.log('SUCCESS');
      console.log(token);
      vm.authenticate({google: token.access_token});
      m.route('/');
      m.endComputation();
    }

    vm.login = function(method) {
      vm.logging(true);

      if (method !== 'local') {
        m.startComputation();

        //Check to see if we maybe already have the token.
        var token = auth.jso.getToken(method)
        if (token) return vm.oauthLogin(method);

        return auth.jso.authRequest(
                'google',
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
      vm.logging(false);
      //Send api authenticate request. For now we'll just allow
      if (opt.username !== undefined) {
        if (opt.username !== 'test' ||
            opt.password !== 'test') {
          vm.errors('Wrong username or password (did you type in test?)');
          return m.endComputation();
        }
      }
      auth.authenticated('temp');
      m.route('/');
      m.endComputation();
    };

    vm.logout = function() {
      auth.logout();
    }

    return vm;
  };

  return vm;
}());

module.exports = login;
