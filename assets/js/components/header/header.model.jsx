'use strict';

var m = require('mithril');
var api = require('../../helpers/api');

var header = {};

header.vm = (function() {
  var vm = {};

  vm.init = function() {

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
      return api.get('/nav', {
        background: !!menu,
        initialValue: menu
      }).then(function(data) {
        localStorage.setItem('header_menu', JSON.stringify(data));

        //we can't call m.render() in case some other computation
        //is currently running and since we can't check if there
        //are pending requests, we call start and end.
        m.startComputation();
        m.endComputation();
        return data;
      });
    }

    return vm;
  }

  return vm;
}());

module.exports = header;
