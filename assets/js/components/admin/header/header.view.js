'use strict';

var _ = require('lodash');
var m = require('mithril');
var header = require('./header.model');

header._view = function(c) {
  var size = 'medium-2';
  return m("div", {class:"header header--admin"}, [
          m("nav", {class:"navigation-admin"}, [
            m("a", {class:"navigation-admin-item", href:"/", config:m.route}, [
              m("i", {class:"fa fa-bars"})
            ]), 
            m("a", {class:"navigation-admin-item", href:"/admin", config:m.route}, [
              m("i", {class:"fa fa-dashboard"}), 
              m("span", ["Dashboard"])
            ]), 
            m("a", {class:"navigation-admin-item", href:"/admin/r/new", config:m.route}, [
              m("i", {class:"fa fa-plus-square"}), 
              m("span", ["New Release"])
            ]), 
            m("a", {class:"navigation-admin-item", href:"/admin/s", config:m.route}, [
              m("i", {class:"fa fa-server"}), 
              m("span", ["Series"])
            ]), 
            m("a", {class:"navigation-admin-item", href:"/admin/s", config:m.route}, [
              m("i", {class:"fa fa-comments"}), 
              m("span", ["Comments"])
            ]), 
            m("a", {class:"navigation-admin-item", href:"/admin/settings", config:m.route}, [
              m("i", {class:"fa fa-cogs"}), 
              m("span", ["Settings"])
            ])
          ])
        ]);
};

