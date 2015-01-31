'use strict';

var m = require('mithril');
var login = require('./login.model');

login.view = function() {
  return <div>
      <input type="text" name="username" onchange={m.withAttr('value', login.vm.username)} value={login.vm.username()} />
      <input type="password" name="password" onchange={m.withAttr('value', login.vm.password)} value={login.vm.password()} />
      <button onclick={login.vm.login}>Login</button>
    </div>;
};