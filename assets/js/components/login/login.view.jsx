'use strict';

var _ = require('lodash');
var m = require('mithril');
var modules = require('../modules.view');
var login = require('./login.model');
var views = require('../generic/generic.view');
var helper = require('../../helpers/view');

login.view = function(ctrl) {
  return (login.view[ctrl.action] || views.not_found)(ctrl);
};

login.view.oauth2 = function(ctrl) {
  return <section>
          <p>Redirecting back to login</p>
        </section>;
};

login.view.login = function(ctrl) {
  return <section class="login">
          <header class="login-header">
            <div class="login-header-inside">
              <h3>Login</h3>
              <div class="login-header-inside-image login-header-inside-image--login"></div>
            </div>
          </header>
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
              <a href="/login/signup" config={helper.link}>Don&apos;t have an account? Signup now!</a>
              <a href="/login/forgot" config={helper.link}>Forgot your password?</a>
            </div>
          </form>
        </section>;
};

login.view.forgot = function(ctrl) {
  return <section class="login">
          <header class="login-header">
            <div class="login-header-inside">
              <h3 class="login-header-inside--forgot">Forgot Password</h3>
              <div class="login-header-inside-image login-header-inside-image--forgot"></div>
            </div>
          </header>
      <form class="forgot-form" type="post">
        {modules.message(ctrl, 'profile')}
        <div class="row">
          <div class="large-12 columns columns-centered">
            <p class="profile-disclaimer">
              If you forgot your password, or your account doesn&apos;t
              have password, you can reset it by typing in your email in
              the field below.
            </p>
          </div>
          <div class="large-12 columns">
            <label>Email
              <input type="text" name="email" onchange={m.withAttr('value', ctrl.vm.email)} value={ctrl.vm.email()} />
            </label>
          </div>
          <div class="small-12 columns columns-centered"
              style={{display: ctrl.vm.working ? 'none' : 'block'}}>
            <button class="login-button button secondary small"
                    onclick={ctrl.vm.forgot}>
              Reset My Password
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
        </div>
      </form>
    </section>
};
