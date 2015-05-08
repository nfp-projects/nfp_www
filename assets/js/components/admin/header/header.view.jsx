'use strict';

var _ = require('lodash');
var m = require('mithril');
var header = require('./header.model');

header._view = function(c) {
  var size = 'medium-2';
  return <div class="header header--admin">
          <nav class="navigation-admin">
            <a class="navigation-admin-item" href="/" config={m.route}>
              <i class="fa fa-bars"></i>
            </a>
            <a class="navigation-admin-item" href="/admin" config={m.route}>
              <i class="fa fa-dashboard"></i>
              <span>Dashboard</span>
            </a>
            <a class="navigation-admin-item" href="/admin/r/new" config={m.route}>
              <i class="fa fa-plus-square"></i>
              <span>New Release</span>
            </a>
            <a class="navigation-admin-item" href="/admin/s" config={m.route}>
              <i class="fa fa-server"></i>
              <span>Series</span>
            </a>
            <a class="navigation-admin-item" href="/admin/s" config={m.route}>
              <i class="fa fa-comments"></i>
              <span>Comments</span>
            </a>
            <a class="navigation-admin-item" href="/admin/settings" config={m.route}>
              <i class="fa fa-cogs"></i>
              <span>Settings</span>
            </a>
          </nav>
        </div>;
};

