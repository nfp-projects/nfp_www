'use strict';

var m = require('mithril');

var header = {};

header.controller = function() {
  //intentionally empty
};

header.view = function(c) {
  return <ul>
      <li>
        <a href="/" config={m.route}> Home </a>
      </li>
      <li>
        <a href="/releases" config={m.route}> Releases </a>
      </li>
      <li>
        <a href="/login" config={m.route}> Login </a>
      </li>
    </ul>;
};

module.exports = header;
