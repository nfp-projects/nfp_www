'use strict';

var m = require('mithril');

var header = {};

header.controller = function() {
  //intentionally empty
};

header.view = function(c) {
  return <div class="header">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
      </ul>
    </div>;
};

module.exports = header;
