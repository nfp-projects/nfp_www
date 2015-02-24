'use strict';

'use strict';

var _ = require('lodash');
var m = require('mithril');
var header = require('./header.model');
var modules = require('../modules.view');
var auth = require('../../helpers/authentication');
var helper = require('../../helpers/view');

header.view = function(c) {
  var size = 'medium-2';
  var route = m.route();
  route = route.slice(0, route.indexOf('?') > 0 && route.indexOf('?') || route.length);
  var breadcrumbs = _.compact(route.split('/'));
  var previous = '';
  return <div class="header">
          <nav class="navigation">
            <div class="row">
              {modules.header_link(c, {slug: '', title: 'NFP'}, size + ' navigation-item--first')}
              {c.menu().map(function(item, index) {
                var isEnd = index === c.menu().length - 1;
                return modules.header_link(c, item, size + (isEnd && ' end' || ''));
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
            <div key="/login" class="header-aside-item" style={{display: auth.loggedIn ? 'none' : 'block'}}>
              <a href="/login" config={helper.link}>Login</a>
            </div>
          </aside>
          <ul class="breadcrumbs header-breadcrumbs">
            {breadcrumbs.map(function(item) {
              var prefix = null;
              previous += '/' + item;
              return <li class={previous === route ?'current' : ''}>
                  <a class="header-breadcrumbs-item"
                    href={previous}
                    config={helper.link}>{item}</a>
                </li>
            })}
          </ul>
        </div>;
};

