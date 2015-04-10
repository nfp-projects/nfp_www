'use strict';

var _ = require('lodash');
var m = require('mithril');
var settings = require('./settings.model');
var modules = require('../../public/modules.view');

settings._view = function(ctrl) {
  return m("div", {class:"row settings-menu"}, [
            m("div", {class:"small-2 columns settings-column"}, [
              m("ul", {class:"settings-menu-list"}, [
                m("li", [
                  m("a", {class:'settings-menu-list-item ' + ((!ctrl.action || ctrl.action === 'general') && 'settings-menu-list-item--active' || ''),
                     href:"/admin/settings/general",
                     config:m.route}, [
                    m("i", {class:"fa fa-cog"}), "General"
                  ])
                ]), 
                m("li", [
                  m("a", {class:'settings-menu-list-item ' + ((ctrl.action === 'categories') && 'settings-menu-list-item--active' || ''),
                     href:"/admin/settings/categories",
                     config:m.route}, [
                    m("i", {class:"fa fa-th-list"}), "Categories"
                  ])
                ]), 
                m("li", [
                  m("a", {class:'settings-menu-list-item ' + ((ctrl.action === 'users') && 'settings-menu-list-item--active' || ''),
                     href:"/admin/settings/users",
                     config:m.route}, [
                    m("i", {class:"fa fa-users"}), "Users"
                  ])
                ])
              ])
            ]), 
            m("div", {class:"small-10 columns settings-column"}, [
              (settings.view[ctrl.action] || settings.view.general)(ctrl)
            ])
          ]);
};

settings.view.general = function(ctrl) {
  return m("section", {class:"settings"}, [
          modules.message(ctrl, 'settings'),
          m("h3", {class:"settings-header"}, ["General"]), 
          m("p", ["Redirecting back to login"])
        ]);
};

settings.view.categories = function(ctrl) {
  return m("section", {class:"settings"}, [
          modules.message(ctrl, 'settings'),
          m("h3", {class:"settings-header"}, ["Categories"]), 
          modules.loadingIcon(ctrl, 'settings'),
          ctrl.vm.categories.map(function(item) {
            return m("form", {onchange:ctrl.vm.updateCategory.bind(null, item.id)}, [
                    m("div", {class:"row settings-categories-item",key:item.id,"data-id":item.id,config:ctrl.vm.dragdrop.config.bind(ctrl.vm.dragdrop)}, [
                      m("div", {class:"small-1 columns columns--small columns--nopadding"}, [
                        m("div", [
                          m("i", {class:"fa fa-lg fa-bars settings-categories-item-move",config:ctrl.vm.dragdrop.allowDrag.bind(ctrl.vm.dragdrop)})
                        ])
                      ]), 
                      m("div", {class:"small-5 columns"}, [
                        m("input", {type:"text",name:"title",value:item.title})
                      ]), 
                      m("div", {class:"small-5 columns"}, [
                        m("input", {type:"text",name:"slug",value:item.slug})
                      ]), 
                      m("div", {class:"small-1 columns columns--nopadding end"}, [
                        m("a", {class:"settings-categories-item-edit",href:"#"}, [
                          m("i", {class:"fa  fa-edit"})
                        ])
                      ])
                    ])
                  ])
          })
        ]);
};

settings.view.users = function(ctrl) {
  return m("section", {class:"settings"}, [
          modules.message(ctrl, 'settings'),
          m("h3", {class:"settings-header"}, ["Users"]), 
          m("p", ["categories"])
        ]);
};
