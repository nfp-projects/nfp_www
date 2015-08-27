'use strict';

var _ = require('lodash');
var m = require('mithril');
var header = require('./header.model');
var modules = require('../modules.view');
var auth = require('../../../helpers/authentication');
var helper = require('../../../helpers/view');

header._view = function(c) {
  var size = 'medium-2';
  return m("div", {class:"header-container"}, [
        m("div", {class:"header"}, [
          m("nav", {class:"navigation"}, [
            m("div", {class:"row"}, [
              c.menu().map(function(item, index) {
                return m("div", {class:'navigation-item columns ' + size + item.selected('navigation-item--selected') + (item.isEnd && 'end' || '')}, [
                        m("a", {href:item.path, config:_.partial(helper.smartLink, item)}, [item.title]), 
                        m("ul", {class:"navigation-item-submenu"}, [
                          item.children.map(function(sub) {
                            return m("li", {class:'navigation-item-submenu-item' + sub.selected('navigation-item-submenu-item--selected')}, [
                                    m("a", {href:sub.path, config:_.partial(helper.smartLink, sub)}, [sub.title])
                                  ])
                          })
                        ])
                      ])
              })
            ])
          ]), 
          m("aside", {class:"header-aside"}, [
            m("div", {key:"/login/logout", class:"header-aside-item", style:{display: auth.loggedIn ? 'block' : 'none'}}, [
              m("a", {href:"/login/logout", config:helper.link}, ["Logout"])
            ]), 
            m("div", {key:"/profile", class:"header-aside-item", style:{display: auth.loggedIn ? 'block' : 'none'}}, [
              m("a", {href:"/profile", config:helper.link}, ["Profile"])
            ]), 
            m("div", {key:"/admin", class:"header-aside-item", style:{display: (auth.loggedIn && auth.user.level > 1) ? 'block' : 'none'}}, [
              m("a", {href:"/admin", config:helper.link}, ["Admin"])
            ]), 
            m("div", {key:"/login", class:"header-aside-item", style:{display: auth.loggedIn ? 'none' : 'block'}}, [
              m("a", {href:"/login", config:helper.link}, ["Login"])
            ])
          ]), 
          m("ul", {class:"breadcrumbs header-breadcrumbs"}, [
            c.breadcrumbs().map(function(item) {
              return m("li", {class:item.isEnd ?'current' : ''}, [
                  m("a", {class:"header-breadcrumbs-item", 
                    href:item.path, 
                    config:helper.link}, [item.title])
                ])
            })
          ])
        ])
      ]);
};

