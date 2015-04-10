'use strict';

var m = require('mithril');
var modules = require('../modules.view');
var profile = require('./profile.model');
var helper = require('../../../helpers/view');

profile._view = function(ctrl) {
  
  return <section class="profile">
          <header class="profile-header">
            <div class="profile-header-inside">
              <h3 class="profile-header-inside--profile">Profile</h3>
              <div class="profile-header-inside-image profile-header-inside-image--profile"></div>
            </div>
          </header>
          <form class="profile-form" type="post" onchange={ctrl.vm.formUpdate}>
            {modules.message(ctrl, 'profile')}
            <div class="row">
              <div class="large-12 columns">
                <label>Username
                  <input type="text" name="username" value={ctrl.vm.user.username || '...'} />
                </label>
              </div>
              <div class="large-12 columns">
                <label>Email<span class="profile-meta">(requires confirmation)</span>
                  <input type="text" name="email" value={ctrl.vm.user.email || '...'} />
                </label>
              </div>
              <div class="large-12 columns">
                <label>Name<span class="profile-meta">(display name)</span>
                  <input type="text" name="name" value={ctrl.vm.user.name || ''} />
                </label>
              </div>
              <div class="large-12 columns" style={{display: ctrl.vm.user.change_password ? 'block' : 'none'}}>
                <label>Current Password<span class="profile-meta">(to change password)</span>
                  <input type="password" name="current_password" value="" />
                </label>
              </div>
              <div class="large-12 columns" style={{display: ctrl.vm.user.change_password ? 'block' : 'none'}}>
                <label>Password
                  <input type="password" name="password" value="" />
                </label>
              </div>
              <div class="large-12 columns" style={{display: ctrl.vm.user.change_password ? 'block' : 'none'}}>
                <label>Confirm Password
                  <input type="password" name="confirm_password" value="" />
                </label>
              </div>
              <div class="small-4 columns" style={{display: ctrl.vm.working ? 'none' : 'block'}}>
                <button class="login-button button secondary small" onclick={ctrl.vm.submit}>Save</button>
              </div>
              <div class="large-12 columns" style={{display: ctrl.vm.working ? 'block' : 'none'}}>
                <div class="spinner spinner--large">
                  <div class="bounce1"></div>
                  <div class="bounce2"></div>
                  <div class="bounce3"></div>
                </div>
              </div>
              <div class="large-12 columns" style={{display: ctrl.vm.user.change_password ? 'none' : 'block'}}>
                <p class="profile-disclaimer">This account was created through google and has no password.
                  To configure a password, use <a href="/login/forgot" config={helper.link}>password reset</a>.
                </p>
              </div>
            </div>
          </form>
        </section>;
};
