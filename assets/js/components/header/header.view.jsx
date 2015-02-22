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
              {modules.header_link(c, '/', 'NFP', size + " navigation-item navigation-item--first columns")}
              {c.menu().map(function(item) {
                return modules.header_link(c, '/', item.title, size + " navigation-item columns");
              })}
            </div>
          </nav>
          <aside class="header-aside">
            {modules.header_link(c, '/login/logout', 'Logout', 'header-aside-item', !auth.loggedIn)}
            {modules.header_link(c, '/profile', 'Profile', 'header-aside-item', !auth.loggedIn)}
            {modules.header_link(c, '/login', 'Login', 'header-aside-item', auth.loggedIn)}
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

