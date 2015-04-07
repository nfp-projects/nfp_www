'use strict';

var _ = require('lodash');
var m = require('mithril');
var api = require('../../../helpers/api');
var Module = require('../../../helpers/module');
var header = new Module();

function HeaderItem(data, prefix) {
  for (var key in data) { //jshint ignore:line
    this[key] = data[key];
  }
  this.path = (prefix || '') + '/' + this.slug;

  if (!prefix) {
    this.children = data.children || [];
    this.children = this.children.map(function(item) {
      return new HeaderItem(item, this.path);
    }.bind(this));
  }

  this.selected = function(className) {
    var route = header.vm.getRoute();
    if (route.indexOf(this.path) === 0 && this.path !== '/' || this.path === route) {
      return ' ' + className + ' ';
    }
    return ' ';
  };
}

header.vm = {
  getRoute: function() {
    var route = m.route();
    route = route.slice(0, route.indexOf('?') > 0 && route.indexOf('?') || route.length);
    return route;
  },

  getBreadcrumbs: function() {
    var route = this.getRoute();
    var breadcrumbs = _.compact(route.split('/'));
    var previous = '';
    return breadcrumbs.map(function(crumb) {
      previous += '/' + crumb;
      return {
        path: previous,
        title: crumb,
        isEnd: previous === route
      };
    });
  },

  getCategories: function() {
    //First we check if it's already cached.
    var menu = localStorage.getItem('header_menu');

    try {
      menu = menu && JSON.parse(menu) || null;
      menu = menu.map(function(item) {
        return new HeaderItem(item);
      });
    }
    catch (error) {
      menu = null;
    }

    //Then we do an actual request to get the latest data.
    //If we do have it cached, we run it in the background.
    return api.get('/nav?fields=title,slug,children(title,slug)', {
      background: !!menu,
      initialValue: menu,
      type: HeaderItem
    }).then(function(data) {
      data.unshift(new HeaderItem({title: 'NFP', slug: ''}));
      data[data.length - 1].isEnd = true;

      var redraw = localStorage.getItem('header_menu') !== JSON.stringify(data);
      localStorage.setItem('header_menu', JSON.stringify(data));

      if (redraw) {
        //we can't call m.redraw() in case some other computation
        //is currently running and since we can't check if there
        //are pending requests, we call start and end.
        m.startComputation();
        m.endComputation();
      }
      return data;
    });
  }
};

module.exports = header;
