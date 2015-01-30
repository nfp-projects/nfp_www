'use strict';

var m = require('mithril');
var header = require('../header/header');

var layout = {};

layout.controller = function() {
  this.header = header.view.bind(this, new header.controller());
};

layout.view = function(c) {
  return <div class="container">
      {c.header()}
      <div id="content" class="content" />
    </div>;
};


module.exports = layout;
