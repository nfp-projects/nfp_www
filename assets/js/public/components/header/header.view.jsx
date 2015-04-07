'use strict';

var _ = require('lodash');
var m = require('mithril');
var header = require('./header.model');
var modules = require('../modules.view');
var auth = require('../../../helpers/authentication');
var helper = require('../../../helpers/view');

header._view = function(c) {
  var size = 'medium-2';
  return <div class="header-container">
        <div class="header">
          <nav class="navigation">
            <div class="row">
              {c.menu().map(function(item, index) {
                return <div class={'navigation-item columns ' + size + item.selected('navigation-item--selected') + (item.isEnd && 'end' || '')}>
                        <a href={item.path} config={_.partial(helper.smartLink, item)}>{item.title}</a>
                        <ul class='navigation-item-submenu'>
                          {item.children.map(function(sub) {
                            return <li class={'navigation-item-submenu-item' + sub.selected('navigation-item-submenu-item--selected')}>
                                    <a href={sub.path} config={_.partial(helper.smartLink, sub)}>{sub.title}</a>
                                  </li>
                          })}
                        </ul>
                      </div>
              })}
            </div>
          </nav>
          <aside class="header-aside">
            <div key="/login/logout" class="header-aside-item" style={{display: auth.loggedIn ? 'block' : 'none'}}>
              <a href="/login/logout" config={helper.link}>Logout</a>
            </div>
            <div key="/profile" class="header-aside-item" style={{display: auth.loggedIn ? 'block' : 'none'}}>
              <a href="/profile" config={helper.link}>Profile</a>
            </div>
            <div key="/admin" class="header-aside-item" style={{display: (auth.loggedIn && auth.user.level > 1) ? 'block' : 'none'}}>
              <a href="/admin" config={helper.link}>Admin</a>
            </div>
            <div key="/login" class="header-aside-item" style={{display: auth.loggedIn ? 'none' : 'block'}}>
              <a href="/login" config={helper.link}>Login</a>
            </div>
          </aside>
          <ul class="breadcrumbs header-breadcrumbs">
            {c.breadcrumbs().map(function(item) {
              return <li class={item.isEnd ?'current' : ''}>
                  <a class="header-breadcrumbs-item"
                    href={item.path}
                    config={helper.link}>{item.title}</a>
                </li>
            })}
          </ul>
        </div>
      </div>;
};

