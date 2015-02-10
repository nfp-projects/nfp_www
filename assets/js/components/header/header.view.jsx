'use strict';

'use strict';

var _ = require('lodash');
var m = require('mithril');
var header = require('./header.model');
var auth = require('../../helpers/authentication');

header.view = function(c) {
  var size = 'medium-2';
  return <div class="header">
          <nav class="navigation">
            <div class="row">
              <div class={size + " navigation-item columns"}>
                <a href="/releases" config={m.route}> Releases </a>
              </div>
              {c.menu().map(function(item) {
                return <div class={size + " navigation-item columns"}>{item.title}</div>;
              })}
              <div class={size + " navigation-item columns"}>
                <a href="/profile" config={m.route}> Profile </a>
              </div>
              <div class={size + " navigation-item columns"} style={{display: auth.loggedIn() ? "block" : "none"}}>
                <a href="/login/logout" config={m.route}> Logout </a>
              </div>
              <div class={size + " navigation-item navigation-item--last columns"}>
                <a href="/" config={m.route}>NFP</a>
              </div>
            </div>
          </nav>
        </div>;
};

