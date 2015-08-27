'use strict';

var _ = require('lodash');
var m = require('mithril');
var settings = require('./settings.model');
var modules = require('../../public/modules.view');
var category = require('./partials/category.view');

settings._view = function(ctrl) {
  return m("div", {class:"row settings-menu"}, [
            m("div", {class:"small-2 columns settings-column"}, [
              m("ul", {class:"settings-menu-list"}, [
                m("li", [
                  m("a", {class:'settings-menu-list-item ' + ((!ctrl.action || ctrl.action === 'categories' || ctrl.action === 'category') && 'settings-menu-list-item--active' || ''), 
                     href:"/admin/settings/categories", 
                     config:m.route}, [
                    m("i", {class:"fa fa-th-list"}), "Categories"
                  ])
                ]), 
                m("li", [
                  m("a", {class:'settings-menu-list-item ' + ((ctrl.action === 'pages') && 'settings-menu-list-item--active' || ''), 
                     href:"/admin/settings/pages", 
                     config:m.route}, [
                    m("i", {class:"fa fa-file-text-o"}), "Pages"
                  ])
                ]), 
                m("li", [
                  m("a", {class:'settings-menu-list-item ' + ((ctrl.action === 'users') && 'settings-menu-list-item--active' || ''), 
                     href:"/admin/settings/users", 
                     config:m.route}, [
                    m("i", {class:"fa fa-users"}), "Users"
                  ])
                ]), 
                m("li", [
                  m("a", {class:'settings-menu-list-item ' + ((ctrl.action === 'media') && 'settings-menu-list-item--active' || ''), 
                     href:"/admin/settings/media", 
                     config:m.route}, [
                    m("i", {class:"fa fa-file-image-o"}), "media"
                  ])
                ])
              ])
            ]), 
            m("div", {class:"small-10 columns settings-column"}, [
              (settings.view[ctrl.action] || settings.view.categories)(ctrl)
            ])
          ]);
};

settings.view.category = category.category;

settings.view.categories = category.categories;

settings.view.users = function(ctrl) {
  return m("section", {class:"settings"}, [
          modules.message(ctrl, 'settings'), 
          m("h3", {class:"settings-header"}, [
            "Users"
          ]), 
          modules.loadingIcon(ctrl, 'settings'), 
          m("div", {class:"row settings-categories-item"}, [
            m("div", {class:"small-3 columns"}, [
              m("label", ["Username"])
            ]), 
            m("div", {class:"small-8 columns end"}, [
              m("label", ["Name"])
            ])
          ]), 
          ctrl.vm.users.map(function(item) {
            return m("div", {class:"row settings-users-item"}, [
                    m("form", {onchange:ctrl.vm.updateUser.bind(null, item.id)}, [
                      m("div", {class:"small-3 columns"}, [
                        m("input", {type:"text", name:"username", value:item.username, readonly:true})
                      ]), 
                      m("div", {class:"small-8 columns"}, [
                        m("input", {type:"text", name:"name", value:item.name})
                      ]), 
                      m("div", {class:"small-1 columns columns--nopadding end"}, [
                        m("a", {class:"settings-users-item-edit", config:m.route, href:'/admin/settings/users/' + item.id}, [
                          m("i", {class:"fa  fa-edit"})
                        ])
                      ])
                    ])
                  ])
          })
        ]);
};
