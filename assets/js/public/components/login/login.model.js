'use strict';

var m = require('mithril');
var _ = require('lodash');
var jwt_decode = require('jwt-decode');
var auth = require('../../../helpers/authentication');
var api = require('../../../helpers/api');
var Module = require('../../../helpers/module');

var login = new Module();

login.vm = {
  addMessage: true,

  init: function(ctrl) {
    //throw new Error('Something went wrong');
    login.vm.username = m.prop('');
    login.vm.password = m.prop('');
    login.vm.email = m.prop('');
    login.vm.name = m.prop('');
    login.vm.errors = m.prop('');
    login.vm.token = null;
    login.vm.token_data = null;

    if (m.route().indexOf('?token=') > 0) {
      login.vm.token = m.route();
      login.vm.token = login.vm.token.slice(login.vm.token.indexOf('?token=') + 7);

      api.post('/profile/verify', {
        token: login.vm.token
      }).then(function() {
        login.vm.token_data = jwt_decode(login.vm.token);
      }, function(err) {
        ctrl.action = 'error_token';
        login.vm.message({
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
  },

  oauthLogin: function(provider) {
    var token = auth.jso.getToken(provider);
    if (!token) {
      login.vm.working = false;
      return m.redraw();
    }
    login.vm.authenticate({google: token.access_token});
  },

  login: function(method, e) {
    e.preventDefault();
    login.vm.working = true;

    if (method !== 'local') {
      m.redraw(); //Get dat fancy loading bar

      //Check to see if we maybe already have the token.
      var token = auth.jso.getToken(method);
      if (token) {
        return login.vm.oauthLogin(method);
      }

      return auth.jso.authRequest(
              method,
              auth.scopes[method],
              _.partial(login.vm.oauthLogin, method));
    }

    //Local login
    login.vm.authenticate({
      username: login.vm.username(),
      password: login.vm.password()
    });
  },

  forgot: function(e) {
    e.preventDefault();

    if (!login.vm.email() || login.vm.email().indexOf('@') <= 0) {
      return login.vm.error('Please type in a valid email address');
    }
    login.vm.working = true;
    m.redraw();

    api.post('/profile/forgot', {email: login.vm.email()}).then(function() {
      login.vm.email('');
      login.vm.success('Password reset email was sent, please check your inbox and follow the steps inside.');
    }, function(err) {
      login.vm.error('Unable to send email: ' + err.message);
    }).then(function() {
      login.vm.working = false;
    });
  },

  finish: function(e) {
    e.preventDefault();

    if (!login.vm.password() || login.vm.password().length < 6) {
      return login.vm.error('Please type in a of at least six characters of length');
    }
    login.vm.working = true;
    m.redraw();

    api.post('/profile/finish', {
      password: login.vm.password(),
      token: login.vm.token
    }).then(function(res) {
      auth.authenticated(res);
      m.route('/profile');
    }, function(err) {
      login.vm.error('Unable to reset password: ' + err.message);
    }).then(function() {
      login.vm.password('');
      login.vm.working = false;
    });
  },

  signup: function(e) {
    e.preventDefault();

    if (!login.vm.username() || login.vm.username().length < 2) {
      return login.vm.error('Username must be atleast 2 characters length');
    }

    if (!login.vm.email() || login.vm.email().indexOf('@') <= 0) {
      return login.vm.error('Email must be a valid address');
    }

    login.vm.working = true;
    m.redraw();

    api.post('/profile/signup', {
      username: login.vm.username(),
      email: login.vm.email(),
      name: login.vm.name()
    }).then(function() {
      login.vm.username('');
      login.vm.email('');
      login.vm.name('');
      login.vm.success('Confirmation email was sent to the address.');
    }, function(err) {
      login.vm.error('Unable to signup: ' + err.message);
    }).then(function() {
      login.vm.working = false;
    });
  },

  authenticate: function(opt) {
    api.post('/authenticate', opt).then(function(res) {
      auth.authenticated(res);
      m.route('/');
    }, function(error) {
      login.vm.error('Unable to login: ' + error.message);
    }).then(function() {
      login.vm.working = false;
    });
  },

  logout: function() {
    auth.logout();
  }
};

module.exports = login;
