'use strict';

var m = require('mithril');
var api = require('../../helpers/api');
var forge = require('../../helpers/forge');

var header = {};

header.vm = forge(function(vm) {
  vm.isRouteMatch = function(url) {
    var route = m.route();
    route = route.slice(0, route.indexOf('?') > 0 && route.indexOf('?') || route.length);
    if (route.indexOf(url) === 0 && url !== '/' || url === route) {
      return true;
    }
    return false;
  };

  vm.getCategories = function() {
    //First we check if it's already cached.
    var menu = localStorage.getItem('header_menu');

    try {
      menu = menu && JSON.parse(menu) || null;
    }
    catch (error) {
      menu = null;
    }

    //Then we do an actual request to get the latest data.
    //If we do have it cached, we run it in the background.
    return api.get('/nav?fields=title,slug,children(title,slug)', {
      background: !!menu,
      initialValue: menu
    }).then(function(data) {
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
  };
});

module.exports = header;
