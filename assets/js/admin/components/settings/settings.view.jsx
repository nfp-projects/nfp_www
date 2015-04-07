'use strict';

var _ = require('lodash');
var m = require('mithril');
var settings = require('./settings.model');
var modules = require('../../../public/components/modules.view');

settings._view = function(ctrl) {
  return <div class="row settings-menu">
            <div class="small-2 columns settings-column">
              <ul class="settings-menu-list">
                <li>
                  <a class={'settings-menu-list-item ' + ((!ctrl.action || ctrl.action === 'general') && 'settings-menu-list-item--active' || '')}
                     href="/admin/settings/general"
                     config={m.route}>
                    <i class="fa fa-cog"></i>General
                  </a>
                </li>
                <li>
                  <a class={'settings-menu-list-item ' + ((ctrl.action === 'categories') && 'settings-menu-list-item--active' || '')}
                     href="/admin/settings/categories"
                     config={m.route}>
                    <i class="fa fa-th-list"></i>Categories
                  </a>
                </li>
                <li>
                  <a class={'settings-menu-list-item ' + ((ctrl.action === 'users') && 'settings-menu-list-item--active' || '')}
                     href="/admin/settings/users"
                     config={m.route}>
                    <i class="fa fa-users"></i>Users
                  </a>
                </li>
              </ul>
            </div>
            <div class="small-10 columns settings-column">
              {(settings.view[ctrl.action] || settings.view.general)(ctrl)}
            </div>
          </div>;
};

settings.view.general = function(ctrl) {
  return <section class="settings">
          {modules.message(ctrl, 'settings')}
          <h3 class="settings-header">General</h3>
          <p>Redirecting back to login</p>
        </section>;
};

settings.view.categories = function(ctrl) {
  return <section class="settings">
          {modules.message(ctrl, 'settings')}
          <h3 class="settings-header">Categories</h3>
          {modules.loadingIcon(ctrl, 'settings')}
          {ctrl.vm.categories.map(function(item) {
            return <form onchange={ctrl.vm.updateCategory.bind(null, item.id)}>
                    <div class="row settings-categories-item" key={item.id} data-id={item.id} config={ctrl.vm.dragdrop.config.bind(ctrl.vm.dragdrop)}>
                      <div class="small-1 columns columns--small columns--nopadding">
                        <div>
                          <i class="fa fa-lg fa-bars settings-categories-item-move" config={ctrl.vm.dragdrop.allowDrag.bind(ctrl.vm.dragdrop)}></i>
                        </div>
                      </div>
                      <div class="small-5 columns">
                        <input type="text" name="title" value={item.title} />
                      </div>
                      <div class="small-5 columns">
                        <input type="text" name="slug" value={item.slug} />
                      </div>
                      <div class="small-1 columns columns--nopadding end">
                        <a class="settings-categories-item-edit" href="#">
                          <i class="fa  fa-edit"></i>
                        </a>
                      </div>
                    </div>
                  </form>
          })}
        </section>;
};

settings.view.users = function(ctrl) {
  return <section class="settings">
          {modules.message(ctrl, 'settings')}
          <h3 class="settings-header">Users</h3>
          <p>categories</p>
        </section>;
};
