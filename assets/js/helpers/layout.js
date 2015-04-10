'use strict';

var m = require('mithril');

var currentLayout = '';
var current = {header: {}, footer: {}};
var map = null;

function view(ctrl, view) {
  if (!ctrl.layout) return view(ctrl);

  return [
    m('#header', current.header.view && current.header.view(current.header.ctrl)),
    m('main', {role: 'main', id: 'content', class: 'content content--' + ctrl.layout}, view(ctrl)),
    m('footer#footer', current.footer.view && current.footer.view(current.footer.ctrl))
  ];
}
exports.view = view;

function loadLayout(name) {
  if (!name) return;
  if (name === currentLayout) return;

  document.getElementById('container').className = 'container container--' + name;

  currentLayout = name;
  current.header.ctrl = map[name].header && new map[name].header.controller() || null;
  current.header.view = map[name].header && map[name].header.view.bind(map[name].header) || null;
  current.footer.ctrl = map[name].footer && new map[name].footer.controller() || null;
  current.footer.view = map[name].footer && map[name].footer.view.bind(map[name].footer) || null;
}

map = {
  'public': {
    header: require('../components/public/header/header.controller'),
    footer: require('../components/public/footer/footer.controller')
  },
  'admin': {
    header: require('../components/admin/header/header.controller'),
    footer: null
  }
};
exports.loadLayout = loadLayout;
