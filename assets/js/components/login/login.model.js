'use strict';

var m = require('mithril');
var _ = require('lodash');
var jwt_decode = require('jwt-decode');
var auth = require('../../helpers/authentication');
var api = require('../../helpers/api');
var forge = require('../../helpers/forge');

var login = {};

login.vm = forge(function(vm) {

  vm.init = function(ctrl) {
    vm.username = m.prop('');
    vm.password = m.prop('');
    vm.email = m.prop('');
    vm.name = m.prop('');
    vm.errors = m.prop('');
    vm.token = null;
    vm.token_data = null;

    if (m.route().indexOf('?token=') > 0) {
      vm.token = m.route();
      vm.token = vm.token.slice(vm.token.indexOf('?token=') + 7);

      api.post('/profile/verify', {
        token: vm.token
      }).then(function() {
        vm.token_data = jwt_decode(vm.token);
      }, function(err) {
        ctrl.action = 'error';
        vm.message({
          type: 'error',
          message: err.message,
          subtitle: 'The token failed verification test. This could be '+
                    'due to the token having already expired or was invalid.',
          items: [
            {url: '/login/signup', text: 'Try signing up again'},
            {url: '/login/forgot', text: 'Submit a forgot password request'},
            {url: '/login', text: 'Try logging in'}
          ]
        });
      });
    }

    vm.oauthLogin = function(provider) {
      var token = auth.jso.getToken(provider);
      if (!token) {
        vm.working = false;
        return m.redraw();
      }
      vm.authenticate({google: token.access_token});
    };

    vm.login = function(method, e) {
      e.preventDefault();
      vm.working = true;

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

    vm.forgot = function(e) {
      e.preventDefault();

      if (!vm.email() || vm.email().indexOf('@') <= 0) {
        return vm.error('Please type in a valid email address');
      }
      vm.working = true;
      m.redraw();

      api.post('/profile/forgot', {email: vm.email()}).then(function() {
        vm.email('');
        vm.success('Password reset email was sent, please check your inbox and follow the steps inside.');
      }, function(err) {
        vm.error('Unable to send email: ' + err.message);
      }).then(function() {
        vm.working = false;
      });
    };

    vm.finish = function(e) {
      e.preventDefault();

      if (!vm.password() || vm.password().length < 6) {
        return vm.error('Please type in a of at least six characters of length');
      }
      vm.working = true;
      m.redraw();

      api.post('/profile/finish', {
        password: vm.password(),
        token: vm.token
      }).then(function(res) {
        auth.authenticated(res);
        m.route('/profile');
      }, function(err) {
        vm.error('Unable to reset password: ' + err.message);
      }).then(function() {
        vm.password('');
        vm.working = false;
      });
    };

    vm.signup = function(e) {
      e.preventDefault();

      if (!vm.username() || vm.username().length < 2) {
        return vm.error('Username must be atleast 2 characters length');
      }

      if (!vm.email() || vm.email().indexOf('@') <= 0) {
        return vm.error('Email must be a valid address');
      }

      vm.working = true;
      m.redraw();

      api.post('/profile/signup', {
        username: vm.username(),
        email: vm.email(),
        name: vm.name()
      }).then(function() {
        vm.username('');
        vm.email('');
        vm.name('');
        vm.success('Confirmation email was sent to the address.');
      }, function(err) {
        vm.error('Unable to signup: ' + err.message);
      }).then(function() {
        vm.working = false;
      });
    };

    vm.authenticate = function(opt) {
      api.post('/authenticate', opt).then(function(res) {
        auth.authenticated(res);
        m.route('/');
      }, function(error) {
        vm.error('Unable to login: ' + error.message);
      }).then(function() {
        vm.working = false;
      });
    };

    vm.logout = function() {
      auth.logout();
    };
  };

});

module.exports = login;
