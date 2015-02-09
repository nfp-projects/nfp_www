'use strict';

//Global modules
var m = require('mithril');

//Local modules
var auth = require('../../helpers/authentication');

var header = require('./header.model');

header.controller = function() {
  this.vm = header.vm.init();
  //intentionally empty
};

header.view = function(c) {
  return <nav>
          <ul>
            <li>
              <a href="/" config={m.route}> Home </a>
            </li>
            <li>
              <a href="/releases" config={m.route}> Releases </a>
            </li>
            <li style={{display: auth.loggedIn() ? 'none' : 'list-item'}}>
              <a href="/login" config={m.route}> Login </a>
            </li>
            <li style={{display: auth.loggedIn() ? 'list-item' : 'none'}}>
              <a href="/login/logout" config={m.route}> Logout </a>
            </li>
          </ul>
        </nav>;
};

module.exports = header;
