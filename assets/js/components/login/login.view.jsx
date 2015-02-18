'use strict';

var _ = require('lodash');
var m = require('mithril');
var login = require('./login.model');

login.view = function(ctrl) {
  return (login.view[ctrl.action] || login.view.default)();
};

login.view.oauth2 = function(ctrl) {
  return <div>
          <p>Redirecting back to login</p>
        </div>;
};

login.view.default = function(ctrl) {
  return <div class="login">
          <form class="login-form" type="post">
            <p class="login-errors">{login.vm.errors()}</p>
            <div class="row">
              <div class="large-12 columns">
                <label>Username
                  <input type="text" name="username" onchange={m.withAttr('value', login.vm.username)} value={login.vm.username()} />
                </label>
              </div>
            </div>
            <div class="row">
              <div class="large-12 columns">
                <label>Password
                  <input type="password" name="password" onchange={m.withAttr('value', login.vm.password)} value={login.vm.password()} />
                </label>
              </div>
            </div>
            <div class="row" style={{display: login.vm.logging() ? 'block' : 'none'}}>
              <div class="large-12 columns">
                <div class="spinner">
                  <div class="bounce1"></div>
                  <div class="bounce2"></div>
                  <div class="bounce3"></div>
                </div>
              </div>
            </div>
            <div class="row" style={{display: login.vm.logging() ? 'none' : 'block'}}>
              <div class="small-4 columns">
                <button class="login-button button secondary small" onclick={_.partial(login.vm.login,'local')}>Login</button>
              </div>
              <div class="small-8 columns login-alt">
                  Or login with <a
                    onclick={_.partial(login.vm.login,'google')}>Google
                  </a>
              </div>
            </div>
            <div class="login-meta">
              <a>Don't have an account? Signup now!</a>
              <a>Forgot your password?</a>
            </div>
          </form>
        </div>;
}
