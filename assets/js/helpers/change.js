'use strict';

var m = require('mithril');

function change(display) {
  return {
    controller: function() {
      if (display === 'admin') {
        require('../admin/admin').display();
      } else {
        require('../public/public').display();
      }
    }
  }
}
module.exports = change;
