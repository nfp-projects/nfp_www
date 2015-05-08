'use strict';

var _ = require('lodash');
var m = require('mithril');
var settings = require('./settings.model');
var modules = require('../../public/modules.view');
var category = require('./partials/category.view');

settings._view = function(ctrl) {
  return <div class="row settings-menu">
            <div class="small-2 columns settings-column">
              <ul class="settings-menu-list">
                <li>
                  <a class={'settings-menu-list-item ' + ((!ctrl.action || ctrl.action === 'categories' || ctrl.action === 'category') && 'settings-menu-list-item--active' || '')}
                     href="/admin/settings/categories"
                     config={m.route}>
                    <i class="fa fa-th-list"></i>Categories
                  </a>
                </li>
                <li>
                  <a class={'settings-menu-list-item ' + ((ctrl.action === 'pages') && 'settings-menu-list-item--active' || '')}
                     href="/admin/settings/pages"
                     config={m.route}>
                    <i class="fa fa-file-text-o"></i>Pages
                  </a>
                </li>
                <li>
                  <a class={'settings-menu-list-item ' + ((ctrl.action === 'users') && 'settings-menu-list-item--active' || '')}
                     href="/admin/settings/users"
                     config={m.route}>
                    <i class="fa fa-users"></i>Users
                  </a>
                </li>
                <li>
                  <a class={'settings-menu-list-item ' + ((ctrl.action === 'media') && 'settings-menu-list-item--active' || '')}
                     href="/admin/settings/media"
                     config={m.route}>
                    <i class="fa fa-file-image-o"></i>media
                  </a>
                </li>
              </ul>
            </div>
            <div class="small-10 columns settings-column">
              {(settings.view[ctrl.action] || settings.view.categories)(ctrl)}
            </div>
          </div>;
};

settings.view.category = category.category;

settings.view.categories = category.categories;

settings.view.users = function(ctrl) {
  return <section class="settings">
          {modules.message(ctrl, 'settings')}
          <h3 class="settings-header">
            Users
          </h3>
          {modules.loadingIcon(ctrl, 'settings')}
          <div class="row settings-categories-item">
            <div class="small-3 columns">
              <label>Username</label>
            </div>
            <div class="small-8 columns end">
              <label>Name</label>
            </div>
          </div>
          {ctrl.vm.users.map(function(item) {
            return <div class="row settings-users-item">
                    <form onchange={ctrl.vm.updateUser.bind(null, item.id)}>
                      <div class="small-3 columns">
                        <input type="text" name="username" value={item.username} readonly />
                      </div>
                      <div class="small-8 columns">
                        <input type="text" name="name" value={item.name} />
                      </div>
                      <div class="small-1 columns columns--nopadding end">
                        <a class="settings-users-item-edit" config={m.route} href={'/admin/settings/users/' + item.id}>
                          <i class="fa  fa-edit"></i>
                        </a>
                      </div>
                    </form>
                  </div>
          })}
        </section>;
};
