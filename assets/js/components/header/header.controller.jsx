'use strict';

var m = require('mithril');

var header = {};

header.controller = function() {
  //intentionally empty
};

header.view = function(c) {
  return <ul>
      <li>
        <a href="/">Home</a>
      </li>
    </ul>;
};

module.exports = header;
