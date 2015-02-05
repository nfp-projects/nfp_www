'use strict';

var _ = require('lodash');
var m = require('mithril');
var login = require('./login.model');

login.view = function(ctrl) {
  switch (ctrl.action) {
    case 'oauth2':
      return <div>
              <p>Redirecting back to login</p>
            </div>;
      break;

    default:
      return <div>
              <p>{login.vm.errors()}</p>
              <input type="text" name="username" onchange={m.withAttr('value', login.vm.username)} value={login.vm.username()} />
              <input type="password" name="password" onchange={m.withAttr('value', login.vm.password)} value={login.vm.password()} />
              <button style={{display: login.vm.logging() ? 'none' : 'inline-block'}} onclick={_.partial(login.vm.login,'local')}>Login</button>
              <button style={{display: login.vm.logging() ? 'none' : 'inline-block'}} onclick={_.partial(login.vm.login,'google')}>Google</button>
              <div class="spinner" style={{display: login.vm.logging() ? 'inline-block' : 'none'}}>
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>
            </div>;
  }
};
