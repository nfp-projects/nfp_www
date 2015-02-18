'use strict';

var m = require('mithril');
var profile = require('./profile.model');

profile.view = function(ctrl) {
  return <div class="profile">
          <form class="profile-form" type="post" onchange={ctrl.vm.formUpdate}>
            <p class="profile-errors">{profile.vm.errors()}</p>
            <div class="row">
              <div class="large-12 columns">
                <label>Username<span class="profile-meta">(display name)</span>
                  <input type="text" name="username" value={profile.vm.user.username} />
                </label>
              </div>
              <div class="large-12 columns">
                <label>Email<span class="profile-meta">(requires confirmation)</span>
                  <input type="text" name="email" value={profile.vm.user.email} />
                </label>
              </div>
              <div class="large-12 columns">
                <label>Name
                  <input type="text" name="name" value={profile.vm.user.name} />
                </label>
              </div>
              <div class="large-12 columns">
                <label>Current Password<span class="profile-meta">(to change password)</span>
                  <input type="password" name="current_password" />
                </label>
              </div>
              <div class="large-12 columns">
                <label>Password
                  <input type="password" name="password" />
                </label>
              </div>
              <div class="large-12 columns">
                <label>Confirm Password
                  <input type="password" name="confirm_password" />
                </label>
              </div>
            </div>
            <div class="row" style={{display: ctrl.vm.working() ? 'block' : 'none'}}>
              <div class="large-12 columns">
                <div class="spinner">
                  <div class="bounce1"></div>
                  <div class="bounce2"></div>
                  <div class="bounce3"></div>
                </div>
              </div>
            </div>
            <div class="row" style={{display: ctrl.vm.working() ? 'none' : 'block'}}>
              <div class="small-4 columns">
                <button class="login-button button secondary small" onclick={ctrl.vm.submit}>Save</button>
              </div>
            </div>
          </form>
        </div>;
};
