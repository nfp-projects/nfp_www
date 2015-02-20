'use strict';

var _ = require('lodash');
var m = require('mithril');
var modules = require('../modules.view');
var login = require('./login.model');

login.view = function(ctrl) {
  return (login.view[ctrl.action] || login.view.default)(ctrl);
};

login.view.oauth2 = function(ctrl) {
  return <div>
          <p>Redirecting back to login</p>
        </div>;
};

login.view.default = function(ctrl) {
  return <div class="login">
          <form class="login-form" type="post">
            {modules.message(ctrl, 'login')}
            <div class="row">
              <div class="large-12 columns">
                <label>Username
                  <input type="text" name="username" onchange={m.withAttr('value', ctrl.vm.username)} value={ctrl.vm.username()} />
                </label>
              </div>
            </div>
            <div class="row">
              <div class="large-12 columns">
                <label>Password
                  <input type="password" name="password" onchange={m.withAttr('value', ctrl.vm.password)} value={ctrl.vm.password()} />
                </label>
              </div>
            </div>
            <div class="row" style={{display: ctrl.vm.working ? 'block' : 'none'}}>
              <div class="large-12 columns">
                <div class="spinner">
                  <div class="bounce1"></div>
                  <div class="bounce2"></div>
                  <div class="bounce3"></div>
                </div>
              </div>
            </div>
            <div class="row" style={{display: ctrl.vm.working ? 'none' : 'block'}}>
              <div class="small-4 columns">
                <button class="login-button button secondary small" onclick={_.partial(ctrl.vm.login,'local')}>Login</button>
              </div>
              <div class="small-8 columns login-alt">
                  Or login with <a
                    onclick={_.partial(ctrl.vm.login,'google')}>Google
                  </a>
              </div>
            </div>
            <div class="login-meta">
              <a href="/login/signup" config={m.route}>Don&apos;t have an account? Signup now!</a>
              <a href="/login/forgot" config={m.route}>Forgot your password?</a>
            </div>
          </form>
        </div>;
};

login.view.forgot = function(ctrl) {
  return <div class="login">
      <form class="forgot-form" type="post">
        {modules.message(ctrl, 'profile')}
        <div class="row">
          <div class="large-12 columns">
            <label>Email
              <input type="text" name="email" />
            </label>
          </div>
          <div class="small-12 columns columns-centered"
              style={{display: ctrl.vm.working ? 'none' : 'block'}}>
            <button class="login-button button secondary small"
                    onclick={ctrl.vm.submit}>
              Send Password Reset Email
            </button>
          </div>
          <div class="large-12 columns"
              style={{display: ctrl.vm.working ? 'block' : 'none'}}>
            <div class="spinner">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>
          </div>
          <div class="large-12 columns columns-centered">
            <p class="profile-disclaimer">
              A password reset email will be sent to the
              above email address.
            </p>
            <div class="forgot-image"></div>
          </div>
        </div>
      </form>
    </div>
};
