'use strict';

'use strict';

var _ = require('lodash');
var m = require('mithril');
var header = require('./header.model');
var auth = require('../../helpers/authentication');

header.view = function(c) {
  return <nav>
          <ul>
            <li>
              <a href="/" config={m.route}> Home </a>
            </li>
            <li>
              <a href="/releases" config={m.route}> Releases </a>
            </li>
              {c.menu().map(function(item) {
                return <li>{item.title}</li>;
              })}
            <li style={{display: auth.loggedIn() ? 'none' : 'list-item'}}>
              <a href="/login" config={m.route}> Login </a>
            </li>
            <li style={{display: auth.loggedIn() ? 'none' : 'list-item'}}>
              <a href="/login" config={m.route}> Register </a>
            </li>
            <li style={{display: auth.loggedIn() ? 'list-item' : 'none'}}>
              <a href="/login/logout" config={m.route}> Logout </a>
            </li>
          </ul>
        </nav>;
};

